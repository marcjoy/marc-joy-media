# PHASE 5 UPDATE: Image URLs Are Ready

The file `src/lib/images.ts` contains all R2 image URLs mapped to
clean variable names. The base URL is:

```
https://pub-ade018e64c784701882dc1419e597561.r2.dev
```

## How to use in Cursor:

When you reach Phase 5 (image swap), paste this prompt:

```
Read src/lib/images.ts. This file contains all image URLs
hosted on Cloudflare R2.

Import { siteImages } from './lib/images' in each page component.

Replace every lh3.googleusercontent.com/aida-public/ URL with
the corresponding siteImages property:

- Hero background → siteImages.heroBackground
- Hero video → siteImages.heroVideo (use as <video> src)
- Kemetopolis characters → siteImages.charKofi, char8Bit, etc.
- Property cards → siteImages.propertyKemetopolis, etc.
- Work page items → siteImages.workItems array
- Music album cover → siteImages.albumCover
- About portrait → siteImages.aboutPortrait
- World section image → siteImages.worldImage

Remove all referrerPolicy="no-referrer" attributes.

For the hero section, add a <video> element using
siteImages.heroVideo as the source, with autoPlay, muted,
loop, and playsInline attributes. Keep the static image as
a poster/fallback.
```

## After the swap:

Open the dev server and check each page. Some images labeled
"unknown" need to be reviewed visually and reassigned if they
fit better in different slots. The siteImages object at the
bottom of images.ts is your quick-edit map for shuffling
assignments without touching page components.
