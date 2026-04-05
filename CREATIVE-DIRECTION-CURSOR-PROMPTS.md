# marcjoy.com — Cursor Implementation Prompts
## From: Creative Direction v1

Each prompt below is self-contained. Paste one at a time into Cursor agent mode.
Implement in the order listed — later prompts depend on earlier ones.

---

## PROMPT 1 — Per-Page Atmosphere System

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Repo: github.com/marcjoy/marc-joy-media
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Implement a per-page atmosphere system using CSS custom properties.

FILE TO EDIT: src/index.css

Add these CSS custom property blocks. Do not change any existing styles, only append:

:root {
  --page-bg: #0A0A0F;
  --page-accent: #2DD4BF;
  --page-ambient-color: rgba(45, 212, 191, 0.08);
  --page-ambient-position: bottom right;
  transition: background-color 0.6s ease, --page-accent 0.6s ease;
}

[data-page="kemetopolis"] {
  --page-bg: #0F0A08;
  --page-accent: #C49A6C;
  --page-ambient-color: rgba(196, 154, 108, 0.08);
  --page-ambient-position: center;
}

[data-page="properties"] {
  --page-bg: #0A0A0F;
  --page-accent: #2DD4BF;
  --page-ambient-color: rgba(45, 212, 191, 0.05);
  --page-ambient-position: bottom center;
}

[data-page="work"] {
  --page-bg: #111118;
  --page-accent: #2DD4BF;
  --page-ambient-color: rgba(45, 212, 191, 0.03);
  --page-ambient-position: top left;
}

[data-page="music"] {
  --page-bg: #080810;
  --page-accent: #818CF8;
  --page-ambient-color: rgba(129, 140, 248, 0.10);
  --page-ambient-position: center;
}

[data-page="about"] {
  --page-bg: #0F0E12;
  --page-accent: #E8D5B0;
  --page-ambient-color: rgba(232, 213, 176, 0.07);
  --page-ambient-position: top left;
}

Then add a shared ambient glow utility class:
.page-ambient-glow {
  background: radial-gradient(
    ellipse at var(--page-ambient-position),
    var(--page-ambient-color),
    transparent 70%
  );
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 0;
}

FILE TO EDIT: src/pages/Home.tsx
Add data-page="home" to the outermost wrapper div.

FILE TO EDIT: src/pages/Kemetopolis.tsx
Add data-page="kemetopolis" to the outermost wrapper div.

FILE TO EDIT: src/pages/Properties.tsx
Add data-page="properties" to the outermost wrapper div.

FILE TO EDIT: src/pages/Work.tsx
Add data-page="work" to the outermost wrapper div.

FILE TO EDIT: src/pages/Music.tsx
Add data-page="music" to the outermost wrapper div.

FILE TO EDIT: src/pages/About.tsx
Add data-page="about" to the outermost wrapper div.

FILE TO EDIT: src/App.tsx
Inside the AnimatePresence wrapper, add a single div with className="page-ambient-glow"
as a sibling to the Routes component (not inside it).

RULES:
- Do not break any existing layout or animations.
- Do not touch src/lib/images.ts.
- No new npm packages. This is pure CSS + data attributes.
```

---

## PROMPT 2 — Home Page Hero Parallax (3 layers)

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Implement three-layer scroll parallax on the Home page hero section.

FILE TO EDIT: src/pages/Home.tsx

The hero section currently has a background image and headline text.
Replace the hero section with this structure (preserve all existing content, just wrap it):

Import at top of file:
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

Inside the component, before the return:
const heroRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ['start start', 'end start']
});

// Background moves slowest (creates depth)
const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

// Headline moves at mid speed
const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

// Hero content fades out as user scrolls past
const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

In the JSX, wrap the hero section:
<section ref={heroRef} className="relative overflow-hidden [existing hero classes]">
  {/* Layer 1: Background image — moves slowest */}
  <motion.div
    style={{ y: bgY }}
    className="absolute inset-0 -top-[30%] -bottom-[30%]"
  >
    {/* Move existing background image/div here */}
  </motion.div>

  {/* Layer 2: Headline and content — moves at mid speed */}
  <motion.div
    style={{ y: headlineY, opacity: contentOpacity }}
    className="relative z-10"
  >
    {/* Move existing headline, subhead, and CTA here */}
  </motion.div>
</section>

RULES:
- Only use transform and opacity for motion values. No layout-triggering properties.
- The hero section should still be full viewport height (100vh or min-h-screen).
- Preserve all existing text content, CTAs, and image URLs exactly.
- This is animation budget item 1 of 3 for the Home page. Do not add any other scroll
  animations to this file in this pass.
```

