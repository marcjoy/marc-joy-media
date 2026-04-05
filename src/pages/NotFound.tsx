import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <motion.div
      data-page="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-8 pt-32 pb-24"
    >
      <h1 className="font-headline text-4xl md:text-6xl font-black tracking-tighter text-on-surface uppercase mb-4 text-center">
        Page Not Found
      </h1>
      <p className="font-body text-on-surface-variant text-center max-w-md mb-10">
        That path does not exist. Head back to the studio home.
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
