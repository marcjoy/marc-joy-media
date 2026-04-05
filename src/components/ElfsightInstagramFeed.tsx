import { useEffect } from 'react';
import { ensureElfsightPlatform } from '../lib/elfsight';

/** Elfsight Instagram Feed | Untitled Instagram Feed */
export const ELF_INSTAGRAM_FEED_PRIMARY =
  'elfsight-app-a897196b-bbdb-4b5e-bad4-ab5e4986a481';

/** Earlier Instagram feed widget (kept alongside primary on home). */
export const ELF_INSTAGRAM_FEED_LEGACY =
  'elfsight-app-c73d3320-8b1e-4483-b148-876dbdaf023f';

type ElfsightInstagramFeedProps = {
  embedClass: string;
  /** Distinct label when multiple feeds appear on one page. */
  ariaLabel?: string;
};

export function ElfsightInstagramFeed({
  embedClass,
  ariaLabel = 'Instagram feed',
}: ElfsightInstagramFeedProps) {
  useEffect(() => {
    ensureElfsightPlatform();
  }, []);

  return (
    <section
      className="py-16 md:py-24 px-8 md:px-24 bg-surface border-t border-white/5"
      aria-label={ariaLabel}
    >
      <div className="max-w-7xl mx-auto">
        <div className={embedClass} data-elfsight-app-lazy />
      </div>
    </section>
  );
}
