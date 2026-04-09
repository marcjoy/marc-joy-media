import { useCallback, useEffect, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { images } from '../lib/images';

const BORDER_INACTIVE = 'rgba(255, 255, 255, 0.08)';

const ntruElements = [
  {
    name: 'Flame of Sekhmet',
    deity: 'SEKHMET',
    description:
      "Fire that heals before it destroys. Sekhmet's flame is not rage — it is precision. Those who channel it learn the difference between burning down and burning away.",
    image: images.world.ntruFire,
    accent: '#D4683A',
    icon: '🔥',
  },
  {
    name: 'Tears of Oshun',
    deity: 'OSHUN',
    description:
      "Water that remembers every vessel it has ever filled. Oshun's tears carry the weight of what was asked for and what was actually needed — two things that are rarely the same.",
    image: images.world.ntruWater,
    accent: '#3A8FD4',
    icon: '💧',
  },
  {
    name: 'Breath of Shu',
    deity: 'SHU',
    description:
      "Air that has been everywhere and belongs nowhere. Shu's breath is the space between things — the pause before the word, the gap between heartbeats. Most people call it silence. Shu's practitioners call it room.",
    image: images.world.ntruAir,
    accent: '#7A9E5F',
    icon: '🌬',
  },
  {
    name: 'Bones of Geb',
    deity: 'GEB',
    description:
      'Earth that holds memory in its layers. Geb does not move quickly. That is not a limitation — it is the point. What Geb builds lasts. What Geb breaks stays broken. Practitioners of this element are architects, engineers, and historians.',
    image: images.world.ntruEarth,
    accent: '#8B6F47',
    icon: '🪨',
  },
  {
    name: 'Spear of Shango',
    deity: 'SHANGO',
    description:
      'Lightning that chooses its target before it strikes. Shango does not miss. This is the most visible of the five core elements and the most misunderstood — people see the flash and think it is about destruction. It is about arrival. Lightning is the fastest way from one point to another.',
    image: images.world.ntruLightning,
    accent: '#7B5EA7',
    icon: '⚡',
  },
] as const;

const MD_QUERY = '(min-width: 768px)';

export default function NtruArtsSelector() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [animated, setAnimated] = useState<number[]>([]);
  const [isMd, setIsMd] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MD_QUERY).matches : true,
  );

  useEffect(() => {
    const mq = window.matchMedia(MD_QUERY);
    const onChange = () => setIsMd(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const ids = ntruElements.map((_, i) =>
      window.setTimeout(
        () => setAnimated((prev) => (prev.includes(i) ? prev : [...prev, i])),
        150 * i,
      ),
    );
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const activate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const onKeyDown = useCallback(
    (index: number, e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(index);
      }
    },
    [activate],
  );

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-surface-container-low md:h-[480px] flex flex-col md:flex-row">
      {ntruElements.map((el, index) => {
        const active = activeIndex === index;
        const entered = animated.includes(index);

        const panelStyle: CSSProperties = {
          backgroundImage: `url('${el.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.7s ease-in-out',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          opacity: entered ? 1 : 0,
          transform: entered
            ? isMd
              ? 'translateX(0)'
              : 'translateY(0)'
            : isMd
              ? 'translateX(-40px)'
              : 'translateY(-24px)',
        };

        if (isMd) {
          panelStyle.flex = active ? '6 1 0%' : '1 1 0%';
          panelStyle.minWidth = '52px';
          panelStyle.height = '100%';
          panelStyle.borderLeft = `2px solid ${active ? el.accent : BORDER_INACTIVE}`;
        } else {
          panelStyle.flex = 'none';
          panelStyle.width = '100%';
          panelStyle.height = active ? '320px' : '120px';
          panelStyle.borderTop = index === 0 ? 'none' : `2px solid ${BORDER_INACTIVE}`;
          panelStyle.borderLeft = `4px solid ${active ? el.accent : 'transparent'}`;
        }

        return (
          <div
            key={el.name}
            role="button"
            tabIndex={0}
            aria-expanded={active}
            aria-label={`${el.name}, ${el.deity}`}
            onClick={() => activate(index)}
            onKeyDown={(e) => onKeyDown(index, e)}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style={panelStyle}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: active
                  ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
              }}
            />

            <div className="pointer-events-none absolute bottom-5 left-4 right-4 z-10">
              <span
                className="mb-1 block font-mono text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{
                  color: el.accent,
                  opacity: active ? 1 : 0,
                  maxHeight: active ? 24 : 0,
                  overflow: 'hidden',
                  transform: active ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'all 0.7s ease',
                }}
              >
                {el.deity}
              </span>

              <div className="flex items-end gap-2">
                {(active || !isMd) && (
                  <span className="text-lg md:text-xl" style={{ opacity: active ? 0.9 : 0.75 }} aria-hidden>
                    {el.icon}
                  </span>
                )}
                <div
                  className="font-headline font-bold leading-tight"
                  style={{
                    fontSize: active ? '22px' : '12px',
                    fontWeight: 700,
                    color: active ? el.accent : 'var(--color-on-surface)',
                    lineHeight: 1.2,
                    writingMode:
                      isMd && !active ? 'vertical-rl' : 'horizontal-tb',
                    whiteSpace: isMd && !active ? 'nowrap' : 'normal',
                    transition: 'all 0.7s ease',
                  }}
                >
                  {el.name}
                </div>
              </div>

              {active && (
                <p
                  className="mt-2.5 max-w-[480px] text-sm leading-relaxed text-on-surface-variant"
                  style={{
                    transition: 'opacity 0.5s ease 0.3s',
                  }}
                >
                  {el.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