---

## PROMPT 3 — Home Page Manifesto Word-by-Word Reveal

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Make the manifesto/tagline text on the Home page reveal word-by-word as the user
scrolls through that section.

FILE TO EDIT: src/pages/Home.tsx

Identify the manifesto section — it contains the "We Dream in Public" philosophy text.

Add to imports:
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

Create a WordReveal component in this file (above the main component, not exported):

function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4']
  });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <WordUnit
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
}

function WordUnit({
  word,
  progress,
  range
}: {
  word: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

Apply WordReveal to the main manifesto paragraph text. Pass the full sentence as the
`text` prop. Keep all surrounding layout and styling intact.

RULES:
- Only use opacity for the animation (GPU-composited, no layout thrashing).
- Words should start at 15% opacity (visible but dim) and reach 100% as they scroll in.
- This is animation budget item 2 of 3 for the Home page.
- Do not touch the hero section (handled in a previous pass).
```

---

## PROMPT 4 — Home Page Property Cards Stagger

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Add staggered scroll-triggered entrance animation to the property preview cards
on the Home page.

FILE TO EDIT: src/pages/Home.tsx

Find the section that renders the property/project cards (the grid of 5 properties).

Replace the wrapping container and card elements with Framer Motion variants:

Import:
import { motion } from 'motion/react';

Add these variant objects in the component:
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    rotate: -0.5
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

Wrap the card container with:
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
  className="[existing grid classes]"
>

Wrap each individual card with:
<motion.div variants={cardVariants}>
  {/* existing card content */}
</motion.div>

RULES:
- viewport once: true — animation fires once, does not replay on scroll back up.
- Do not change card content, images, links, or layout classes.
- This is animation budget item 3 of 3 for the Home page. Do not add any more
  scroll animations to this page.
- No new npm packages.
```

---

## PROMPT 5 — Kemetopolis Hero Descent (3-Layer Orbital-to-City)

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Implement the Kemetopolis page hero as a three-layer scroll descent effect.
As the user scrolls, the perspective shifts from orbital view down through atmosphere
into the city. Three image layers move at different parallax rates and blur levels.

FILE TO EDIT: src/pages/Kemetopolis.tsx
FILE TO REFERENCE: src/lib/images.ts (check which R2 image URLs are available for
the kemetopolis/ folder — use what exists, do not invent URLs)

Import:
import { useScroll, useTransform, useMotionTemplate, motion } from 'motion/react';
import { useRef } from 'react';

Inside the component:
const heroRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ['start start', 'end start']
});

// Layer 1: Background / orbital view — scales up (zoom in), stays sharp then blurs
const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
const bgBlur = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 10]);
const bgBlurFilter = useMotionTemplate`blur(${bgBlur}px)`;

// Layer 2: Atmosphere overlay — fades in then fades out
const midOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);

// Layer 3: City foreground detail — fades in and sharpens
const fgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);
const fgBlur = useTransform(scrollYProgress, [0.4, 1], [8, 0]);
const fgBlurFilter = useMotionTemplate`blur(${fgBlur}px)`;

// Hero content fades out early as user descends
const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
const contentY = useTransform(scrollYProgress, [0, 0.35], ['0%', '-8%']);

