import { Fragment, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import articlesData from '../data/magazine.json';
import ArticleCard, { type MagazineArticle, type MagazineLane } from '../components/magazine/ArticleCard';
import MagazineFilter from '../components/magazine/MagazineFilter';

const allArticles = articlesData as MagazineArticle[];

const LANES: MagazineLane[] = ['SIGNAL', 'DREAM', 'PULSE'];

function sortByDateDesc(list: MagazineArticle[]) {
  return [...list].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/** Single partition of articles by lane — used for both the ALL columns and each lane tab. */
function articlesByLaneFrom(articles: MagazineArticle[]): Record<MagazineLane, MagazineArticle[]> {
  const map: Record<MagazineLane, MagazineArticle[]> = { SIGNAL: [], DREAM: [], PULSE: [] };
  for (const a of articles) {
    if (a.lane === 'SIGNAL' || a.lane === 'DREAM' || a.lane === 'PULSE') {
      map[a.lane].push(a);
    }
  }
  for (const lane of LANES) {
    map[lane] = sortByDateDesc(map[lane]);
  }
  return map;
}

const CHANNEL_TAGLINES: Record<MagazineLane, string> = {
  SIGNAL: 'Grounded reporting and verified movement',
  DREAM: 'Speculative witness, griot frequency',
  PULSE: 'Satire with receipts and timing',
};

const LANE_CHANNEL_COLOR: Record<MagazineLane, string> = {
  SIGNAL: '#1D9E75',
  DREAM: '#D85A30',
  PULSE: '#7F77DD',
};

const CHANNEL_PLACEHOLDER_BG: Record<MagazineLane, string> = {
  SIGNAL: 'rgba(29,158,117,0.15)',
  DREAM: 'rgba(216,90,48,0.15)',
  PULSE: 'rgba(127,119,221,0.15)',
};

/** Last card in the first non-empty lane strip (same order as on-screen scroll rows). */
function heroArticleFromStrips(byLane: Record<MagazineLane, MagazineArticle[]>): MagazineArticle | null {
  for (const lane of LANES) {
    const slice = byLane[lane].slice(0, 8);
    if (slice.length === 0) continue;
    return slice[slice.length - 1]!;
  }
  return null;
}

function isLaneFilter(f: string): f is MagazineLane {
  return f === 'SIGNAL' || f === 'DREAM' || f === 'PULSE';
}

export default function Magazine() {
  const [filter, setFilter] = useState('ALL');

  const articlesByLane = useMemo(() => articlesByLaneFrom(allArticles), [allArticles]);

  const allViewHeroArticle = useMemo(() => heroArticleFromStrips(articlesByLane), [articlesByLane]);

  const filteredFlat = useMemo(() => {
    if (filter === 'ALL') return sortByDateDesc(allArticles);
    if (isLaneFilter(filter)) return articlesByLane[filter];
    return [];
  }, [filter, allArticles, articlesByLane]);

  const laneEmpty = isLaneFilter(filter) && articlesByLane[filter].length === 0;

  if (allArticles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 mx-auto max-w-2xl px-4 pt-24 pb-[max(5rem,env(safe-area-inset-bottom,0px))] text-center sm:px-6 sm:pt-28 sm:pb-20"
      >
        <h1 className="font-headline text-2xl font-black leading-tight tracking-tight text-on-surface sm:text-3xl md:text-4xl">
          DREAM IN PUBLIC
        </h1>
        <p className="mt-4 font-body text-on-surface-variant">No issues yet. Check back soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 min-h-screen px-4 pt-24 pb-[max(5rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:pt-28 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center sm:mb-12 md:mb-16">
          <p className="mb-2 font-headline text-[0.65rem] font-bold uppercase tracking-[0.38em] text-primary-container/90 sm:mb-3 sm:text-xs sm:tracking-[0.45em]">
            Marc Joy Media
          </p>
          <h1 className="text-balance font-headline text-[clamp(1.65rem,5.5vw+0.5rem,4.5rem)] font-black leading-[1.05] tracking-tighter text-on-surface sm:text-5xl md:text-6xl lg:text-7xl">
            DREAM IN PUBLIC
          </h1>
          <p className="mx-auto mt-3 max-w-xl px-1 font-body text-base leading-snug text-on-surface-variant sm:mt-4 sm:text-lg md:text-xl">
            We Dream in Public
          </p>
          <div className="mt-8 flex justify-center sm:mt-10">
            <MagazineFilter active={filter} onChange={setFilter} />
          </div>
        </header>

        {filter === 'ALL' && allViewHeroArticle ? (
          <div className="mb-9 px-6">
            <div className="overflow-hidden rounded-[12px] border-[0.5px] border-white/[0.08]">
              {allViewHeroArticle.imageUrl?.trim() ? (
                <img
                  src={allViewHeroArticle.imageUrl.trim()}
                  alt=""
                  className="h-[clamp(11rem,min(42vh,22rem),23.75rem)] w-full object-cover"
                />
              ) : (
                <div
                  className="h-[clamp(11rem,min(42vh,22rem),23.75rem)] w-full"
                  style={{
                    backgroundColor: CHANNEL_PLACEHOLDER_BG[allViewHeroArticle.lane],
                  }}
                  aria-hidden
                />
              )}
            </div>
          </div>
        ) : null}

        {filter === 'ALL' ? (
          <div>
            {LANES.map((lane) => {
              const slice = articlesByLane[lane].slice(0, 8);
              if (slice.length === 0) return null;
              const laneColor = LANE_CHANNEL_COLOR[lane];
              return (
                <section
                  key={lane}
                  aria-labelledby={`lane-channel-${lane}`}
                  className="mb-9 last:mb-0"
                >
                  <div className="border-b-[0.5px] border-white/[0.08] px-6 pb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-9 w-[3px] shrink-0 rounded-[2px]"
                        style={{ backgroundColor: laneColor }}
                        aria-hidden
                      />
                      <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                        <button
                          type="button"
                          id={`lane-channel-${lane}`}
                          onClick={() => setFilter(lane)}
                          className="cursor-pointer border-0 bg-transparent p-0 font-body text-[11px] font-normal leading-none tracking-[0.14em] [font-variant:small-caps] hover:opacity-90"
                          style={{ color: laneColor }}
                        >
                          {lane}
                        </button>
                        <span className="font-body text-[11px] text-on-surface-variant">
                          {CHANNEL_TAGLINES[lane]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-3">
                    <div className="no-scrollbar flex gap-[14px] overflow-x-auto">
                      {slice.map((article) => (
                        <Fragment key={article.id}>
                          <ArticleCard article={article} variant="channel" />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        ) : null}

        {filter !== 'ALL' ? (
          laneEmpty ? (
            <p className="px-2 text-center font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">
              Nothing in this lane yet. Try another filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
              {filteredFlat.map((article) => (
                <Fragment key={article.id}>
                  <ArticleCard article={article} />
                </Fragment>
              ))}
            </div>
          )
        ) : null}
      </div>
    </motion.div>
  );
}
