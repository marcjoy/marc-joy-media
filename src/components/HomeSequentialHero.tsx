import { useCallback, useEffect, useRef, useState } from 'react';
import { images } from '../lib/images';

/**
 * Full-viewport home hero: intro video → looping main video + fading title PNG overlay.
 * No scroll/scrub; no controls.
 */
export default function HomeSequentialHero() {
  const introRef = useRef<HTMLVideoElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'intro' | 'main'>('intro');
  const [overlayVisible, setOverlayVisible] = useState(false);

  const onIntroEnded = useCallback(() => {
    setPhase('main');
  }, []);

  useEffect(() => {
    if (phase === 'main') {
      introRef.current?.pause();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'main') return;
    const el = mainRef.current;
    if (!el) return;

    const onPlaying = () => {
      setOverlayVisible(true);
    };

    el.addEventListener('playing', onPlaying, { once: true });
    const p = el.play();
    if (p !== undefined) {
      void p.catch(() => {
        setOverlayVisible(true);
      });
    }

    return () => {
      el.removeEventListener('playing', onPlaying);
    };
  }, [phase]);

  return (
    <section
      className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-black"
      aria-label="Marc Joy Media"
    >
      <video
        ref={introRef}
        className={`absolute inset-0 h-full w-full object-cover transition-none ${
          phase === 'intro'
            ? 'z-[2]'
            : 'pointer-events-none invisible z-0'
        }`}
        style={{ width: '100%', height: '100%' }}
        src={images.heroVideo.introHero}
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={onIntroEnded}
      />

      <video
        ref={mainRef}
        className={`absolute inset-0 h-full w-full object-cover ${
          phase === 'main'
            ? 'z-[2]'
            : 'pointer-events-none invisible z-0'
        }`}
        style={{ width: '100%', height: '100%' }}
        src={images.heroVideo.staticHomeHero}
        muted
        playsInline
        loop
        preload="auto"
      />

      <img
        src={images.hero.homeTitleOverlay}
        alt=""
        className={`pointer-events-none absolute left-1/2 top-1/2 z-[3] h-auto w-auto max-h-[min(44vh,28rem)] max-w-[min(42vw,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 object-contain object-center select-none transition-opacity duration-[800ms] ease-in sm:max-h-[min(46vh,32rem)] sm:max-w-[38vw] md:max-w-[34vw] lg:max-w-[30vw] ${
          overlayVisible ? 'opacity-100' : 'opacity-0'
        }`}
        draggable={false}
      />
    </section>
  );
}
