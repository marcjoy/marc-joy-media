/**
 * KemetopolisWorldFeature.tsx
 * All inner Kemetopolis content sections extracted into a shared component.
 * Used by:
 *   - pages/Kemetopolis.tsx (standalone page, wrapped with starfield + page motion)
 *   - pages/Worlds.tsx (featured world section, embedded below the card grid)
 */

import { Fragment, useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'motion/react';
import { useScroll, useTransform, motion } from 'motion/react';
import { KemetopolisCharacterNavLink } from '@/components/KemetopolisCharacterNavLink';
import { CosmicKidsSphereExplorer } from '@/components/CosmicKidsSphereExplorer';
import type { ImageData } from '@/components/ui/img-sphere';
import NtruArtsSelector from '@/components/NtruArtsSelector';
import type { KemetopolisSlug } from '@/data/kemetopolisCharacterDetails';
import { kemetopolisCharacterBySlug } from '@/data/kemetopolisCharacterDetails';
import { images, siteImages } from '@/lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '@/lib/motion';

const VINE_HEIGHTS_PX = [120, 180, 90, 150, 110] as const;

const DESCENT_SPORES = [
  { top: '15%', left: '20%', delay: 0, yEnd: -40 },
  { top: '35%', left: '75%', delay: 0.4, yEnd: -80 },
  { top: '55%', left: '40%', delay: 0.8, yEnd: -120 },
  { top: '70%', left: '85%', delay: 1.2, yEnd: -40 },
  { top: '25%', left: '55%', delay: 1.6, yEnd: -80 },
  { top: '80%', left: '15%', delay: 2.0, yEnd: -120 },
  { top: '45%', left: '65%', delay: 2.4, yEnd: -40 },
  { top: '60%', left: '30%', delay: 2.8, yEnd: -80 },
] as const;

const LIVING_CITY_PILLS = [
  'NILE RUN — Water District',
  'CONGO DEEP — Forest District',
  'BANTU SOUTH — Agricultural Backbone',
  'GREAT RIFT — Geological Edge',
] as const;

function DescentSpore({
  scrollProgress,
  top,
  left,
  delayS,
  yEndPx,
}: {
  scrollProgress: MotionValue<number>;
  top: string;
  left: string;
  delayS: number;
  yEndPx: number;
}) {
  const y = useTransform(scrollProgress, [0, 1], [0, yEndPx]);
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ top, left, y }}
    >
      <span
        className="kemetopolis-spore-pulse block h-1.5 w-1.5 rounded-full bg-teal-400/30"
        style={{
          boxShadow: '0 0 6px rgba(20,184,166,0.4)',
          animationDelay: `${delayS}s`,
        }}
      />
    </motion.div>
  );
}

const cosmicKids = [
  { name: 'Kofi', slug: 'kofi', role: 'Protagonist / Griot & Narrator', img: siteImages.charKofi },
  { name: '8Bit', slug: '8bit', role: 'Data & Code Manipulation', img: siteImages.char8Bit },
  { name: 'Soliloquy', slug: 'soliloquy', role: 'Story & Memory Arts', img: siteImages.charSoliloquy },
  { name: 'Zamani', slug: 'zamani', role: 'Temporal Manipulation', img: siteImages.charZamani },
  { name: 'Anyanwu Ama', slug: 'anyanwu-ama', role: 'Solar Channeling', img: siteImages.charAnyanwuAma },
  { name: 'Mjenzi', slug: 'mjenzi', role: 'Tech Construction', img: siteImages.charMjenzi },
  { name: 'Nana Oshi', slug: 'nana-oshi', role: 'The Archive — Keeper of What Survived', img: siteImages.charNanaOshi },
];

const COSMIC_KIDS_8BIT_INDEX = cosmicKids.findIndex((c) => c.name === '8Bit');

