import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <motion.div
      data-page="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center pb-24 pl-[max(2rem,env(safe-area-inset-left,0px))] pr-[max(2rem,env(safe-area-inset-right,0px))] pt-40"
    >
      <h1 className="mb-4 text-center font-headline text-[clamp(1.75rem,6vw+0.5rem,3.75rem)] font-black uppercase tracking-tighter text-on-surface text-balance md:text-6xl">
        Page Not Found
      </h1>
      <p className="font-body text-on-surface-variant text-center max-w-md mb-10">
        That path does not exist. Head back to the studio home.
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
