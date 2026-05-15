import Link from 'next/link';
import { FaXTwitter, FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa6';
import { FiMail, FiArrowUpRight } from 'react-icons/fi';

const FOOTER_LINKS = {
  'Browse': [
    { label: 'Anime News', href: '/anime-news' },
    { label: 'Reviews',    href: '/reviews' },
    { label: 'Manga',      href: '/manga' },
    { label: 'Trending',   href: '/trending' },
  ],
  'Company': [
    { label: 'About Us',      href: '/about' },
    { label: 'Contact',       href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use',  href: '/terms' },
  ],
};

const SOCIAL_LINKS = [
  { icon: FaXTwitter,   href: process.env.NEXT_PUBLIC_TWITTER_URL   || '#', label: 'Twitter'   },
  { icon: FaInstagram,  href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#', label: 'Instagram' },
  { icon: FaYoutube,    href: process.env.NEXT_PUBLIC_YOUTUBE_URL   || '#', label: 'YouTube'   },
  { icon: FaDiscord,    href: process.env.NEXT_PUBLIC_DISCORD_URL   || '#', label: 'Discord'   },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-orange-500/10 bg-[#080808]">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="brand-logo text-3xl font-black tracking-widest select-none">
                SENPAI
              </span>
              <span className="text-white/40 font-light tracking-[0.35em] text-xl ml-1 font-accent select-none">
                SPOT
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Your ultimate destination for anime news, reviews, manga, and
              everything in between. Stay in the loop with the latest from the
              anime universe.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg border border-orange-500/15 text-white/40 hover:text-orange-500 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Newsletter mini-CTA */}
            <div className="flex items-center gap-2 p-4 rounded-lg bg-orange-500/5 border border-orange-500/10">
              <FiMail className="text-orange-500 shrink-0" size={18} />
              <Link
                href="/contact"
                className="text-sm text-white/60 hover:text-white transition-colors group flex items-center gap-1"
              >
                Subscribe for weekly anime updates
                <FiArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-5">
              <h3 className="font-cinzel font-bold text-xs tracking-[0.2em] uppercase text-orange-500">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-orange-400 transition-colors duration-300 group flex items-center gap-1"
                    >
                      <span className="w-0 h-px bg-orange-500 group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-1" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-orange-500/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>© {year} Senpai Spot. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Powered by
            <span className="text-orange-500/60 mx-1">Blogger</span>
            &amp; Built with
            <span className="text-orange-500/60 mx-1">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
