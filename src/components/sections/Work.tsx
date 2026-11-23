'use client';

import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '@/lib/data';
import { useInView } from '@/lib/hooks';
import { TechLogo } from '@/components/ui/TechLogo';

export function Work() {
  const [containerRef, isInView] = useInView({ threshold: 0.1 });
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [showRealScreenshots, setShowRealScreenshots] = useState<boolean>(true);

  return (
    <section
      id="work"
      ref={containerRef}
      className="section-padding bg-[var(--paper)] border-t border-[var(--line)]"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-tag">
              <span className="section-tag-dot" />
              <span>03 — Selected Work</span>
            </div>
            <h2 className="section-heading">
              Things I&apos;ve built
              <span className="section-heading-serif">with purpose.</span>
            </h2>
          </div>

          {/* Toggle between Schematic Minimal UI & Production UI */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-[var(--line)] shadow-xs">
            <button
              type="button"
              onClick={() => setShowRealScreenshots(false)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-colors ${
                !showRealScreenshots
                  ? 'bg-[var(--ink)] text-white'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              Schematic UI
            </button>
            <button
              type="button"
              onClick={() => setShowRealScreenshots(true)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-colors ${
                showRealScreenshots
                  ? 'bg-[var(--ink)] text-white'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              Production UI
            </button>
          </div>
        </div>

        {/* Expanding Accordion Gallery (Desktop: Side by Side, Mobile: Vertical Accordion) */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[clamp(540px,76svh,620px)] w-full">
          {PROJECTS.map((project, idx) => {
            const isActive = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProjectId(project.id)}
                onClick={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                tabIndex={0}
                role="region"
                aria-label={`Project: ${project.title}`}
                className={`relative card-surface overflow-hidden transition-all duration-700 ease-[var(--ease)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] ${
                  isActive
                    ? 'lg:flex-[8] bg-white shadow-xl'
                    : 'lg:flex-[1.1] bg-white/70 hover:bg-white'
                } p-6 sm:p-8 flex flex-col justify-between`}
              >
                {/* Collapsed Spine (Desktop View) */}
                {!isActive && (
                  <div className="hidden lg:flex flex-col justify-between items-center h-full w-full py-4 select-none">
                    <span className="font-mono text-xs text-[var(--faint)]">
                      {project.index}
                    </span>
                    <span className="font-bold text-lg text-[var(--ink)] [writing-mode:vertical-rl] rotate-180 tracking-tight whitespace-nowrap">
                      {project.title}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink)] group-hover:rotate-90 transition-transform">
                      +
                    </div>
                  </div>
                )}

                {/* Collapsed Header (Mobile View) */}
                {!isActive && (
                  <div className="flex lg:hidden items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[var(--faint)]">
                        {project.index}
                      </span>
                      <span className="font-bold text-lg text-[var(--ink)]">
                        {project.title}
                      </span>
                    </div>
                    <span className="text-xl text-[var(--mute)]">+</span>
                  </div>
                )}

                {/* Expanded Panel Content */}
                {isActive && (
                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 h-full items-stretch animate-in fade-in duration-500">
                    {/* Left: Project Specs, Description & Tech */}
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        {/* Kicker & Meta */}
                        <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[var(--mute)]">
                          <span className="px-2 py-0.5 rounded bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)]">
                            PROJECT {project.index}
                          </span>
                          <span>{project.kicker}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-2">
                          {project.title}
                        </h3>

                        <div className="font-mono text-[11px] text-[var(--faint)] mb-4">
                          {project.meta}
                        </div>

                        <p className="text-[var(--ink-2)] text-sm sm:text-base leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="border-t border-[var(--line)] pt-4 mb-6">
                          <div className="font-mono text-[10px] text-[var(--faint)] uppercase tracking-wider mb-2.5">
                            Key Architectural Highlights
                          </div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-[var(--ink-2)]">
                            {project.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="text-[var(--mute)] select-none">›</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Tech Chips & Action Links */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {project.tech.map((t) => (
                            <div
                              key={t}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--paper)] text-xs font-mono text-[var(--ink)] border border-[var(--line)]"
                            >
                              <TechLogo name={t} size={14} />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-[var(--line)]">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary text-xs"
                            >
                              View on GitHub ↗
                            </a>
                          )}
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary text-xs"
                            >
                              Live Studio Showcase ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Illustrative UI / Production Screenshot Frame */}
                    <div className="relative rounded-2xl overflow-hidden bg-[var(--paper)] border border-[var(--line)] flex flex-col justify-between p-4 group">
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] text-[10px] font-mono text-[var(--faint)]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-neutral-300" />
                          <span className="w-2 h-2 rounded-full bg-neutral-300" />
                          <span className="w-2 h-2 rounded-full bg-neutral-300" />
                        </div>
                        <span className="uppercase tracking-wider">
                          {showRealScreenshots ? 'Production Telemetry' : 'Illustrative UI (Grayscale)'}
                        </span>
                      </div>

                      {/* Media Display Area */}
                      <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden rounded-xl bg-neutral-900/5">
                        {showRealScreenshots ? (
                          <img
                            src={project.screenshot}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover object-top rounded-lg shadow-sm group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        ) : (
                          /* Grayscale Pure CSS Illustrative UI */
                          <div className="w-full h-full p-4 flex flex-col justify-between text-neutral-800 font-mono text-xs">
                            <div className="space-y-3">
                              <div className="h-4 w-1/3 bg-neutral-300 rounded animate-pulse" />
                              <div className="grid grid-cols-3 gap-2">
                                <div className="h-16 bg-neutral-200 rounded-lg p-2 flex flex-col justify-between">
                                  <span className="text-[9px] text-neutral-500">TPS</span>
                                  <span className="font-bold text-sm">99.8%</span>
                                </div>
                                <div className="h-16 bg-neutral-200 rounded-lg p-2 flex flex-col justify-between">
                                  <span className="text-[9px] text-neutral-500">Latency</span>
                                  <span className="font-bold text-sm">42ms</span>
                                </div>
                                <div className="h-16 bg-neutral-200 rounded-lg p-2 flex flex-col justify-between">
                                  <span className="text-[9px] text-neutral-500">Status</span>
                                  <span className="font-bold text-sm">Active</span>
                                </div>
                              </div>
                              <div className="h-24 bg-neutral-100 rounded-lg border border-neutral-300 p-2 flex flex-col justify-between">
                                <div className="flex justify-between text-[10px] text-neutral-500">
                                  <span>Data Ingestion</span>
                                  <span>PostGIS • Realtime</span>
                                </div>
                                <div className="space-y-1">
                                  <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-neutral-800 w-3/4 rounded-full" />
                                  </div>
                                  <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-neutral-600 w-1/2 rounded-full" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[9px] text-neutral-400">
                              <span>NODE: BLR-01</span>
                              <span>ENCRYPTED END-TO-END</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="font-mono text-[10px] text-[var(--mute)] flex justify-between items-center pt-2 border-t border-[var(--line)]">
                        <span>Architecture: Microservices</span>
                        <span>Status: Verified Live</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
