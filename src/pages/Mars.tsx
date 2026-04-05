import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Mars() {
  return (
    <motion.div
      data-page="mars"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-8 pt-48 pb-32 bg-background"
    >
      <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-on-surface uppercase mb-6 text-center">
        MARS Early Learning Academy
      </h1>
      <p className="font-body text-on-surface-variant text-lg md:text-xl text-center max-w-lg mb-12 leading-relaxed">
        Afrofuturist early childhood education. Coming soon.
      </p>
      <Link
        to="/"
        className="font-headline font-bold uppercase tracking-widest text-sm text-primary hover:text-primary-container transition-colors"
      >
        ← Back to home
      </Link>
    </motion.div>
  );
}