JSX structure:
<section ref={heroRef} className="relative h-[200vh] overflow-hidden">
  {/* Sticky inner to keep content visible while section scrolls */}
  <div className="sticky top-0 h-screen overflow-hidden">

    {/* Layer 1: Orbital city-planet image (background) */}
    <motion.div
      style={{ scale: bgScale, filter: bgBlurFilter }}
      className="absolute inset-0 origin-center"
    >
      <img
        src={[use the primary kemetopolis city/planet image from images.ts]}
        className="w-full h-full object-cover"
        alt="Kemetopolis from orbit"
      />
    </motion.div>

    {/* Layer 2: Atmospheric haze overlay — semi-transparent dark teal */}
    <motion.div
      style={{ opacity: midOpacity }}
      className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-900/40 to-amber-900/30"
    />

    {/* Layer 3: City detail — use second kemetopolis image if available,
        otherwise skip this layer */}
    <motion.div
      style={{ opacity: fgOpacity, filter: fgBlurFilter }}
      className="absolute inset-0"
    >
      <img
        src={[use a second kemetopolis detail image if one exists in images.ts]}
        className="w-full h-full object-cover"
        alt="Kemetopolis city detail"
      />
    </motion.div>

    {/* Hero content */}
    <motion.div
      style={{ opacity: contentOpacity, y: contentY }}
      className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8"
    >
      {/* Preserve all existing hero headline, subhead, and CTA content exactly */}
    </motion.div>

  </div>
</section>

RULES:
- The section height is 200vh to give scroll room while keeping content sticky.
- Only use transform, scale, opacity, and filter — no layout-triggering properties.
- If only one kemetopolis image exists, run with two layers only (skip Layer 3).
- This is animation budget item 1 of 4 for the Kemetopolis page.
- Do not touch any other section on the Kemetopolis page in this pass.
```

---

## PROMPT 6 — Kemetopolis Character Cards Slide-In

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Make the Cosmic Kids character cards slide in from alternating sides as the user
scrolls to that section. Odd-indexed cards enter from the left, even-indexed from the right.
Like characters stepping out of doorways.

FILE TO EDIT: src/pages/Kemetopolis.tsx

Import:
import { motion } from 'motion/react';

The character cards are currently rendered in a grid or flex container. Identify that
section and wrap each card:

const cardVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 0 ? -60 : 60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: (index % 3) * 0.1
    }
  }
});

For each character card, wrap with:
<motion.div
  variants={cardVariants(index)}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
>
  {/* existing card content */}
</motion.div>

Also add the Ntru Arts element glow on hover for character name text.
Element color map (apply as text-shadow or drop-shadow on the name element on hover):
- Kofi: #F5F0E8 (neutral cream glow)
- Mjenzi: #2DD4BF (teal tech-glow)
- 8Bit: #EF4444 (red data-glow — alternates with #22C55E green on pulse)
- Soliloquy: #6366F1 (indigo story-light)
- Zamani: #D4A574 (warm copper temporal-thread)
- Anyanwu Ama: #E07A5F (solar coral)

For each character name element, add:
className="transition-all duration-300 [existing classes]"

And a whileHover on the card:
whileHover={{ scale: 1.02 }}

For the name glow, use inline style on hover via onMouseEnter/onMouseLeave or a
CSS class toggle:
style={{ textShadow: isHovered ? `0 0 20px [element color], 0 0 40px [element color]40` : 'none' }}

You will need a hovered state per card. Use useState for a hoveredCard index.

RULES:
- Preserve all existing card content (images, names, descriptions, links) exactly.
- Do not change the grid layout.
- This covers animation budget items 2 and the hover budget for the Kemetopolis page.
- Do not modify the hero section (handled in previous pass).
```

---

## PROMPT 7 — Kemetopolis Builders vs. Hustlers Crossfade

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Implement a scroll-driven crossfade between the Builders (The Calibrated) and
Hustlers (The Drift Collective) faction images on the Kemetopolis page. As the user
scrolls through the "World" or factions section, one image dissolves into the other.

FILE TO EDIT: src/pages/Kemetopolis.tsx
FILE TO REFERENCE: src/lib/images.ts (find the faction/world images in kemetopolis/)

Import:
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

Identify the factions section. Wrap it with a ref and set up scroll tracking:

const factionsRef = useRef(null);
const { scrollYProgress: factionsProgress } = useScroll({
  target: factionsRef,
  offset: ['start 0.7', 'end 0.3']
});

// Hustlers image starts visible, dissolves out
const hustlersOpacity = useTransform(factionsProgress, [0, 0.5, 1], [1, 0.5, 0]);

// Builders image starts transparent, fades in
const buildersOpacity = useTransform(factionsProgress, [0, 0.5, 1], [0, 0.5, 1]);

