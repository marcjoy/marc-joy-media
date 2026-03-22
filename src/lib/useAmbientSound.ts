import { useEffect, useRef, useCallback } from 'react';

const R2_BASE = 'https://pub-ade018e64c784701882dc1419e597561.r2.dev';

/** Map site `data-page` values to ambient loops. Empty string until files are on R2. */
const PAGE_SOUNDS: Record<string, string> = {
  home: '', // TODO: upload audio file to R2 (audio/home-ambient.mp3)
  kemetopolis: '', // TODO: upload audio file to R2 (audio/kemetopolis-ambient.mp3)
  music: '', // TODO: upload audio file to R2 (audio/music-ambient.mp3)
};

/** Subliminal ceiling — never above 10%. */
export const AMBIENT_VOLUME_TARGET = 0.07;
const AMBIENT_VOLUME_MAX = 0.1;
const FADE_S = 0.45;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Narrow `data-page` to keys that may have ambient audio. */
export function ambientPageKeyFromDataPage(dataPage: string): string {
  if (dataPage === 'home' || dataPage === 'kemetopolis' || dataPage === 'music') return dataPage;
  return 'none';
}

export function useAmbientSound(page: string, enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const genRef = useRef(0);

  const clearPending = useCallback(() => {
    if (pendingRef.current !== null) {
      clearTimeout(pendingRef.current);
      pendingRef.current = null;
    }
  }, []);

  const getOrCreateContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    ctxRef.current = ctx;
    gainRef.current = gain;
    return ctx;
  }, []);

  const disconnectChain = useCallback(() => {
    const audio = audioRef.current;
    const source = sourceRef.current;
    if (source) {
      try {
        source.disconnect();
      } catch {
        /* ignore */
      }
    }
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
    audioRef.current = null;
    sourceRef.current = null;
  }, []);

  const fadeOutAndClear = useCallback(
    (onDone?: () => void) => {
      clearPending();
      const ctx = ctxRef.current;
      const gain = gainRef.current;
      if (!ctx || !gain) {
        disconnectChain();
        onDone?.();
        return;
      }
      const now = ctx.currentTime;
      try {
        gain.gain.cancelScheduledValues(now);
        const v = Math.min(gain.gain.value, AMBIENT_VOLUME_MAX);
        gain.gain.setValueAtTime(v, now);
        gain.gain.linearRampToValueAtTime(0, now + FADE_S);
      } catch {
        gain.gain.value = 0;
      }
      const g = ++genRef.current;
      pendingRef.current = setTimeout(() => {
        if (g !== genRef.current) return;
        pendingRef.current = null;
        disconnectChain();
        onDone?.();
      }, Math.ceil(FADE_S * 1000) + 50);
    },
    [clearPending, disconnectChain]
  );

  const fadeInTarget = useCallback(async (src: string) => {
    const ctx = getOrCreateContext();
    const gain = gainRef.current;
    if (!ctx || !gain || !src) return;

    try {
      await ctx.resume();
    } catch {
      return;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.crossOrigin = 'anonymous';

    let source: MediaElementAudioSourceNode;
    try {
      source = ctx.createMediaElementSource(audio);
    } catch {
      return;
    }
    source.connect(gain);

    audioRef.current = audio;
    sourceRef.current = source;

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(
      Math.min(AMBIENT_VOLUME_TARGET, AMBIENT_VOLUME_MAX),
      now + 1.1
    );

    try {
      await audio.play();
    } catch {
      /* autoplay policy */
    }
  }, [getOrCreateContext]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (prefersReducedMotion() || !enabled) {
      fadeOutAndClear();
      return () => {
        clearPending();
      };
    }

    const rawSrc = page === 'none' ? '' : PAGE_SOUNDS[page] ?? '';
    if (!rawSrc) {
      fadeOutAndClear();
      return () => {
        clearPending();
      };
    }

    const fullSrc = rawSrc.startsWith('http') ? rawSrc : `${R2_BASE}${rawSrc.startsWith('/') ? '' : '/'}${rawSrc}`;

    const startNext = () => {
      void fadeInTarget(fullSrc);
    };

    if (audioRef.current && sourceRef.current) {
      fadeOutAndClear(startNext);
    } else {
      void fadeInTarget(fullSrc);
    }

    return () => {
      clearPending();
    };
  }, [page, enabled, fadeOutAndClear, fadeInTarget, clearPending]);

  useEffect(() => {
    return () => {
      clearPending();
      disconnectChain();
      void ctxRef.current?.close();
      ctxRef.current = null;
      gainRef.current = null;
    };
  }, [clearPending, disconnectChain]);
}
