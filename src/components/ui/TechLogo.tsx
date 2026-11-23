'use client';

import React from 'react';

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

const BRAND_SLUGS: Record<string, string> = {
  python: 'python',
  java: 'java',
  c: 'c',
  'c++': 'cplusplus',
  cplusplus: 'cplusplus',
  javascript: 'javascript',
  typescript: 'typescript',
  sql: 'sqlite',
  react: 'react',
  'next.js': 'nextdotjs',
  nextdotjs: 'nextdotjs',
  'tailwind css': 'tailwindcss',
  tailwindcss: 'tailwindcss',
  html5: 'html5',
  css3: 'css',
  fastapi: 'fastapi',
  'node.js': 'nodedotjs',
  nodedotjs: 'nodedotjs',
  'express.js': 'express',
  express: 'express',
  'gemini api': 'googlegemini',
  googlegemini: 'googlegemini',
  numpy: 'numpy',
  pandas: 'pandas',
  'scikit-learn': 'scikitlearn',
  scikitlearn: 'scikitlearn',
  postgresql: 'postgresql',
  'mongodb atlas': 'mongodb',
  mongodb: 'mongodb',
  mysql: 'mysql',
  'oracle sql': 'oracle',
  firebase: 'firebase',
  'microsoft azure': 'microsoftazure',
  'github pages': 'githubpages',
  git: 'git',
  'github actions': 'githubactions',
  docker: 'docker',
  'linux (wsl)': 'linux',
  linux: 'linux',
  figma: 'figma',
  leetcode: 'leetcode',
  hackerrank: 'hackerrank',
  'google cloud': 'googlecloud',
};

export function isBrand(name: string): boolean {
  const key = name.toLowerCase().trim();
  return Boolean(BRAND_SLUGS[key]);
}

export function TechLogo({ name, size = 24, className = '', color }: TechLogoProps) {
  const key = name.toLowerCase().trim();
  const slug = BRAND_SLUGS[key];

  if (slug) {
    return (
      <img
        src={`/logos/${slug}.svg`}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={`inline-block object-contain transition-transform duration-300 ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          filter: color ? undefined : 'none',
        }}
        onError={(e) => {
          // If SVG fails to load, gracefully fall back to generic icon
          (e.currentTarget as HTMLElement).style.display = 'none';
        }}
      />
    );
  }

  // Concept icons (DSA, OOP, System Design, REST APIs, PostGIS, etc.)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block ${className}`}
    >
      {key.includes('dsa') || key.includes('algorithm') ? (
        <>
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M10.5 7.5L7.5 15.5M13.5 7.5L16.5 15.5" />
        </>
      ) : key.includes('system design') || key.includes('architecture') ? (
        <>
          <rect x="2" y="3" width="6" height="6" rx="1.5" />
          <rect x="16" y="3" width="6" height="6" rx="1.5" />
          <rect x="9" y="15" width="6" height="6" rx="1.5" />
          <path d="M5 9v3a2 2 0 002 2h5M19 9v3a2 2 0 01-2 2h-5" />
        </>
      ) : key.includes('oop') ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </>
      ) : key.includes('api') || key.includes('rest') ? (
        <>
          <path d="M4 12h16M16 6l4 6-4 6M8 18l-4-6 4-6" />
        </>
      ) : key.includes('prompt') || key.includes('orchestration') ? (
        <>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </>
      ) : key.includes('postgis') || key.includes('gis') ? (
        <>
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </>
      )}
    </svg>
  );
}