const COSMIC_KIDS_SPHERE_IMAGES: ImageData[] = (() => {
  const out: ImageData[] = [];
  const repeats = 6;
  for (let r = 0; r < repeats; r++) {
    for (const c of cosmicKids) {
      const slug = c.slug as KemetopolisSlug;
      const detail = kemetopolisCharacterBySlug[slug];
      out.push({
        id: `${c.slug}-sphere-${r}`,
        src: c.img,
        alt: `${c.name} — Cosmic Kid portrait`,
        title: detail.name,
        description: detail.ability,
        lore: [...detail.lore],
        adinkra: detail.adinkra,
        profileTo: `/kemetopolis/${c.slug}`,
      });
    }
  }
  return out;
})();

const kemetopolisHeroDetail = images.world.scene1020;

const cardVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    x: index % 2 === 1 ? -60 : 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: (index % 3) * 0.1,
    },
  },
});

const NTU_NAME_GLOW: Record<string, string> = {
  Kofi: '#F5F0E8',
  Mjenzi: '#2DD4BF',
  '8Bit': '#EF4444',
  Soliloquy: '#6366F1',
  Zamani: '#D4A574',
  'Anyanwu Ama': '#E07A5F',
  'Nana Oshi': '#FB7185',
};

const NTU_NAME_HOVER_COLOR: Record<string, string> = {
  Kofi: '#F5F0E8',
  Mjenzi: '#2DD4BF',
  Soliloquy: '#6366F1',
  Zamani: '#D4A574',
  'Anyanwu Ama': '#E07A5F',
  'Nana Oshi': '#FB7185',
};

