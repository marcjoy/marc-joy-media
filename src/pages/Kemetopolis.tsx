import { motion } from 'motion/react';
import { siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

/** Phase 2A Cosmic Kids canon. Portraits from R2 via siteImages. */
const cosmicKids = [
  { name: 'Kofi', role: 'The Wanderer / Crypto-Linguist', img: siteImages.charKofi },
  { name: 'Mjenzi', role: 'Engineer / Bones of Geb (unconscious)', img: siteImages.charMjenzi },
  { name: '8Bit', role: 'Data Runner / Eye of Ma\'at (latent)', img: siteImages.char8Bit },
  { name: 'Soliloquy', role: 'Voice Mystic / Veil of Anansi', img: siteImages.charSoliloquy },
  { name: 'Zamani', role: 'Time Walker / Crown of Nyame', img: siteImages.charZamani },
  { name: 'Anyanwu Ama', role: 'Sun Keeper / Flame of Sekhmet', img: siteImages.charAnyanwuAma },
];

export default function Kemetopolis() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={siteImages.heroBackground}
            alt="Kemetopolis Hero"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-headline font-black text-6xl md:text-[80px] leading-none tracking-tighter text-on-surface uppercase mb-4 drop-shadow-[0_0_15px_rgba(87,241,219,0.4)]">
            KEMETOPOLIS
          </h1>
          <p className="font-body text-xl md:text-2xl text-on-surface-variant tracking-widest uppercase">
            A City-Planet in the Atum-Ra System
          </p>
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
        <motion.div
          className="flex gap-6 overflow-x-auto no-scrollbar pb-12 px-4 md:px-0"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          {cosmicKids.map((char) => (
            <motion.div key={char.name} variants={staggerCardVariants} className="flex-none w-72 md:w-80 group cursor-pointer">
              <div className="relative h-[480px] rounded-xl overflow-hidden mb-6 border border-white/5 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]">
                <img src={char.img} alt={char.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-headline font-bold text-2xl text-on-surface mb-1">{char.name}</h3>
                  <p className="text-on-surface-variant font-medium tracking-wide">{char.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
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
            <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/5">
              <img src={siteImages.worldImage} alt="World" className="h-full w-full object-cover opacity-80" />
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
