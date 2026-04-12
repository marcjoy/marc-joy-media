import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { images, siteImages } from '@/lib/images';
import { worldsHubCards, type WorldsHubCard, type WorldsHubImageKey } from '@/data/worldsHub';
import { WorldsMatrixBackground } from '@/components/worlds/WorldsMatrixBackground';
import {
  sectionReveal,
  staggerCardVariants,
  staggerContainerVariants,
  staggerViewport,
} from '@/lib/motion';

// ── Image sources ──────────────────────────────────────────────────────────
const IMAGE_MAP: Record<WorldsHubImageKey, string> = {
  kemetopolis: images.world.twoSunOrbital,   // cinematic aerial for the flagship hero
  neveronemonth: siteImages.propertyNeverOneMonth,
  scatteredThrones: siteImages.propertyScatteredThrones,
};

const PLACEHOLDER_GRADIENT: Record<string, string> = {
  violet: 'from-violet-950/60 via-[#111118] to-indigo-950/40',
  amber:  'from-amber-950/40 via-[#111118] to-orange-950/30',
  slate:  'from-slate-900/70 via-[#111118] to-zinc-900/50',
};

// ── Kemetopolis stat strip ─────────────────────────────────────────────────
const FLAGSHIP_STATS = [
  { value: '21',      label: 'Regions'  },
  { value: '744 BCE', label: 'Founded'  },
  { value: '2',       label: 'Suns'     },
  { value: 'Atum-Ra', label: 'System'   },
] as const;

// ── Sub-components ─────────────────────────────────────────────────────────

function TierDivider({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.4em] text-primary/50">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  );
}

function ExploreLink({ to, label = 'Explore' }: { to: string; label?: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
    >
      {label} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function Worlds() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Separate cards by tier
  const flagship    = worldsHubCards.find((c) => c.tier === 'flagship');
  const active      = worldsHubCards.filter((c) => c.tier === 'active');
  const development = worldsHubCards.filter((c) => c.tier === 'development');

  // 3-D tilt handlers (flagship card only)
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -7, rotateY: x * 7 });
  };
  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  const imgSrc = (card: WorldsHubCard): string | null =>
    card.variant === 'image' ? IMAGE_MAP[card.imageKey] : null;

  return (
    <motion.div
      data-page="worlds"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="worlds-matrix-root relative pb-40"
    >
      <WorldsMatrixBackground />

      <div className="relative z-[1] px-[clamp(1rem,5vw,2rem)] pt-48 md:px-24">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <motion.section
          className="mx-auto mb-28 max-w-7xl"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <h1 className="mb-6 font-headline text-[clamp(2.75rem,12vw+0.25rem,5rem)] font-black leading-none tracking-tighter text-on-surface md:text-[80px]">
            THE WORLDS
          </h1>
          <p className="max-w-xl font-body text-lg leading-relaxed text-on-surface-variant md:text-xl">
            Owned universes. Each one a frequency.
          </p>
        </motion.section>

        {/* ── FLAGSHIP ────────────────────────────────────────────────────── */}
        {flagship && (
          <motion.section
            className="mx-auto mb-28 max-w-7xl"
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={sectionReveal.transition}
          >
            <TierDivider label="Flagship World" />

            <motion.div
              className="relative min-h-[72vh] cursor-pointer overflow-hidden rounded-xl border border-white/5"
              style={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
                boxShadow: '0 0 80px rgba(45,212,191,0.10)',
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background image */}
              {imgSrc(flagship) && (
                <img
                  src={imgSrc(flagship)!}
                  alt={flagship.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              )}

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/70 via-[#0a0a0f]/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-14">

                {/* Top: tag badge */}
                <div>
                  <span className="inline-block border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary backdrop-blur-sm">
                    {flagship.tag.toUpperCase()} — FLAGSHIP
                  </span>
                </div>

                {/* Bottom: title + description + stats + CTA */}
                <div>
                  <h2 className="mb-4 font-headline text-[clamp(3rem,10vw,6.5rem)] font-black uppercase leading-none tracking-tighter text-on-surface">
                    {flagship.title}
                  </h2>
                  <p className="mb-10 max-w-lg text-base leading-relaxed text-on-surface-variant md:text-lg">
                    {flagship.description}
                  </p>

                  {/* Stats strip */}
                  <div className="mb-10 flex flex-wrap gap-x-10 gap-y-4">
                    {FLAGSHIP_STATS.map((s) => (
                      <div key={s.label}>
                        <p className="font-headline text-2xl font-black text-primary md:text-3xl">
                          {s.value}
                        </p>
                        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.28em] text-on-surface-variant/50">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={flagship.to}
                    className="inline-flex items-center gap-3 border border-primary/40 bg-primary/10 px-7 py-3 font-headline text-sm font-bold uppercase tracking-widest text-primary backdrop-blur-sm transition-all hover:bg-primary/20 hover:gap-5"
                  >
                    Explore the Universe <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* ── ACTIVE WORLDS ───────────────────────────────────────────────── */}
        {active.length > 0 && (
          <motion.section
            className="mx-auto mb-28 max-w-7xl"
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={sectionReveal.transition}
          >
            <TierDivider label="Active Worlds" />

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={staggerViewport}
            >
              {active.map((card) => {
                const img = imgSrc(card);
                const accent = card.variant === 'placeholder' ? card.accent : null;

                return (
                  <motion.div
                    key={card.id}
                    variants={staggerCardVariants}
                    className="group relative min-h-[52vh] overflow-hidden rounded-xl border border-white/5 bg-[#141420]"
                  >
                    {img && (
                      <img
                        src={img}
                        alt={card.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    )}
                    {accent && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${PLACEHOLDER_GRADIENT[accent]}`}
                      />
                    )}
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/40 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                          {card.tag.toUpperCase()}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-400/70">
                          ● Active
                        </span>
                      </div>
                      <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface md:text-3xl">
                        {card.title}
                      </h3>
                      <p className="mb-6 max-w-md text-sm leading-relaxed text-on-surface-variant">
                        {card.description}
                      </p>
                      <ExploreLink to={card.to} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>
        )}

        {/* ── IN DEVELOPMENT ──────────────────────────────────────────────── */}
        {development.length > 0 && (
          <motion.section
            className="mx-auto max-w-7xl"
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={sectionReveal.transition}
          >
            <TierDivider label="In Development" />

            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={staggerViewport}
            >
              {development.map((card) => {
                const accent = card.variant === 'placeholder' ? card.accent : null;

                return (
                  <motion.div
                    key={card.id}
                    variants={staggerCardVariants}
                    className="group relative min-h-[32vh] overflow-hidden rounded-xl border border-white/[0.04] bg-[#0e0e18] opacity-70 transition-opacity duration-300 hover:opacity-100"
                  >
                    {accent && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${PLACEHOLDER_GRADIENT[accent]} opacity-50`}
                      />
                    )}

                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Top: tags */}
                      <div className="flex items-center justify-between">
                        <span className="border border-white/8 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40">
                          {card.tag.toUpperCase()}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber-400/50">
                          In Development
                        </span>
                      </div>

                      {/* Bottom: title + description */}
                      <div>
                        <h3 className="mb-2 font-headline text-xl font-bold text-on-surface/80">
                          {card.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-on-surface-variant/55">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>
        )}

      </div>
    </motion.div>
  );
}
