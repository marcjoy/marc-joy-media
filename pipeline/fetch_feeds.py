"""Fetch configured RSS feeds and append new items to feeds.json (deduped by link)."""

from __future__ import annotations

import json
import re
from pathlib import Path

import feedparser
from dotenv import load_dotenv

SIGNAL_FEEDS = [
    # Standard RSS
    "https://africaisacountry.com/feed",
    "https://techcabal.com/feed/",
    "https://disrupt-africa.com/feed/",
    "https://africanarguments.org/feed/",
    "https://qz.com/africa/feed",
    # Substack
    "https://exponentialview.substack.com/feed",
    "https://theprepared.substack.com/feed",
    "https://oneusefulthing.substack.com/feed",
    "https://themarginalian.org/feed",
]

DREAM_FEEDS = [
    # MarcJoy's own Substack -- always DREAM
    "https://marcjoy.substack.com/feed",
    # Speculative fiction publications
    "https://www.tor.com/feed/",
    "https://fiyahlitmag.com/feed/",
    "https://strangehorizons.com/feed/",
    "https://uncannymagazine.com/feed/",
]

PULSE_FEEDS = [
    # Satire and cultural critique
    "https://www.theonion.com/rss",
    "https://www.theroot.com/rss",
    "https://www.mcsweeneys.net/feed",
    "https://reductress.com/feed/",
]

ROOT = Path(__file__).resolve().parent
FEEDS_PATH = ROOT / "feeds.json"

_IMG_SRC_RE = re.compile(r'<img[^>]+src\s*=\s*["\']([^"\'>]+)["\']', re.IGNORECASE)


def first_img_src_from_html(html: str | None) -> str | None:
    if not html or not isinstance(html, str):
        return None
    m = _IMG_SRC_RE.search(html)
    return m.group(1).strip() if m else None


def image_from_media_content(entry) -> str | None:
    mc = getattr(entry, "media_content", None) or []
    if not mc:
        return None
    first = mc[0]
    if isinstance(first, dict):
        return (first.get("url") or first.get("href") or "").strip() or None
    u = getattr(first, "url", None) or getattr(first, "href", None)
    return str(u).strip() if u else None


def image_from_enclosures(entry) -> str | None:
    enc = getattr(entry, "enclosures", None) or []
    if not enc:
        return None
    e0 = enc[0]
    if isinstance(e0, dict):
        return (e0.get("href") or e0.get("url") or "").strip() or None
    u = getattr(e0, "href", None) or getattr(e0, "url", None)
    return str(u).strip() if u else None


def image_from_content_or_summary(entry) -> str | None:
    content = getattr(entry, "content", None) or []
    if content:
        c0 = content[0]
        val = c0.get("value") if isinstance(c0, dict) else getattr(c0, "value", None)
        found = first_img_src_from_html(val)
        if found:
            return found
    summary = getattr(entry, "summary", None) or getattr(entry, "description", None) or ""
    return first_img_src_from_html(summary)


def extract_image_url(entry) -> str | None:
    u = image_from_media_content(entry)
    if u:
        return u
    u = image_from_enclosures(entry)
    if u:
        return u
    u = image_from_content_or_summary(entry)
    return u


def normalize_feed_url(url: str) -> str:
    return url.strip().rstrip("/").lower()


def collect_feed_urls_with_lanes() -> list[tuple[str, str]]:
    """Return (fetch_url, lane) pairs; same normalized URL appears only once (first list wins)."""
    seen: set[str] = set()
    out: list[tuple[str, str]] = []
    for lane, urls in (
        ("SIGNAL", SIGNAL_FEEDS),
        ("DREAM", DREAM_FEEDS),
        ("PULSE", PULSE_FEEDS),
    ):
        for url in urls:
            if not isinstance(url, str) or not url.strip():
                continue
            u = url.strip()
            nk = normalize_feed_url(u)
            if nk in seen:
                continue
            seen.add(nk)
            out.append((u, lane))
    return out


def load_existing() -> list[dict]:
    if not FEEDS_PATH.is_file():
        return []
    raw = json.loads(FEEDS_PATH.read_text(encoding="utf-8"))
    return raw if isinstance(raw, list) else []


def known_links(items: list[dict]) -> set[str]:
    return {i["link"] for i in items if isinstance(i.get("link"), str)}


def normalize_entry(entry, feed_title: str, feed_url: str, lane: str) -> dict | None:
    link = getattr(entry, "link", None) or (entry.links[0].href if getattr(entry, "links", None) else None)
    if not link:
        return None
    title = getattr(entry, "title", "") or ""
    desc = getattr(entry, "summary", "") or getattr(entry, "description", "") or ""
    published = ""
    if getattr(entry, "published", None):
        published = entry.published
    elif getattr(entry, "updated", None):
        published = entry.updated
    link = link.strip()
    label = feed_title if isinstance(feed_title, str) else str(feed_url)
    row = {
        "title": title.strip(),
        "link": link,
        "description": desc.strip(),
        "published": published,
        "source": label,
        "lane_hint": lane,
        "image_url": extract_image_url(entry),
        "source_url": link,
        "source_label": label,
    }
    return row


def main() -> None:
    load_dotenv(ROOT / ".env")
    items = load_existing()
    seen = known_links(items)
    new_by_lane = {"SIGNAL": 0, "DREAM": 0, "PULSE": 0}

    for url, lane in collect_feed_urls_with_lanes():
        parsed = feedparser.parse(url)
        feed_title = (parsed.feed.get("title", url) if parsed.feed else url) or url
        for entry in parsed.entries:
            row = normalize_entry(entry, feed_title, url, lane)
            if not row or row["link"] in seen:
                continue
            items.append(row)
            seen.add(row["link"])
            new_by_lane[lane] += 1

    FEEDS_PATH.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    total_new = sum(new_by_lane.values())
    print(f"SIGNAL: {new_by_lane['SIGNAL']} new items")
    print(f"DREAM: {new_by_lane['DREAM']} new items")
    print(f"PULSE: {new_by_lane['PULSE']} new items")
    print(f"Total: {total_new} new items appended to feeds.json")


if __name__ == "__main__":
    main()
