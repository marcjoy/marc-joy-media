import { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { MotionValue } from 'motion/react';
import { useScroll, useTransform, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import HeroVideoCarousel from '../components/HeroVideoCarousel';
import { ElfsightAppointmentBooking } from '../components/ElfsightAppointmentBooking';
import {
  ElfsightInstagramFeed,
  ELF_INSTAGRAM_FEED_PRIMARY,
} from '../components/ElfsightInstagramFeed';
import { heroVideos, siteImages } from '../lib/images';
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
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <motion.div
      data-page="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <section
        ref={heroRef}
        className="relative flex min-h-svh max-md:min-h-[max(100svh,667px)] flex-col justify-end items-stretch overflow-hidden px-[clamp(1rem,5vw,2rem)] pb-16 pt-28 md:min-h-screen md:items-start md:px-24 md:pb-24 md:pt-0"
      >
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 -top-[30%] -bottom-[30%] min-h-full w-full min-w-full"
        >
          <HeroVideoCarousel videos={heroVideos} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent z-10 pointer-events-none" />
        </motion.div>

        <motion.div
          style={{ y: headlineY, opacity: contentOpacity }}
          className="relative z-20 flex w-full max-w-5xl flex-col max-md:max-w-none"
        >
          <div className="mb-6 flex w-full flex-col gap-2">
            <span className="text-on-surface-variant font-headline font-bold uppercase tracking-[0.3em] text-sm md:text-base">
              Marc Joy Media
            </span>
            <span className="text-on-surface-variant font-body font-medium uppercase tracking-widest text-xs opacity-60">
              Afrofuturist Multimedia Studio / Seattle
            </span>
          </div>
          <h1 className="mb-8 flex max-md:w-full flex-col gap-0 font-headline text-[clamp(1.875rem,11vw+0.35rem,4.5rem)] font-black leading-[0.9] tracking-tighter text-on-surface md:mb-10 md:text-[5rem] lg:text-[7rem]">
            <span className="block">WE DREAM</span>
            <span className="block">IN PUBLIC</span>
          </h1>
          <Link
            to="/properties"
            className="group flex w-full max-md:max-w-none items-center justify-center gap-4 bg-primary-container px-8 py-5 font-headline text-xl font-black uppercase tracking-tighter text-on-primary-container shadow-[0_0_40px_rgba(45,212,191,0.25)] transition-all duration-500 hover:bg-primary md:inline-flex md:w-auto md:justify-start md:px-10"
          >
            Enter the World
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <motion.section
        className="flex items-center justify-center bg-surface-container-lowest px-[clamp(1rem,5vw,2rem)] py-[clamp(3.5rem,18vw,7.5rem)]"
        initial={sectionReveal.initial}
        whileInView={sectionReveal.whileInView}
        viewport={sectionReveal.viewport}
        transition={sectionReveal.transition}
      >
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl lg:text-[2.5rem] font-bold font-headline leading-tight text-on-surface tracking-tight">
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
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-on-surface-variant font-headline font-bold uppercase tracking-widest text-sm mb-4">The Worlds</h3>
            <h2 className="font-headline text-[clamp(2rem,8vw+0.5rem,3.5rem)] font-black tracking-tighter text-on-surface md:text-5xl">
              OWNED UNIVERSES
            </h2>
          </div>
          <p className="max-w-md text-on-surface-variant font-body text-lg leading-relaxed opacity-80">
            Original Marc Joy Media properties—fiction, culture platforms, and film—from one studio frequency.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid min-h-[min(90svh,45rem)] grid-cols-1 gap-6 md:grid-cols-12"
        >
          <motion.div variants={cardVariants} className="group relative min-h-[min(55svh,22.5rem)] overflow-hidden rounded-xl md:col-span-8 md:row-span-2 md:min-h-[22.5rem]">
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
          <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,20rem)] overflow-hidden rounded-xl md:col-span-4 md:min-h-[20rem]">
            <img src={siteImages.propertyNeverOneMonth} alt="NeverOneMonth / NileGen" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bento-card-gradient" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Culture</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">NeverOneMonth / NileGen</h3>
              <p className="text-on-surface-variant font-body text-sm mb-4">365 days of Black history, culture, and future. Because it was never just one month.</p>
              <Link to="/neveronemonth" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </div>
          </motion.div>
          <motion.div variants={cardVariants} className="group relative min-h-[min(42svh,20rem)] overflow-hidden rounded-xl md:col-span-4 md:min-h-[20rem]">
            <img src={siteImages.propertyScatteredThrones} alt="Scattered Thrones" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bento-card-gradient" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 inline-block border border-primary/30">Film</span>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-1 uppercase">Scattered Thrones</h3>
              <p className="text-on-surface-variant font-body text-sm mb-4">Documentary and narrative film production rooted in Black stories and Pacific Northwest history.</p>
              <Link to="/scattered-thrones" className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all">
                Explore <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-16 max-w-xl border-t border-white/10 pt-12">
          <h3 className="text-on-surface-variant font-headline font-bold uppercase tracking-widest text-sm mb-3">Studio work</h3>
          <p className="text-on-surface-variant font-body text-base leading-relaxed mb-6 opacity-90">
            Partnerships with mission-driven organizations—digital presence, content, and identity. Separate from the owned universes above.
          </p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-primary font-headline font-bold uppercase text-sm tracking-widest hover:gap-3 transition-all"
          >
            See the work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      <ElfsightInstagramFeed embedClass={ELF_INSTAGRAM_FEED_PRIMARY} />

      <ElfsightAppointmentBooking />
    </motion.div>
  );
}
