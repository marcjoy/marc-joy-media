import { useEffect, useState } from 'react';
import SphereImageGrid, { type ImageData } from '@/components/ui/img-sphere';

type Props = {
  images: ImageData[];
};

/** Responsive wrapper: Cosmic Kids portraits in an interactive 3D sphere. */
export function CosmicKidsSphereExplorer({ images }: Props) {
  const [size, setSize] = useState(520);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setSize(Math.max(280, Math.min(360, w - 32)));
      else if (w < 768) setSize(400);
      else if (w < 1024) setSize(520);
      else setSize(600);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="flex w-full justify-center overflow-x-auto py-6 md:py-10">
      <SphereImageGrid
        images={images}
        containerSize={size}
        sphereRadius={size * 0.38}
        dragSensitivity={0.65}
        momentumDecay={0.96}
        maxRotationSpeed={6}
        baseImageScale={0.14}
        perspective={1000}
        autoRotate
        autoRotateSpeed={0.18}
        className="mx-auto shrink-0"
      />
    </div>
  );
}
