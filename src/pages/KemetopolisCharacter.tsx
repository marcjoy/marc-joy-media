import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { images } from '../lib/images';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { getCharacterBySlug } from '../data/kemetopolisCharacterDetails';
import { getCharacterGradient } from '../data/kemetopolisCharacterGradients';
import { readKemetopolisOriginScroll } from '../lib/kemetopolisScrollRestore';
import NotFound from './NotFound';

export default function KemetopolisCharacter() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const character = getCharacterBySlug(slug);

  const originScrollY = readKemetopolisOriginScroll(location.state);
  const kemetopolisBackState = useMemo(
    () => (originScrollY !== undefined ? { scrollY: originScrollY } : undefined),
    [originScrollY],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/kemetopolis', { state: kemetopolisBackState });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, kemetopolisBackState]);

  useEffect(() => {
    if (!character) return;
    const prev = document.title;
    document.title = `${character.name} | Kemetopolis | Marc Joy Media`;
    return () => {
      document.title = prev;
    };
  }, [character]);

  if (!character) {
    return <NotFound />;
  }

  const { name, ability, heroVideo, image, lore, adinkra, palette } = character;
  const accent = palette.accent;
  const gradient = getCharacterGradient(character.slug);

  return (
    <motion.div
      data-page="kemetopolis-character"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="character-page relative min-h-screen overflow-x-hidden pb-24 pt-8 md:pt-12"
    >
      <div className="fixed inset-0 z-0" aria-hidden>
        <BackgroundGradientAnimation
          interactive={false}
          size="78%"
          blendingValue="hard-light"
          containerClassName="h-full min-h-screen w-full"
          {...gradient}
        />
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Link
          to="/kemetopolis"
          state={kemetopolisBackState}
          className="fixed z-[45] flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/90 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-black/70 hover:text-white top-[max(5.5rem,calc(4.25rem+env(safe-area-inset-top,0px)))] right-[max(clamp(1rem,4vw,2rem),env(safe-area-inset-right,0px))]"
          aria-label="Close and return to Kemetopolis"
        >
          <X size={20} strokeWidth={2} />
        </Link>

        <div className="character-hero relative h-[min(75vh,820px)] min-h-[360px] w-full overflow-hidden rounded-lg border border-white/5 bg-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)]">
          {heroVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-contain object-center"
              src={heroVideo}
              poster={image}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-label={`${name} — Ancient Doorway sequence`}
            />
          ) : (
            <img
              src={image}
              alt={name}
              className="absolute inset-0 h-full w-full object-contain object-top"
              loading="eager"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent [background-size:100%_120%] [background-position:bottom]" />
        </div>

        <div className="character-info relative z-[1] -mt-24 px-1 md:-mt-28 md:px-4">
          <p
            className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] md:text-xs"
            style={{ color: accent }}
          >
            {ability}
          </p>
          <h1 className="font-headline text-4xl font-black tracking-tight text-white drop-shadow-md md:text-6xl md:tracking-tighter">
            {name}
          </h1>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
            Adinkra · {adinkra}
          </p>
        </div>

        <hr
          className="mx-auto my-12 max-w-[680px] border-0 border-t"
          style={{ borderColor: accent, opacity: 0.65 }}
        />

        <section className="lore-section mx-auto max-w-[680px] space-y-6">
          {lore.map((paragraph, i) => (
            <p key={i} className="font-body text-[15px] leading-[1.75] text-white/75 md:text-base md:leading-8">
              {paragraph}
            </p>
          ))}
        </section>

        <Link
          to="/kemetopolis"
          state={kemetopolisBackState}
          className="mt-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white/80"
        >
          ← Back to Kemetopolis
        </Link>
      </div>
    </motion.div>
  );
}
