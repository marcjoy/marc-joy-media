import { cn } from '../../lib/utils';

const laneStyles = {
  SIGNAL: 'bg-teal-500/20 text-teal-300 border border-teal-400/35',
  DREAM: 'bg-orange-500/15 text-orange-300 border border-orange-400/30',
  PULSE: 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/35',
};

/**
 * @param {{ lane: 'SIGNAL' | 'DREAM' | 'PULSE'; className?: string }} props
 */
export default function LaneBadge({ lane, className }) {
  const key = lane in laneStyles ? lane : 'SIGNAL';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-headline text-[0.65rem] font-bold uppercase tracking-[0.2em]',
        laneStyles[key],
        className
      )}
    >
      {lane}
    </span>
  );
}
