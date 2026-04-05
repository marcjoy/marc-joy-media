import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { Music as MusicIcon } from 'lucide-react';
import { siteImages } from '../lib/images';
import { streamingLinks } from '../data/sonicCosmos';
import { sectionReveal, staggerCardVariants, staggerContainerVariants, staggerViewport } from '../lib/motion';

/** Spotify album id for Sonic Cosmos (open.spotify.com/album/6SUr5bWftlm7nhlfsC5h9B). */
const SONIC_COSMOS_SPOTIFY_ALBUM_EMBED_ID = '6SUr5bWftlm7nhlfsC5h9B';

const streamingButtons = [
  { label: 'Spotify', href: streamingLinks.spotify },
  { label: 'Apple Music', href: streamingLinks.appleMusic },
  { label: 'YouTube Music', href: streamingLinks.youtubeMusic },
  { label: 'Tidal', href: streamingLinks.tidal },
] as const;

export default function Music() {
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
                    </div>
                  </div>
                </div>

                <iframe
                  src={`https://open.spotify.com/embed/album/${SONIC_COSMOS_SPOTIFY_ALBUM_EMBED_ID}?utm_source=generator&theme=0`}
                  width="100%"
                  height={352}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  style={{ borderRadius: '12px' }}
                  title="Blaq Timbre - Sonic Cosmos"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
