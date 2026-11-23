'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/lib/data';
import { useInView } from '@/lib/hooks';

export function Certifications() {
  const [containerRef, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="py-24 bg-white border-y border-[var(--line)]"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          {/* Left Column: Sticky Heading & Count */}
          <div className="lg:sticky lg:top-28">
            <div className="section-tag">
              <span className="section-tag-dot" />
              <span>04 — Credentials & Verification</span>
            </div>
            <h2 className="section-heading">
              Always
              <span className="section-heading-serif">learning.</span>
            </h2>
            <p className="mt-4 text-[var(--mute)] text-sm sm:text-base leading-relaxed">
              Continuous validation across cloud infrastructure, artificial intelligence, enterprise Java, and applied machine learning.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[var(--faint)] border border-[var(--line)] px-3 py-1.5 rounded-full">
              <span>Verified count:</span>
              <span className="font-bold text-[var(--ink)]">
                {CERTIFICATIONS.length.toString().padStart(2, '0')} Credentials
              </span>
            </div>
          </div>

          {/* Right Column: Ink-Flood Numbered List */}
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.index}
                tabIndex={0}
                className="group relative p-6 sm:p-8 overflow-hidden transition-colors duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
              >
                {/* Ink flood background on hover/focus (scaleX 0 -> 1) */}
                <span
                  className="absolute inset-0 bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[var(--ease)] -z-0 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex items-start justify-between gap-6">
                  <div className="flex items-start gap-6 sm:gap-8">
                    <span className="font-mono text-xs sm:text-sm text-[var(--faint)] group-hover:text-white/60 group-focus:text-white/60 transition-colors pt-1">
                      {cert.index}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:text-white group-focus:text-white transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--mute)] group-hover:text-white/80 group-focus:text-white/80 transition-colors">
                        <span className="font-semibold">{cert.issuer}</span>
                        <span>•</span>
                        <span>{cert.date}</span>
                      </div>
                      <p className="mt-3 text-xs sm:text-sm text-[var(--ink-2)] group-hover:text-neutral-300 group-focus:text-neutral-300 transition-colors leading-relaxed max-w-2xl">
                        {cert.focus}
                      </p>
                    </div>
                  </div>

                  {/* Arrow slide indicator */}
                  <div className="w-10 h-10 rounded-full border border-[var(--line)] group-hover:border-white/30 flex items-center justify-center text-[var(--mute)] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0">
                    ↗
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
