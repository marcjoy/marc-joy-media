import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { sectionReveal } from '@/lib/motion';

type Props = {
  heroPlaceholderLabel: string;
  title: string;
  subhead: string;
  statusCategory: string;
  statusState: string;
  children: ReactNode;
};

export function WorldPageLayout({
  heroPlaceholderLabel,
  title,
  subhead,
  statusCategory,
  statusState,
  children,
}: Props) {
  return (
    <motion.div
      data-page="world-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 md:pb-32"
    >
      <div className="mx-auto max-w-5xl px-[clamp(1rem,5vw,2rem)] pt-40 md:pt-48">
        <Link
          to="/worlds"
          className="mb-8 inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.25em] text-on-surface-variant transition-colors hover:text-primary-container"
        >
          ← Worlds
        </Link>

        <div className="relative mb-6 h-[min(45vh,22rem)] min-h-[220px] w-full overflow-hidden rounded-xl border border-white/5 bg-[#111]">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#0d0d16] via-[#111118] to-[#1a1a24]"
            aria-hidden
          />
          <p className="relative z-10 flex h-full items-center justify-center px-6 text-center font-body text-sm leading-relaxed text-on-surface-variant/60">
            {heroPlaceholderLabel}
          </p>
        </div>

        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-primary-container/90 md:text-xs">
          {statusCategory} — {statusState}
        </p>
        <h1 className="mb-4 font-headline text-[clamp(2rem,8vw+0.5rem,3.75rem)] font-black uppercase tracking-tighter text-on-surface md:text-5xl">
          {title}
        </h1>
        <p className="mb-12 max-w-2xl font-body text-lg leading-relaxed text-on-surface-variant md:text-xl">
          {subhead}
        </p>

        <div className="flex flex-col gap-16 md:gap-20">{children}</div>
      </div>
    </motion.div>
  );
}

type SectionProps = {
  title?: string;
  children: ReactNode;
};

export function WorldSection({ title, children }: SectionProps) {
  return (
    <motion.section
      initial={sectionReveal.initial}
      whileInView={sectionReveal.whileInView}
      viewport={sectionReveal.viewport}
      transition={sectionReveal.transition}
    >
      {title ? (
        <h2 className="mb-4 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
          {title}
        </h2>
      ) : null}
      <div className="space-y-4 font-body text-base leading-relaxed text-on-surface-variant md:text-lg">
        {children}
      </div>
    </motion.section>
  );
}
