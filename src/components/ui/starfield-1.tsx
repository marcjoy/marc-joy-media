import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/** [x, y, z, screenX, screenY, prevX, prevY, visible] */
export type StarRow = [number, number, number, number, number, number, number, boolean];

type StarfieldState = {
  w: number;
  h: number;
  ctx: CanvasRenderingContext2D | null;
  cw: number;
  ch: number;
  x: number;
  y: number;
  z: number;
  star: { colorRatio: number; arr: StarRow[] };
  prevTime: number;
};

export type StarfieldProps = {
  className?: string;
  starColor?: string;
  bgColor?: string;
  mouseAdjust?: boolean;
  tiltAdjust?: boolean;
  easing?: number;
  /** When true, starfield layer uses pointer events so mousedown/mouseup warp works (blocks clicks through). */
  clickToWarp?: boolean;
  /** Constant hyperspace-style trails */
  hyperspace?: boolean;
  warpFactor?: number;
  opacity?: number;
  speed?: number;
  quantity?: number;
  /** Subtle overlay for text contrast */
  withScrim?: boolean;
};

const defaultSd = (): StarfieldState => ({
  w: 0,
  h: 0,
  ctx: null,
  cw: 0,
  ch: 0,
  x: 0,
  y: 0,
  z: 0,
  star: { colorRatio: 0, arr: [] },
  prevTime: 0,
});

