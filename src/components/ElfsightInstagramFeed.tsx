import { useEffect } from 'react';
import { ensureElfsightPlatform } from '../lib/elfsight';

/** Elfsight Instagram Feed | Untitled Instagram Feed */
export const ELF_INSTAGRAM_FEED_PRIMARY =
  'elfsight-app-a897196b-bbdb-4b5e-bad4-ab5e4986a481';

/** Elfsight Instagram Feed | Untitled Instagram Feed 2 (portfolio) */
export const ELF_INSTAGRAM_FEED_PORTFOLIO =
  'elfsight-app-cfa88dce-2671-4712-81b0-312b9b4be4f4';

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
      className="border-t border-white/5 bg-surface px-[clamp(1rem,5vw,2rem)] py-16 md:px-24 md:py-24"
      aria-label={ariaLabel}
    >
      <div className="max-w-7xl mx-auto">
        <div className={embedClass} data-elfsight-app-lazy />
      </div>
    </section>
  );
}
