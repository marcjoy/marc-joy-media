import { useCallback, useEffect, useRef, useState, type CSSProperties, type TransitionEvent } from 'react';
import { heroVideos as defaultHeroVideos, siteImages } from '../lib/images';

const CROSSFADE_SEC = 1.5;

const videoBaseStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 1.5s ease-in-out',
};

function getMode(): 'carousel' | 'mobile' | 'static' {
  if (typeof window === 'undefined') return 'carousel';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static';
  if (window.matchMedia('(max-width: 768px)').matches) return 'mobile';
  return 'carousel';
}

type HeroVideoCarouselProps = {
  videos?: readonly string[];
};

export default function HeroVideoCarousel({ videos: videosProp }: HeroVideoCarouselProps) {
  const videos = videosProp ?? defaultHeroVideos;
  const n = videos.length;

  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  const [mode, setMode] = useState<'carousel' | 'mobile' | 'static'>(() => getMode());

  const [isVideo0Front, setIsVideo0Front] = useState(true);
  const [op0, setOp0] = useState(1);
  const [op1, setOp1] = useState(0);

  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const isVideo0FrontRef = useRef(true);
  const fadingSlotRef = useRef<0 | 1 | null>(null);

  useEffect(() => {
    isVideo0FrontRef.current = isVideo0Front;
  }, [isVideo0Front]);

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqMobile = window.matchMedia('(max-width: 768px)');
    const sync = () => setMode(getMode());
    mqReduce.addEventListener('change', sync);
    mqMobile.addEventListener('change', sync);
    return () => {
      mqReduce.removeEventListener('change', sync);
      mqMobile.removeEventListener('change', sync);
    };
  }, []);

  const startCrossfade = useCallback(() => {
    if (isTransitioningRef.current || mode !== 'carousel' || n < 2) return;
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    const frontIs0 = isVideo0FrontRef.current;
    const front = frontIs0 ? v0 : v1;
    const back = frontIs0 ? v1 : v0;

    const dur = front.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;

    fadingSlotRef.current = frontIs0 ? 0 : 1;
    isTransitioningRef.current = true;

    void back.play().catch(() => {});

    if (frontIs0) {
      setOp0(0);
      setOp1(1);
    } else {
      setOp0(1);
      setOp1(0);
    }
  }, [mode, n]);

  const onTimeUpdate = useCallback(() => {
    if (isTransitioningRef.current || mode !== 'carousel') return;
    const frontIs0 = isVideo0FrontRef.current;
    const front = frontIs0 ? v0Ref.current : v1Ref.current;
    if (!front) return;

    const dur = front.duration;
    const t = front.currentTime;
    if (!Number.isFinite(dur) || dur <= 0) return;

    if (t >= dur - CROSSFADE_SEC) {
      startCrossfade();
    }
  }, [mode, startCrossfade]);

  const onFrontEnded = useCallback(() => {
    if (isTransitioningRef.current || mode !== 'carousel') return;
    startCrossfade();
  }, [mode, startCrossfade]);

  const assignNextFallbackSrc = useCallback(
    (el: HTMLVideoElement, badIndex: number) => {
      for (let k = 1; k < n; k++) {
        const idx = (badIndex + k) % n;
        const src = videos[idx];
        if (src) {
          el.src = src;
          el.load();
          return idx;
        }
      }
      return badIndex;
    },
    [n, videos]
  );

  const handleOpacityTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLVideoElement>, slot: 0 | 1) => {
      if (e.propertyName !== 'opacity') return;
      if (fadingSlotRef.current !== slot) return;

      const v0 = v0Ref.current;
      const v1 = v1Ref.current;
      if (!v0 || !v1) return;

      const newActive = (activeIndexRef.current + 1) % n;
      activeIndexRef.current = newActive;

      const backEl = slot === 0 ? v0 : v1;
      const nextSrc = videos[(newActive + 1) % n];

      backEl.pause();
      backEl.currentTime = 0;
      backEl.src = nextSrc;
      backEl.load();

      const newFrontIsV0 = slot === 1;
      setIsVideo0Front(newFrontIsV0);
      isVideo0FrontRef.current = newFrontIsV0;

      if (newFrontIsV0) {
        setOp0(1);
        setOp1(0);
      } else {
        setOp0(0);
        setOp1(1);
      }

      fadingSlotRef.current = null;
      isTransitioningRef.current = false;
    },
    [n, videos]
  );

  // Carousel: initial sources + play (two videos only)
  useEffect(() => {
    if (mode !== 'carousel' || n < 2) return;
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    activeIndexRef.current = 0;
    isVideo0FrontRef.current = true;
    isTransitioningRef.current = false;
    fadingSlotRef.current = null;
    setIsVideo0Front(true);
    setOp0(1);
    setOp1(0);

    v0.src = videos[0];
    v1.src = videos[1];
    v0.load();
    v1.load();

    void v0.play().catch(() => {});
  }, [mode, n, videos]);

  useEffect(() => {
    if (mode !== 'carousel') return;
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    const front = isVideo0Front ? v0 : v1;

    front.addEventListener('timeupdate', onTimeUpdate);
    front.addEventListener('ended', onFrontEnded);

    return () => {
      front.removeEventListener('timeupdate', onTimeUpdate);
      front.removeEventListener('ended', onFrontEnded);
    };
  }, [mode, isVideo0Front, onTimeUpdate, onFrontEnded]);

  if (mode === 'static') {
    return (
      <div className="hero-video-carousel absolute inset-0 z-0 h-full w-full overflow-hidden">
        <img
          src={siteImages.heroBackground}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  if (mode === 'mobile') {
    return (
      <div className="hero-video-carousel absolute inset-0 z-0 h-full w-full overflow-hidden">
        <video
          ref={mobileRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{ ...videoBaseStyle, transition: 'none' }}
          src={videos[0]}
          muted
          playsInline
          preload="auto"
          loop
          autoPlay
          poster={siteImages.heroBackground}
          aria-hidden
          onError={() => {
            const el = mobileRef.current;
            if (!el) return;
            assignNextFallbackSrc(el, 0);
            void el.play().catch(() => {});
          }}
        />
      </div>
    );
  }

  return (
    <div className="hero-video-carousel absolute inset-0 z-0 h-full w-full overflow-hidden">
      <video
        ref={v0Ref}
        style={{
          ...videoBaseStyle,
          opacity: op0,
          zIndex: isVideo0Front ? 1 : 0,
        }}
        muted
        playsInline
        preload="auto"
        poster={siteImages.heroBackground}
        aria-hidden
        onTransitionEnd={(e) => handleOpacityTransitionEnd(e, 0)}
        onError={() => {
          const el = v0Ref.current;
          if (!el) return;
          const idx = isVideo0FrontRef.current ? activeIndexRef.current : (activeIndexRef.current + 1) % n;
          assignNextFallbackSrc(el, idx);
          void el.play().catch(() => {});
        }}
      />
      <video
        ref={v1Ref}
        style={{
          ...videoBaseStyle,
          opacity: op1,
          zIndex: isVideo0Front ? 0 : 1,
        }}
        muted
        playsInline
        preload="auto"
        poster={siteImages.heroBackground}
        aria-hidden
        onTransitionEnd={(e) => handleOpacityTransitionEnd(e, 1)}
        onError={() => {
          const el = v1Ref.current;
          if (!el) return;
          const idx = !isVideo0FrontRef.current ? activeIndexRef.current : (activeIndexRef.current + 1) % n;
          assignNextFallbackSrc(el, idx);
          void el.play().catch(() => {});
        }}
      />
    </div>
  );
}
