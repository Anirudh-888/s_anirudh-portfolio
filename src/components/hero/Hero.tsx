'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const { scrollTo } = useScroll();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted play first; fall back to muted if blocked
    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          // Try unmuting
          video.muted = false;
          setIsMuted(false);
        })
        .catch(() => {
          // Autoplay with sound was blocked by browser policy
          video.muted = true;
          setIsMuted(true);
          setAutoplayBlocked(true);
          video.play().catch(() => {});
        });
    }

    // Unlock audio on first user gesture
    const unlockAudio = () => {
      if (video) {
        video.muted = false;
        setIsMuted(false);
        setAutoplayBlocked(false);
        video.play().catch(() => {});
      }
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchend', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    window.addEventListener('touchend', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchend', unlockAudio);
    };
  }, []);

  // IntersectionObserver: Pause video when < 35% visible, resume when back
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          video.pause();
          setIsPlaying(false);
        } else {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
      { threshold: [0, 0.35, 1.0] }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      setAutoplayBlocked(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden"
    >
      {/* Ghost Background Uppercase Wordmark behind person */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 text-center w-full overflow-hidden"
        aria-hidden="true"
      >
        <span className="block font-black text-[clamp(6rem,22vw,22rem)] tracking-tighter uppercase leading-none text-black opacity-[0.65] sm:opacity-[0.70]">
          ANIRUDH
        </span>
      </div>

      {/* Main Centered Video Frame */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-auto">
        <div className="relative w-full max-w-[768px] flex items-center justify-center">
          <div className="relative h-[clamp(440px,68svh,960px)] aspect-[768/960] overflow-hidden">
            <video
              ref={videoRef}
              loop
              playsInline
              preload="auto"
              poster="/portrait-bust.webp"
              className="w-full h-full object-cover"
              style={{
                filter: 'contrast(1.02) brightness(1.01)',
              }}
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Sound Control: 46px Solid Ink Icon Button with optional ping */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
            <div className="relative flex items-center justify-center">
              {autoplayBlocked && (
                <span className="absolute inset-0 rounded-full border-2 border-[var(--ink)] animate-soft-ping pointer-events-none" />
              )}
              <button
                type="button"
                onClick={toggleSound}
                className="w-[46px] h-[46px] rounded-full bg-[var(--ink)] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ink)]"
                aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
              >
                {isMuted ? (
                  // Solid Play Triangle (▶)
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  // Solid Pause Bars (❚❚)
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Role, Bio snippet & CTAs */}
      <div className="relative z-10 page-container w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-[var(--line)] pt-6">
          <div>
            <div className="font-mono text-xs tracking-wider uppercase text-[var(--mute)] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              {PROFILE.location} • Founder, Cloud & Fire
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">
              {PROFILE.role}
              <span className="font-serif italic text-[var(--mute)] ml-2">.</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#work', -40);
              }}
              className="btn-primary"
            >
              Explore work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact', -40);
              }}
              className="btn-secondary"
            >
              Let&apos;s talk
            </a>
            <a
              href="/resume.pdf"
              download="S_Anirudh_Resume.pdf"
              className="btn-secondary group"
              aria-label="Download Résumé PDF"
            >
              <span>Résumé</span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
