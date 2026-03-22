import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

export default function Properties() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 pb-32 px-8 md:px-24"
    >
      <motion.section
        className="max-w-7xl mx-auto mb-20"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <h1 className="text-7xl md:text-[80px] font-black font-headline text-on-surface leading-none tracking-tighter mb-8 max-w-4xl">
          THE PORTFOLIO
        </h1>
        <p className="text-lg md:text-xl font-body text-on-surface-variant max-w-xl leading-relaxed">
          Five worlds. One studio. Each property carries its own frequency.
        </p>
      </motion.section>

      <motion.section
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[320px]"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          <motion.div variants={staggerCardVariants} className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-xl border border-white/5 bg-[#141420]">
            <img src={siteImages.propertyKemetopolis} alt="Kemetopolis" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Universe</span>
              <h3 className="text-3xl font-bold font-headline mb-2 text-on-surface">Kemetopolis</h3>
              <p className="text-on-surface-variant text-base mb-6 max-w-md">A city-planet universe spanning novels, art, and film.</p>
              <button type="button" className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 md:row-span-3 group relative overflow-hidden rounded-xl border border-white/5 bg-[#141420]">
            <img src={siteImages.propertyNeverOneMonth} alt="NeverOneMonth" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/60 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Culture</span>
              <h3 className="text-3xl font-bold font-headline mb-2 text-on-surface leading-tight">NeverOneMonth</h3>
              <p className="text-on-surface-variant text-base mb-6">365 days of Black history, culture, and future. Because it was never just one month.</p>
              <button type="button" className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 md:row-span-2 group relative overflow-hidden rounded-xl border border-white/5 bg-[#141420]">
            <img src={siteImages.propertyMarsAcademy} alt="MARS Early Learning" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Education</span>
              <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">MARS Early Learning</h3>
              <p className="text-on-surface-variant text-base mb-6">Afrofuturist early childhood education for the youngest dreamers, ages 3 through 7.</p>
              <button type="button" className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="max-w-7xl mx-auto mt-6"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          <motion.div variants={staggerCardVariants} className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] min-h-[320px]">
            <img src={siteImages.propertyScatteredThrones} alt="Scattered Thrones" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Film</span>
              <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">Scattered Thrones</h3>
              <p className="text-on-surface-variant text-base mb-6 max-w-md">Documentary and narrative film production rooted in Black stories and Pacific Northwest history.</p>
              <button type="button" className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] min-h-[320px]">
            <img src={siteImages.propertyNWBP} alt="NW Black Pioneers" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Heritage</span>
              <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">NW Black Pioneers</h3>
              <p className="text-on-surface-variant text-base mb-6 max-w-md">Preserving and amplifying the history of Black communities across the Pacific Northwest.</p>
              <button type="button" className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
