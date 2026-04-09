import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

export type BackgroundGradientAnimationProps = {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
};

export function BackgroundGradientAnimation({
  gradientBackgroundStart = 'rgb(108, 0, 162)',
  gradientBackgroundEnd = 'rgb(0, 17, 82)',
  firstColor = '18, 113, 255',
  secondColor = '221, 74, 255',
  thirdColor = '100, 220, 255',
  fourthColor = '200, 50, 50',
  fifthColor = '180, 180, 50',
  pointerColor = '140, 100, 255',
  size = '80%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const curRef = useRef({ x: 0, y: 0 });
  const tgRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--gradient-background-start', gradientBackgroundStart);
    el.style.setProperty('--gradient-background-end', gradientBackgroundEnd);
    el.style.setProperty('--bg-grad-size', size);
    el.style.setProperty('--bg-grad-blend', blendingValue);
    el.style.setProperty('--bg-c1', firstColor);
    el.style.setProperty('--bg-c2', secondColor);
    el.style.setProperty('--bg-c3', thirdColor);
    el.style.setProperty('--bg-c4', fourthColor);
    el.style.setProperty('--bg-c5', fifthColor);
    el.style.setProperty('--bg-cp', pointerColor);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    if (!interactive) return;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const cur = curRef.current;
      const tg = tgRef.current;
      cur.x += (tg.x - cur.x) / 20;
      cur.y += (tg.y - cur.y) / 20;
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(cur.x)}px, ${Math.round(cur.y)}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [interactive]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!interactive || !interactiveRef.current) return;
    const rect = interactiveRef.current.getBoundingClientRect();
    tgRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const orbStyle = (animClass: string, opacity: string, origin: string, rgb: string) => (
    <div
      className={cn('absolute mix-blend-hard-light', `k-bg-grad-${animClass}`, opacity)}
      style={{
        width: 'var(--bg-grad-size)',
        height: 'var(--bg-grad-size)',
        top: 'calc(50% - var(--bg-grad-size) / 2)',
        left: 'calc(50% - var(--bg-grad-size) / 2)',
        transformOrigin: origin,
        mixBlendMode: blendingValue as CSSProperties['mixBlendMode'],
        background: `radial-gradient(circle at center, rgba(${rgb}, 0.82) 0%, rgba(${rgb}, 0) 52%) no-repeat`,
      }}
    />
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative left-0 top-0 h-full min-h-screen w-full overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName,
      )}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="k-bg-blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          'gradients-container absolute inset-0 z-0 h-full w-full blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#k-bg-blurMe)_blur(40px)]',
          interactive ? '' : 'pointer-events-none',
        )}
        style={{ pointerEvents: interactive ? 'auto' : 'none' }}
        onMouseMove={interactive ? handleMouseMove : undefined}
      >
        {orbStyle('first', 'opacity-100', 'center center', firstColor)}
        {orbStyle('second', 'opacity-100', 'calc(50% - 400px) 50%', secondColor)}
        {orbStyle('third', 'opacity-100', 'calc(50% + 400px) 50%', thirdColor)}
        {orbStyle('fourth', 'opacity-70', 'calc(50% - 200px) 50%', fourthColor)}
        {orbStyle('fifth', 'opacity-100', 'calc(50% - 800px) calc(50% + 800px)', fifthColor)}

        {interactive && (
          <div
            ref={interactiveRef}
            className="absolute -left-1/2 -top-1/2 h-full w-full opacity-70 mix-blend-hard-light"
            style={{
              mixBlendMode: blendingValue as CSSProperties['mixBlendMode'],
              background: `radial-gradient(circle at center, rgba(${pointerColor}, 0.75) 0%, rgba(${pointerColor}, 0) 50%) no-repeat`,
            }}
          />
        )}
      </div>

      <div className={cn('relative z-[2] pointer-events-auto', className)}>{children}</div>
    </div>
  );
}
