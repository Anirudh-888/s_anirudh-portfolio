'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

function HoppingText({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-200 hover:-translate-y-3 hover:text-black cursor-default select-none"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useScroll();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <footer
      id="contact"
      className="section-padding bg-[var(--paper)] border-t border-[var(--line)] relative overflow-hidden"
    >
      <div className="page-container">
        {/* Top Tag & Spinning "Say Hello" Circular Badge */}
        <div className="flex items-center justify-between mb-8">
          <div className="section-tag mb-0">
            <span className="section-tag-dot" />
            <span>07 — Direct Inquiries</span>
          </div>

          {/* Spinning Circular "Say Hello" Badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center select-none">
            <svg
              className="w-full h-full animate-[spin_16s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text className="font-mono text-[9px] uppercase tracking-[0.25em] fill-[var(--ink)]">
                <textPath href="#circlePath">
                  • SAY HELLO • GET IN TOUCH • CLOUD & FIRE •
                </textPath>
              </text>
            </svg>
            <div className="absolute w-8 h-8 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-mono text-xs">
              ↗
            </div>
          </div>
        </div>

        {/* Huge Hopping Heading */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--ink)] leading-[1.05]">
            <HoppingText text="Let's build" />
            <br />
            <span className="font-serif italic font-normal text-[var(--mute)]">
              <HoppingText text="something together." />
            </span>
          </h2>
        </div>

        {/* Email with Copy Chip */}
        <div className="card-surface p-8 sm:p-12 mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
              Primary Electronic Mail
            </div>
            <a
              href={PROFILE.emailHref}
              className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)] underline underline-offset-8 decoration-neutral-300 hover:decoration-[var(--ink)] transition-colors break-all"
            >
              {PROFILE.email}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-primary text-xs"
              aria-live="polite"
            >
              {copied ? 'Copied ✓' : 'Copy Email Address'}
            </button>
          </div>
        </div>

        {/* Social and Communication Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 border-b border-[var(--line)] pb-12">
          <div className="p-4 rounded-2xl bg-white border border-[var(--line)]">
            <div className="font-mono text-xs text-[var(--mute)] mb-1">Telephone</div>
            <a
              href={PROFILE.phoneHref}
              className="font-bold text-sm text-[var(--ink)] hover:underline"
            >
              {PROFILE.phone}
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[var(--line)]">
            <div className="font-mono text-xs text-[var(--mute)] mb-1">GitHub</div>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm text-[var(--ink)] hover:underline flex items-center justify-between"
            >
              <span>{PROFILE.githubDisplay}</span>
              <span>↗</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[var(--line)]">
            <div className="font-mono text-xs text-[var(--mute)] mb-1">LinkedIn</div>
            <a
              href={PROFILE.linkedin}
              target="https://linkedin.com/in/sanipeida.tech"
              rel="noopener noreferrer"
              className="font-bold text-sm text-[var(--ink)] hover:underline flex items-center justify-between"
            >
              <span>{PROFILE.linkedinDisplay}</span>
              <span>↗</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[var(--line)]">
            <div className="font-mono text-xs text-[var(--mute)] mb-1">Software Studio</div>
            <a
              href={PROFILE.studio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm text-[var(--ink)] hover:underline flex items-center justify-between"
            >
              <span>{PROFILE.studioDisplay}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Semantic Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <div>
            &copy; {new Date().getFullYear()} {PROFILE.name}. All verified credentials on file.
          </div>

          <button
            type="button"
            onClick={() => scrollTo('#hero', 0)}
            className="hover:text-[var(--ink)] underline underline-offset-4 cursor-pointer focus:outline-none"
          >
            Back to top ↑
          </button>

          <div>
            Built with Next.js 15 & Lenis
          </div>
        </div>
      </div>
    </footer>
  );
}
