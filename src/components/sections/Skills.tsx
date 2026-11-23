'use client';

import React, { useState } from 'react';
import { SKILL_GROUPS, SkillElement } from '@/lib/data';
import { useInView } from '@/lib/hooks';
import { TechLogo, isBrand } from '@/components/ui/TechLogo';

const FAMILIES = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'AI & Data',
  'Databases & Cloud',
  'Tools & Core',
] as const;

type FamilyType = (typeof FAMILIES)[number];

export function Skills() {
  const [containerRef, isInView] = useInView({ threshold: 0.1 });
  const [activeFamily, setActiveFamily] = useState<FamilyType>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillElement>(SKILL_GROUPS[0]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-padding bg-[var(--paper)] border-t border-[var(--line)]"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>02 — Skills</span>
          </div>
          <h2 className="section-heading">
            The periodic table
            <span className="section-heading-serif">of my stack.</span>
          </h2>
          <p className="mt-4 text-[var(--mute)] max-w-2xl text-base sm:text-lg">
            Every technical skill, library, database, and architectural discipline extracted verbatim from production systems and real-world projects.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {FAMILIES.map((family) => {
            const isActive = activeFamily === family;
            return (
              <button
                key={family}
                type="button"
                onClick={() => setActiveFamily(family)}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] ${
                  isActive
                    ? 'bg-[var(--ink)] text-white shadow-sm'
                    : 'bg-white border border-[var(--line)] text-[var(--mute)] hover:text-[var(--ink)] hover:border-[var(--line-strong)]'
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Main Layout: Periodic Grid (left) + Sticky Inspector Panel (right 320px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Elements Grid (8 cols on desktop, 4 on mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
            {SKILL_GROUPS.map((skill, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const delay = (row + col) * 40;
              const matchesFamily = activeFamily === 'All' || skill.family === activeFamily;
              const isSelected = selectedSkill.atomicNumber === skill.atomicNumber;

              return (
                <div
                  key={skill.atomicNumber}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.name}, ${skill.family}`}
                  className={`relative aspect-square rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] ${
                    matchesFamily ? 'opacity-100 scale-100' : 'opacity-25 scale-95'
                  } ${
                    isSelected
                      ? 'bg-white border-[var(--ink)] shadow-md -translate-y-1'
                      : 'bg-white/70 hover:bg-white border-[var(--line)] hover:border-[var(--line-strong)] hover:shadow-xs'
                  }`}
                  style={{
                    transitionDelay: isInView ? `${delay}ms` : '0ms',
                  }}
                >
                  {/* Top: Atomic Number & Brand indicator */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--mute)]">
                    <span>{skill.atomicNumber.toString().padStart(2, '0')}</span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.color || '#3A3A3A' }}
                    />
                  </div>

                  {/* Center: 2-Letter Symbol */}
                  <div className="text-center">
                    <span className="font-bold text-lg sm:text-xl tracking-tight text-[var(--ink)]">
                      {skill.symbol}
                    </span>
                  </div>

                  {/* Bottom: Skill Name */}
                  <div className="truncate text-[10px] sm:text-[11px] font-mono text-[var(--ink-2)] text-center">
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <div className="lg:sticky lg:top-24 w-full">
            <div className="card-surface p-6 sm:p-8 flex flex-col items-center text-center">
              {/* Logo Presentation Frame */}
              <div className="relative w-full h-[180px] bg-[var(--paper)] rounded-2xl flex items-center justify-center p-6 mb-6 overflow-hidden border border-[var(--line)]">
                {/* Brand-tint glow behind logo */}
                {selectedSkill.color && (
                  <div
                    className="absolute w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none transition-colors duration-500"
                    style={{ backgroundColor: selectedSkill.color }}
                  />
                )}
                <div
                  key={selectedSkill.atomicNumber}
                  className="relative z-10 transition-transform duration-300 scale-100 animate-in fade-in zoom-in-95"
                >
                  <TechLogo
                    name={selectedSkill.name}
                    size={110}
                    color={selectedSkill.color}
                  />
                </div>
              </div>

              {/* Skill Details */}
              <div className="w-full text-left">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-xs text-[var(--mute)]">
                    ELEMENT NO. {selectedSkill.atomicNumber.toString().padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[var(--paper)] text-[var(--ink-2)] border border-[var(--line)]">
                    {selectedSkill.family}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)] mb-4">
                  {selectedSkill.name}
                </h3>

                <div className="border-t border-[var(--line)] pt-4">
                  <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
                    Used In Projects & Systems
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.projects.map((proj) => (
                      <span
                        key={proj}
                        className="px-2.5 py-1 rounded-lg bg-[var(--paper)] text-xs font-mono text-[var(--ink)] border border-[var(--line)]"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--line)] pt-4 mt-4 flex items-center justify-between font-mono text-xs text-[var(--faint)]">
                  <span>Type: {isBrand(selectedSkill.name) ? 'Official Technology' : 'Core Discipline'}</span>
                  <span>Sym: {selectedSkill.symbol}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
