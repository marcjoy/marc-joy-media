import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { siteAudio } from '../lib/images';

export interface SiteAudioContextValue {
  isPlaying: boolean;
  volume: number;
  hasChosenPreference: boolean;
  enableAudio: () => void;
  disableAudio: () => void;
  togglePlayback: () => void;
  setVolume: (v: number) => void;
}

const AudioCtx = createContext<SiteAudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(() => {
    if (typeof window === 'undefined') return 0.15;
    const saved = localStorage.getItem('marcjoy-audio-volume');
    const v = saved ? parseFloat(saved) : 0.15;
    return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.15;
  });
  const [hasChosenPreference, setHasChosenPreference] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('marcjoy-audio-preference') !== null;
  });

  useEffect(() => {
    // URL points at WAV in siteAudio — large file; compress for production (see images.ts).
    const audio = new Audio(siteAudio.ambient);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pref = localStorage.getItem('marcjoy-audio-preference');

    if (pref === 'on' && !prefersReducedMotion) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = volume;
    if (typeof window !== 'undefined') {
      localStorage.setItem('marcjoy-audio-volume', String(volume));
    }
  }, [volume]);

  const enableAudio = useCallback(() => {
    localStorage.setItem('marcjoy-audio-preference', 'on');
    setHasChosenPreference(true);
    const el = audioRef.current;
    if (el) {
      el.volume = volume;
      void el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [volume]);

  const disableAudio = useCallback(() => {
    localStorage.setItem('marcjoy-audio-preference', 'off');
    setHasChosenPreference(true);
    const el = audioRef.current;
    if (el) el.pause();
    setIsPlaying(false);
  }, []);

  const togglePlayback = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
      localStorage.setItem('marcjoy-audio-preference', 'off');
    } else {
      el.volume = volume;
      void el.play().then(() => {
        setIsPlaying(true);
        localStorage.setItem('marcjoy-audio-preference', 'on');
      }).catch(() => {});
    }
  }, [isPlaying, volume]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)));
  }, []);

  const value: SiteAudioContextValue = {
    isPlaying,
    volume,
    hasChosenPreference,
    enableAudio,
    disableAudio,
    togglePlayback,
    setVolume,
  };

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}
