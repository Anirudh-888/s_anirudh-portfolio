import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/scroll';

const interTight = localFont({
  src: '../fonts/InterTight-VariableFont_wght.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '100 900',
});

const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: '../fonts/JetBrainsMono-VariableFont_wght.woff2',
  variable: '--font-mono',
  display: 'swap',
  weight: '100 800',
});

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'S Anirudh — Full-Stack Developer & AI Engineer',
  description:
    'Full-Stack Developer, AI Engineer, and Founder of Cloud & Fire architecting production web applications, civic-tech platforms, and LLM-powered workflows in Bengaluru, India.',
  metadataBase: new URL('https://anirudh.cloudandfire.tech'),
  authors: [{ name: 'S Anirudh', url: 'https://cloudandfire.tech' }],
  creator: 'S Anirudh',
  openGraph: {
    title: 'S Anirudh — Full-Stack Developer & AI Engineer',
    description:
      'Founder of Cloud & Fire. Engineering resilient full-stack systems and LLM-powered software in Bengaluru, India.',
    url: 'https://anirudh.cloudandfire.tech',
    siteName: 'S Anirudh Portfolio',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'S Anirudh — Full-Stack Developer & AI Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S Anirudh — Full-Stack Developer & AI Engineer',
    description:
      'Founder of Cloud & Fire. Engineering resilient full-stack systems and LLM-powered software.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth selection:bg-[#0d0d0d] selection:text-[#f4f2ee]`}
    >
      <body className="bg-[var(--paper)] text-[var(--ink)] font-sans antialiased min-h-screen overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
