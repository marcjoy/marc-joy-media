import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { R2 } from '../lib/images';

gsap.registerPlugin(ScrollToPlugin);

const TOTAL_FRAMES = 148;
const ZOOM_FACTOR = 1.0;
const SCROLL_HEIGHT_VH = 500;
/** Scroll starts at the last frame — load it first so the hero can appear immediately. */
const INITIAL_FRAME_INDEX = TOTAL_FRAMES - 1;
/** After this many ms, drop the blocking overlay so the rest of the site is usable. */
const HERO_READY_FALLBACK_MS = 3500;
/** How many frame URLs to start per animation frame (after the first frame). */
const LOAD_BATCH_SIZE = 12;

const FRAME_URL = (n: number): string => {
  return `${R2}/hero/main-page-hero-scroll/hero-frame%20${n}.webp`;
};

interface OverlaySection {
  scrollFraction: number;
  title: string;
  body: string;
}

const OVERLAY_SECTIONS: OverlaySection[] = [
  {
    scrollFraction: 0.05,
    title: 'We Dream in Public',
    body: 'Afrofuturist worlds built frame by frame.',
  },
  {
    scrollFraction: 0.35,
    title: 'The Archive Lives',
    body: 'Kemetopolis — city-planet. 744 BCE. Still breathing.',
  },
  {
    scrollFraction: 0.68,
    title: 'Marc Joy Media',
    body: 'Multimedia studio. Seattle. Evenings and weekends.',
  },
];

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Scroll progress 0–1 while the viewport moves through this section’s scroll range. */
function scrollFractionInSection(container: HTMLDivElement): number {
  const rect = container.getBoundingClientRect();
  const elementTop = window.scrollY + rect.top;
  const range = container.offsetHeight - window.innerHeight;
  if (range <= 0) return 0;
  return clamp((window.scrollY - elementTop) / range, 0, 1);
}

