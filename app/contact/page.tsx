'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiCheck, FiMapPin, FiClock } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa6';
import PageTransition from '@/components/animations/PageTransition';
import ScrollReveal   from '@/components/animations/ScrollReveal';

const CONTACT_INFO = [
  { icon: FiMail,    label: 'Email',    value: 'contact@senpaispot.in' },
  { icon: FiMapPin,  label: 'Location', value: 'Tokyo, Japan (Virtual)' },
  { icon: FiClock,   label: 'Response', value: 'Within 24 hours'     },
];

const SOCIAL = [
  { icon: FaXTwitter,  href: '#', label: 'Twitter',   handle: '@senpaispot' },
  { icon: FaInstagram, href: '#', label: 'Instagram',  handle: '@senpaispot' },
  { icon: FaYoutube,   href: '#', label: 'YouTube',    handle: 'Senpai Spot' },
  { icon: FaDiscord,   href: '#', label: 'Discord',    handle: 'Join Server'  },
];

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async send
    await new Promise(r => setTimeout(r, 1500));
    setStatus('done');
  };

  return (
    <PageTransition>
      {/* Banner */}
      <div className="relative py-24 overflow-hidden border-b border-orange-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0500]/60 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="section-divider mx-auto mb-6" />
            <h1 className="text-4xl sm:text-6xl font-cinzel font-black text-white mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-white/55 text-lg max-w-xl mx-auto">
              Questions, pitches, collabs, or just want to geek out about anime? We&apos;re always here.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">

          {/* Contact Form */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-cinzel font-bold text-white mb-6">Send Us a Message</h2>

              {status === 'done' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-5"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <FiCheck className="text-green-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-cinzel font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="btn-ghost text-sm py-2 px-6">
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-white/50 font-accent tracking-wider uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Naruto Uzumaki"
                        className="w-full px-4 py-3 rounded-lg search-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/50 font-accent tracking-wider uppercase mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg search-input text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 font-accent tracking-wider uppercase mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg search-input text-sm bg-[#1a1a1a] border border-orange-500/20 text-white"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" style={{ background: '#1a1a1a', color: '#f5f5f5' }}>Select a topic</option>
                      <option value="collaboration" style={{ background: '#1a1a1a', color: '#f5f5f5' }}>Collaboration / Sponsorship</option>
                      <option value="guest-post" style={{ background: '#1a1a1a', color: '#f5f5f5' }}>Guest Post Pitch</option>
                      <option value="feedback" style={{ background: '#1a1a1a', color: '#f5f5f5' }}>Feedback / Suggestions</option>
                      <option value="correction" style={{ background: '#1a1a1a', color: '#f5f5f5' }}>Correction Request</option>
                      <option value="other" style={{ background: '#1a1a1a', color: '#f5f5f5' }}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/50 font-accent tracking-wider uppercase mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 rounded-lg search-input text-sm resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact Info Sidebar */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6">
              {/* Info cards */}
              <div className="glass rounded-2xl p-6 space-y-5">
                <h3 className="font-cinzel font-bold text-white text-sm mb-4">Contact Details</h3>
                {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-orange-500" size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 font-accent tracking-widest uppercase">{label}</p>
                      <p className="text-sm text-white/70">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-cinzel font-bold text-white text-sm mb-4">Follow Us</h3>
                <div className="space-y-3">
                  {SOCIAL.map(({ icon: Icon, href, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-500/5 border border-transparent hover:border-orange-500/15 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                        <Icon className="text-orange-500" size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-white/30 font-accent">{label}</p>
                        <p className="text-sm text-white/60 group-hover:text-orange-400 transition-colors">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ note */}
              <div className="rounded-xl bg-orange-500/5 border border-orange-500/15 p-5 text-sm text-white/50">
                <p className="font-semibold text-orange-500/80 mb-1 font-accent text-xs uppercase tracking-wider">
                  Response Time
                </p>
                We typically respond to all messages within 24 hours on business days.
                For urgent matters, reach out on Twitter.
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
