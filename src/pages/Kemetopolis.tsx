import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { images, siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

/** Phase 2A Cosmic Kids canon. Portraits from R2 via siteImages. Grid row-major: Kofi → 8Bit → Soliloquy | Zamani → Anyanwu Ama → Mjenzi (3×2 on lg). */
const cosmicKids = [
  { name: 'Kofi', role: 'Protagonist / Griot & Narrator', img: siteImages.charKofi },
  { name: '8Bit', role: 'Data & Code Manipulation', img: siteImages.char8Bit },
  { name: 'Soliloquy', role: 'Story & Memory Arts', img: siteImages.charSoliloquy },
  { name: 'Zamani', role: 'Temporal Manipulation', img: siteImages.charZamani },
  { name: 'Anyanwu Ama', role: 'Solar Channeling', img: siteImages.charAnyanwuAma },
  { name: 'Mjenzi', role: 'Tech Construction', img: siteImages.charMjenzi },
];

const COSMIC_KIDS_8BIT_INDEX = cosmicKids.findIndex((c) => c.name === '8Bit');

const kemetopolisHeroOrbit = images.world.scene1226;
const kemetopolisHeroDetail = images.world.scene1020;

/* Placeholders: images.ts has no dedicated Calibrated / Drift Collective art — swap when faction renders exist. */
const factionImageDriftCollective = images.world.microScaleAction;
const factionImageCalibrated = images.world.microScaleLearning;

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
};

/** Ntru Arts hover text color (matches glow); 8Bit uses alternating red/green in render. */
const NTU_NAME_HOVER_COLOR: Record<string, string> = {
  Kofi: '#F5F0E8',
  Mjenzi: '#2DD4BF',
  Soliloquy: '#6366F1',
  Zamani: '#D4A574',
  'Anyanwu Ama': '#E07A5F',
};

export default function Kemetopolis() {
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

  /* Cap scale at 1.03 — larger zoom upscales raster and reads soft on retina viewports. */
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 10]);
  const bgBlurFilter = useTransform(bgBlur, (v) =>
    v > 0.02 ? `blur(${v.toFixed(2)}px)` : 'none',
  );

  const midOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);

  const fgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);
  /* Include scroll 0 → blur 0 so the layer is not stuck at 8px when progress is below 0.4. */
  const fgBlur = useTransform(scrollYProgress, [0, 0.4, 1], [0, 8, 0]);
  const fgBlurFilter = useTransform(fgBlur, (v) =>
    v > 0.02 ? `blur(${v.toFixed(2)}px)` : 'none',
  );

  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], ['0%', '-8%']);

  const factionsRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: factionsProgress } = useScroll({
    target: factionsRef,
    offset: ['start 0.7', 'end 0.3'],
  });
  const hustlersOpacity = useTransform(factionsProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const buildersOpacity = useTransform(factionsProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <motion.div
      data-page="kemetopolis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section ref={heroRef} className="relative h-[200vh] overflow-hidden">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ scale: bgScale, filter: bgBlurFilter, willChange: 'auto' }}
            className="absolute inset-0 origin-center"
          >
            <img
              src={kemetopolisHeroOrbit}
              className="h-full w-full object-cover"
              alt="Kemetopolis from orbit"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </motion.div>

          <motion.div
            style={{ opacity: midOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-900/40 to-amber-900/30"
          />

          <motion.div
            style={{ opacity: fgOpacity, filter: fgBlurFilter, willChange: 'auto' }}
            className="absolute inset-0"
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

          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8"
          >
            <h1 className="font-headline font-black text-6xl md:text-[80px] leading-none tracking-tighter text-on-surface uppercase mb-4 drop-shadow-[0_0_15px_rgba(87,241,219,0.4)]">
              KEMETOPOLIS
            </h1>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant tracking-widest uppercase">
              A City-Planet in the Atum-Ra System
            </p>
          </motion.div>
        </div>
      </section>

      <motion.section
        className="py-24 md:py-32 px-8 overflow-hidden bg-surface-container-lowest"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="font-headline font-bold text-4xl text-on-surface uppercase tracking-tight mb-2">The Cosmic Kids</h2>
          <div className="h-1 w-24 bg-primary-container" />
        </div>
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
                className="w-full min-w-0 group cursor-pointer"
              >
                <div className="relative h-[420px] sm:h-[460px] lg:h-[480px] w-full rounded-xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]">
                  <img
                    src={char.img}
                    alt={char.name}
                    className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
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
              <motion.img
                src={factionImageDriftCollective}
                style={{ opacity: hustlersOpacity }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="The Drift Collective"
              />
              <motion.img
                src={factionImageCalibrated}
                style={{ opacity: buildersOpacity }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="The Calibrated"
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
    </motion.div>
  );
}
