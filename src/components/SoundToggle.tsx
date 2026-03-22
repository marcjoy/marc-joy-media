import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

type SoundToggleProps = {
  soundEnabled: boolean | null;
  setSoundEnabled: (next: boolean) => void;
};

export default function SoundToggle({ soundEnabled, setSoundEnabled }: SoundToggleProps) {
  const showPrompt = soundEnabled === null;
  const showToggleUi = soundEnabled !== null;

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="fixed inset-x-4 bottom-24 z-[60] hidden flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#0d0d16]/95 p-4 shadow-xl backdrop-blur-sm md:flex md:flex-row md:gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sound-prompt-title"
          >
            <p
              id="sound-prompt-title"
              className="text-center font-body text-sm text-on-surface-variant md:text-left"
            >
              Play subtle ambient sound on this site?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                className="rounded-lg bg-primary-container px-4 py-2 font-headline text-sm font-bold text-on-primary-container"
                onClick={() => setSoundEnabled(true)}
              >
                Enter with sound
              </button>
              <button
                type="button"
                className="rounded-lg bg-surface-container px-4 py-2 font-headline text-sm font-bold text-on-surface"
                onClick={() => setSoundEnabled(false)}
              >
                Enter silent
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showToggleUi && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 z-50 hidden items-center justify-center rounded-md p-2 md:flex"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => {
            if (soundEnabled === null) return;
            setSoundEnabled(!soundEnabled);
          }}
          aria-label={soundEnabled ? 'Mute ambient sound' : 'Unmute ambient sound'}
          aria-pressed={Boolean(soundEnabled)}
        >
          {soundEnabled === true ? (
            <Volume2 className="h-4 w-4 text-on-surface" aria-hidden />
          ) : (
            <VolumeX className="h-4 w-4 text-on-surface" aria-hidden />
          )}
        </motion.button>
      )}
    </>
  );
}
