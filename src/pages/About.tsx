import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
    >
      <motion.section
        className="lg:col-span-5 relative group"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-surface-container border border-white/5">
          <img src={siteImages.aboutPortrait} alt="MarcJoy" className="h-full w-full object-cover" />
        </div>
        <div className="mt-12 space-y-2">
          <h1 className="text-[80px] leading-[0.9] font-black font-headline tracking-tighter text-on-surface uppercase italic">MarcJoy</h1>
          <p className="text-xl font-headline tracking-widest text-primary-container font-light">FOUNDER, MARC JOY MEDIA</p>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <MapPin className="w-4 h-4" />
            <span className="text-sm tracking-[0.2em] font-headline uppercase">Seattle, WA</span>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="lg:col-span-7 space-y-16"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="space-y-8 text-lg leading-relaxed text-on-surface-variant font-body">
          <p>I build worlds because the ones we were given didn't have enough room. Marc Joy Media is an Afrofuturist multimedia studio based in Seattle. I operate five creative properties spanning fiction, music, education, heritage preservation, and film, all rooted in the same core belief: imagination is infrastructure.</p>
          <p>I am a writer, musician, and visual artist. I compose under the name Blaq Timbre, with our album Sonic Cosmos on streaming platforms. I design universes like Kemetopolis, a city-planet where Kushite wisdom meets 31st-century engineering. I build systems that produce 365 days of Black cultural content through NeverOneMonth. I document Pacific Northwest Black history through Northwest Black Pioneers.</p>
          <p>By day I work tech support for Seattle Public Schools. By night and weekend I run the studio. Everything I make starts with the same question: what happens when we dream where everyone can see?</p>
        </div>
        <div className="relative py-12">
          <div className="absolute left-0 top-0 w-24 h-1 bg-primary-container" />
          <blockquote className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight leading-tight italic">
            "We Dream <span className="text-primary-container">in Public</span>"
          </blockquote>
          <p className="mt-4 text-sm tracking-[0.3em] font-headline text-tertiary-fixed-dim/60 uppercase">The Core Philosophy</p>
        </div>
        <motion.div
          className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/5"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          {['WRITER', 'MUSICIAN', 'VISUAL ARTIST', 'WORLDBUILDER', 'PRODUCER'].map((skill, i) => (
            <motion.div key={skill} variants={staggerCardVariants} className="flex flex-col gap-1">
              <span className="text-xs font-headline uppercase tracking-[0.3em] text-on-surface-variant/40">0{i + 1}</span>
              <span className="text-xl font-headline font-medium text-on-surface tracking-tighter">{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
