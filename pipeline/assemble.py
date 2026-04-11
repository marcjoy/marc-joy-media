"""Read a curation shortlist and append entries to src/data/magazine.json (hotlinked RSS images only)."""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent
MAGAZINE_JSON = REPO_ROOT / "src" / "data" / "magazine.json"


def slugify(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "-", s)
    return s.strip("-") or "untitled"


def load_json_array(path: Path) -> list:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("Expected JSON array")
    return data


def resolve_source_fields(raw: dict) -> tuple[str | None, str | None]:
    src = raw.get("source_url") or raw.get("sourceUrl")
    label = raw.get("source_label") or raw.get("sourceLabel")
    if isinstance(src, str) and src.strip():
        src = src.strip()
    else:
        src = None
    if isinstance(label, str) and label.strip():
        label = label.strip()
    else:
        label = None
    return src, label


def to_magazine_row(raw: dict, image_url: str | None) -> dict:
    aid = raw.get("id") or slugify(raw.get("title", ""))
    lane = raw.get("lane", "SIGNAL").upper()
    if lane not in ("SIGNAL", "DREAM", "PULSE"):
        lane = "SIGNAL"
    author = raw.get("author", "Nia")
    if author not in ("Nia", "Shade", "Muse"):
        author = "Nia"
    src, label = resolve_source_fields(raw)
    return {
        "id": aid,
        "lane": lane,
        "title": raw.get("title", "").strip(),
        "excerpt": raw.get("excerpt", "").strip(),
        "author": author,
        "publishedAt": raw.get("publishedAt", "")[:10],
        "imageUrl": image_url,
        "sourceUrl": src,
        "sourceLabel": label,
    }


def image_url_for_row(raw: dict) -> str | None:
    u = raw.get("image_url")
    if isinstance(u, str) and u.strip():
        return u.strip()
    return None


def main() -> None:
    load_dotenv(ROOT / ".env")
    parser = argparse.ArgumentParser(description="Assemble magazine entries from a draft shortlist.")
    parser.add_argument("draft_file", nargs="?", default=None)
    parser.add_argument("--auto", action="store_true")
    args = parser.parse_args()

    if args.auto:
        today = date.today().strftime("%Y-%m-%d")
        draft_file = f"drafts/{today}-shortlist.json"
    elif args.draft_file:
        draft_file = args.draft_file
    else:
        print("Error: provide a draft_file or use --auto")
        raise SystemExit(1)

    draft_path = Path(draft_file)
    if not draft_path.is_absolute():
        draft_path = (ROOT / draft_path).resolve()
    if not draft_path.is_file():
        if args.auto:
            print("No shortlist found for today. Run curate.py first.")
            raise SystemExit(1)
        raise SystemExit(f"Draft not found: {draft_path}")

    shortlist = load_json_array(draft_path)
    existing = load_json_array(MAGAZINE_JSON) if MAGAZINE_JSON.is_file() else []
    existing_ids = {row["id"] for row in existing if isinstance(row, dict) and "id" in row}

    new_rows: list[dict] = []
    for raw in shortlist:
        if not isinstance(raw, dict):
            continue
        final_image = image_url_for_row(raw)

        row = to_magazine_row(raw, final_image)
        if not row["title"]:
            print("skip: missing title", file=sys.stderr)
            continue
        if row["id"] in existing_ids:
            print(f"skip duplicate id: {row['id']}", file=sys.stderr)
            continue
        new_rows.append(row)
        existing_ids.add(row["id"])

    if not new_rows:
        print("No new articles to append.")
        return

    merged = existing + new_rows
    MAGAZINE_JSON.parent.mkdir(parents=True, exist_ok=True)
    MAGAZINE_JSON.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Appended {len(new_rows)} article(s) to {MAGAZINE_JSON.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