In the JSX, stack the two faction images absolutely on top of each other:
<section ref={factionsRef} className="relative [existing section classes]">
  <div className="relative h-[60vh] overflow-hidden rounded-xl">
    {/* Hustlers image — dissolves out */}
    <motion.img
      src={[Hustlers/Drift Collective image from images.ts]}
      style={{ opacity: hustlersOpacity }}
      className="absolute inset-0 w-full h-full object-cover"
      alt="The Drift Collective"
    />
    {/* Builders image — fades in */}
    <motion.img
      src={[Builders/Calibrated image from images.ts]}
      style={{ opacity: buildersOpacity }}
      className="absolute inset-0 w-full h-full object-cover"
      alt="The Calibrated"
    />
    {/* Overlay label that transitions with the crossfade */}
    <div className="absolute inset-0 flex items-end p-8 z-10">
      {/* Existing faction text content goes here */}
    </div>
  </div>
</section>

If dedicated faction images don't exist in images.ts, use any two available
kemetopolis/ images and note in a code comment that these are placeholders.

RULES:
- Do not break existing text/content in the factions section.
- Only use opacity for the crossfade (GPU-composited).
- This is animation budget item 3 of 4 for the Kemetopolis page.
```

---

## PROMPT 8 — Unique Hover Behaviors (Properties Page)

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Give each of the 5 property cards on the Properties page a unique hover
interaction. No two cards should hover the same way.

FILE TO EDIT: src/pages/Properties.tsx

The five properties and their hover signatures:

1. KEMETOPOLIS CARD — 3D tilt toward cursor
Add state: const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  setTilt({ rotateX: y * -10, rotateY: x * 10 });
};

const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

Wrap the card in:
<motion.div
  style={{
    rotateX: tilt.rotateX,
    rotateY: tilt.rotateY,
    transformStyle: 'preserve-3d',
    perspective: 800,
    boxShadow: `0 0 40px rgba(45,212,191,0.15)`
  }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
>

2. NEVER ONE MONTH CARD — Desaturated to vivid color
Wrap the card image in:
<motion.div
  className="overflow-hidden"
  initial={{ filter: 'grayscale(60%)' }}
  whileHover={{ filter: 'grayscale(0%)' }}
  transition={{ duration: 0.4 }}
>
  <img ... />
</motion.div>

3. MARS EARLY LEARNING CARD — Brightens like sunlight hitting a window
Wrap the card in:
<motion.div
  whileHover={{
    scale: 1.02,
    filter: 'brightness(1.15)',
  }}
  transition={{ duration: 0.35, ease: 'easeOut' }}
>

4. NW BLACK PIONEERS CARD — Film grain texture overlay fades in
Add a grain overlay div inside the card:
<div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100
  transition-opacity duration-500 mix-blend-overlay"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
    backgroundSize: '200px 200px'
  }}
/>
Add className="relative group" to the card wrapper.
Also add a slight sepia shift on the image:
<motion.img
  whileHover={{ filter: 'sepia(20%)' }}
  transition={{ duration: 0.4 }}
  ...
/>

5. SCATTERED THRONES CARD — Cinematic letterbox bars slide in
Add two absolute-positioned bar divs inside the card, hidden by default:
<motion.div
  className="absolute top-0 left-0 right-0 z-10 bg-black"
  initial={{ height: 0 }}
  whileHover={{ height: '10%' }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
/>
<motion.div
  className="absolute bottom-0 left-0 right-0 z-10 bg-black"
  initial={{ height: 0 }}
  whileHover={{ height: '10%' }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
/>
Add className="relative overflow-hidden" to the card image container.

RULES:
- Each card must have a different hover behavior. Do not reuse effects across cards.
- Use Framer Motion for all animations. No CSS-only hover (except the grain overlay).
- Do not change card content, images, copy, or routing links.
- This covers the full hover budget for the Properties page.
- Import useState at the top if not already imported.
```

---

## PROMPT 9 — Work Page Masonry Stagger

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Add a staggered waterfall entrance animation to the Work page masonry/grid.
Items should fade in with a slight upward drift, staggered sequentially, as if rising
into view.

FILE TO EDIT: src/pages/Work.tsx

Import:
import { motion } from 'motion/react';

Add variant definitions:
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

