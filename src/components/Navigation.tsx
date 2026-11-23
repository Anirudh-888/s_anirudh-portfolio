'use client';

import React, { useState, useEffect } from 'react';
import { PROFILE, NAV } from '@/lib/data';
import { useScrollProgress } from '@/lib/hooks';
import { useScroll } from '@/lib/scroll';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const { scrollTo } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href, -60);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-50 origin-left pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials Mark & Name */}
          <div className="pointer-events-auto flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] rounded-full"
              aria-label="Scroll to top"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-500 group-hover:rotate-[360deg] ${
                  scrolled
                    ? 'bg-[var(--ink)] text-[#ffffff] shadow-sm'
                    : 'border border-[var(--ink)] text-[var(--ink)] bg-transparent'
                }`}
              >
                SA
              </div>
              <span
                className={`text-sm font-semibold tracking-tight text-[var(--ink)] transition-opacity duration-300 hidden sm:inline ${
                  scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                {PROFILE.name}
              </span>
            </a>
          </div>

          {/* Desktop Nav: Floating Frosted Pill */}
          <nav
            className={`pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-md shadow-lg shadow-black/[0.04] border border-[var(--line)]'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {NAV.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] ${
                    isActive ? 'text-white' : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  {/* Sliding active indicator pill */}
                  {isActive && (
                    <span className="absolute inset-0 bg-[var(--ink)] rounded-full -z-10 shadow-sm transition-all duration-300" />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Mobile: Menu Pill */}
          <div className="pointer-events-auto md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="px-4 py-2 text-xs font-mono font-medium rounded-full bg-[var(--ink)] text-white shadow-md active:scale-95 transition-transform"
              aria-label="Open navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay with Clip-path Reveal */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[var(--ease)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]'
            : 'opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-mono text-xs font-semibold">
            SA
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink)] font-mono text-xs hover:bg-black/5"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-baseline gap-4 group"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className="font-mono text-xs text-[var(--faint)] group-hover:text-[var(--ink)] transition-colors">
                {item.index}
              </span>
              <span className="text-3xl font-bold tracking-tight text-[var(--ink)] group-hover:translate-x-2 transition-transform">
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        <div className="border-t border-[var(--line)] pt-6 flex flex-col gap-2 font-mono text-xs text-[var(--mute)]">
          <div>{PROFILE.email}</div>
          <div>{PROFILE.location}</div>
        </div>
      </div>
    </>
  );
}
