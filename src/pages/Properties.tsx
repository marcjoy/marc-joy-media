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

const nwbpSepiaParent = {
  rest: {},
  hover: {},
};

const nwbpSepiaImg = {
  rest: { filter: 'sepia(0%)' },
  hover: { filter: 'sepia(20%)' },
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
          <motion.div variants={staggerCardVariants} className="md:col-span-8 md:row-span-2 relative overflow-hidden rounded-xl border border-white/5 bg-[#141420]">
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
              <img src={siteImages.propertyKemetopolis} alt="Kemetopolis" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-auto">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Universe</span>
                <h3 className="text-3xl font-bold font-headline mb-2 text-on-surface">Kemetopolis</h3>
                <p className="text-on-surface-variant text-base mb-6 max-w-md">A city-planet universe spanning novels, art, and film.</p>
                <Link
                  to="/kemetopolis"
                  className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all pointer-events-auto"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 md:row-span-3 relative overflow-hidden rounded-xl border border-white/5 bg-[#141420]">
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ filter: 'grayscale(60%)' }}
              whileHover={{ filter: 'grayscale(0%)' }}
              transition={{ duration: 0.4 }}
            >
              <img src={siteImages.propertyNeverOneMonth} alt="NeverOneMonth" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Culture</span>
              <h3 className="text-3xl font-bold font-headline mb-2 text-on-surface leading-tight">NeverOneMonth</h3>
              <p className="text-on-surface-variant text-base mb-6">365 days of Black history, culture, and future. Because it was never just one month.</p>
              <Link
                to="/neveronemonth"
                className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all pointer-events-auto"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="md:col-span-4 md:row-span-2 relative overflow-hidden rounded-xl border border-white/5 bg-[#141420]">
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-xl"
              whileHover={{
                scale: 1.02,
                filter: 'brightness(1.15)',
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <img src={siteImages.propertyMarsAcademy} alt="MARS Early Learning" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Education</span>
                <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">MARS Early Learning</h3>
                <p className="text-on-surface-variant text-base mb-6">Afrofuturist early childhood education for the youngest dreamers, ages 3 through 7.</p>
                <Link
                  to="/mars"
                  className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all pointer-events-auto"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
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
          <motion.div variants={staggerCardVariants} className="relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] min-h-[320px]">
            <motion.div
              className="relative min-h-[320px] h-full w-full overflow-hidden"
              initial="rest"
              whileHover="hover"
              variants={scatteredThronesLetterboxParent}
            >
              <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto" aria-hidden />
              <img
                src={siteImages.propertyScatteredThrones}
                alt="Scattered Thrones"
                className="absolute inset-0 z-[1] w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-[5] pointer-events-none" />
              <motion.div
                className="absolute top-0 left-0 right-0 z-[12] bg-black pointer-events-none"
                variants={scatteredThronesLetterboxBar}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-[12] bg-black pointer-events-none"
                variants={scatteredThronesLetterboxBar}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Film</span>
                <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">Scattered Thrones</h3>
                <p className="text-on-surface-variant text-base mb-6 max-w-md">Documentary and narrative film production rooted in Black stories and Pacific Northwest history.</p>
                <Link
                  to="/scattered-thrones"
                  className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all pointer-events-auto"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] min-h-[320px]">
            <motion.div
              className="relative min-h-[320px] h-full w-full overflow-hidden"
              initial="rest"
              whileHover="hover"
              variants={nwbpSepiaParent}
            >
              <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto" aria-hidden />
              <motion.img
                src={siteImages.propertyNWBP}
                alt="NW Black Pioneers"
                className="absolute inset-0 z-[1] w-full h-full object-cover pointer-events-none"
                variants={nwbpSepiaImg}
                transition={{ duration: 0.4 }}
              />
              <div
                className="absolute inset-0 z-[15] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                  backgroundSize: '200px 200px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 z-20 pointer-events-none">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Heritage</span>
                <h3 className="text-2xl font-bold font-headline mb-2 text-on-surface">NW Black Pioneers</h3>
                <p className="text-on-surface-variant text-base mb-6 max-w-md">Preserving and amplifying the history of Black communities across the Pacific Northwest.</p>
                <a
                  href="https://northwestblackpioneers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold font-headline uppercase tracking-widest text-sm hover:gap-4 transition-all pointer-events-auto"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
