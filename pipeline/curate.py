"""Filter recent feed items and ask Gemini 2.5 Flash for lane scores and editorial drafts."""

from __future__ import annotations

import json
import os
import re
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

from dotenv import load_dotenv
from google import genai

ROOT = Path(__file__).resolve().parent
FEEDS_PATH = ROOT / "feeds.json"
DRAFTS_DIR = ROOT / "drafts"

SYSTEM_PROMPT = """You are curating for Dream in Public magazine (Afrofuturist editorial).

Every input item includes lane_hint: "SIGNAL", "DREAM", or "PULSE". That lane is assigned at the feed level and is authoritative.

Lane rules (non-negotiable):
- You MUST set lane to exactly the same value as the input lane_hint. Never override or substitute a different lane.

Scoring — for each item output a numeric field relevance from 1–10 within the lane’s context only:
- SIGNAL: relevance to real-world Afrofuturist nonfiction (African diaspora futures, tech, governance, culture, grounded reporting).
- DREAM: relevance to speculative fiction, worldbuilding, and mythic/sf literary craft.
- PULSE: sharpness and quality as satire or cultural critique.

Include ONLY items with relevance 8 or higher in your output.

Excerpt (150 words maximum), persona, and author by lane:
- SIGNAL: Nia — grounded reporter voice.
- DREAM: Nia — speculative griot, embodied mythic-real tone.
- PULSE: Shade — satirical, comedic, pointed.

Return ONLY valid JSON: an array of objects, one per included item only, keys:
id (kebab-slug from title), title, excerpt, author ("Nia" for SIGNAL and DREAM, "Shade" for PULSE), lane (must equal input lane_hint), publishedAt (YYYY-MM-DD if inferable else today UTC), relevance (number 1–10), sourceUrl (must equal the input link/source_url), sourceLabel (echo input source_label), image_url (echo input image_url, or null), source_url (echo input source_url), source_label (echo input source_label).

At most 2 items per lane (SIGNAL, DREAM, PULSE). At most 6 items total. Prefer highest relevance within each lane when choosing which two to include."""


def parse_published(published: str) -> datetime | None:
    if not published or not str(published).strip():
        return None
    s = str(published).strip()
    try:
        dt = parsedate_to_datetime(s)
        if dt.tzinfo is None:
            return dt.replace(tzinfo=timezone.utc)
        return dt.astimezone(timezone.utc)
    except (TypeError, ValueError):
        pass
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone(timezone.utc)
    except ValueError:
        return None


def recent_items(items: list[dict], days: int = 7) -> list[dict]:
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    out: list[dict] = []
    for it in items:
        pub = parse_published(it.get("published") or "")
        if pub is not None and pub >= cutoff:
            out.append(it)
    return out


def extract_json_array(text: str) -> list:
    text = text.strip()
    m = re.search(r"\[[\s\S]*\]", text)
    if not m:
        raise ValueError("No JSON array in model response")
    return json.loads(m.group(0))


def hint_by_link_from_items(items: list[dict]) -> dict[str, str]:
    out: dict[str, str] = {}
    for x in items:
        link = x.get("link")
        hint = x.get("lane_hint")
        if isinstance(link, str) and isinstance(hint, str) and hint in ("SIGNAL", "DREAM", "PULSE"):
            out[link] = hint
    return out


def merge_feed_fields(top: list, items: list[dict]) -> None:
    meta_by_link: dict[str, dict] = {}
    for x in items:
        link = x.get("link")
        if not isinstance(link, str):
            continue
        meta_by_link[link] = {
            "image_url": x.get("image_url"),
            "source_url": x.get("source_url") or link,
            "source_label": x.get("source_label") or x.get("source"),
        }
    hints = hint_by_link_from_items(items)

    for row in top:
        if not isinstance(row, dict):
            continue
        url = row.get("sourceUrl") or row.get("source_url")
        if not isinstance(url, str):
            continue
        if url in hints:
            row["lane"] = hints[url]
        if url in meta_by_link:
            m = meta_by_link[url]
            row["image_url"] = m["image_url"]
            row["source_url"] = m["source_url"]
            row["source_label"] = m["source_label"]
            row["sourceUrl"] = m["source_url"]
            row["sourceLabel"] = m["source_label"]


def _relevance_value(row: dict) -> float:
    v = row.get("relevance")
    if v is None:
        v = row.get("afrofuturist_relevance")
    try:
        return float(v)
    except (TypeError, ValueError):
        return 0.0


def enforce_scores_and_cap_per_lane(top: list, items: list[dict]) -> list:
    """Drop score < 8, force lane from feed lane_hint, cap at 2 per lane (max 6)."""
    hints = hint_by_link_from_items(items)
    kept: list[dict] = []
    for row in top:
        if not isinstance(row, dict):
            continue
        url = row.get("sourceUrl") or row.get("source_url")
        if not isinstance(url, str) or url not in hints:
            continue
        row["lane"] = hints[url]
        if _relevance_value(row) < 8.0:
            continue
        kept.append(row)

    by_lane: dict[str, list[dict]] = {"SIGNAL": [], "DREAM": [], "PULSE": []}
    for row in kept:
        lane = row.get("lane")
        if lane not in by_lane:
            continue
        by_lane[lane].append(row)

    out: list[dict] = []
    for lane in ("SIGNAL", "DREAM", "PULSE"):
        rows = sorted(by_lane[lane], key=_relevance_value, reverse=True)
        out.extend(rows[:2])
    return out


def main() -> None:
    load_dotenv(ROOT / ".env")
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise SystemExit("GEMINI_API_KEY missing (copy .env.example to .env)")

    raw = json.loads(FEEDS_PATH.read_text(encoding="utf-8"))
    if not isinstance(raw, list):
        raise SystemExit("feeds.json must be a JSON array")

    items = recent_items(raw)
    if not items:
        print("No items in the last 7 days.")
        return

    payload = json.dumps(
        [
            {
                "title": x.get("title"),
                "link": x.get("link"),
                "description": x.get("description"),
                "source": x.get("source"),
                "lane_hint": x.get("lane_hint"),
                "image_url": x.get("image_url"),
                "source_url": x.get("source_url") or x.get("link"),
                "source_label": x.get("source_label") or x.get("source"),
            }
            for x in items
        ],
        ensure_ascii=False,
    )
    prompt = SYSTEM_PROMPT + "\n\nFeed items JSON:\n" + payload

    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    text = response.text or ""
    top = extract_json_array(text)
    merge_feed_fields(top, items)
    top = enforce_scores_and_cap_per_lane(top, items)

    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    out_path = DRAFTS_DIR / f"{today}-shortlist.json"
    out_path.write_text(json.dumps(top, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(top)} candidates to {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
