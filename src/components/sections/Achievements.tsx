'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS, AchievementItem } from '@/lib/data';
import { useInView } from '@/lib/hooks';
import { TechLogo } from '@/components/ui/TechLogo';

// EaseOutQuart function
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

function CounterNumber({ targetValue, suffix }: { targetValue: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const [containerRef, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4s

    const frame = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min(1, (time - startTime) / duration);
      const eased = easeOutQuart(progress);
      setVal(Math.floor(eased * targetValue));

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setVal(targetValue);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [isInView, targetValue]);

  return (
    <div ref={containerRef} className="font-bold text-4xl sm:text-5xl md:text-6xl text-[var(--ink)] tracking-tight">
      {val}
      {suffix}
    </div>
  );
}

export function Achievements() {
  const outerWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const outer = outerWrapperRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="achievements"
      ref={outerWrapperRef}
      className="relative w-full bg-[var(--paper)] border-t border-[var(--line)]"
      style={{ height: 'calc(100svh + 1600px)' }}
    >
      {/* Pinned Sticky 100svh Viewport */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between py-8 sm:py-12 overflow-hidden">
        {/* Header with Title and Thin Progress Bar */}
        <div className="page-container w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="section-tag">
                <span className="section-tag-dot" />
                <span>06 — Honours & Metrics</span>
              </div>
              <h2 className="section-heading">
                Milestones
                <span className="section-heading-serif">achieved.</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--mute)]">
              Scroll horizontally with page scroll
            </div>
          </div>

          {/* Thin Progress Bar in Header */}
          <div className="w-full h-1 bg-[var(--line)] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[var(--ink)] origin-left transition-transform duration-75"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>

        {/* Sliding Horizontal Card Track */}
        <div className="w-full overflow-hidden my-auto py-6">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 px-4 sm:px-12 w-max transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translateX(calc(-${scrollProgress} * (100% - 100vw + 96px)))`,
            }}
          >
            {ACHIEVEMENTS.map((item, idx) => (
              <div
                key={item.index}
                className="w-[clamp(320px,38vw,520px)] h-[clamp(270px,36vh,320px)] card-surface p-7 sm:p-8 flex flex-col justify-between rounded-[28px] shrink-0 relative transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Top: 72px Logo Tile with Brand-Tint Glow & Index */}
                <div className="flex items-center justify-between">
                  <div className="relative w-16 h-16 rounded-2xl bg-[var(--paper)] flex items-center justify-center border border-[var(--line)]">
                    <div className="absolute inset-0 rounded-2xl bg-black/[0.03] blur-sm" />
                    <TechLogo name={item.logo} size={36} />
                  </div>
                  <span className="font-mono text-xs text-[var(--faint)]">
                    {item.index} / {ACHIEVEMENTS.length.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom Left: Title, Description & Date */}
                <div className="flex items-end justify-between gap-4 border-t border-[var(--line)] pt-4 mt-auto">
                  <div className="max-w-[65%]">
                    <div className="font-mono text-xs text-[var(--mute)] mb-1">
                      {item.platform} • {item.date}
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-[var(--ink)] tracking-tight line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--ink-2)] line-clamp-2 mt-1 font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Right: Counting Number */}
                  <div className="text-right shrink-0">
                    <CounterNumber
                      targetValue={item.metricValue}
                      suffix={item.metricSuffix}
                    />
                    <div className="font-mono text-[10px] text-[var(--faint)] uppercase mt-0.5">
                      {item.metric}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End Card: "and counting →" */}
            <div className="w-[clamp(280px,32vw,440px)] h-[clamp(270px,36vh,320px)] rounded-[28px] border-2 border-dashed border-[var(--line-strong)] p-8 flex flex-col justify-between shrink-0 bg-white/40 hover:bg-white transition-colors duration-300">
              <div className="font-mono text-xs text-[var(--mute)]">
                CONTINUOUS EVOLUTION
              </div>
              <div className="my-auto">
                <div className="font-serif italic text-3xl sm:text-4xl text-[var(--ink)] mb-2">
                  and counting &rarr;
                </div>
                <p className="text-xs sm:text-sm text-[var(--mute)]">
                  Expanding algorithmic mastery, cloud architectures, and open-source contributions.
                </p>
              </div>
              <div className="font-mono text-xs text-[var(--faint)]">
                Cloud & Fire • S Anirudh
              </div>
            </div>
          </div>
        </div>

        {/* Footer indicators */}
        <div className="page-container w-full flex items-center justify-between font-mono text-xs text-[var(--mute)]">
          <span>Track progress: {Math.round(scrollProgress * 100)}%</span>
          <span>Verified from curriculum vitae</span>
        </div>
      </div>
    </div>
  );
}
