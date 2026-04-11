import { cn } from '../../lib/utils';

const filterOptions = [
  { value: 'ALL', label: 'All' },
  { value: 'SIGNAL', label: 'Signal' },
  { value: 'DREAM', label: 'Dream' },
  { value: 'PULSE', label: 'Pulse' },
];

const activeLaneRing = {
  ALL: 'ring-2 ring-white/25 bg-white/10 text-on-surface',
  SIGNAL: 'ring-2 ring-teal-400/60 bg-teal-500/15 text-teal-100',
  DREAM: 'ring-2 ring-orange-400/50 bg-orange-500/15 text-orange-100',
  PULSE: 'ring-2 ring-indigo-400/50 bg-indigo-500/15 text-indigo-100',
};

/**
 * @param {{ active: string; onChange: (v: string) => void }} props
 */
export default function MagazineFilter({ active, onChange }) {
  return (
    <div
      className="-mx-1 flex max-w-full flex-wrap justify-center gap-2 px-1 sm:mx-0 sm:px-0"
      role="group"
      aria-label="Filter articles by lane"
    >
      {filterOptions.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={cn(
            'min-h-11 touch-manipulation rounded-full px-4 py-2.5 font-headline text-[0.7rem] font-bold uppercase tracking-[0.14em] transition-colors sm:min-h-0 sm:py-2 sm:text-xs sm:tracking-[0.18em]',
            'border border-white/[0.08] bg-transparent text-on-surface-variant hover:text-on-surface active:opacity-90',
            active === value && activeLaneRing[value]
          )}
          aria-pressed={active === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
