import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SONIC_COSMOS_APPLE_ALBUM_ID, sonicCosmosTracks } from '../data/sonicCosmos';

export type PlayableTrack = {
  title: string;
  durationSec: number;
  previewUrl: string;
};

function normalizeTitle(s: string) {
  return s.trim().toUpperCase();
}

function shuffleNextIndex(length: number, current: number): number {
  if (length <= 1) return 0;
  let n: number;
  do {
    n = Math.floor(Math.random() * length);
  } while (n === current);
  return n;
}

export function useSonicCosmosPlayer() {
  const [tracks, setTracks] = useState<PlayableTrack[]>([]);
  const [previewsError, setPreviewsError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [previewsLoading, setPreviewsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const tracksRef = useRef<PlayableTrack[]>([]);
  const shuffleRef = useRef(false);
  const currentIndexRef = useRef(0);

  tracksRef.current = tracks;
  shuffleRef.current = shuffle;
  currentIndexRef.current = currentIndex;

  const volumeRef = useRef(volume);
  useLayoutEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);
  useLayoutEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://itunes.apple.com/lookup?id=${SONIC_COSMOS_APPLE_ALBUM_ID}&entity=song&limit=200`
        );
        if (!res.ok) throw new Error('lookup failed');
        const data = (await res.json()) as {
          results?: Array<{
            wrapperType?: string;
            trackName?: string;
            previewUrl?: string;
            trackTimeMillis?: number;
            trackNumber?: number;
          }>;
        };
        const rows = (data.results ?? []).filter(
          (r) => r.wrapperType === 'track' && r.previewUrl && r.trackName
        );
        rows.sort((a, b) => (a.trackNumber ?? 0) - (b.trackNumber ?? 0));
        const built: PlayableTrack[] = [];
        for (const row of rows) {
          const meta = sonicCosmosTracks.find(
            (t) => normalizeTitle(t.title) === normalizeTitle(row.trackName!)
          );
          built.push({
            title: row.trackName!,
            durationSec:
              meta?.durationSec ?? Math.max(1, Math.round((row.trackTimeMillis ?? 0) / 1000)),
            previewUrl: row.previewUrl!,
          });
        }
        if (!cancelled) {
          if (built.length === 0) setPreviewsError('No album previews available.');
          else setTracks(built);
        }
      } catch {
        if (!cancelled) setPreviewsError('Could not load album previews.');
      } finally {
        if (!cancelled) setPreviewsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => {
      const list = tracksRef.current;
      if (list.length === 0) return i;
      if (shuffleRef.current) return shuffleNextIndex(list.length, i);
      return (i + 1) % list.length;
    });
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => {
      const list = tracksRef.current;
      if (list.length === 0) return i;
      if (shuffleRef.current) return shuffleNextIndex(list.length, i);
      return (i - 1 + list.length) % list.length;
    });
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    const t = tracks[currentIndex];
    if (!el || !t?.previewUrl) return;

    el.pause();
    el.src = t.previewUrl;
    el.volume = volumeRef.current;

    const onMeta = () => setDuration(Number.isFinite(el.duration) ? el.duration : 0);
    const onTime = () => setCurrentTime(el.currentTime);
    const onEnded = () => {
      setCurrentIndex((i) => {
        const list = tracksRef.current;
        if (list.length === 0) return i;
        if (shuffleRef.current) return shuffleNextIndex(list.length, i);
        return (i + 1) % list.length;
      });
    };

    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnded);
    el.load();

    if (playingRef.current) {
      void el.play().catch(() => setIsPlaying(false));
    } else {
      setCurrentTime(0);
    }

    return () => {
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnded);
    };
  }, [currentIndex, tracks]);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = volume;
  }, [volume]);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    const t = tracks[currentIndex];
    if (!el || !t?.previewUrl) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      void el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentIndex, isPlaying, tracks]);

  const seekRatio = useCallback((ratio: number) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const r = Math.min(1, Math.max(0, ratio));
    el.currentTime = r * duration;
    setCurrentTime(el.currentTime);
  }, [duration]);

  const selectTrack = useCallback(
    (index: number) => {
      if (index === currentIndex) {
        togglePlay();
        return;
      }
      setCurrentIndex(index);
      playingRef.current = true;
      setIsPlaying(true);
    },
    [currentIndex, togglePlay]
  );

  const toggleShuffle = useCallback(() => setShuffle((s) => !s), []);

  const currentTrack = tracks[currentIndex] ?? null;
  const progress = duration > 0 ? currentTime / duration : 0;

  return {
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
    hasPlayback: tracks.length > 0 && !!currentTrack?.previewUrl,
    togglePlay,
    goNext,
    goPrev,
    seekRatio,
    selectTrack,
  };
}
