import { Link } from 'react-router-dom';
import { useSyncExternalStore, type ReactNode } from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card-effect';
import LaneBadge from './LaneBadge';

export type MagazineLane = 'SIGNAL' | 'DREAM' | 'PULSE';

export type MagazineArticle = {
  id: string;
  lane: MagazineLane;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  imageUrl: string | null;
  sourceUrl: string | null;
  sourceLabel: string | null;
};

type Props = {
  article: MagazineArticle;
  variant?: 'default' | 'channel';
};

function sourceLinkLabel(lane: MagazineLane, sourceUrl: string): string {
  const u = sourceUrl.toLowerCase();
  if (lane === 'PULSE') return 'Source →';
  if (lane === 'DREAM' && u.includes('substack.com')) return 'Read on Substack →';
  return 'Read the full piece →';
}

function sourceLinkClass(lane: MagazineLane): string {
  if (lane === 'SIGNAL') return 'text-teal-300/90 hover:text-teal-200';
  if (lane === 'DREAM') return 'text-orange-300/90 hover:text-orange-200';
  return 'text-indigo-300/90 hover:text-indigo-200';
}

const CHANNEL_LANE_SOURCE: Record<MagazineLane, string> = {
  SIGNAL: '#1D9E75',
  DREAM: '#D85A30',
  PULSE: '#7F77DD',
};

const CHANNEL_PLACEHOLDER_BG: Record<MagazineLane, string> = {
  SIGNAL: 'rgba(29,158,117,0.15)',
  DREAM: 'rgba(216,90,48,0.15)',
  PULSE: 'rgba(127,119,221,0.15)',
};