export default function CinematicScrollytelling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef(0);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const canvasGsapTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [allFramesFailed, setAllFramesFailed] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  /** True once the first visible frame is ready — removes full-screen blocker; rest load in background. */
  const [heroReady, setHeroReady] = useState(false);
  /** All frames attempted (load or error). */
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<OverlaySection | null>(null);
  const [devFrameDisplay, setDevFrameDisplay] = useState(1);
  const lastDevFrameRef = useRef(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const img = framesRef.current[index];
    if (!img?.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih) * ZOOM_FACTOR;
    const drawW = iw * scale;
    const drawH = ih * scale;
    const dx = (cw - drawW) / 2;
    const dy = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let settled = 0;
    let failed = 0;
    let batchRaf = 0;

    const bump = () => {
      settled++;
      setLoadProgress(Math.round((settled / TOTAL_FRAMES) * 100));
      if (settled === TOTAL_FRAMES) {
        setFullyLoaded(true);
        if (failed === TOTAL_FRAMES) {
          setAllFramesFailed(true);
        }
      }
    };

    const assignSrc = (zeroBasedIndex: number) => {
      const img = images[zeroBasedIndex];
      if (!img || img.src) return;
      img.src = FRAME_URL(zeroBasedIndex + 1);
    };

    for (let idx = 0; idx < TOTAL_FRAMES; idx++) {
      const img = new Image();
      img.decoding = 'async';
      if (idx === INITIAL_FRAME_INDEX) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = 'high';
      }
      img.onload = bump;
      img.onerror = () => {
        failed++;
        bump();
      };
      images[idx] = img;
    }

    framesRef.current = images;

    // 1) First paint: only the frame visible at scroll top (sequence end).
    const heroImg = images[INITIAL_FRAME_INDEX];
    heroImg.addEventListener('load', () => setHeroReady(true), { once: true });
    heroImg.addEventListener('error', () => setHeroReady(true), { once: true });
    assignSrc(INITIAL_FRAME_INDEX);

    // 2) Then high indices (early scroll), then the rest — batched to avoid 148 parallel requests.
    const loadOrder: number[] = [];
    for (let i = INITIAL_FRAME_INDEX - 1; i >= 0; i--) loadOrder.push(i);
    for (let i = INITIAL_FRAME_INDEX + 1; i < TOTAL_FRAMES; i++) loadOrder.push(i);

    let cursor = 0;
    let pumpCancelled = false;
    const pump = () => {
      if (pumpCancelled) return;
      const end = Math.min(cursor + LOAD_BATCH_SIZE, loadOrder.length);
      for (; cursor < end; cursor++) {
        assignSrc(loadOrder[cursor]);
      }
      if (cursor < loadOrder.length) {
        batchRaf = requestAnimationFrame(pump);
      }
    };
    batchRaf = requestAnimationFrame(pump);

    const fallback = window.setTimeout(() => {
      setHeroReady(true);
    }, HERO_READY_FALLBACK_MS);

    return () => {
      pumpCancelled = true;
      cancelAnimationFrame(batchRaf);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!heroReady) return;
    handleResize();
    const container = containerRef.current;
    if (container) {
      const fraction = scrollFractionInSection(container);
      const idx = Math.floor((1 - fraction) * (TOTAL_FRAMES - 1));
      currentFrameRef.current = idx;
      targetFrameRef.current = idx;
      drawFrame(idx);
    } else {
      drawFrame(0);
    }
  }, [heroReady, handleResize, drawFrame]);

  useEffect(() => {
    if (!heroReady) return;

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const fraction = scrollFractionInSection(container);
      targetFrameRef.current = Math.floor((1 - fraction) * (TOTAL_FRAMES - 1));

      const active =
        [...OVERLAY_SECTIONS].reverse().find((s) => fraction >= s.scrollFraction) ?? null;
      setActiveSection(active);
    };

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(canvasGsapTargetRef.current, {
        x: -nx * 18,
        y: -ny * 12,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          if (canvasRef.current) {
            gsap.set(canvasRef.current, {
              x: canvasGsapTargetRef.current.x,
              y: canvasGsapTargetRef.current.y,
            });
          }
        },
      });
    };

    const tick = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const next = Math.round(lerp(current, target, 0.15));

      if (next !== current) {
        currentFrameRef.current = next;
        drawFrame(next);
      }

      if (import.meta.env.DEV) {
        const shown = currentFrameRef.current + 1;
        if (shown !== lastDevFrameRef.current) {
          lastDevFrameRef.current = shown;
          setDevFrameDisplay(shown);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', handleResize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [heroReady, drawFrame, handleResize]);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1.4, ease: 'power3.inOut' });
  };

  if (allFramesFailed) return null;

  return (
    <div
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      {!heroReady && (
        <div
          className="fixed inset-0 z-[10060] flex flex-col items-center justify-center bg-black"
          aria-live="polite"
          aria-label="Loading cinematic sequence"
        >
          <p
            className="mb-10 text-xs tracking-[0.35em] uppercase"
            style={{ color: '#5eead4', fontFamily: 'monospace' }}
          >
            Marc Joy Media
          </p>

          <div className="relative w-64 h-px bg-neutral-800 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 transition-all duration-75"
              style={{
                width: `${loadProgress}%`,
                background: 'linear-gradient(90deg, #0d9488, #f97316)',
              }}
            />
          </div>

          <p
            className="mt-5 text-4xl font-bold tabular-nums"
            style={{
              color: '#f1f5f9',
              fontFamily: '"Courier New", monospace',
              letterSpacing: '-0.03em',
            }}
          >
            {loadProgress}
            <span className="text-xl" style={{ color: '#5eead4' }}>
              %
            </span>
          </p>

          <p
            className="mt-3 text-xs tracking-widest uppercase"
            style={{ color: '#334155', fontFamily: 'monospace' }}
          >
            Loading first frame…
          </p>
        </div>
      )}

      {/* Canvas must stay `absolute` inside sticky — `fixed` would cover the whole document through footer */}
      <div className="sticky top-0 z-0 relative h-screen w-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            transform: 'scale(1.05)',
            transformOrigin: 'center',
            willChange: 'transform',
          }}
        />

        {heroReady && activeSection && (
          <div
            key={activeSection.title}
            className="absolute bottom-[max(4rem,env(safe-area-inset-bottom,0px))] left-[max(2.5rem,env(safe-area-inset-left,0px))] right-[max(1.25rem,env(safe-area-inset-right,0px))] z-20 max-w-sm md:bottom-16 md:left-16 md:right-auto"
            style={{ animation: 'fadeUp 0.6s ease forwards' }}
          >
            <p
              className="text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: '#f97316', fontFamily: 'monospace' }}
            >
              {activeSection.title}
            </p>
            <p
              className="text-2xl md:text-3xl font-bold leading-tight"
              style={{
                color: '#f1f5f9',
                fontFamily: '"Georgia", serif',
                textShadow: '0 2px 24px rgba(0,0,0,0.8)',
              }}
            >
              {activeSection.body}
            </p>
          </div>
        )}

        {heroReady && (
          <button
            type="button"
            onClick={scrollToTop}
            className="absolute bottom-[max(2rem,env(safe-area-inset-bottom,0px))] right-[max(2rem,env(safe-area-inset-right,0px))] z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
            style={{
              borderColor: 'rgba(94,234,212,0.4)',
              background: 'rgba(0,0,0,0.5)',
              color: '#5eead4',
              backdropFilter: 'blur(8px)',
            }}
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}

        {heroReady && import.meta.env.DEV && (
          <p
            className="absolute top-4 right-4 z-20 text-xs tabular-nums"
            style={{ color: 'rgba(94,234,212,0.5)', fontFamily: 'monospace' }}
          >
            f:{devFrameDisplay}/{TOTAL_FRAMES}
          </p>
        )}

        {heroReady && !fullyLoaded && (
          <div
            className="pointer-events-none absolute bottom-20 left-1/2 z-30 max-w-[90vw] -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-center text-[10px] uppercase tracking-widest text-white/50 backdrop-blur-sm md:bottom-24"
            aria-hidden
          >
            Buffering frames {loadProgress}%
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
