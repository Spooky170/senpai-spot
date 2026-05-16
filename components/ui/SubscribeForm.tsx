'use client';

import { useState } from 'react';
import { FiArrowRight, FiCheck, FiLoader } from 'react-icons/fi';

interface SubscribeFormProps {
  compact?: boolean;
}

export default function SubscribeForm({ compact = false }: SubscribeFormProps) {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <FiCheck size={16} />
        <span>You're subscribed! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex flex-col gap-2' : 'space-y-3'}>
      <div className={`flex ${compact ? 'flex-col gap-2' : 'gap-2'}`}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-white/5 border border-orange-500/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary text-xs py-2 px-4 flex items-center justify-center gap-1.5 whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? (
            <FiLoader size={13} className="animate-spin" />
          ) : (
            <>Subscribe <FiArrowRight size={13} /></>
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-400">{message}</p>
      )}
    </form>
  );
}
