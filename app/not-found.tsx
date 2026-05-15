import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = { title: '404 — Page Not Found' };

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(255,122,0,0.08) 0%, transparent 60%)' }}
      />

      {/* Giant 404 */}
      <div
        className="absolute select-none pointer-events-none font-cinzel font-black text-[30vw] text-white/[0.02] leading-none"
        aria-hidden="true"
      >
        404
      </div>

      <div className="relative text-center space-y-8 max-w-lg">
        {/* Anime-style broken-scene icon */}
        <div className="flex items-center justify-center">
          <div className="relative w-28 h-28">
            <div className="absolute inset-0 rounded-full bg-orange-500/10 border border-orange-500/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
              <span className="text-4xl" role="img" aria-label="Confused character">😵</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-accent font-semibold tracking-[0.3em] uppercase text-orange-500/70 text-sm mb-3">
            404 Error
          </p>
          <h1 className="font-cinzel font-black text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Page Not Found
          </h1>
          <p className="text-white/45 text-base leading-relaxed">
            Looks like this page went on a filler arc and never came back.
            The content you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Orange divider */}
        <div className="section-divider mx-auto" />

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
          <Link href="/anime-news" className="btn-ghost">
            Browse Anime News
          </Link>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {[
            { label: 'Reviews',  href: '/reviews'   },
            { label: 'Manga',    href: '/manga'     },
            { label: 'Trending', href: '/trending'  },
            { label: 'About',    href: '/about'     },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/30 hover:text-orange-400 transition-colors font-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