export default function KemetopolisWorldFeature() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [eightBitGlowGreen, setEightBitGlowGreen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (hoveredCard !== COSMIC_KIDS_8BIT_INDEX) {
      setEightBitGlowGreen(false);
      return;
    }
    const id = window.setInterval(() => setEightBitGlowGreen((g) => !g), 600);
    return () => window.clearInterval(id);
  }, [hoveredCard]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 10]);
  const bgBlurFilter = useTransform(bgBlur, (v) =>
    v > 0.02 ? `blur(${v.toFixed(2)}px)` : 'none',
  );

  const midOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);

  const fgOpacity = useTransform(scrollYProgress, [0, 0.14, 0.4, 1], [0, 0, 1, 1]);
  const fgBlur = useTransform(scrollYProgress, [0, 0.12, 0.35, 0.52, 1], [0, 6, 8, 0, 0]);
  const fgBlurFilter = useTransform(fgBlur, (v) =>
    v > 0.02 ? `blur(${v.toFixed(2)}px)` : 'none',
  );

  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], ['0%', '-4%']);

  const natureRootsY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const natureVinesY = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const natureVinesScaleY = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const livingCityRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: livingCityProgress } = useScroll({
    target: livingCityRef,
    offset: ['start start', 'end end'],
  });
  const livingCityBgScale = useTransform(livingCityProgress, [0, 1], [1.05, 1]);
  const livingCityWaterOpacity = useTransform(livingCityProgress, [0, 0.5, 1], [0, 0.5, 0]);

  const factionsRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: factionsProgress } = useScroll({
    target: factionsRef,
    offset: ['start 0.7', 'end 0.3'],
  });
  const hustlersOpacity = useTransform(factionsProgress, [0, 0.45, 0.55, 1], [1, 1, 0, 0]);
  const buildersOpacity = useTransform(factionsProgress, [0, 0.45, 0.55, 1], [0, 0, 1, 1]);

  return (
    <div className="relative z-10">
      <section ref={heroRef} className="relative h-[155vh] overflow-hidden">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ scale: bgScale, filter: bgBlurFilter, willChange: 'auto' }}
            className="absolute inset-0 origin-center"
          >
            <video
              className="h-full w-full object-cover"
              src={images.heroVideo.videoLatest}
              poster={images.world.twoSunOrbital}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-label="Kemetopolis city-planet skyline — Afrofuturist towers and terraces"
            />
          </motion.div>

          <motion.div
            style={{ opacity: midOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-900/40 to-amber-900/30"
          />

          <motion.div
            style={{ opacity: fgOpacity, filter: fgBlurFilter, willChange: 'auto' }}
            className="absolute inset-0 z-[1]"
          >
            <img
              src={kemetopolisHeroDetail}
              className="h-full w-full object-cover"
              alt="Kemetopolis city detail"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 z-[5]">
            <motion.div
              style={{ y: natureRootsY }}
              className="absolute bottom-0 left-0 h-64 w-64 md:h-96 md:w-96"
            >
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path
                  d="M100 200 C100 150, 60 120, 40 80 M100 200 C100 140, 140 110, 160 60 M100 200 C100 160, 80 130, 50 110 M100 200 C100 155, 120 125, 150 100 M40 80 C30 60, 20 50, 10 30 M160 60 C170 40, 185 25, 195 10"
                  stroke="rgba(16,185,129,0.15)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            <motion.div
              style={{ y: natureVinesY, scaleY: natureVinesScaleY }}
              className="absolute right-8 top-0 flex origin-top gap-2 md:right-16"
            >
              {VINE_HEIGHTS_PX.map((h) => (
                <div key={h} className="flex flex-col items-center">
                  <div
                    className="w-px bg-gradient-to-b from-emerald-400/20 to-transparent"
                    style={{ height: h }}
                  />
                  <div className="h-2 w-2 shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/15" />
                </div>
              ))}
            </motion.div>
            {DESCENT_SPORES.map((s) => (
              <Fragment key={`${s.top}-${s.left}`}>
                <DescentSpore
                  scrollProgress={scrollYProgress}
                  top={s.top}
                  left={s.left}
                  delayS={s.delay}
                  yEndPx={s.yEnd}
                />
              </Fragment>
            ))}
          </div>

          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="relative z-10 flex h-full w-full min-w-0 flex-col items-center justify-center px-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-[max(5.75rem,env(safe-area-inset-top,0px)+4.5rem)] text-center sm:px-6 sm:pb-8 sm:pt-[max(5.5rem,env(safe-area-inset-top,0px)+4rem)] md:px-10 md:pt-8"
          >
            <div className="w-full min-w-0 max-w-full sm:max-w-4xl">
              <h1 className="mb-3 whitespace-nowrap break-normal px-0.5 font-body text-[clamp(1.2rem,min(4.25vw+0.95rem,1.9rem),1.9rem)] font-black uppercase leading-[1.12] tracking-[0.05em] text-on-surface drop-shadow-[0_0_15px_rgba(87,241,219,0.4)] sm:text-[clamp(1.3rem,min(4.75vw+1rem,2.1rem),2.1rem)] sm:tracking-[0.06em] md:mb-4 md:font-headline md:text-[clamp(2rem,min(8.5vw+0.35rem,5rem),5rem)] md:leading-[1.02] md:tracking-tighter lg:text-[80px]">
                KEMETOPOLIS
              </h1>
              <p className="mx-auto max-w-full text-balance font-body text-sm uppercase leading-snug tracking-[0.14em] text-on-surface-variant sm:max-w-2xl sm:text-lg sm:tracking-[0.22em] md:text-2xl md:tracking-[0.28em] lg:tracking-widest">
                A City-Planet in the Atum-Ra System
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={livingCityRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0f]">
          <motion.div
            style={{ scale: livingCityBgScale }}
            className="absolute inset-0 origin-center"
          >
            <img
              src={images.world.ntruEarth}
              alt="Kemetopolis vertical cultivation and earthworks"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              loading="lazy"
            />
          </motion.div>
          <motion.img
            src={images.world.ntruWater}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ mixBlendMode: 'multiply', opacity: livingCityWaterOpacity }}
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #0a0a0f 0%, transparent 20%, transparent 80%, #0a0a0f 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
            <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.5em] text-emerald-400/60">
              THE LIVING CITY
            </p>
            <div className="flex flex-wrap justify-center gap-16 md:gap-24">
              {(
                [
                  { n: '21', label: 'REGIONS', color: 'text-emerald-400' },
                  { n: '744', label: 'BCE FOUNDED', color: 'text-teal-400' },
                  { n: '2', label: 'SUNS', color: 'text-orange-400' },
                ] as const
              ).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.15,
                  }}
                  className="text-center"
                >
                  <p className={`font-headline text-4xl font-black md:text-6xl ${stat.color}`}>{stat.n}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-16 max-w-xl font-serif text-base italic text-white/50 md:text-lg">
              Where the stone remembers the seed.
            </p>
            <div className="mt-24 flex flex-wrap justify-center gap-3">
              {LIVING_CITY_PILLS.map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.08,
                  }}
                  className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/40"
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section
        className="py-20 md:py-28 overflow-hidden bg-surface-container-lowest"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="max-w-7xl mx-auto px-8 mb-10">
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-on-surface uppercase tracking-tight mb-2">
            The Ntru Arts
          </h2>
          <div className="h-1 w-24 bg-primary-container" />
        </div>
        <div className="w-full px-4 md:px-8">
          <NtruArtsSelector />
        </div>
        <div className="relative mt-10 h-24 w-full overflow-hidden md:mt-14">
          <svg
            className="h-[96px] w-full"
            viewBox="0 0 1920 96"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M0,48 C200,20 400,76 600,48 S1000,20 1200,48 S1600,76 1920,48"
              fill="none"
              stroke="rgba(16,185,129,0.12)"
              strokeWidth={1}
            />
          </svg>
        </div>
      </motion.section>

      <motion.section
        className="py-24 md:py-32 px-8 overflow-hidden bg-surface"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="font-headline font-bold text-4xl text-on-surface uppercase tracking-tight mb-2">The Cosmic Kids</h2>
          <div className="h-1 w-24 bg-primary-container" />
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.45em] text-teal-400/70">
            SHETAU HALL
          </p>
          <div className="relative mx-auto mb-8 mt-6 h-16 w-16 rounded-full border border-teal-400/20">
            {[0, 45, 90, 135].map((deg) => (
              <div
                key={deg}
                className="absolute left-1/2 w-px bg-teal-400/15"
                style={{
                  top: '50%',
                  height: 24,
                  marginTop: -24,
                  transformOrigin: '50% 100%',
                  transform: `translateX(-50%) rotate(${deg}deg)`,
                }}
              />
            ))}
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/20" />
          </div>
          <p className="mx-auto max-w-2xl text-center text-on-surface-variant text-sm leading-relaxed md:text-base">
            The archive holds what the city chose to keep: names, faces, and the quiet proof that Kemetopolis remembers its own.
          </p>
        </div>
        <p className="mx-auto mb-2 max-w-2xl px-4 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-on-surface-variant/80">
          Drag the sphere — tap a portrait to read more
        </p>
        <CosmicKidsSphereExplorer images={COSMIC_KIDS_SPHERE_IMAGES} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12">
          {cosmicKids.map((char, index) => {
            const isHovered = hoveredCard === index;
            const glowBase =
              char.name === '8Bit' && isHovered
                ? eightBitGlowGreen
                  ? '#22C55E'
                  : '#EF4444'
                : NTU_NAME_GLOW[char.name];
            const nameShadow =
              isHovered && glowBase
                ? `0 0 20px ${glowBase}, 0 0 40px ${glowBase}40`
                : 'none';

            const nameHoverColor =
              isHovered && char.name === '8Bit'
                ? eightBitGlowGreen
                  ? '#22C55E'
                  : '#EF4444'
                : isHovered
                  ? NTU_NAME_HOVER_COLOR[char.name]
                  : undefined;

            return (
              <motion.div
                key={char.name}
                variants={cardVariants(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`w-full min-w-0 group ${index === cosmicKids.length - 1 ? 'lg:col-start-2' : ''}`}
              >
                <KemetopolisCharacterNavLink
                  slug={char.slug}
                  className="block w-full cursor-pointer no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
                >
                  <div className="relative h-[clamp(22rem,72vw,30rem)] w-full overflow-hidden rounded-xl border border-white/5 bg-black transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)] group-hover:brightness-[1.03] sm:h-[clamp(24rem,68vw,30rem)] lg:h-[30rem]">
                    <img
                      src={char.img}
                      alt={char.name}
                      className="h-full w-full object-contain object-top grayscale transition-all duration-500 group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6">
                      <h3
                        className="mb-1 font-headline text-2xl font-bold text-on-surface transition-all duration-300"
                        style={{
                          textShadow: nameShadow,
                          ...(nameHoverColor ? { color: nameHoverColor } : {}),
                        }}
                      >
                        {char.name}
                      </h3>
                      <p className="text-on-surface-variant font-medium tracking-wide">{char.role}</p>
                    </div>
                  </div>
                </KemetopolisCharacterNavLink>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        ref={factionsRef}
        className="py-24 md:py-48 px-8 bg-surface"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          <motion.div variants={staggerCardVariants} className="relative">
            <div className="relative h-[60vh] overflow-hidden rounded-xl border border-white/5">
              <img
                src={images.world.buildHustle}
                className="absolute inset-0 h-full w-full object-cover object-center"
                alt="Kemetopolis — Calibrated builders and Drift Collective at work"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-transparent pointer-events-none z-[1]" />
              <div className="absolute inset-0 flex items-end p-8 z-10 pointer-events-none">
                <div className="relative w-full min-h-[12rem] md:min-h-[11rem]">
                  <motion.div style={{ opacity: hustlersOpacity }} className="absolute inset-x-0 bottom-0">
                    <h4 className="font-headline font-bold text-on-surface text-xl mb-2">The Drift Collective (Hustlers)</h4>
                    <p className="text-sm text-on-surface-variant">
                      The Hustlers navigate the market sectors and transit corridors, trading information, goods, and influence. They value adaptability, independence, and personal code over institutional law.
                    </p>
                  </motion.div>
                  <motion.div style={{ opacity: buildersOpacity }} className="absolute inset-x-0 bottom-0">
                    <h4 className="font-headline font-bold text-on-surface text-xl mb-2">The Calibrated (Builders)</h4>
                    <p className="text-sm">
                      The Builders architect the physical and civic reality of Kemetopolis using precision engineering rooted in ancient geometric principles. They value order, legacy, and collective infrastructure.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border-r-2 border-b-2 border-primary/40 rounded-br-3xl pointer-events-none" />
          </motion.div>
          <motion.div variants={staggerCardVariants} className="space-y-8">
            <h2 className="font-headline font-bold text-5xl md:text-6xl text-on-surface tracking-tighter uppercase">The World</h2>
            <div className="w-16 h-1 bg-primary-container" />
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed font-light">
              <p>Kemetopolis is more than a planet; it is a sentient ecosystem thriving under the dual suns of Atum-Ra. Here, technology is not just silicon and code. It is an extension of the soul.</p>
              <motion.div
                className="grid grid-cols-1 gap-8 mt-12"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={staggerViewport}
              >
                <motion.div variants={staggerCardVariants} className="p-6 bg-surface-container rounded-lg border-l-4 border-primary">
                  <h4 className="font-headline font-bold text-on-surface text-xl mb-2">The Calibrated (Builders)</h4>
                  <p className="text-sm">The Builders architect the physical and civic reality of Kemetopolis using precision engineering rooted in ancient geometric principles. They value order, legacy, and collective infrastructure.</p>
                </motion.div>
                <motion.div variants={staggerCardVariants} className="p-6 bg-surface-container rounded-lg border-l-4 border-secondary">
                  <h4 className="font-headline font-bold text-on-surface text-xl mb-2">The Drift Collective (Hustlers)</h4>
                  <p className="text-sm">The Hustlers navigate the market sectors and transit corridors, trading information, goods, and influence. They value adaptability, independence, and personal code over institutional law.</p>
                </motion.div>
                <motion.div variants={staggerCardVariants} className="p-6 bg-surface-container rounded-lg border-l-4 border-secondary">
                  <h4 className="font-headline font-bold text-on-surface text-xl mb-2">The Ntru Arts</h4>
                  <p className="text-sm">Elemental mysticism tuned through breath, rhythm, memory, and intent. Core elements linked to African gods and ancestors: Flame of Sekhmet, Tears of Oshun, Breath of Shu, Bones of Geb, Spear of Shango.</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <style>{`
        @keyframes kemetopolisSporePulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }
        .kemetopolis-spore-pulse {
          animation: kemetopolisSporePulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
