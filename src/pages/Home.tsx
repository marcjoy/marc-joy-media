import { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { MotionValue } from 'motion/react';
import { useScroll, useTransform, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import HomeSequentialHero from '../components/HomeSequentialHero';
import { ElfsightAppointmentBooking } from '../components/ElfsightAppointmentBooking';
import {
  ElfsightInstagramFeed,
  ELF_INSTAGRAM_FEED_PRIMARY,
} from '../components/ElfsightInstagramFeed';
import { siteImages } from '../lib/images';
import { sectionReveal } from '../lib/motion';

const MANIFESTO_TEXT =
  'We build worlds. We score futures. We dream where everyone can see.';

function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.4'],
  });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Fragment key={`${i}-${word}`}>
            <WordUnit word={word} progress={scrollYProgress} range={[start, end]} />
            {word === 'futures.' ? <br className="hidden md:block" /> : null}
          </Fragment>
        );
      })}
    </span>
  );
}

function WordUnit({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const isEveryone = word === 'everyone';
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.25em]${isEveryone ? ' text-primary italic' : ''}`}
    >
      {word}
    </motion.span>
  );
}

export default function Home() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      rotate: -0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      <HomeSequentialHero />

      <motion.div
        data-page="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 bg-[#0A0A0F]"
      >
        <section className="relative bg-[#0A0A0F] px-[clamp(1rem,5vw,2rem)] py-16 md:py-24 md:px-24 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="flex flex-col gap-3">
              <h1 className="flex flex-col gap-0 font-headline text-[clamp(2rem,8vw+0.35rem,4rem)] font-black leading-[0.9] tracking-tighter text-on-surface md:text-[4.5rem] lg:text-[5.5rem]">
                <span className="block">WE DREAM</span>
                <span className="block">IN PUBLIC</span>
              </h1>
              <p className="max-w-md text-on-surface-variant font-body text-base leading-relaxed opacity-70 mt-2">
                Afrofuturist multimedia studio. We build worlds, score futures, and make culture you can walk through.
              </p>
            </div>
            <Link
              to="/worlds"
              className="group flex w-full md:w-auto shrink-0 items-center justify-center gap-4 bg-primary-container px-8 py-5 font-headline text-xl font-black uppercase tracking-tighter text-on-primary-container shadow-[0_0_40px_rgba(45,212,191,0.25)] transition-all duration-500 hover:bg-primary md:inline-flex md:justify-start md:px-10"
            >
              Enter the World
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </section>

        <motion.section
          className="flex items-center justify-center bg-surface-container-lowest px-[clamp(1rem,5vw,2rem)] py-[clamp(3.5rem,18vw,7.5rem)]"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <div className="max-w-4xl text-center">
            <h2 className="text-balance text-3xl font-headline font-bold leading-tight tracking-tight text-on-surface md:text-5xl lg:text-[2.5rem]">
              &ldquo;
              <WordReveal text={MANIFESTO_TEXT} />
              &rdquo;
            </h2>
          </div>
        </motion.section>

        <motion.section
          className="bg-surface px-[clamp(1rem,5vw,2rem)] py-[clamp(3.5rem,18vw,7.5rem)] md:px-24"
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <div className="mb-16">
            <h3 className="text-on-surface-variant font-headline font-bold uppercase tracking-widest text-sm mb-4">Explore</h3>
            <h2 className="font-headline text-[clamp(2rem,8vw+0.5rem,3.5rem)] font-black tracking-tighter text-on-surface md:text-5xl">
              WHAT'S INSIDE
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(14rem,auto)]"
          >
            <motion.div variants={cardVariants} className="group relative min-h-[min(55svh,22.5rem)] overflow-hidden rounded-xl md:col-span-8 md:row-span-2">
              <img src={siteImages.propertyKemetopolis} alt="Kemetopolis" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bento-card-gradient" />
              <div className="absolute bottom-0 left-0 flex w-full flex-col items-start p-6 sm:p-8 md:p-10">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-primary/30">Universe</span>
                <h3 className="text-4xl font-bold font-headline text-on-surface mb-2">KEMETOPOLIS</h3>
                <p className="text-on-surface-variant font-body mb-6 max-w-md">A city-planet universe spanning novels, art, and film.</p>
                <Link to="/kemetopolis" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  Explore <ArrowRight className="w-4 h-4 -rotate-45" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,14rem)] overflow-hidden rounded-xl md:col-span-4">
              <img src={siteImages.propertyNeverOneMonth} alt="NeverOneMonth / NileGen" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bento-card-gradient" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Culture</span>
                <h3 className="text-xl font-bold font-headline text-on-surface mb-1 uppercase">NeverOneMonth</h3>
                <p className="text-on-surface-variant font-body text-sm mb-3">365 days of Black history, culture, and future.</p>
                <Link to="/worlds/neveronemonth" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  Explore <ArrowRight className="w-4 h-4 -rotate-45" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,14rem)] overflow-hidden rounded-xl md:col-span-4">
              <img src={siteImages.propertyScatteredThrones} alt="Scattered Thrones" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bento-card-gradient" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Film</span>
                <h3 className="text-xl font-bold font-headline text-on-surface mb-1 uppercase">Scattered Thrones</h3>
                <p className="text-on-surface-variant font-body text-sm mb-3">Documentary film rooted in Black stories and Pacific Northwest history.</p>
                <Link to="/worlds/scattered-thrones" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  Explore <ArrowRight className="w-4 h-4 -rotate-45" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,16rem)] overflow-hidden rounded-xl md:col-span-6">
              <img src={siteImages.albumCover} alt="Blaq Timbre / Sonic Cosmos" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bento-card-gradient" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="bg-[#818CF8]/20 backdrop-blur-md text-[#818CF8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-[#818CF8]/30">Music</span>
                <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">Blaq Timbre</h3>
                <p className="text-on-surface-variant font-body text-sm mb-4">Original music. Afrofuturist frequencies from the Sonic Cosmos.</p>
                <Link to="/music" className="flex items-center gap-2 text-[#818CF8] font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  Listen <ArrowRight className="w-4 h-4 -rotate-45" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,16rem)] overflow-hidden rounded-xl md:col-span-6">
              <img src={siteImages.magazineAllViewHeroPoster} alt="Dream in Public Magazine" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bento-card-gradient" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Editorial</span>
                <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">The Magazine</h3>
                <p className="text-on-surface-variant font-body text-sm mb-4">Culture, signal, commentary. The Obsidian Feed editorial platform.</p>
                <Link to="/magazine" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  Read <ArrowRight className="w-4 h-4 -rotate-45" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,14rem)] overflow-hidden rounded-xl md:col-span-8">
              <img src={siteImages.workItems[0].img} alt="Studio Work" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bento-card-gradient" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Client</span>
                <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">Studio Work</h3>
                <p className="text-on-surface-variant font-body text-sm mb-4">Digital presence, content, and identity for mission-driven organizations.</p>
                <Link to="/work" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                  See the Work <ArrowRight className="w-4 h-4 -rotate-45" />
                </Link>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,14rem)] overflow-hidden rounded-xl md:col-span-4 bg-surface-container flex flex-col items-center justify-center text-center p-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 inline-block border border-primary/30">Merch</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-2 uppercase">Shop</h3>
              <p className="text-on-surface-variant font-body text-sm mb-4">Prints, apparel, and dream artifacts from the studio.</p>
              <Link to="/shop" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Browse <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        <ElfsightInstagramFeed embedClass={ELF_INSTAGRAM_FEED_PRIMARY} />

        <ElfsightAppointmentBooking />
      </motion.div>
    </>
  );
}
