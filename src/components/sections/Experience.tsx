'use client';

import React, { useRef, useState, useEffect } from 'react';
import { EXPERIENCE } from '@/lib/data';
import { useInView } from '@/lib/hooks';

export function Experience() {
  const [containerRef, isInView] = useInView({ threshold: 0.05 });
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [spineHeight, setSpineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of scroll through this section
      const totalDist = rect.height;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / (totalDist + windowHeight * 0.4)));

      setSpineHeight(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-[var(--paper)] border-t border-[var(--line)]"
    >
      <div className="page-container" ref={containerRef}>
        {/* Section Header */}
        <div className="mb-16">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>05 — Experience & Education</span>
          </div>
          <h2 className="section-heading">
            One continuous
            <span className="section-heading-serif">trajectory.</span>
          </h2>
          <p className="mt-4 text-[var(--mute)] max-w-2xl text-base sm:text-lg">
            Chronological engineering milestones, studio leadership, non-profit contributions, and academic excellence.
          </p>
        </div>

        {/* Vertical Timeline with Scroll-Drawn Spine */}
        <div className="relative pl-6 sm:pl-10 ml-2 sm:ml-6">
          {/* Base Background Track */}
          <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[var(--line)]" />

          {/* Dynamic Scroll-Drawn Spine */}
          <div
            className="absolute top-0 left-0 w-[2px] bg-[var(--ink)] origin-top transition-transform duration-100 ease-out"
            style={{
              height: '100%',
              transform: `scaleY(${spineHeight})`,
            }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCE.map((item, idx) => {
              // Estimate threshold for lighting up this node
              const nodeThreshold = (idx + 0.5) / (EXPERIENCE.length + 1);
              const isLit = spineHeight >= nodeThreshold;

              return (
                <div key={item.index} className="relative group">
                  {/* Stop Node Dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isLit
                        ? 'border-[var(--ink)] bg-[var(--ink)] scale-110 shadow-sm'
                        : 'border-[var(--faint)] bg-[var(--paper)]'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isLit ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  </div>

                  {/* Card Container */}
                  <div className="card-surface p-6 sm:p-8 ml-2 sm:ml-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[var(--faint)]">
                          {item.index}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                          {item.role}
                        </h3>
                      </div>
                      {item.badge && (
                        <span className="inline-block self-start sm:self-auto px-3 py-1 rounded-full bg-[var(--paper)] border border-[var(--line)] font-mono text-xs font-semibold text-[var(--ink)]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-xs text-[var(--mute)] mb-4 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[var(--ink)]">{item.organization}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                      <span>•</span>
                      <span className="text-[var(--faint)]">{item.period}</span>
                    </div>

                    <ul className="space-y-2 text-sm sm:text-base text-[var(--ink-2)] font-normal leading-relaxed">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="text-[var(--mute)] select-none leading-none pt-1">
                            —
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* End Dashed Card: "Next — Your team?" */}
            <div className="relative">
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full border-2 border-dashed border-[var(--ink)] bg-[var(--paper)] transition-all duration-300 ${
                  spineHeight >= 0.95 ? 'scale-110 bg-[var(--ink)] border-solid' : ''
                }`}
              />

              <div className="ml-2 sm:ml-4 border-2 border-dashed border-[var(--line-strong)] rounded-[28px] p-6 sm:p-8 bg-white/40 hover:bg-white transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-1">
                    NEXT CHAPTER
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
                    Next — Your team?
                  </h4>
                  <p className="text-sm text-[var(--mute)] mt-1">
                    Open for innovative full-stack software and AI systems engineering opportunities.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="btn-primary text-xs shrink-0 self-start sm:self-auto"
                >
                  Start Conversation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
