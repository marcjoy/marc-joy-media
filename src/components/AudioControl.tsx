import { useState, useRef, useEffect, useCallback } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from './AudioProvider';

export function AudioControl() {
  const { isPlaying, volume, hasChosenPreference, togglePlayback, setVolume } = useAudio();
  const [isExpanded, setIsExpanded] = useState(false);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [touchExpandMode, setTouchExpandMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const sync = () => setTouchExpandMode(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const clearCollapseTimer = useCallback(() => {
    if (collapseTimeoutRef.current !== null) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  }, []);

  if (!hasChosenPreference) return null;

  const handleMouseEnter = () => {
    if (touchExpandMode) return;
    clearCollapseTimer();
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (touchExpandMode) return;
    clearCollapseTimer();
    collapseTimeoutRef.current = setTimeout(() => setIsExpanded(false), 800);
  };

  const handleMuteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    togglePlayback();
  };

  const handleContainerClick = () => {
    if (!touchExpandMode) return;
    setIsExpanded((prev) => !prev);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && !isPlaying) {
      togglePlayback();
    }
    if (newVol === 0 && isPlaying) {
      togglePlayback();
    }
  };

  const showSlider = isExpanded;
  const collapsedWidth = touchExpandMode ? '76px' : '44px';

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      className="fixed bottom-6 left-6 z-50 flex cursor-default items-center gap-2 rounded-full border border-[#2a2a35] bg-[#0A0A0F]/80 px-3 py-2 backdrop-blur-md transition-all duration-300 md:bottom-6"
      style={{ width: showSlider ? '180px' : collapsedWidth }}
      role="group"
      aria-label="Ambient audio"
    >
      <button
        type="button"
        onClick={handleMuteClick}
        className="h-5 w-5 shrink-0 text-[#9CA3AF] transition-colors hover:text-[#2DD4BF]"
        aria-label={isPlaying ? 'Mute audio' : 'Unmute audio'}
        aria-pressed={isPlaying}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {!showSlider && touchExpandMode && (
        <span
          className="min-h-5 min-w-[28px] flex-1 touch-manipulation"
          aria-hidden
        />
      )}

      {showSlider && (
        <div className="min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="audio-volume-range h-1 w-full cursor-pointer rounded-full accent-[#2DD4BF]"
            style={{
              background: `linear-gradient(to right, #2DD4BF 0%, #2DD4BF ${volume * 100}%, #2a2a35 ${volume * 100}%, #2a2a35 100%)`,
            }}
            aria-label="Volume"
          />
        </div>
      )}
    </div>
  );
}
