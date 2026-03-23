import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from './AudioProvider';

export function SoundGate() {
  const { hasChosenPreference, enableAudio, disableAudio } = useAudio();

  useEffect(() => {
    if (hasChosenPreference) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [hasChosenPreference]);

  if (hasChosenPreference) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0F]/95 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sound-gate-title"
      >
        <div className="max-w-md px-6 text-center">
          <p className="mb-6 text-xs font-medium tracking-[0.3em] text-[#2DD4BF] uppercase">Marc Joy Media</p>
          <h2
            id="sound-gate-title"
            className="mb-3 font-headline text-3xl font-bold tracking-tight text-[#F5F0E8] md:text-4xl"
          >
            Welcome
          </h2>
          <p className="mb-10 text-sm leading-relaxed text-[#9CA3AF]">
            This site features ambient music. How would you like to enter?
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={enableAudio}
              className="rounded-lg bg-[#2DD4BF] px-8 py-3 font-headline text-sm font-bold tracking-wide text-[#0A0A0F] transition-colors hover:bg-[#2DD4BF]/90"
            >
              ENTER WITH SOUND
            </button>
            <button
              type="button"
              onClick={disableAudio}
              className="rounded-lg border border-[#2a2a35] px-8 py-3 font-headline text-sm font-bold tracking-wide text-[#9CA3AF] transition-colors hover:border-[#F5F0E8] hover:text-[#F5F0E8]"
            >
              ENTER SILENT
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