export function Starfield({
  className,
  starColor = 'rgba(255,255,255,1)',
  bgColor = 'rgba(0,0,0,1)',
  mouseAdjust = false,
  tiltAdjust = false,
  easing = 1,
  clickToWarp = false,
  hyperspace = false,
  warpFactor = 10,
  opacity = 0.1,
  speed = 1,
  quantity = 512,
  withScrim = false,
}: StarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const sd = useRef<StarfieldState>(defaultSd());
  const warpActiveRef = useRef(false);
  const propsRef = useRef({
    starColor,
    bgColor,
    hyperspace,
    opacity,
    speed,
    warpFactor,
    easing,
    quantity,
  });
  propsRef.current = {
    starColor,
    bgColor,
    hyperspace,
    opacity,
    speed,
    warpFactor,
    easing,
    quantity,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvasEl = canvasRef.current;
    if (!container || !canvasEl) return;

    const measureViewport = () => {
      sd.current.w = container.clientWidth;
      sd.current.h = container.clientHeight;
      sd.current.x = Math.round(sd.current.w / 2);
      sd.current.y = Math.round(sd.current.h / 2);
      sd.current.z = (sd.current.w + sd.current.h) / 2;
      sd.current.star.colorRatio = 1 / sd.current.z;

      if (cursor.current.x === 0 || cursor.current.y === 0) {
        cursor.current.x = sd.current.x;
        cursor.current.y = sd.current.y;
      }
      if (mouse.current.x === 0 || mouse.current.y === 0) {
        mouse.current.x = cursor.current.x - sd.current.x;
        mouse.current.y = cursor.current.y - sd.current.y;
      }
    };

    const setupCanvas = () => {
      measureViewport();
      const ctx = canvasEl.getContext('2d');
      if (!ctx) return;
      sd.current.ctx = ctx;
      canvasEl.width = sd.current.w;
      canvasEl.height = sd.current.h;
    };

    const bigBang = () => {
      const q = propsRef.current.quantity;
      if (sd.current.star.arr.length !== q) {
        sd.current.star.arr = Array.from({ length: q }, () => [
          Math.random() * sd.current.w * 2 - sd.current.x * 2,
          Math.random() * sd.current.h * 2 - sd.current.y * 2,
          Math.round(Math.random() * sd.current.z),
          0,
          0,
          0,
          0,
          true,
        ] as StarRow);
      }
    };

    const resize = () => {
      const ctx = sd.current.ctx;
      if (!ctx) return;

      const oldStar = { ...sd.current.star, arr: sd.current.star.arr.map((s) => [...s] as StarRow) };
      measureViewport();
      sd.current.cw = ctx.canvas.width;
      sd.current.ch = ctx.canvas.height;

      const q = propsRef.current.quantity;
      const ratio = q / 2;

      if (sd.current.cw !== sd.current.w || sd.current.ch !== sd.current.h) {
        sd.current.x = Math.round(sd.current.w / 2);
        sd.current.y = Math.round(sd.current.h / 2);
        sd.current.z = (sd.current.w + sd.current.h) / 2;
        sd.current.star.colorRatio = 1 / sd.current.z;

        const rw = sd.current.w / sd.current.cw;
        const rh = sd.current.h / sd.current.ch;

        ctx.canvas.width = sd.current.w;
        ctx.canvas.height = sd.current.h;

        if (!sd.current.star.arr.length) {
          bigBang();
        } else {
          sd.current.star.arr = sd.current.star.arr.map((star, i) => {
            const newStar = [...star] as StarRow;
            const prev = oldStar.arr[i];
            if (prev) {
              newStar[0] = prev[0] * rw;
              newStar[1] = prev[1] * rh;
            }
            newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio;
            newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio;
            return newStar;
          });
        }

        ctx.fillStyle = propsRef.current.bgColor;
        ctx.strokeStyle = propsRef.current.starColor;
      }
    };

    const update = () => {
      const { easing: e, speed, warpFactor, quantity: q } = propsRef.current;
      const compSpeed =
        propsRef.current.hyperspace || warpActiveRef.current ? speed * warpFactor : speed;
      const ratio = q / 2;

      mouse.current.x = (cursor.current.x - sd.current.x) / e;
      mouse.current.y = (cursor.current.y - sd.current.y) / e;

      if (sd.current.star.arr.length > 0) {
        sd.current.star.arr = sd.current.star.arr.map((star) => {
          const newStar = [...star] as StarRow;
          newStar[7] = true;
          newStar[5] = newStar[3];
          newStar[6] = newStar[4];
          newStar[0] += mouse.current.x >> 4;

          if (newStar[0] > sd.current.x << 1) {
            newStar[0] -= sd.current.w << 1;
            newStar[7] = false;
          }
          if (newStar[0] < -sd.current.x << 1) {
            newStar[0] += sd.current.w << 1;
            newStar[7] = false;
          }

          newStar[1] += mouse.current.y >> 4;
          if (newStar[1] > sd.current.y << 1) {
            newStar[1] -= sd.current.h << 1;
            newStar[7] = false;
          }
          if (newStar[1] < -sd.current.y << 1) {
            newStar[1] += sd.current.h << 1;
            newStar[7] = false;
          }

          newStar[2] -= compSpeed;
          if (newStar[2] > sd.current.z) {
            newStar[2] -= sd.current.z;
            newStar[7] = false;
          }
          if (newStar[2] < 0) {
            newStar[2] += sd.current.z;
            newStar[7] = false;
          }

          newStar[3] = sd.current.x + (newStar[0] / newStar[2]) * ratio;
          newStar[4] = sd.current.y + (newStar[1] / newStar[2]) * ratio;
          return newStar;
        });
      }
    };

    const draw = () => {
      const ctx = sd.current.ctx;
      if (!ctx) return;

      const { starColor: sc, bgColor: bc, hyperspace: hyp, opacity: op } = propsRef.current;
      const hyperspaceActive = hyp || warpActiveRef.current;
      const fill = hyperspaceActive ? `rgba(0,0,0,${op})` : bc;

      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, sd.current.w, sd.current.h);
      ctx.strokeStyle = sc;

      sd.current.star.arr.forEach((star) => {
        if (
          star[5] > 0 &&
          star[5] < sd.current.w &&
          star[6] > 0 &&
          star[6] < sd.current.h &&
          star[7]
        ) {
          ctx.lineWidth = (1 - sd.current.star.colorRatio * star[2]) * 2;
          ctx.beginPath();
          ctx.moveTo(star[5], star[6]);
          ctx.lineTo(star[3], star[4]);
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      if (sd.current.prevTime === 0) {
        sd.current.prevTime = Date.now();
      }
      resize();
      update();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    const pointerMove = (event: PointerEvent) => {
      const r = container.getBoundingClientRect();
      cursor.current.x = event.clientX - r.left;
      cursor.current.y = event.clientY - r.top;
    };

    const tiltHandler = (event: DeviceOrientationEvent) => {
      if (event.beta != null && event.gamma != null) {
        const x = event.gamma;
        const y = event.beta;
        cursor.current.x = sd.current.w / 2 + x * 5;
        cursor.current.y = sd.current.h / 2 + y * 5;
      }
    };

    const mouseDown = () => {
      warpActiveRef.current = true;
    };
    const mouseUp = () => {
      warpActiveRef.current = false;
    };

    setupCanvas();
    const ctx = sd.current.ctx;
    if (ctx) {
      ctx.fillStyle = bgColor;
      ctx.strokeStyle = starColor;
    }
    bigBang();
    animate();

    if (mouseAdjust) {
      window.addEventListener('pointermove', pointerMove, { passive: true });
    }
    if (tiltAdjust) {
      window.addEventListener('deviceorientation', tiltHandler);
    }
    if (clickToWarp) {
      container.addEventListener('mousedown', mouseDown);
      container.addEventListener('mouseup', mouseUp);
      container.addEventListener('mouseleave', mouseUp);
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (mouseAdjust) {
        window.removeEventListener('pointermove', pointerMove);
      }
      if (tiltAdjust) {
        window.removeEventListener('deviceorientation', tiltHandler);
      }
      if (clickToWarp) {
        container.removeEventListener('mousedown', mouseDown);
        container.removeEventListener('mouseup', mouseUp);
        container.removeEventListener('mouseleave', mouseUp);
      }
      sd.current = defaultSd();
    };
  }, [
    mouseAdjust,
    tiltAdjust,
    clickToWarp,
    quantity,
    bgColor,
    starColor,
    hyperspace,
    opacity,
    speed,
    warpFactor,
    easing,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed inset-0 z-0 overflow-hidden',
        clickToWarp ? 'pointer-events-auto' : 'pointer-events-none',
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 h-full w-full">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      {withScrim ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[#0F0E12]/45"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
