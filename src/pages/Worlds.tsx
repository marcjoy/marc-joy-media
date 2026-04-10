import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { siteImages } from '@/lib/images';
import { worldsHubCards, type WorldsHubCard, type WorldsHubImageKey } from '@/data/worldsHub';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '@/lib/motion';

const IMAGE_MAP: Record<WorldsHubImageKey, string> = {
  kemetopolis: siteImages.propertyKemetopolis,
  neveronemonth: siteImages.propertyNeverOneMonth,
  scatteredThrones: siteImages.propertyScatteredThrones,
};

const PLACEHOLDER_GRADIENT: Record<
  Extract<WorldsHubCard, { variant: 'placeholder' }>['accent'],
  string
> = {
  violet: 'from-violet-950/50 via-[#111118] to-indigo-950/40',
  amber: 'from-amber-950/30 via-[#111118] to-orange-950/25',
  slate: 'from-slate-900/60 via-[#111118] to-zinc-900/50',
};

function PlaceholderLabel(title: string) {
  return `[Card image: ${title}]`;
}

export default function Worlds() {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleKemetopolisMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: y * -10, rotateY: x * 10 });
  };

  const handleKemetopolisMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  const renderCard = (card: WorldsHubCard) => {
    if (card.variant === 'placeholder') {
      const grad = PLACEHOLDER_GRADIENT[card.accent];
      return (
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} aria-hidden />
          <p className="absolute inset-0 z-[2] flex items-center justify-center px-4 text-center font-body text-xs leading-snug text-on-surface-variant/55">
            {PlaceholderLabel(card.title)}
          </p>
        </div>
      );
    }

    return (
      <>
        <img
          src={IMAGE_MAP[card.imageKey]}
          alt={card.title}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/50 to-transparent" />
      </>
    );
  };

  const gridItemClass = (id: string) => {
    if (id === 'kemetopolis') {
      return 'relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-8 md:row-span-2 md:col-start-1 md:row-start-1';
    }
    if (id === 'the-department') {
      return 'relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-4 md:col-start-9 md:row-start-1';
    }
    if (id === 'dream-in-public') {
      return 'relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-4 md:col-start-9 md:row-start-2';
    }
    if (id === 'neveronemonth') {
      return 'relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-4 md:col-start-1 md:row-start-3';
    }
    if (id === 'blaq-timbre') {
      return 'relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-4 md:col-start-5 md:row-start-3';
    }
    if (id === 'scattered-thrones') {
      return 'relative overflow-hidden rounded-xl border border-white/5 bg-[#141420] md:col-span-4 md:col-start-9 md:row-start-3';
    }
    return 'relative overflow-hidden rounded-xl border border-white/5 bg-[#141420]';
  };

  const minHeights = (card: WorldsHubCard) => {
    if (card.variant === 'image' && card.featured) {
      return 'min-h-[min(55svh,22.5rem)] md:min-h-[22.5rem]';
    }
    return 'min-h-[min(42svh,20rem)] md:min-h-[20rem]';
  };

  return (
    <motion.div
      data-page="worlds"
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
            className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-12"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={staggerViewport}
          >
            {worldsHubCards.map((card, i) => {
              const isFeatured = card.variant === 'image' && card.featured;

              return (
                <motion.div
                  key={card.id}
                  variants={staggerCardVariants}
                  className={`${gridItemClass(card.id)} ${minHeights(card)}`}
                >
                  {isFeatured ? (
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
                      {renderCard(card)}
                      <div className="pointer-events-auto absolute bottom-0 left-0 z-20 p-8">
                        <span className="mb-3 inline-block border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                          {card.tag.toUpperCase()}
                        </span>
                        <h3 className="mb-2 font-headline text-3xl font-bold text-on-surface">{card.title}</h3>
                        <p className="mb-6 max-w-md text-base text-on-surface-variant">{card.description}</p>
                        <Link
                          to={card.to}
                          className="pointer-events-auto inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
                        >
                          Explore <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <div className={`relative h-full w-full overflow-hidden rounded-xl ${minHeights(card)}`}>
                      {renderCard(card)}
                      <div className="pointer-events-auto absolute bottom-0 left-0 z-20 p-8">
                        <span className="mb-3 inline-block border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
                          {card.tag.toUpperCase()}
                        </span>
                        <h3 className="mb-2 font-headline text-2xl font-bold leading-tight text-on-surface md:text-3xl">
                          {card.title}
                        </h3>
                        <p className="mb-6 max-w-md text-base text-on-surface-variant">{card.description}</p>
                        <Link
                          to={card.to}
                          className="pointer-events-auto inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-4"
                        >
                          Explore <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
