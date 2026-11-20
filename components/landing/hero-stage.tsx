"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Megaphone, MessageCircle, Sparkles } from 'lucide-react';
import { BrandTile } from '@/components/landing/brand-icon';
import { HeroPhone } from '@/components/landing/hero-phone';
import { progress, useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/* Illustrative stage around the hero phone — demo data only. */

function CampaignCard() {
  const { ref, t } = useClock(9000, 8800);
  const p = progress(t, 300, 6500);
  const rows = [
    { label: 'Sent', v: 4812 * Math.min(1, p * 1.6), max: 4812, color: 'bg-brand-500' },
    { label: 'Delivered', v: 4668 * Math.min(1, p * 1.35), max: 4812, color: 'bg-sky-500' },
    { label: 'Read', v: 3917 * p, max: 4812, color: 'bg-amber-400' },
  ];
  return (
    <div ref={ref} className="w-[17rem] rounded-3xl border border-border/80 bg-card/95 p-4 shadow-lift backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Megaphone className="h-4 w-4" />
          </span>
          Diwali sale
        </span>
        <span className={cn('rounded-full px-2 py-0.5 text-[10.5px] font-semibold', p >= 1 ? 'bg-brand-50 text-brand-800' : 'bg-sky-50 text-sky-700')}>
          {p >= 1 ? 'Completed' : '● Sending'}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-[12px]">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-semibold tabular-nums">{Math.round(r.v).toLocaleString('en-IN')}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className={cn('h-full rounded-full', r.color)} style={{ width: `${(r.v / r.max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[12px]">
        <span className="text-muted-foreground">Click-through</span>
        <span className="font-semibold text-brand-700">{(24.1 * p).toFixed(1)}%</span>
      </p>
    </div>
  );
}

const chats = [
  { name: 'Sana M.', text: 'Do you ship to Pune?', who: 'AI agent', ai: true },
  { name: 'Imran S.', text: 'Payment failed, help!', who: 'Priya', ai: false },
  { name: 'Neha P.', text: 'Is COD available?', who: 'AI agent', ai: true },
  { name: 'Vikram R.', text: 'Need a bulk order quote', who: 'Arjun', ai: false },
];

function InboxCard() {
  const { ref, loop, t } = useClock(2600, 2000);
  const n = loop + 3;
  const list = [0, 1, 2].map((k) => ({ ...chats[(n - k) % chats.length], key: n - k }));
  return (
    <div ref={ref} className="w-[17rem] rounded-3xl border border-border/80 bg-card/95 p-4 shadow-lift backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <MessageCircle className="h-4 w-4" />
          </span>
          Live chat
        </span>
        <span className="text-[11px] text-muted-foreground">{14 + (n % 4)} open</span>
      </div>
      <ul className="mt-3 space-y-2">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((c, i) => (
            <motion.li
              key={c.key}
              layout
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              className={cn('flex items-center gap-2.5 rounded-2xl px-2.5 py-2', i === 0 ? 'bg-brand-50/70' : 'bg-muted/50')}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-teal-600 text-[11px] font-semibold text-white">{c.name[0]}</span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[12.5px] font-semibold">{c.name}</span>
                <span className="block truncate text-[11.5px] text-muted-foreground">{c.text}</span>
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: i === 0 && t < 700 ? 0 : 1, scale: 1 }}
                className={cn('flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold', c.ai ? 'bg-violet-50 text-violet-700' : 'bg-white text-ink-600 ring-1 ring-border')}
              >
                {c.ai && <Bot className="h-3 w-3" />}
                {c.who}
              </motion.span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-[12px] text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5 text-violet-600" /> AI resolved <b className="text-foreground">82%</b> of chats today
      </p>
    </div>
  );
}

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('animate-float flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card/95 px-3.5 py-2.5 shadow-lift backdrop-blur', className)}>
      {children}
    </div>
  );
}

export function HeroStage() {
  return (
    <div className="relative mx-auto max-w-6xl" aria-label="Illustrative product demo">
      {/* rings behind the phone */}
      <svg aria-hidden viewBox="0 0 800 800" className="absolute left-1/2 top-1/2 h-[54rem] w-[54rem] -translate-x-1/2 -translate-y-1/2">
        {[140, 220, 300, 380].map((r, i) => (
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="#16a34a" strokeOpacity={0.14 - i * 0.025} strokeWidth="1.2" className="animate-dash" style={{ animationDuration: `${6 + i * 2}s` }} />
        ))}
      </svg>

      <div className="relative flex justify-center">
        <HeroPhone showEvents={false} />
      </div>

      <div className="absolute left-0 top-16 hidden lg:block xl:left-6">
        <CampaignCard />
      </div>
      <div className="absolute right-0 top-28 hidden lg:block xl:right-6">
        <InboxCard />
      </div>
      <Chip className="absolute bottom-24 left-16 hidden lg:flex xl:left-28">
        <BrandTile slug="shopify" size={30} />
        <span className="leading-tight">
          <span className="block text-[12.5px] font-semibold">Order #1042 synced</span>
          <span className="block text-[11.5px] text-muted-foreground">From Shopify · just now</span>
        </span>
      </Chip>
      <Chip className="absolute bottom-10 right-20 hidden lg:flex xl:right-32 [animation-delay:1.5s]">
        <BrandTile slug="whatsapp" size={30} />
        <span className="leading-tight">
          <span className="block text-[12.5px] font-semibold">₹1,299 received</span>
          <span className="block text-[11.5px] text-muted-foreground">WhatsApp Pay · UPI</span>
        </span>
      </Chip>
    </div>
  );
}
