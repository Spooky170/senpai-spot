import type { Metadata } from 'next';
import Link from 'next/link';
import { FiZap, FiStar, FiUsers, FiBookOpen } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa6';
import PageTransition from '@/components/animations/PageTransition';
import ScrollReveal   from '@/components/animations/ScrollReveal';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Senpai Spot — the anime blog dedicated to bringing you the best news, reviews, and manga content from the anime community.',
};

const STATS = [
  { icon: FiBookOpen, value: '500+',  label: 'Articles Published' },
  { icon: FiStar,     value: '200+',  label: 'Anime Reviewed'     },
  { icon: FiUsers,    value: '50K+',  label: 'Monthly Readers'    },
  { icon: FiZap,      value: '5+',    label: 'Years Running'      },
];

const TEAM = [
  { name: 'Ren Miyamoto',    role: 'Editor-in-Chief',    emoji: '🔥', bio: 'Anime veteran with 15+ years of watching. Specializes in shonen and psychological thrillers.' },
  { name: 'Sakura Tanaka',   role: 'Manga Correspondent', emoji: '📖', bio: 'Manga devotee who reads 10+ volumes a week. Expert in slice-of-life and romance genres.' },
  { name: 'Kenji Sato',      role: 'News Reporter',       emoji: '⚡', bio: 'Always first with the breaking anime news. Studio industry insider with contacts everywhere.' },
  { name: 'Yuki Nakamura',   role: 'Reviews Writer',      emoji: '⭐', bio: 'Former film critic turned anime enthusiast. Brings cinematic analysis to every review.' },
];

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative py-24 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500]/60 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-divider mx-auto mb-6" />
            <h1 className="text-4xl sm:text-6xl font-cinzel font-black text-white mb-6">
              About <span className="gradient-text">Senpai Spot</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">
              We are a passionate community of anime lovers dedicated to bringing you the most
              accurate, insightful, and entertaining anime content on the web.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass rounded-xl p-6 text-center glow-border-hover group">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Icon className="text-orange-500" size={22} />
                </div>
                <div className="text-3xl font-cinzel font-black gradient-text mb-1">{value}</div>
                <div className="text-xs text-white/40 font-accent tracking-wider uppercase">{label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <div className="section-divider mb-4" />
                <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white mb-4">
                  Our <span className="gradient-text">Mission</span>
                </h2>
              </div>
              <p className="text-white/55 leading-relaxed">
                Senpai Spot was founded with one goal: to be the most trusted and comprehensive anime
                resource for fans of all levels — from newcomers just discovering their first shonen
                to long-time veterans who&apos;ve seen everything.
              </p>
              <p className="text-white/55 leading-relaxed">
                We believe anime is more than entertainment. It&apos;s an art form, a cultural bridge,
                and a community. Our coverage reflects that — thoughtful, in-depth, and always
                written with genuine passion.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Get in Touch
              </Link>
            </div>
            {/* Decorative card stack */}
            <div className="relative h-80 hidden lg:block">
              {['Reviews', 'News', 'Manga'].map((label, i) => (
                <div
                  key={label}
                  className="absolute glass rounded-2xl p-6 glow-border"
                  style={{
                    width: '70%',
                    top: `${i * 40}px`,
                    left: `${i * 20}px`,
                    zIndex: 3 - i,
                    transform: `rotate(${(i - 1) * 3}deg)`,
                    opacity: 1 - i * 0.15,
                  }}
                >
                  <div className="w-8 h-1 bg-orange-500 rounded mb-3" />
                  <div className="text-sm font-cinzel font-bold text-white/70">{label}</div>
                  <div className="h-2 bg-white/5 rounded mt-2 w-3/4" />
                  <div className="h-2 bg-white/5 rounded mt-2 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Team */}
        <ScrollReveal>
          <section>
            <div className="text-center mb-12">
              <div className="section-divider mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-white">
                Meet the <span className="gradient-text">Team</span>
              </h2>
              <p className="text-white/40 mt-2 max-w-lg mx-auto text-sm">
                The passionate humans behind every article, review, and recommendation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((member, i) => (
                <ScrollReveal key={member.name} delay={i * 0.08} direction="up">
                  <div className="glass rounded-xl p-6 text-center glow-border-hover group">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4 text-3xl">
                      {member.emoji}
                    </div>
                    <h3 className="font-cinzel font-bold text-white text-sm mb-1">{member.name}</h3>
                    <p className="text-xs text-orange-500 font-accent font-semibold tracking-wider uppercase mb-3">{member.role}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{member.bio}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Social / CTA */}
        <ScrollReveal>
          <div className="rounded-2xl bg-gradient-to-br from-[#1a0500] via-[#0d0d0d] to-[#050505] border border-orange-500/15 p-10 text-center">
            <h2 className="text-3xl font-cinzel font-bold text-white mb-4">
              Join the Community
            </h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              Follow us for daily anime updates, polls, discussions, and more.
            </p>
            <div className="flex items-center justify-center gap-4">
              {[
                { icon: FaXTwitter,  href: '#', label: 'Twitter'   },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaYoutube,   href: '#', label: 'YouTube'   },
                { icon: FaDiscord,   href: '#', label: 'Discord'   },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-xl border border-orange-500/20 text-white/50 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/8 transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </PageTransition>
  );
}
