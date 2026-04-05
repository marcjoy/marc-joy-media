/** Official Sonic Cosmos (Blaq Timbre) track order and durations from store metadata. */

/** Apple Music album id — used to load official preview audio for the on-site player. */
export const SONIC_COSMOS_APPLE_ALBUM_ID = '1851184150';

export const sonicCosmosTracks: { title: string; durationSec: number }[] = [
  { title: 'FLOW', durationSec: 142 },
  { title: 'AIR', durationSec: 183 },
  { title: 'INFINITE', durationSec: 124 },
  { title: 'STEP STEADY', durationSec: 167 },
  { title: 'GLASS HORIZON', durationSec: 182 },
  { title: 'BACK THEN', durationSec: 222 },
  { title: 'WE DANCE', durationSec: 190 },
  { title: 'PROMISED', durationSec: 203 },
  { title: 'FOREVER FREE', durationSec: 162 },
  { title: 'CROWN', durationSec: 170 },
  { title: 'BEND THE TIDE', durationSec: 157 },
];

export function formatTrackDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const streamingLinks = {
  spotify: 'https://open.spotify.com/search/Sonic%20Cosmos%20Blaq%20Timbre',
  appleMusic: 'https://music.apple.com/us/album/sonic-cosmos/1851184150',
  youtubeMusic: 'https://music.youtube.com/search?q=Sonic+Cosmos+Blaq+Timbre',
  tidal: 'https://listen.tidal.com/album/471141175',
} as const;