Wrap the grid container:
<motion.div
  variants={gridVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
  className="[existing grid/masonry classes]"
>

Wrap each work item:
<motion.div variants={itemVariants}>
  {/* existing item content */}
</motion.div>

Also add a hover overlay on each item:
<motion.div
  whileHover={{ opacity: 1 }}
  initial={{ opacity: 0 }}
  transition={{ duration: 0.25 }}
  className="absolute inset-0 bg-black/30 flex items-end p-4 z-10"
>
  {/* project title and category if available */}
</motion.div>

Add className="relative overflow-hidden" to each work item wrapper.

RULES:
- Only use opacity and y transform for entrance (GPU-composited).
- viewport once: true — fires once only.
- Do not change the grid layout, image URLs, or item content.
- This covers animation budget items 1-2 of 2 for the Work page.
```

---

## PROMPT 10 — Music Page: Album Float + Radial Pulse

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Give the Music page two effects:
1. The album cover (Sonic Cosmos) floats with a subtle independent parallax as user scrolls.
2. The page background has a very slow, continuous radial pulse suggesting sound waves.

FILE TO EDIT: src/pages/Music.tsx
FILE TO EDIT: src/index.css

PART 1 — Album float parallax:

Import:
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

Inside the component:
const albumRef = useRef(null);
const { scrollYProgress } = useScroll({
  target: albumRef,
  offset: ['start end', 'end start']
});
const albumY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

Wrap the album cover image:
<motion.div ref={albumRef} style={{ y: albumY }}>
  <img src={[sonic cosmos album image from images.ts]} ... />
</motion.div>

PART 2 — Radial pulse background (CSS animation, not scroll-linked):

Add to src/index.css:
@keyframes radial-pulse {
  0% {
    background-size: 100% 100%;
    opacity: 0.08;
  }
  50% {
    background-size: 180% 180%;
    opacity: 0.04;
  }
  100% {
    background-size: 100% 100%;
    opacity: 0.08;
  }
}

.music-pulse-bg {
  background: radial-gradient(ellipse at center, rgba(129, 140, 248, 0.12), transparent);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  animation: radial-pulse 6s ease-in-out infinite;
  pointer-events: none;
}

In src/pages/Music.tsx, add this div inside the page wrapper, behind all content:
<div className="fixed inset-0 z-0 music-pulse-bg pointer-events-none" />

Make sure all existing Music page content has z-index above 0 (add relative z-10 to
the content wrapper if needed).

RULES:
- The pulse must be subtle. It should suggest a speaker breathing, not a strobe.
- 6 second animation cycle minimum.
- album parallax uses transform only, no layout properties.
- This covers animation budget items 1-2 of 2 + 1 ambient for the Music page.
```

---

## PROMPT 11 — Ambient Sound System (Optional — Implement Last)

```
You are working on the marcjoy.com React + Vite + TypeScript site.
Stack: React 19, Vite, Tailwind CSS v4, Framer Motion (motion/react), React Router DOM v7

TASK: Implement an optional ambient sound system. On first site visit, ask the user
if they want to enter with or without sound. Per-page ambient audio fades in/out
during navigation. A small persistent mute toggle appears in the corner.

This uses Web Audio API only — no npm audio library needed.

PREREQUISITE: You need ambient audio files (mp3 or ogg, <200KB each) uploaded to
the R2 bucket under a new /audio/ folder. File names:
- audio/home-ambient.mp3 (distant wind, low hum)
- audio/kemetopolis-ambient.mp3 (city murmur, distant transit)
- audio/music-ambient.mp3 (vinyl crackle, warm pad)

If these files do not yet exist in R2, create the hook and UI now but leave audio src
values as empty strings with a comment: // TODO: upload audio file to R2

CREATE NEW FILE: src/lib/useAmbientSound.ts

import { useEffect, useRef, useCallback } from 'react';

const PAGE_SOUNDS: Record<string, string> = {
  home: 'https://pub-ade018e64c784701882dc1419e597561.r2.dev/audio/home-ambient.mp3',
  kemetopolis: 'https://pub-ade018e64c784701882dc1419e597561.r2.dev/audio/kemetopolis-ambient.mp3',
  music: 'https://pub-ade018e64c784701882dc1419e597561.r2.dev/audio/music-ambient.mp3',
};

const VOLUME_TARGET = 0.07; // 7% max — subliminal

export function useAmbientSound(page: string, enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentPageRef = useRef<string>('');

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    audio.volume = 0;
    audio.play().catch(() => {}); // catches autoplay block silently
    const step = () => {
      if (audio.volume < VOLUME_TARGET) {
        audio.volume = Math.min(audio.volume + 0.005, VOLUME_TARGET);
        setTimeout(step, 100);
      }
    };
    step();
  }, []);

  const fadeOut = useCallback((audio: HTMLAudioElement, onDone?: () => void) => {
    const step = () => {
      if (audio.volume > 0.005) {
        audio.volume = Math.max(audio.volume - 0.005, 0);
        setTimeout(step, 100);
      } else {
        audio.pause();
        audio.currentTime = 0;
        onDone?.();
      }
    };
    step();
  }, []);

  useEffect(() => {
    if (!enabled) {
      if (audioRef.current) fadeOut(audioRef.current);
      return;
    }
    const src = PAGE_SOUNDS[page];
    if (!src || page === currentPageRef.current) return;

    const newAudio = new Audio(src);
    newAudio.loop = true;

    if (audioRef.current) {
      fadeOut(audioRef.current, () => {
        audioRef.current = newAudio;
        fadeIn(newAudio);
      });
    } else {
      audioRef.current = newAudio;
      fadeIn(newAudio);
    }
    currentPageRef.current = page;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [page, enabled, fadeIn, fadeOut]);
}

CREATE NEW FILE: src/components/SoundToggle.tsx

A small fixed-position speaker icon button in the bottom-left corner.
Uses Lucide React icons: Volume2 (sound on) and VolumeX (sound off).
On first visit, show a small modal/banner with two buttons:
"Enter with sound" and "Enter silent"
Store preference in a React state lifted to App level (not localStorage — use
in-memory state only, since localStorage is not supported in this environment).

The toggle must be:
- Position: fixed, bottom-4 left-4, z-50
- Icon size: 16px
- Background: rgba(0,0,0,0.5), rounded, p-2
- Fade in after user makes their first choice
- Auto-hidden on mobile (hidden md:flex or similar)

FILE TO EDIT: src/App.tsx
- Add useState for soundEnabled (default: null — means no choice yet)
- Pass soundEnabled and setSoundEnabled as props to SoundToggle
- Render <SoundToggle /> inside the main layout wrapper
- Determine current page from useLocation() and pass to useAmbientSound(page, soundEnabled ?? false)

RULES:
- Never autoplay without user choice.
- Volume must never exceed 10%.
- Respects prefers-reduced-motion — if that media query is true, do not play.
  Check: window.matchMedia('(prefers-reduced-motion: reduce)').matches
- Auto-muted on mobile (check window.innerWidth < 768 on mount).
- The "Enter with sound / Enter silent" prompt appears once per session only.
- No new npm packages.
```

---

## IMPLEMENTATION ORDER

Run these prompts in this sequence. Each one assumes the previous is complete and
committed before starting:

1. Per-Page Atmosphere (Prompt 1) — foundational, everything builds on this
2. Home Hero Parallax (Prompt 2)
3. Home Manifesto Reveal (Prompt 3)
4. Home Card Stagger (Prompt 4)
5. Kemetopolis Hero Descent (Prompt 5)
6. Kemetopolis Character Slide-In + Glow (Prompt 6)
7. Kemetopolis Crossfade (Prompt 7)
8. Properties Unique Hovers (Prompt 8)
9. Work Page Stagger (Prompt 9)
10. Music Page Float + Pulse (Prompt 10)
11. Ambient Sound — OPTIONAL, implement after everything else is stable (Prompt 11)

After each prompt, verify:
- No layout thrashing (check DevTools Performance tab)
- 60fps scroll animations
- All existing content and links still intact
- Mobile layout not broken (check at 375px and 768px)

---

## ANIMATION BUDGET REFERENCE

| Page | Scroll | Hover | Ambient |
|---|---|---|---|
| Home | 3 | 5 | 1 |
| Kemetopolis | 4 | 6 | 1 |
| Properties | 2 | 5 | 0 |
| Work | 2 | per-card | 0 |
| Music | 2 | buttons | 1 |
| About | 2 | tags | 1 |

Do not exceed these. If in doubt, cut the effect.
