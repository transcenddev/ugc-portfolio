"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Only one clip is allowed to play with sound at a time. When a player takes
 * audio, every other mounted player mutes itself.
 */
const AUDIO_CLAIM_EVENT = "reymar:audio-claim";

function claimAudio(id: string) {
  window.dispatchEvent(new CustomEvent(AUDIO_CLAIM_EVENT, { detail: id }));
}

type VideoMediaProps = {
  /** Path relative to the video base, used for the a11y label fallback. */
  file: string;
  /** Full video URL. */
  src: string;
  /** Generated first-frame image. Shown until playback starts. */
  poster?: string;
  /** Human-readable label for screen readers. */
  label: string;
  className?: string;
  /**
   * "stage" clips autoplay muted when scrolled into view (Featured).
   * "grid" clips never autoplay — they load only when tapped (Library).
   */
  mode?: "stage" | "grid";
};

function PlayIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5.2v13.6a1 1 0 0 0 1.52.86l10.35-6.8a1 1 0 0 0 0-1.72L9.52 4.34A1 1 0 0 0 8 5.2Z" />
    </svg>
  ) : (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 5.5c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5v13c0 .28-.22.5-.5.5h-2a.5.5 0 0 1-.5-.5v-13Zm7 0c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5v13c0 .28-.22.5-.5.5h-2a.5.5 0 0 1-.5-.5v-13Z" />
    </svg>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M5 10v4h3l4 3V7l-4 3H5Zm10.5 1.5 4 4m0-4-4 4" />
    </svg>
  ) : (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M5 10v4h3l4 3V7l-4 3H5Zm10.5-2a5 5 0 0 1 0 8m2.5-10.5a8.5 8.5 0 0 1 0 13" />
    </svg>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersLessData() {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  return Boolean(connection?.saveData);
}

export function VideoMedia({
  file,
  src,
  poster,
  label,
  className = "",
  mode = "grid",
}: VideoMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousVolumeRef = useRef(1);
  const playerId = useId();

  /** The <video> element is not rendered at all until this flips true. */
  const [isActivated, setIsActivated] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const hideControlsSoon = useCallback(() => {
    clearHideTimer();
    if (!videoRef.current?.paused) {
      hideTimerRef.current = setTimeout(() => {
        setIsControlsVisible(false);
        setIsVolumeVisible(false);
      }, 2500);
    }
  }, [clearHideTimer]);

  const revealControls = useCallback(() => {
    setIsControlsVisible(true);
    hideControlsSoon();
  }, [hideControlsSoon]);

  /** Tap on the poster: load, play, and take audio. */
  const activateWithSound = useCallback(() => {
    setIsActivated(true);
    setIsMuted(false);
    claimAudio(playerId);
    revealControls();
  }, [playerId, revealControls]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsPaused(true));
    } else {
      video.pause();
    }
    revealControls();
  }, [revealControls]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || video.volume === 0) {
      video.muted = false;
      video.volume = previousVolumeRef.current || 1;
      setVolume(video.volume);
      setIsMuted(false);
      claimAudio(playerId);
    } else {
      previousVolumeRef.current = video.volume;
      video.muted = true;
      setIsMuted(true);
    }
    revealControls();
  }, [playerId, revealControls]);

  const updateVolume = (nextVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    const safeVolume = Math.max(0, Math.min(1, nextVolume));
    video.volume = safeVolume;
    video.muted = safeVolume === 0;
    setVolume(safeVolume);
    setIsMuted(safeVolume === 0);
    if (safeVolume > 0) {
      previousVolumeRef.current = safeVolume;
      claimAudio(playerId);
    }
    revealControls();
  };

  // Mute whenever another player takes audio.
  useEffect(() => {
    const onClaim = (event: Event) => {
      const claimant = (event as CustomEvent<string>).detail;
      if (claimant === playerId) return;
      const video = videoRef.current;
      if (video && !video.muted) {
        video.muted = true;
        setIsMuted(true);
      }
    };

    window.addEventListener(AUDIO_CLAIM_EVENT, onClaim);
    return () => window.removeEventListener(AUDIO_CLAIM_EVENT, onClaim);
  }, [playerId]);

  // Featured clips autoplay muted while in view; everything pauses off-screen.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canAutoplay =
      mode === "stage" && !prefersReducedMotion() && !prefersLessData();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;

        if (entry.isIntersecting) {
          if (canAutoplay && !isActivated) setIsActivated(true);
          if (canAutoplay && video?.paused) {
            void video.play().catch(() => undefined);
          }
          return;
        }

        if (video && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [mode, isActivated]);

  useEffect(() => clearHideTimer, [clearHideTimer]);

  const showPoster = !isActivated;

  return (
    <div
      ref={containerRef}
      className={`group/player relative h-full w-full overflow-hidden bg-stage-raised ${className}`}
      onMouseEnter={() => isActivated && revealControls()}
      onMouseLeave={() => {
        clearHideTimer();
        setIsControlsVisible(false);
        setIsVolumeVisible(false);
      }}
      onPointerMove={() => isActivated && revealControls()}
    >
      {/* Poster state — zero video bytes until the visitor asks for them. */}
      {showPoster && (
        <button
          aria-label={`Play ${label}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
          onClick={activateWithSound}
          type="button"
        >
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt=""
              className="h-full w-full object-cover"
              decoding="async"
              loading="lazy"
              src={poster}
            />
          ) : (
            <span className="absolute inset-0 bg-stage-raised" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-stage/20 transition-colors duration-200 group-hover/player:bg-stage/35">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-stage-text/95 text-stage shadow-lg transition-transform duration-200 group-hover/player:scale-105">
              <svg aria-hidden="true" className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5.2v13.6a1 1 0 0 0 1.52.86l10.35-6.8a1 1 0 0 0 0-1.72L9.52 4.34A1 1 0 0 0 8 5.2Z" />
              </svg>
            </span>
          </span>
        </button>
      )}

      {isActivated && (
        <>
          <video
            ref={videoRef}
            aria-label={label || file}
            autoPlay
            className="h-full w-full object-cover"
            disablePictureInPicture
            disableRemotePlayback
            loop
            muted={isMuted}
            onClick={togglePlayback}
            onKeyDown={(event) => {
              if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                togglePlayback();
              }
              if (event.key.toLowerCase() === "m") {
                event.preventDefault();
                toggleMute();
              }
            }}
            onLoadedMetadata={() => {
              const video = videoRef.current;
              if (!video) return;
              setDuration(video.duration);
              video.volume = volume;
              void video.play().catch(() => setIsPaused(true));
            }}
            onPause={() => {
              setIsPaused(true);
              setIsControlsVisible(true);
              clearHideTimer();
            }}
            onPlay={() => {
              setIsPaused(false);
              hideControlsSoon();
            }}
            onTimeUpdate={() => setProgress(videoRef.current?.currentTime ?? 0)}
            playsInline
            poster={poster}
            preload="metadata"
            src={src}
            tabIndex={0}
          />

          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
              isControlsVisible || isPaused ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              aria-label={isPaused ? `Play ${label}` : `Pause ${label}`}
              className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#262626]/75 p-0 text-white shadow-sm backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-[#262626]/90 active:scale-95"
              onClick={(event) => {
                event.stopPropagation();
                togglePlayback();
              }}
              type="button"
            >
              <PlayIcon paused={isPaused} />
            </button>

            <div
              className="pointer-events-auto absolute bottom-0 left-0 right-0 flex items-end gap-2 px-3 pb-3 pt-8"
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <input
                aria-label="Seek video"
                className="video-range h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full"
                max={duration || 0}
                min="0"
                onChange={(event) => {
                  const nextTime = Number(event.target.value);
                  if (videoRef.current) videoRef.current.currentTime = nextTime;
                  setProgress(nextTime);
                  revealControls();
                }}
                step="0.01"
                style={
                  {
                    "--range-progress": `${duration ? (progress / duration) * 100 : 0}%`,
                  } as CSSProperties
                }
                type="range"
                value={progress}
              />
              <div
                className="group/mute relative shrink-0"
                onMouseEnter={() => setIsVolumeVisible(true)}
                onMouseLeave={() => setIsVolumeVisible(false)}
              >
                {isVolumeVisible && (
                  <input
                    aria-label="Volume"
                    className="volume-range absolute bottom-10 left-1/2 hidden h-24 w-1 -translate-x-1/2 cursor-pointer appearance-none rounded-full [writing-mode:vertical-lr] md:block"
                    max="1"
                    min="0"
                    onChange={(event) => updateVolume(Number(event.target.value))}
                    onClick={(event) => event.stopPropagation()}
                    onPointerDown={(event) => event.stopPropagation()}
                    step="0.01"
                    style={
                      {
                        "--volume-level": `${volume * 100}%`,
                        direction: "rtl",
                      } as CSSProperties
                    }
                    type="range"
                    value={volume}
                  />
                )}
                <button
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="flex h-9 w-9 items-center justify-center text-stage-text drop-shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMute();
                  }}
                  onFocus={() => setIsVolumeVisible(true)}
                  type="button"
                >
                  <SoundIcon muted={isMuted} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
