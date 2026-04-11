import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import articlesData from '../data/magazine.json';
import LaneBadge from '../components/magazine/LaneBadge';

const articles = articlesData;

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 mx-auto max-w-2xl px-4 pt-28 pb-[max(6rem,env(safe-area-inset-bottom,0px))] text-center sm:px-6 sm:pt-32 sm:pb-24"
      >
        <h1 className="font-headline text-xl font-bold text-on-surface sm:text-2xl">Article not found</h1>
        <Link
          to="/magazine"
          className="mt-6 inline-flex min-h-11 items-center justify-center font-body text-sm text-primary-container underline underline-offset-4 touch-manipulation"
        >
          ← Back to magazine
        </Link>
      </motion.div>
    );
  }

  const dateLabel = new Date(article.publishedAt + 'T12:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 mx-auto max-w-3xl px-4 pt-24 pb-[max(5rem,env(safe-area-inset-bottom,0px))] sm:px-6 sm:pt-28 sm:pb-20"
    >
      <Link
        to="/magazine"
        className="mb-8 inline-flex min-h-11 items-center font-body text-sm text-on-surface-variant hover:text-primary-container touch-manipulation active:opacity-90 sm:mb-10"
      >
        ← Back to magazine
      </Link>

      <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
        <LaneBadge lane={article.lane} />
        <time className="font-body text-xs text-on-surface-variant sm:text-sm" dateTime={article.publishedAt}>
          {dateLabel}
        </time>
      </div>

      <h1 className="font-headline text-[1.65rem] font-black leading-tight tracking-tight text-on-surface sm:text-3xl md:text-4xl lg:text-5xl">
        {article.title}
      </h1>

      <p className="mt-3 font-body text-xs font-semibold uppercase tracking-wider text-on-surface/85 sm:mt-4 sm:text-sm">
        {article.author}
      </p>

      {article.imageUrl ? (
        <div className="mt-8 overflow-hidden rounded-lg border border-white/[0.06] sm:mt-10">
          <img
            src={article.imageUrl}
            alt=""
            className="max-h-[min(55vh,24rem)] w-full object-cover sm:max-h-none"
          />
        </div>
      ) : null}

      <div className="mt-8 sm:mt-10">
        <p className="whitespace-pre-wrap font-body text-[0.9375rem] leading-[1.65] text-on-surface-variant sm:text-base sm:leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      {article.sourceLabel && article.sourceUrl ? (
        <p className="mt-10 border-t border-white/[0.08] pt-6 font-body text-sm text-on-surface-variant/75 sm:mt-12 sm:pt-8">
          Source:{' '}
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-on-surface-variant underline decoration-white/25 underline-offset-2 touch-manipulation hover:text-on-surface-variant sm:min-h-0"
          >
            {article.sourceLabel}
          </a>
        </p>
      ) : article.sourceLabel ? (
        <p className="mt-10 border-t border-white/[0.08] pt-6 font-body text-sm text-on-surface-variant/70 sm:mt-12 sm:pt-8">
          {article.sourceLabel}
        </p>
      ) : null}
    </motion.article>
  );
}
