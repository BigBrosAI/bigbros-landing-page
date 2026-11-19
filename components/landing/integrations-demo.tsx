"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CreditCard,
  Mail,
  Megaphone,
  ShoppingBag,
  ShoppingCart,
  Sheet,
  Webhook,
  Code2,
} from 'lucide-react';
import { useTicker } from '@/components/landing/use-ticker';
import { cn } from '@/lib/utils';

export const integrationList = [
  { name: 'Shopify', note: 'Orders, carts & COD', icon: ShoppingBag },
  { name: 'WooCommerce', note: 'Store events', icon: ShoppingCart },
  { name: 'Google Sheets', note: 'Leads & contacts', icon: Sheet },
  { name: 'WhatsApp Pay', note: 'Collect in chat', icon: CreditCard },
  { name: 'Meta Ads', note: 'Click-to-WhatsApp', icon: Megaphone },
  { name: 'Email', note: 'Follow-ups', icon: Mail },
  { name: 'Webhooks', note: 'Real-time events', icon: Webhook },
  { name: 'REST API', note: 'Send from code', icon: Code2 },
];

/* Illustrative event stream. */
const events = [
  { src: 'Shopify', text: 'Order #1042 placed → confirmation sent', icon: ShoppingBag },
  { src: 'WooCommerce', text: 'Cart abandoned → reminder in 30 min', icon: ShoppingCart },
  { src: 'Meta Ads', text: 'Ad click → chat assigned to Sales', icon: Megaphone },
  { src: 'Google Sheets', text: 'New lead row added', icon: Sheet },
  { src: 'WhatsApp Pay', text: '₹2,450 received for order #1043', icon: CreditCard },
  { src: 'Email', text: 'Invoice emailed after payment', icon: Mail },
];

const R = 41; // ring radius in % of the square

export function IntegrationHub() {
  const { ref, tick: t } = useTicker(1_000_000, 1800, 0);
  const tick = t + 4; // start with a full feed
  const active = tick % integrationList.length;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      {/* hub */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[30rem] sm:block">
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r={R * 0.55} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          {integrationList.map((_, i) => {
            const a = (i / integrationList.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(a) * R;
            const y = 50 + Math.sin(a) * R;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={i === active ? '#4ade80' : 'rgba(255,255,255,0.14)'}
                strokeWidth={i === active ? 0.5 : 0.3}
                className="animate-dash transition-[stroke] duration-500"
                style={{ strokeDasharray: '1.2 1.6' }}
              />
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/5 backdrop-blur">
          <span className="animate-soft-ping absolute inset-2 rounded-[1.4rem] bg-brand-500/20" />
          <Image src="/favicon.png" alt="" width={56} height={56} className="relative rounded-2xl" />
        </div>

        {integrationList.map((it, i) => {
          const a = (i / integrationList.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(a) * R;
          const y = 50 + Math.sin(a) * R;
          const on = i === active;
          return (
            <div
              key={it.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={cn(
                  'flex flex-col items-center gap-1.5 transition-transform duration-500',
                  on && 'scale-110'
                )}
              >
                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500',
                    on
                      ? 'border-brand-400 bg-brand-500 text-white shadow-[0_0_32px_rgba(74,222,128,0.45)]'
                      : 'border-white/15 bg-white/[0.06] text-white/80'
                  )}
                >
                  <it.icon className="h-5 w-5" />
                </span>
                <span className={cn('whitespace-nowrap text-[11.5px] font-medium', on ? 'text-white' : 'text-white/60')}>
                  {it.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* mobile grid */}
      <ul className="grid grid-cols-2 gap-2.5 sm:hidden">
        {integrationList.map((it, i) => (
          <li
            key={it.name}
            className={cn(
              'flex items-center gap-2.5 rounded-2xl border p-3 transition-colors duration-500',
              i === active ? 'border-brand-400/60 bg-brand-500/15' : 'border-white/10 bg-white/[0.04]'
            )}
          >
            <it.icon className="h-4 w-4 shrink-0 text-brand-300" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] font-semibold text-white">{it.name}</span>
              <span className="block truncate text-[11px] text-white/55">{it.note}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* event feed */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-300">Event stream</p>
          <span className="flex items-center gap-1.5 text-[11px] text-white/60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-soft-ping absolute inset-0 rounded-full bg-brand-400" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            Streaming
          </span>
        </div>
        <ul className="relative h-[17.5rem] space-y-2 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
          <AnimatePresence initial={false} mode="popLayout">
            {Array.from({ length: 5 }, (_, i) => tick - i)
              .filter((n) => n >= 0)
              .map((n) => {
                const e = events[n % events.length];
                return (
                  <motion.li
                    key={n}
                    layout
                    initial={{ opacity: 0, y: -16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B231C] px-3 py-2.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-brand-300">
                      <e.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-[11px] font-medium text-white/50">{e.src}</span>
                      <span className="block truncate text-[13px] text-white">{e.text}</span>
                    </span>
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