function subscribeMobileMagazine(callback: () => void) {
  const mq = window.matchMedia('(max-width: 767px)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getMobileMagazineSnapshot(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
}

function getMobileMagazineServerSnapshot(): boolean {
  return true;
}

function useIsMobileMagazine(): boolean {
  return useSyncExternalStore(subscribeMobileMagazine, getMobileMagazineSnapshot, getMobileMagazineServerSnapshot);
}

function Layer({
  use3D,
  translateZ,
  className,
  children,
}: {
  use3D: boolean;
  translateZ: number;
  className?: string;
  children: ReactNode;
}) {
  if (!use3D) return <div className={className}>{children}</div>;
  return (
    <CardItem translateZ={translateZ} className={className}>
      {children}
    </CardItem>
  );
}

/** Off-site hero images (e.g. RSS); exclude our R2-hosted AI assets from attribution line. */
function isExternallyHostedImageUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  if (!u.startsWith('http://') && !u.startsWith('https://')) return false;
  if (u.includes('.r2.dev') || u.includes('r2.cloudflarestorage.com')) return false;
  return true;
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const isMobile = useIsMobileMagazine();
  const use3D = !isMobile;

  const dateLabel = new Date(article.publishedAt + 'T12:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const sourceUrl = article.sourceUrl?.trim();
  const showSource = Boolean(sourceUrl);
  const sourceLabel = article.sourceLabel?.trim();
  const imageUrl = article.imageUrl?.trim();
  const showImageVia = Boolean(imageUrl && sourceLabel && isExternallyHostedImageUrl(imageUrl));

  if (variant === 'channel') {
    const channelArticle = (
      <article className="relative w-[220px] shrink-0 overflow-hidden rounded-[10px] border-[0.5px] border-white/[0.08] bg-white/[0.04]">
        <Link
          to={`/magazine/${article.id}`}
          className="absolute inset-0 z-0"
          aria-label={article.title}
        />
        <div className="relative z-10 flex flex-col pointer-events-none">
          <Layer use3D={use3D} translateZ={20} className="relative h-[120px] w-full shrink-0 overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className="h-full w-full"
                style={{ backgroundColor: CHANNEL_PLACEHOLDER_BG[article.lane] }}
              />
            )}
          </Layer>
          <div className="p-3">
            <Layer use3D={use3D} translateZ={12} className="block w-full">
              <time
                className="mb-1.5 block font-body text-[10px] text-on-surface-variant"
                dateTime={article.publishedAt}
              >
                {dateLabel}
              </time>
            </Layer>
            <Layer use3D={use3D} translateZ={35} className="w-full">
              <h2 className="line-clamp-2 font-body text-[13px] font-medium leading-[1.4] text-on-surface">
                {article.title}
              </h2>
            </Layer>
            {showSource && sourceUrl ? (
              <Layer use3D={use3D} translateZ={25} className="mt-1.5 w-full">
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-body text-[11px] underline decoration-current/30 underline-offset-2 transition-opacity hover:opacity-90 pointer-events-auto"
                  style={{ color: CHANNEL_LANE_SOURCE[article.lane] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {sourceLinkLabel(article.lane, sourceUrl)}
                </a>
              </Layer>
            ) : null}
          </div>
        </div>
      </article>
    );

    if (!use3D) return channelArticle;

    return (
      <CardContainer containerClassName="p-0 w-full" className="h-full w-full">
        <CardBody className="h-full w-full">{channelArticle}</CardBody>
      </CardContainer>
    );
  }

  const defaultArticle = (
    <article className="flex h-full flex-col rounded-lg border border-white/[0.06] bg-surface-container-low/40 p-4 transition-colors hover:border-white/[0.1] sm:p-5">
      <div className="mb-3 flex w-full flex-wrap items-start justify-between gap-2">
        <Layer use3D={use3D} translateZ={80} className="min-w-0">
          <LaneBadge lane={article.lane} />
        </Layer>
        <Layer use3D={use3D} translateZ={20} className="shrink-0">
          <time
            className="block font-body text-[0.7rem] text-on-surface-variant sm:text-xs"
            dateTime={article.publishedAt}
          >
            {dateLabel}
          </time>
        </Layer>
      </div>

      {imageUrl ? (
        <Layer use3D={use3D} translateZ={40} className="mb-3 w-full sm:mb-4">
          <div>
            <Link
              to={`/magazine/${article.id}`}
              className="block touch-manipulation overflow-hidden rounded-md"
            >
              <img
                src={imageUrl}
                alt=""
                className="aspect-[16/10] max-h-[min(40vh,16rem)] w-full object-cover sm:max-h-none"
              />
            </Link>
            {showImageVia && sourceLabel ? (
              <p className="mt-1.5 font-body text-[11px] italic leading-snug text-on-surface-variant/65">
                Image via {sourceLabel}
              </p>
            ) : null}
          </div>
        </Layer>
      ) : null}

      <Link
        to={`/magazine/${article.id}`}
        className="group flex min-h-0 flex-1 touch-manipulation flex-col active:opacity-95"
      >
        <Layer use3D={use3D} translateZ={60} className="w-full min-w-0">
          <h2 className="font-headline text-lg font-bold leading-snug tracking-tight text-on-surface group-hover:text-primary-container sm:text-xl">
            {article.title}
          </h2>
        </Layer>
        <Layer use3D={use3D} translateZ={30} className="mt-2.5 w-full min-w-0 flex-1 sm:mt-3">
          <p className="font-body text-sm leading-relaxed text-on-surface-variant line-clamp-5 sm:line-clamp-6">
            {article.excerpt}
          </p>
        </Layer>
      </Link>

      <Layer use3D={use3D} translateZ={20} className="mt-3 w-full sm:mt-4">
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-wider text-on-surface/80 sm:text-xs">
          {article.author}
        </p>
      </Layer>

      {showSource && sourceUrl ? (
        <Layer use3D={use3D} translateZ={50} className="mt-1 w-full sm:mt-2">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center font-body text-xs font-medium underline decoration-current/30 underline-offset-4 transition-colors touch-manipulation active:opacity-90 sm:min-h-0 ${sourceLinkClass(article.lane)}`}
          >
            {sourceLinkLabel(article.lane, sourceUrl)}
          </a>
        </Layer>
      ) : null}
    </article>
  );

  if (!use3D) return defaultArticle;

  return (
    <CardContainer containerClassName="p-0 w-full" className="h-full w-full">
      <CardBody className="h-full w-full">{defaultArticle}</CardBody>
    </CardContainer>
  );
}
