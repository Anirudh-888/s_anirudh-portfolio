'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PROFILE, EDUCATION } from '@/lib/data';
import { useInView } from '@/lib/hooks';

export function About() {
  const [containerRef, isInView] = useInView({ threshold: 0.1 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const lastPointerX = useRef<number | null>(null);
  const velocity = useRef(0);
  const animFrameId = useRef<number | null>(null);

  // Damped pendulum swing physics
  useEffect(() => {
    let currentAngle = 0;
    let vel = 0;
    const damping = 0.94;
    const spring = 0.05;

    const tick = () => {
      // Spring force returning to 0
      const force = -spring * currentAngle;
      vel = (vel + force) * damping;
      currentAngle += vel;

      // Subtle idle sway when resting
      const idleSway = Math.sin(Date.now() / 900) * 0.8;
      setSwingAngle(currentAngle + idleSway);

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (lastPointerX.current !== null) {
      const deltaX = e.clientX - lastPointerX.current;
      velocity.current = Math.max(-12, Math.min(12, deltaX * 0.4));
    }
    lastPointerX.current = e.clientX;
  };

  const handlePointerLeave = () => {
    lastPointerX.current = null;
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding bg-[var(--paper)] border-t border-[var(--line)]"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="mb-14">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>01 — About</span>
          </div>
          <h2 className="section-heading">
            Engineering with focus
            <span className="section-heading-serif">and precision.</span>
          </h2>
        </div>

        {/* 3-Column Layout: Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column: Hi, Summary, Buttons */}
          <div
            className={`card-surface p-8 sm:p-10 flex flex-col justify-between rv ${
              isInView ? 'is-in' : ''
            }`}
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <div>
              <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-3">
                Overview & Background
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-6">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="text-[var(--ink-2)] text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-sm text-[var(--mute)] leading-relaxed border-l-2 border-[var(--ink)] pl-4">
                Founder of Cloud & Fire, leading production delivery for campus web tools and practical AI solutions in Bengaluru, India.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-8 mt-6 border-t border-[var(--line)]">
              <a
                href={PROFILE.resumePath}
                download="S_Anirudh_Resume.pdf"
                className="btn-primary text-xs"
              >
                Résumé PDF ↓
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div
            className={`flex flex-col items-center justify-start relative pt-4 rv ${
              isInView ? 'is-in' : ''
            }`}
            style={{ '--i': 2 } as React.CSSProperties}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {/* Lanyard Strap hanging from top */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-[30px] h-[56px] bg-[var(--ink)] rounded-t-sm shadow-inner flex flex-col items-center justify-center overflow-hidden border-x border-white/20">
                <span className="font-mono text-[8px] text-white/70 uppercase tracking-widest whitespace-nowrap rotate-90 select-none">
                  ANIRUDH • ID
                </span>
              </div>
              {/* Metallic Clip */}
              <div className="w-[20px] h-[14px] bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 rounded-sm border border-neutral-500 shadow-sm flex items-center justify-center -mt-1 z-20">
                <div className="w-[10px] h-[3px] bg-neutral-600 rounded-full" />
              </div>
              {/* Loop Ring */}
              <div className="w-[14px] h-[8px] border-2 border-neutral-400 rounded-b-full -mt-0.5 z-10" />
            </div>

            {/* 3D Interactive Swinging Card Frame */}
            <div
              className="perspective-1000 w-full max-w-[310px] flex justify-center -mt-1 cursor-pointer select-none"
              style={{
                transform: `rotate(${swingAngle}deg)`,
                transformOrigin: 'top center',
                transition: 'transform 0.1s linear',
              }}
              onClick={toggleFlip}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label="Student and Developer ID Card. Press Enter or click to flip card."
            >
              <div
                className={`relative w-[300px] h-[404px] transform-style-3d transition-transform duration-700 ease-[var(--ease)] ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 backface-hidden w-full h-full bg-white rounded-2xl p-5 shadow-xl border border-neutral-200 flex flex-col justify-between overflow-hidden">
                  {/* Top Black Band */}
                  <div className="bg-[var(--ink)] text-white -mx-5 -mt-5 px-5 py-2.5 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-white/90">
                      DEVELOPER ID
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400">
                      VTU • 2022 SCHEME
                    </span>
                  </div>

                  {/* Centered Portrait */}
                  <div className="flex flex-col items-center mt-3">
                    <div className="relative w-[128px] h-[156px] rounded-xl overflow-hidden p-1 bg-gradient-to-b from-neutral-100 to-neutral-200 shadow-inner group">
                      <img
                        src="/profile.png"
                        alt={PROFILE.name}
                        className="w-full h-full object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-center mt-3">
                      <h4 className="text-base font-bold text-[var(--ink)] tracking-tight">
                        {PROFILE.name}
                      </h4>
                      <p className="font-mono text-[11px] text-[var(--mute)]">
                        {PROFILE.role}
                      </p>
                    </div>
                  </div>

                  {/* Metadata Rows */}
                  <div className="space-y-1 font-mono text-[10px] border-t border-neutral-100 pt-2 text-[var(--ink-2)]">
                    <div className="flex justify-between">
                      <span className="text-[var(--faint)]">USN / ID:</span>
                      <span className="font-semibold">{PROFILE.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--faint)]">DEPT:</span>
                      <span className="font-semibold truncate max-w-[170px]">
                        Info Science & Eng
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--faint)]">VALID TILL:</span>
                      <span className="font-semibold">{PROFILE.graduationYear}</span>
                    </div>
                  </div>

                  {/* Bottom: Barcode + Holographic Foil */}
                  <div className="flex items-center justify-between border-t border-neutral-200 pt-2 -mb-1">
                    {/* Barcode in grays */}
                    <div className="flex items-center gap-[2px] h-6">
                      {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2].map((w, i) => (
                        <div
                          key={i}
                          className="bg-neutral-800 h-full"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>
                    {/* Holographic Sticker in grays */}
                    <div className="w-10 h-6 rounded bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 border border-neutral-400 flex items-center justify-center shadow-xs">
                      <span className="font-mono text-[7px] font-bold text-neutral-600 tracking-tighter">
                        C&F
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-white rounded-2xl p-5 shadow-xl border border-neutral-200 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--mute)] border-b border-neutral-100 pb-2 mb-3">
                      WHAT I AM
                    </div>
                    <ul className="space-y-2 font-mono text-[11px] text-[var(--ink-2)] leading-tight">
                      <li>• Full-Stack Engineer & AI Builder</li>
                      <li>• B.E. ISE ({EDUCATION.cgpa} CGPA)</li>
                      <li>• 1st Place Winner — SDC Startup Challenge</li>
                      <li>• Creator of EvntPulse & Heliri Bengaluru</li>
                      <li>• Google Cloud Arcade Facilitator 2026</li>
                    </ul>
                  </div>

                  <div className="space-y-3 border-t border-neutral-100 pt-3">
                    <div>
                      <div className="font-mono text-[8px] text-[var(--faint)] uppercase">
                        AUTHORIZED SIGNATURE
                      </div>
                      <div className="font-serif italic text-lg text-neutral-800 tracking-wide border-b border-neutral-200 pb-0.5">
                        S. Anirudh
                      </div>
                    </div>
                    <div className="font-mono text-[9px] text-[var(--mute)]">
                      If found, say hello •{' '}
                      <span className="font-semibold text-[var(--ink)]">
                        {PROFILE.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 font-mono text-[11px] text-[var(--faint)] text-center">
              (click or tap to flip card)
            </div>
          </div>

          {/* Right Column: Quick Facts & Verbatim Quote */}
          <div
            className={`card-surface p-8 sm:p-10 flex flex-col justify-between rv ${
              isInView ? 'is-in' : ''
            }`}
            style={{ '--i': 3 } as React.CSSProperties}
          >
            <div>
              <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-6">
                Quick Facts
              </div>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[var(--line)]">
                  <dt className="font-mono text-xs text-[var(--mute)]">Base</dt>
                  <dd className="font-medium text-sm text-[var(--ink)] sm:text-right">
                    {PROFILE.location}
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[var(--line)]">
                  <dt className="font-mono text-xs text-[var(--mute)]">Education</dt>
                  <dd className="font-medium text-sm text-[var(--ink)] sm:text-right">
                    MVJCE (2024–2028)
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[var(--line)]">
                  <dt className="font-mono text-xs text-[var(--mute)]">Current Focus</dt>
                  <dd className="font-medium text-sm text-[var(--ink)] sm:text-right">
                    Founder, Cloud & Fire
                  </dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-[var(--line)]">
                  <dt className="font-mono text-xs text-[var(--mute)]">Email</dt>
                  <dd className="font-medium text-sm text-[var(--ink)] sm:text-right truncate max-w-[200px]">
                    {PROFILE.email}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--line)]">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--ink-2)] leading-relaxed">
                &ldquo;{PROFILE.aboutQuote}&rdquo;
              </blockquote>
              <div className="font-mono text-xs text-[var(--faint)] mt-2">
                — S Anirudh, Engineering Manifesto
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
