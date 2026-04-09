import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ScatteredThrones() {
  return (
    <motion.div
      data-page="scattered-thrones"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center bg-background pb-32 pl-[max(2rem,env(safe-area-inset-left,0px))] pr-[max(2rem,env(safe-area-inset-right,0px))] pt-48"
    >
      <h1 className="mb-6 text-center font-headline text-[clamp(2rem,8vw+0.5rem,4.5rem)] font-black uppercase tracking-tighter text-on-surface text-balance md:text-7xl">
        Scattered Thrones
      </h1>
      <p className="font-body text-on-surface-variant text-lg md:text-xl text-center max-w-lg mb-12 leading-relaxed">
        Documentary and narrative film rooted in Black stories and Pacific Northwest history. Coming soon.
      </p>
      <Link
        to="/"
        className="inline-flex min-h-11 items-center font-headline text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-primary-container"
      >
        ← Back to home
      </Link>
    </motion.div>
  );
}
