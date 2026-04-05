import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { siteImages } from '../lib/images';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

const scatteredThronesLetterboxParent = {
  rest: {},
  hover: {},
};

const scatteredThronesLetterboxBar = {
  rest: { height: 0 },
  hover: { height: '10%' },
};

export default function Properties() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleKemetopolisMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -10, rotateY: x * 10 });
  };

  const handleKemetopolisMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <motion.div
      data-page="properties"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32"
    >
      <div className="px-[clamp(1rem,5vw,2rem)] pt-48 md:px-24">
        <motion.section
          className="mx-auto mb-20 max-w-7xl"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <h1 className="mb-8 max-w-4xl font-headline text-[clamp(2.75rem,12vw+0.25rem,5rem)] font-black leading-none tracking-tighter text-on-surface md:text-[80px]">
            THE WORLDS
          </h1>
          <p className="max-w-xl font-body text-lg leading-relaxed text-on-surface-variant md:text-xl">
            Owned universes. Each one a frequency.
          </p>
        </motion.section>

        <motion.section
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <motion.div
            className="mx-auto grid max-w-7xl grid-cols-1 gap-6 auto-rows-[minmax(min(45vw,20rem),auto)] md:grid-cols-12 md:auto-rows-[minmax(20rem,auto)]"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={staggerViewport}
          >
            <motion.div
              variants={staggerCardVariants}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-8 md:row-span-2"
            >
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-xl"
                style={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                  transformStyle: 'preserve-3d',
                  perspective: 800,
                  boxShadow: '0 0 40px rgba(45,212,191,0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onMouseMove={handleKemetopolisMouseMove}
                onMouseLeave={handleKemetopolisMouseLeave}
              >
                <img
                  src={siteImages.propertyKemetopolis}
                  alt="Kemetopolis"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent" />
                <div className="pointer-events-auto absolute bottom-0 left-0 z-20 p-8">
                  <span className="mb-3 inline-block border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                    Universe
                  </span>
                  <h3 className="mb-2 font-headline text-3xl font-bold text-on-surface">Kemetopolis</h3>
                  <p className="mb-6 max-w-md text-base text-on-surface-variant">
                    A city-planet universe spanning novels, art, and film.
                  </p>
                  <Link
                    to="/kemetopolis"
                    className="pointer-events-auto inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
                  >
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={staggerCardVariants}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-4 md:row-span-2"
            >
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ filter: 'grayscale(60%)' }}
                whileHover={{ filter: 'grayscale(0%)' }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={siteImages.propertyNeverOneMonth}
                  alt="NeverOneMonth / NileGen"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/60 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 z-20 p-8">
                <span className="mb-3 inline-block border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                  Culture
                </span>
                <h3 className="mb-2 font-headline text-3xl font-bold leading-tight text-on-surface">
                  NeverOneMonth / NileGen
                </h3>
                <p className="mb-6 text-base text-on-surface-variant">
                  365 days of Black history, culture, and future. Because it was never just one month.
                </p>
                <Link
                  to="/neveronemonth"
                  className="pointer-events-auto inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
                >
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="mx-auto mt-6 max-w-7xl"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={staggerViewport}
          >
            <motion.div
              variants={staggerCardVariants}
              className="relative min-h-[min(50svh,20rem)] overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:min-h-[20rem]"
            >
              <motion.div
                className="relative h-full min-h-[min(50svh,20rem)] w-full overflow-hidden md:min-h-[20rem]"
                initial="rest"
                whileHover="hover"
                variants={scatteredThronesLetterboxParent}
              >
                <div className="pointer-events-auto absolute inset-0 z-0 bg-transparent" aria-hidden />
                <img
                  src={siteImages.propertyScatteredThrones}
                  alt="Scattered Thrones"
                  className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent" />
                <motion.div
                  className="pointer-events-none absolute left-0 right-0 top-0 z-[12] bg-black"
                  variants={scatteredThronesLetterboxBar}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 z-[12] bg-black"
                  variants={scatteredThronesLetterboxBar}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <div className="pointer-events-none absolute bottom-0 left-0 z-20 p-8">
                  <span className="mb-3 inline-block border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                    Film
                  </span>
                  <h3 className="mb-2 font-headline text-2xl font-bold text-on-surface">Scattered Thrones</h3>
                  <p className="mb-6 max-w-md text-base text-on-surface-variant">
                    Documentary and narrative film production rooted in Black stories and Pacific Northwest history.
                  </p>
                  <Link
                    to="/scattered-thrones"
                    className="pointer-events-auto inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
                  >
                    Explore <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
