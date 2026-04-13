import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { sectionReveal } from '@/lib/motion';

export default function WorldTheDepartment() {
  return (
    <motion.div
      data-page="world-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-[#0A0A0F]"
    >
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <span className="mb-6 inline-block border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/50">
            Series — In Development
          </span>
          <h1 className="mb-4 font-headline text-[clamp(2.5rem,10vw,5rem)] font-black tracking-tighter text-on-surface">
            The Department
          </h1>
          <p className="mx-auto mb-3 max-w-md text-lg leading-relaxed text-on-surface-variant">
            A workplace comedy where every department is its own pocket dimension.
            The only person who moves between all of them is IT.
          </p>
          <p className="mb-10 font-mono text-sm text-primary/60">
            Coming soon.
          </p>
          <Link
            to="/worlds"
            className="inline-flex items-center gap-2 font-headline text-sm font-bold uppercase tracking-widest text-primary transition-all hover:gap-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Worlds
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
