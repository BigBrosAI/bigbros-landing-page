"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';
import { contactSchema, contactTopics, topicLabel, type ContactInput } from '@/lib/contact';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

import { attributionFields } from '@/lib/utm';
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'fallback'; mailto: string } | { kind: 'error'; message: string };

const field =
  'h-11 w-full rounded-xl border border-input bg-background px-3.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-500 focus:ring-4 focus:ring-brand-100';

function mailtoFor(d: ContactInput) {
  const subject = `[${topicLabel(d.topic)}] ${d.name}${d.company ? ` · ${d.company}` : ''}`;
  const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone / WhatsApp: ${d.phone || '—'}\nCompany: ${d.company || '—'}\n\n${d.message}`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const q = useSearchParams().get('topic');
  const initialTopic: ContactInput['topic'] = contactTopics.some((t) => t.value === q) ? (q as ContactInput['topic']) : 'sales';
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof ContactInput] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...parsed.data, attribution: attributionFields() }) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; fallback?: boolean; error?: string };
      if (res.ok && json.ok) return setStatus({ kind: 'sent' });
      if (json.fallback) return setStatus({ kind: 'fallback', mailto: mailtoFor(parsed.data) });
      setStatus({ kind: 'error', message: json.error || 'Something went wrong. Please try again.' });
    } catch {
      setStatus({ kind: 'fallback', mailto: mailtoFor(parsed.data) });
    }
  };

  if (status.kind === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-14 text-center" role="status">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-bold tracking-tight">Thanks — we’ve got your message.</h3>
        <p className="mt-2 max-w-sm text-ink-600">Our team will get back to you by email within one business day. For anything urgent, message us on WhatsApp.</p>
        <a href={`https://wa.me/${siteConfig.whatsapp.number}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
          <BrandIcon slug="whatsapp" color="#fff" className="h-4 w-4" /> Chat on WhatsApp
        </a>
      </motion.div>
    );
  }

  const err = (k: keyof ContactInput) =>
    errors[k] ? (
      <p className="mt-1.5 text-[13px] text-red-600" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Full name *</span>
          <input name="name" autoComplete="name" className={cn(field, errors.name && 'border-red-400')} placeholder="Ayesha Khan" />
          {err('name')}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Work email *</span>
          <input name="email" type="email" autoComplete="email" className={cn(field, errors.email && 'border-red-400')} placeholder="you@company.com" />
          {err('email')}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Phone / WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+91 98765 43210" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">Company</span>
          <input name="company" autoComplete="organization" className={field} placeholder="Hearth & Loom" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">How can we help? *</span>
        <select name="topic" defaultValue={initialTopic} className={cn(field, 'appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%2398A2B3%27%20stroke-width=%272%27%3E%3Cpath%20d=%27m6%209%206%206%206-6%27/%3E%3C/svg%3E")] bg-[length:18px] bg-[right_12px_center] bg-no-repeat pr-10')}>
          {contactTopics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">Message *</span>
        <textarea name="message" rows={5} className={cn(field, 'h-auto resize-y py-3', errors.message && 'border-red-400')} placeholder="Tell us about your business, how many customers you message and what you’d like to automate." />
        {err('message')}
      </label>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <AnimatePresence>
        {status.kind === 'fallback' && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="alert">
            We couldn’t send this from the website right now. Your message is ready to send by email:
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={status.mailto} className="inline-flex items-center gap-1.5 rounded-full bg-amber-900 px-4 py-2 font-semibold text-white">
                <Mail className="h-4 w-4" /> Open in email app
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp.number}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-white px-4 py-2 font-semibold">
                <BrandIcon slug="whatsapp" className="h-4 w-4" /> WhatsApp us instead
              </a>
            </div>
          </motion.div>
        )}
        {status.kind === 'error' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {status.message}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status.kind === 'sending'} className="shine inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-brand-800 disabled:opacity-70">
          {status.kind === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {status.kind === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="text-[13px] text-muted-foreground">We reply within one business day.</p>
      </div>
    </form>
  );
}
