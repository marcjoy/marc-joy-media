import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { Music as MusicIcon, SkipBack, SkipForward, Volume2, Shuffle, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { siteImages } from '../lib/images';
import { sonicCosmosTracks, formatTrackDuration, streamingLinks } from '../data/sonicCosmos';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

const streamingButtons = [
  { label: 'Spotify', href: streamingLinks.spotify },
  { label: 'Apple Music', href: streamingLinks.appleMusic },
  { label: 'YouTube Music', href: streamingLinks.youtubeMusic },
  { label: 'Tidal', href: streamingLinks.tidal },
] as const;

export default function Music() {
  const activeTrackIndex = 1;
  const activeTrack = sonicCosmosTracks[activeTrackIndex];

  const albumRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: albumRef,
    offset: ['start end', 'end start'],
  });
  const albumY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.div
      data-page="music"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 pt-32 pb-24 px-8 max-w-7xl mx-auto"
    >
      <div className="fixed inset-0 z-0 music-pulse-bg pointer-events-none" aria-hidden />
      <div className="relative z-10">
        <motion.section
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={sectionReveal.transition}
        >
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={staggerViewport}
          >
          <motion.div variants={staggerCardVariants} className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h1 className="text-[80px] font-headline font-bold leading-[0.9] tracking-tighter text-on-surface">
                BLAQ<br/>TIMBRE
              </h1>
              <h2 className="text-[40px] font-headline font-bold text-primary-container leading-tight">
                Sonic Cosmos
              </h2>
            </div>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Afrofuturist hip-hop, R&B, and funk. Female vocals over cosmic production. A journey through deep indigo rhythm and celestial harmony.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {streamingButtons.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-primary-container text-on-primary-container px-5 py-3 rounded-lg font-bold hover:brightness-110 transition-all"
                >
                  <MusicIcon className="w-5 h-5" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </motion.div>
          <motion.div variants={staggerCardVariants} className="lg:col-span-5 relative">
            <div className="bg-surface-container p-4 rounded-xl shadow-2xl relative z-10">
              <div className="aspect-square w-full bg-surface-container-highest overflow-hidden rounded-lg mb-8 group relative">
                <motion.div ref={albumRef} style={{ y: albumY }} className="absolute inset-0">
                  <img
                    src={siteImages.albumCover}
                    alt="Album"
                    className="h-full w-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0"
                  />
                </motion.div>
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                  <div>
                    <span className="bg-primary-container text-on-primary-container text-xs font-black uppercase px-2 py-1 mb-2 inline-block">New Release</span>
                    <h3 className="text-3xl font-headline font-bold">Sonic Cosmos</h3>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-lg mb-8 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <Shuffle className="w-5 h-5 text-primary" />
                  <div className="flex items-center gap-6">
                    <SkipBack className="w-6 h-6 text-on-surface cursor-pointer" />
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 text-on-primary-container fill-current" />
                    </div>
                    <SkipForward className="w-6 h-6 text-on-surface cursor-pointer" />
                  </div>
                  <Volume2 className="w-5 h-5 text-on-surface-variant" />
                </div>
                <div className="relative h-1 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-1/3 bg-primary" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-mono text-on-surface-variant">0:45</span>
                  <span className="text-[10px] font-mono text-on-surface-variant">{formatTrackDuration(activeTrack.durationSec)}</span>
                </div>
              </div>
              <motion.div
                className="space-y-1"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={staggerViewport}
              >
                {sonicCosmosTracks.map((track, i) => (
                  <motion.div
                    key={track.title}
                    variants={staggerCardVariants}
                    className={cn('flex items-center justify-between p-3 rounded hover:bg-white/5 transition-colors group', i === activeTrackIndex && 'bg-white/5')}
                  >
                    <div className="flex items-center gap-4">
                      <span className={cn('font-mono text-xs', i === activeTrackIndex ? 'text-primary' : 'text-on-surface-variant')}>
                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                      </span>
                      <span className={cn('font-bold', i === activeTrackIndex ? 'text-primary' : 'text-on-surface')}>{track.title}</span>
                    </div>
                    <span
                      className={cn(
                        'text-sm font-mono',
                        i === activeTrackIndex ? 'text-primary' : 'text-on-surface-variant opacity-0 group-hover:opacity-100'
                      )}
                    >
                      {formatTrackDuration(track.durationSec)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
