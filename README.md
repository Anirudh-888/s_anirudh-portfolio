# S Anirudh — Personal Founder & Engineering Portfolio

Production-ready personal portfolio web application built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Lenis** smooth scrolling. Designed with quiet luxury editorial principles (white, black, paper, and gray tones only) and backed by verbatim data from S Anirudh's curriculum vitae.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.18.0 or later, v20+ recommended)
- npm or pnpm

### Installation & Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 🏛️ Sections Architecture

The page follows a strict, non-negotiable narrative sequence:

| Section | Component | Description & Key Mechanics |
| :--- | :--- | :--- |
| **0.0 Navigation** | `Navigation.tsx` | Outlined round initials (spins 360° on hover), floating frosted glass pill, sliding active indicator via IntersectionObserver, 2px top scroll-progress bar, mobile clip-path menu. |
| **01 Hero** | `Hero.tsx` | Centered looping video with `mix-blend-mode: multiply`, ghost uppercase wordmark behind, sound toggle button (▶/❚❚ with soft ping), auto-pause on scroll past 35% visibility. |
| **02 About** | `About.tsx` | 3-column layout, interactive 3D hanging lanyard ID card (damped pendulum swing, barcode, holographic foil, flip to back details), verbatim summary, quick facts. |
| **03 Skills** | `Skills.tsx` | Periodic table of 43 elements (8-col desktop / 4-col mobile), category filters, diagonal wave reveal, sticky 320px inspector panel with real brand SVGs. |
| **04 Work** | `Work.tsx` | Expanding accordion gallery (flex 8 active panel, folded spines), architectural specs, dual toggle for Grayscale Illustrative UI and Production Screenshots. |
| **05 Certifications** | `Certifications.tsx` | Ink-flood index with left-to-right `scaleX` hover animation, issuer badges, verified counts. |
| **06 Experience** | `Experience.tsx` | Unified chronological path of engineering, mentorship, and education with scroll-drawn spine lighting up stops, ending with "Next — Your team?". |
| **07 Achievements** | `Achievements.tsx` | Pinned horizontal gallery (sticky 100svh), horizontal translation on scroll, easing number counters (`easeOutQuart`), official platform logos. |
| **08 Contact** | `Contact.tsx` | Kinetic hopping letter heading ("Let's build something together"), one-click copyable email pill with `aria-live`, spinning "say hello" badge, semantic footer. |

---

## 🎬 Rebuilding the Hero Video Pipeline

The hero video processing script is located at `scripts/build-hero-assets.py`. It uses `ffmpeg` and `numpy` to:
1. Detect and center the speaker from the 16:9 1080p source video.
2. Whiten the off-white background with `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98`.
3. Create a seamless video loop using an `xfade` 0.5s cross-fade and sample-accurate NumPy audio crossfade.
4. Export `public/hero/hero.mp4` (H.264 + AAC 96k, +faststart) and `public/hero/hero.webm` (VP9 + Opus 80k).
5. Generate `public/portrait-bust.webp` (480×600) and `public/og.jpg` (1200×630).

```bash
python scripts/build-hero-assets.py
```

---

## 🎨 Design System & Palette

- `--paper`: `#f4f2ee` (page canvas warm off-white)
- `--card`: `#ffffff` (elevated cards)
- `--ink`: `#0d0d0d` (primary text, buttons, active indicators)
- `--ink-2`: `#3a3a3a` (body text)
- `--mute`: `#77756f` (secondary metadata)
- `--faint`: `#a9a6a0` (borders, indices)
- `--line`: `rgba(13, 13, 13, 0.1)` (structural dividers)
- `--ease`: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## ⚖️ Credits & Licenses

- **Fonts:**
  - *Inter Tight*: Designed by Rasmus Andersson (SIL Open Font License 1.1)
  - *Instrument Serif*: Designed by Rodrigo Fuenzalida & Jordan Bell (SIL Open Font License 1.1)
  - *JetBrains Mono*: Designed by Philipp Nurullin, Konstantin Bulenkov (SIL Open Font License 1.1)
- **Logos & Icons:**
  - Official brand logos sourced from [Simple Icons](https://simpleicons.org/) (CC0 1.0 Universal). License file preserved in `public/logos/LICENSE.md`.
  - Minimal geometric icons powered by [Lucide](https://lucide.dev/) (ISC License).
