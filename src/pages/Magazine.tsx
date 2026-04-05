import { motion, useReducedMotion } from 'motion/react';

export default function Magazine() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
    >
      <div
        className={`pointer-events-none absolute inset-0 magazine-coming-soon-base ${reduceMotion ? '' : 'magazine-coming-soon-sheen'}`}
        aria-hidden
      />

      {!reduceMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-[20%] top-[15%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.22)_0%,transparent_68%)] blur-3xl"
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.96, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -right-[15%] bottom-[10%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.18)_0%,transparent_65%)] blur-3xl"
            animate={{ x: [0, -35, 25, 0], y: [0, 25, -15, 0], scale: [1, 0.92, 1.06, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute left-[25%] bottom-[20%] h-[40vh] w-[40vh] rounded-full bg-[radial-gradient(circle,rgba(232,213,176,0.08)_0%,transparent_70%)] blur-3xl"
            animate={{ x: [0, 20, -35, 0], y: [0, 40, -10, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        </>
      )}

      {reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(45,212,191,0.12),transparent),radial-gradient(ellipse_70%_50%_at_80%_70%,rgba(129,140,248,0.1),transparent)]"
          aria-hidden
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,transparent_0%,rgba(10,10,18,0.4)_45%,rgba(10,10,18,0.85)_100%)]" aria-hidden />

      <div className="relative text-center max-w-2xl">
        <p className="mb-4 font-headline text-xs font-bold uppercase tracking-[0.45em] text-primary-container/90">
          Dream in Public
        </p>
        <h1 className="font-headline text-5xl font-black tracking-tighter text-on-surface sm:text-6xl md:text-7xl mb-6">
          COMING SOON
        </h1>
        <p className="font-body text-on-surface-variant text-lg md:text-xl leading-relaxed opacity-90">
          The magazine is in orbit. Check back as we prepare the next issue.
        </p>
      </div>
    </motion.div>
  );
}
