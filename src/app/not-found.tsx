import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--paper)] text-[var(--ink)] p-8">
      <h2 className="text-4xl font-bold tracking-tight mb-4">404 — Page Not Found</h2>
      <p className="font-mono text-sm text-[var(--mute)] mb-8">
        The requested resource does not exist.
      </p>
      <Link href="/" className="btn-primary text-xs">
        Return Home
      </Link>
    </div>
  );
}
