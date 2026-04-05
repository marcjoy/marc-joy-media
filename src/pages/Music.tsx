import { useRef, type MouseEvent } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import {
  Music as MusicIcon,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Play,
  Pause,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { siteImages } from '../lib/images';
import { formatTrackDuration, sonicCosmosTracks, streamingLinks } from '../data/sonicCosmos';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';
import { useSonicCosmosPlayer } from '../hooks/useSonicCosmosPlayer';

const streamingButtons = [
  { label: 'Spotify', href: streamingLinks.spotify },
  { label: 'Apple Music', href: streamingLinks.appleMusic },
  { label: 'YouTube Music', href: streamingLinks.youtubeMusic },
  { label: 'Tidal', href: streamingLinks.tidal },
] as const;

export default function Music() {
  const {
    audioRef,
    tracks,
    currentIndex,
    currentTrack,
    isPlaying,
    shuffle,
    toggleShuffle,
    currentTime,
    duration,
    progress,
    volume,
    setVolume,
    previewsLoading,
    previewsError,
    hasPlayback,
    togglePlay,
    goNext,
    goPrev,
    seekRatio,
    selectTrack,
  } = useSonicCosmosPlayer();

  const albumRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: albumRef,
    offset: ['start end', 'end start'],
  });
  const albumY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const onProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current;
    if (!bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    seekRatio(x / rect.width);
  };

  const timeLabel = (sec: number) => formatTrackDuration(Math.floor(Math.max(0, sec)));

  return (
    <motion.div
      data-page="music"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 pt-32 pb-24 px-8 max-w-7xl mx-auto"
    >
      <audio ref={audioRef} className="sr-only" preload="metadata" />

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
                  BLAQ
                  <br />
                  TIMBRE
                </h1>
                <h2 className="text-[40px] font-headline font-bold text-primary-container leading-tight">
                  Sonic Cosmos
                </h2>
              </div>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
                Afrofuturist hip-hop, R&amp;B, and funk. Female vocals over cosmic production. A journey through deep
                indigo rhythm and celestial harmony.
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
                      alt="Sonic Cosmos album cover"
                      className="h-full w-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0"
                    />
                  </motion.div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                    <div>
                      <span className="bg-primary-container text-on-primary-container text-xs font-black uppercase px-2 py-1 mb-2 inline-block">
                        New Release
                      </span>
                      <h3 className="text-3xl font-headline font-bold">Sonic Cosmos</h3>
                      {currentTrack ? (
                        <p className="mt-1 text-sm text-on-surface-variant font-body line-clamp-1">{currentTrack.title}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-lg mb-4 border border-white/5">
                  {previewsError ? (
                    <p className="text-sm text-on-surface-variant text-center py-2">{previewsError}</p>
                  ) : previewsLoading ? (
                    <p className="text-sm text-on-surface-variant text-center py-2">Loading album previews…</p>
                  ) : null}

                  <div className={cn('flex items-center justify-between mb-4', !hasPlayback && 'opacity-50 pointer-events-none')}>
                    <button
                      type="button"
                      onClick={toggleShuffle}
                      aria-pressed={shuffle}
                      aria-label={shuffle ? 'Shuffle on' : 'Shuffle off'}
                      className={cn(
                        'rounded-md p-1.5 transition-colors',
                        shuffle ? 'text-primary bg-primary/15' : 'text-on-surface-variant hover:text-primary'
                      )}
                    >
                      <Shuffle className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous track"
                        className="text-on-surface hover:text-primary transition-colors"
                      >
                        <SkipBack className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        onClick={togglePlay}
                        disabled={!hasPlayback}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                        className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
                      >
                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next track"
                        className="text-on-surface hover:text-primary transition-colors"
                      >
                        <SkipForward className="w-6 h-6" />
                      </button>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer" aria-label="Volume">
                      <Volume2 className="w-5 h-5 text-on-surface-variant shrink-0" />
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-20 h-1 accent-primary-container cursor-pointer opacity-90"
                      />
                    </label>
                  </div>

                  <div
                    ref={progressBarRef}
                    role="slider"
                    tabIndex={0}
                    aria-valuenow={Math.round(progress * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Playback position"
                    onClick={onProgressClick}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') seekRatio(progress + 0.05);
                      if (e.key === 'ArrowLeft') seekRatio(progress - 0.05);
                    }}
                    className={cn(
                      'relative h-1 w-full bg-surface-variant rounded-full overflow-hidden',
                      hasPlayback && 'cursor-pointer'
                    )}
                  >
                    <div
                      className="absolute left-0 top-0 h-full bg-primary rounded-full pointer-events-none"
                      style={{ width: `${Math.min(100, progress * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-mono text-on-surface-variant">{duration ? timeLabel(currentTime) : '0:00'}</span>
                    <span className="text-[10px] font-mono text-on-surface-variant">
                      {duration ? timeLabel(duration) : currentTrack ? formatTrackDuration(currentTrack.durationSec) : '—'}
                    </span>
                  </div>
                  <p className="mt-3 text-[10px] text-on-surface-variant/80 leading-snug text-center">
                    On-site playback uses short Apple Music previews. Open Spotify or Apple Music above for the full album.
                  </p>
                </div>

                <motion.div
                  className="space-y-1"
                  variants={staggerContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={staggerViewport}
                >
                  {(tracks.length ? tracks : sonicCosmosTracks).map((track, i) => {
                    const playable = tracks.length > 0;
                    return (
                      <motion.button
                        type="button"
                        key={track.title}
                        variants={staggerCardVariants}
                        disabled={!playable}
                        onClick={() => playable && selectTrack(i)}
                        className={cn(
                          'w-full flex items-center justify-between p-3 rounded text-left transition-colors group',
                          playable && 'hover:bg-white/5',
                          !playable && 'opacity-60 cursor-wait',
                          i === currentIndex && playable && 'bg-white/5 ring-1 ring-primary/30'
                        )}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <span
                            className={cn(
                              'font-mono text-xs shrink-0 w-7',
                              i === currentIndex && playable ? 'text-primary' : 'text-on-surface-variant'
                            )}
                          >
                            {i + 1 < 10 ? `0${i + 1}` : i + 1}
                          </span>
                          <span
                            className={cn(
                              'font-bold truncate',
                              i === currentIndex && playable ? 'text-primary' : 'text-on-surface'
                            )}
                          >
                            {track.title}
                          </span>
                          {i === currentIndex && isPlaying && playable ? (
                            <span className="text-[10px] uppercase tracking-wider text-primary shrink-0 hidden sm:inline">
                              Playing
                            </span>
                          ) : null}
                        </div>
                        <span
                          className={cn(
                            'text-sm font-mono shrink-0',
                            i === currentIndex && playable
                              ? 'text-primary'
                              : 'text-on-surface-variant opacity-0 group-hover:opacity-100'
                          )}
                        >
                          {formatTrackDuration(track.durationSec)}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
