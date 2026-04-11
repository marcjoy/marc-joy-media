# Dream in Public — content pipeline

Python utilities that pull RSS headlines from **lane-specific feed lists** in **`fetch_feeds.py`**, curate with **Gemini** (`google-genai`), and append entries to the site’s `src/data/magazine.json`. **`assemble.py`** merges approved shortlists using **RSS `image_url` hotlinks only** (no image generation, no R2).

## Setup

1. Create a virtual environment in `pipeline/` (recommended).
2. `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and fill in keys.

Environment variables:

| Variable | Used by |
|----------|---------|
| `GEMINI_API_KEY` | `curate.py` |

## Lane-specific feeds (`fetch_feeds.py`)

**Lane is set at the feed URL level**, not by the curator model. Each RSS URL belongs to exactly one list:

| List | `lane_hint` stored in `feeds.json` |
|------|-------------------------------------|
| **`SIGNAL_FEEDS`** | `"SIGNAL"` |
| **`DREAM_FEEDS`** | `"DREAM"` |
| **`PULSE_FEEDS`** | `"PULSE"` |

If the same normalized URL were listed twice (e.g. in two lists), **only the first occurrence** is used: order of precedence is **SIGNAL**, then **DREAM**, then **PULSE**.

### Adding a source

- **New SIGNAL source** — append the feed URL to **`SIGNAL_FEEDS`** in **`fetch_feeds.py`**.
- **New DREAM source** — append the feed URL to **`DREAM_FEEDS`**.
- **New PULSE source** — append the feed URL to **`PULSE_FEEDS`**.

No Substack-specific detection: whatever list holds the URL determines the lane.

## GitHub Actions (weekly)

- **Dream in Public Weekly Pipeline** runs **every Monday** at **14:00 UTC** (`0 14 * * 1`) and can be run manually via **workflow_dispatch**.
- It runs **`fetch_feeds.py`** then **`curate.py`** only. **`assemble.py` is not** run in CI.
- Configure repository secrets as needed for the workflow (e.g. `GEMINI_API_KEY`).
- After the action finishes, new drafts appear under **`pipeline/drafts/`** (e.g. `YYYY-MM-DD-shortlist.json`).
- **MarcJoy** reviews the shortlist, deletes unwanted rows, then runs **`assemble.py`** locally to append to `magazine.json`.
- After **`assemble.py`** on your machine, **`git push`** triggers the Netlify deploy with updated content.

## Flow

**Step 1 — Fetch (weekly / manual)**  
`python fetch_feeds.py`  
Pulls every URL in **`SIGNAL_FEEDS`**, **`DREAM_FEEDS`**, and **`PULSE_FEEDS`**. De-duplicates by item `link`, appends to `feeds.json` with `title`, `link`, `description`, `published`, `source`, **`lane_hint`** (from the list that contained the feed URL), **`source_url`**, **`source_label`**, and **`image_url`** (media / HTML cover when present).

Console summary per run:

- `SIGNAL: X new items`
- `DREAM: X new items`
- `PULSE: X new items`
- `Total: X new items appended to feeds.json`

**Step 2 — Curate**  
`python curate.py`  
Keeps items from the last 7 days, sends a batch to **Gemini 2.5 Flash**. The model **must respect `lane_hint`** (lane is not reassigned). It scores **`relevance`** 1–10 in a lane-specific way, keeps items scoring **8+**, and targets up to **2 candidates per lane** (6 max). Writes the shortlist to `drafts/YYYY-MM-DD-shortlist.json`. Edit that file and delete rows you do not want published.

**Step 3 — Assemble**  
`python assemble.py drafts/YYYY-MM-DD-shortlist.json`  
For each row: if **`image_url`** is set, copies it to **`imageUrl`** in `magazine.json` (hotlink); otherwise **`imageUrl`** is **`null`**. Writes **`sourceUrl`** / **`sourceLabel`**. Appends to `../src/data/magazine.json` (skips duplicate `id` values).

**Step 4 — Publish**  
Commit and `git push`; Netlify picks up the updated JSON.

## Files

- `fetch_feeds.py` — RSS ingestion  
- `curate.py` — Gemini shortlist  
- `assemble.py` — merge shortlist into `magazine.json`  
- `feeds.json` — rolling store of feed items  
- `drafts/` — dated shortlists and manual edits  
