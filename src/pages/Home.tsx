import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <header className="relative min-h-screen flex flex-col justify-end items-start px-8 md:px-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div className="absolute inset-0 w-full h-full" style={{ y: heroY, opacity: heroOpacity }}>
            <img
              src={siteImages.heroBackground}
              alt=""
              aria-hidden
              className="hero-ken-burns absolute inset-0 z-0 h-full w-full object-cover"
            />
            <video
              className="absolute inset-0 z-[1] h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={siteImages.heroBackground}
              aria-hidden
            >
              <source src={siteImages.heroVideo} type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 hero-gradient pointer-events-none" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <div className="flex flex-col gap-2 mb-6">
            <span className="text-on-surface-variant font-headline font-bold uppercase tracking-[0.3em] text-sm md:text-base">Marc Joy Media</span>
            <span className="text-on-surface-variant font-body font-medium uppercase tracking-widest text-xs opacity-60">Afrofuturist Multimedia Studio / Seattle</span>
          </div>
          <h1 className="text-6xl md:text-[5rem] lg:text-[7rem] font-black font-headline leading-[0.9] tracking-tighter text-on-surface mb-10">
            WE DREAM <br/>IN PUBLIC
          </h1>
          <Link
            to="/kemetopolis"
            className="group inline-flex items-center gap-4 bg-primary-container text-on-primary-container px-10 py-5 rounded-md font-black font-headline uppercase tracking-tighter text-xl hover:bg-primary transition-all duration-500 shadow-[0_0_40px_rgba(45,212,191,0.25)]"
          >
            Enter the World
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </header>

      <motion.section
        className="py-[120px] px-8 flex justify-center items-center bg-surface-container-lowest"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl lg:text-[2.5rem] font-bold font-headline leading-tight text-on-surface tracking-tight">
            "We build worlds. We score futures. <br className="hidden md:block"/> We dream where <span className="text-primary italic">everyone</span> can see."
          </h2>
        </div>
      </motion.section>

      <motion.section
        className="py-[120px] px-8 md:px-24 bg-surface"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-on-surface-variant font-headline font-bold uppercase tracking-widest text-sm mb-4">The Portfolio</h3>
            <h2 className="text-5xl font-black font-headline tracking-tighter text-on-surface">CULTURAL ASSETS</h2>
          </div>
          <p className="max-w-md text-on-surface-variant font-body text-lg leading-relaxed opacity-80">
            A curation of intellectual properties spanning cosmic animation, sonic architecture, and digital history.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[1200px]"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={staggerViewport}
        >
          <motion.div variants={staggerCardVariants} className="md:col-span-8 relative rounded-xl overflow-hidden group">
            <img src={siteImages.propertyKemetopolis} alt="Kemetopolis" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bento-card-gradient" />
            <div className="absolute bottom-0 left-0 p-10 flex flex-col items-start w-full">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-primary/30">Universe</span>
              <h3 className="text-4xl font-bold font-headline text-on-surface mb-2">KEMETOPOLIS</h3>
              <p className="text-on-surface-variant font-body mb-6 max-w-md">A city-planet universe spanning novels, art, and film.</p>
              <Link to="/kemetopolis" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 relative rounded-xl overflow-hidden group">
            <img src={siteImages.propertyMarsAcademy} alt="Mars Academy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bento-card-gradient" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Education</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">MARS Early Learning</h3>
              <p className="text-on-surface-variant font-body text-sm mb-4">Afrofuturist early childhood education for the youngest dreamers, ages 3 through 7.</p>
              <button type="button" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4 -rotate-45" />
              </button>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 relative rounded-xl overflow-hidden group">
            <img src={siteImages.propertyNeverOneMonth} alt="NeverOneMonth" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bento-card-gradient" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Culture</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">NeverOneMonth</h3>
              <p className="text-on-surface-variant font-body text-sm mb-4">365 days of Black history, culture, and future. Because it was never just one month.</p>
              <button type="button" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4 -rotate-45" />
              </button>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 relative rounded-xl overflow-hidden group">
            <img src={siteImages.propertyScatteredThrones} alt="Scattered Thrones" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bento-card-gradient" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Film</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">Scattered Thrones</h3>
              <p className="text-on-surface-variant font-body text-sm mb-4">Documentary and narrative film production rooted in Black stories and Pacific Northwest history.</p>
              <button type="button" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4 -rotate-45" />
              </button>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 relative rounded-xl overflow-hidden group">
            <img src={siteImages.propertyNWBP} alt="NW Black Pioneers" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bento-card-gradient" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Heritage</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">NW Black Pioneers</h3>
              <p className="text-on-surface-variant font-body text-sm mb-4">Preserving and amplifying the history of Black communities across the Pacific Northwest.</p>
              <button type="button" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4 -rotate-45" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
