import { useMemo, type CSSProperties } from 'react';
import '@/styles/kemetopolis-starfield.css';

/** Deterministic PRNG for stable star positions (jaykdoe-style box-shadow field). */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildStarShadow(count: number, seed: number, width: number, height: number): string {
  const rand = mulberry32(seed);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * width);
    const y = Math.floor(rand() * height);
    parts.push(`${x}px ${y}px #fff`);
  }
  return parts.join(',\n    ');
}

const FIELD_W = 2000;
const FIELD_H = 2000;

/**
 * Full-viewport parallax star layers (Uiverse / jaykdoe pattern).
 * Box-shadow density tuned for performance while matching the original look.
 */
export function KemetopolisStarfield() {
  const layer1 = useMemo(() => buildStarShadow(720, 0x9e3779b1, FIELD_W, FIELD_H), []);
  const layer2 = useMemo(() => buildStarShadow(420, 0x6a09e667, FIELD_W, FIELD_H), []);
  const layer3 = useMemo(() => buildStarShadow(180, 0xbb67ae85, FIELD_W, FIELD_H), []);

  const shadowStyle = (shadow: string): CSSProperties =>
    ({ '--kss-shadow': shadow } as CSSProperties);

  return (
    <div className="kemetopolis-starfield" aria-hidden>
      <div className="kemetopolis-stars-container">
        <div
          className="kemetopolis-stars-layer kemetopolis-stars-layer-1"
          style={shadowStyle(layer1)}
        />
        <div
          className="kemetopolis-stars-layer kemetopolis-stars-layer-2"
          style={shadowStyle(layer2)}
        />
        <div
          className="kemetopolis-stars-layer kemetopolis-stars-layer-3"
          style={shadowStyle(layer3)}
        />
      </div>
    </div>
  );
}
