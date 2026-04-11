import { useEffect, useMemo, useState } from 'react';

/** Match grid cell size to CSS (40px desktop, 28px mobile in index.css). */
const CELL_LG = 40;
const CELL_SM = 28;

const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテト0123456789ﾊﾋﾌﾍﾎマミムメラリルレロワヲン';

const MAX_CELLS = 2200;

/**
 * Fixed viewport matrix layer for /worlds (Uiverse “jp-matrix” pattern).
 * Cell count scales with window size; capped for performance.
 */
export function WorldsMatrixBackground() {
  const [cellCount, setCellCount] = useState(900);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cell = w < 768 ? CELL_SM : CELL_LG;
      const cols = Math.ceil(w / cell) + 2;
      const rows = Math.ceil(h / cell) + 4;
      setCellCount(Math.min(cols * rows, MAX_CELLS));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const spans = useMemo(
    () =>
      Array.from({ length: cellCount }, (_, i) => (
        <span key={i}>{GLYPHS[i % GLYPHS.length]}</span>
      )),
    [cellCount],
  );

  return (
    <div className="jp-matrix" aria-hidden>
      {spans}
    </div>
  );
}
