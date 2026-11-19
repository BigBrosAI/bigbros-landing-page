"use client";

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Mail, Webhook } from 'lucide-react';
import { BrandIcon, type BrandSlug } from '@/components/landing/brand-icon';
import { progress, useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

type Integration = { name: string; note: string; brand?: BrandSlug; icon?: React.ComponentType<{ className?: string }> };

export const integrationList: Integration[] = [
  { name: 'Shopify', note: 'Orders, carts & COD', brand: 'shopify' },
  { name: 'WooCommerce', note: 'Store events', brand: 'woocommerce' },
  { name: 'Google Sheets', note: 'Leads & contacts', brand: 'googlesheets' },
  { name: 'WhatsApp Pay', note: 'Collect in chat', brand: 'whatsapp' },
  { name: 'Meta Ads', note: 'Click-to-WhatsApp', brand: 'meta' },
  { name: 'Email', note: 'Follow-ups', icon: Mail },
  { name: 'Webhooks', note: 'Real-time events', icon: Webhook },
  { name: 'REST API', note: 'Send from code', icon: Code2 },
];

export function IntegrationGlyph({ it, className, color }: { it: Integration; className?: string; color?: string }) {
  if (it.brand) return <BrandIcon slug={it.brand} className={className} color={color} />;
  const Icon = it.icon!;
  return <Icon className={cn(className, 'text-[#0E2A22]')} />;
}

/* Illustrative event stream; `src` indexes integrationList. */
const events = [
  { src: 0, text: 'Order #1042 placed → confirmation sent' },
  { src: 4, text: 'Ad click → chat assigned to Sales' },
  { src: 1, text: 'Cart abandoned → reminder in 30 min' },
  { src: 3, text: '₹2,450 received for order #1043' },
  { src: 2, text: 'New lead row added to “Leads”' },
  { src: 5, text: 'Invoice emailed after payment' },
  { src: 6, text: 'order.delivered sent to your endpoint' },
  { src: 7, text: 'POST /messages · template sent' },
];

const EVENT = 2000;
const TRAVEL = 750;
const R = 41; // ring radius in % of the square

const polar = (i: number) => {
  const a = (i / integrationList.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
};

export function IntegrationHub() {
  const { ref, t, loop } = useClock(EVENT * events.length, EVENT * 3 + TRAVEL + 100);
  const local = t % EVENT;
  const k = loop * events.length + Math.floor(t / EVENT) + 5; // global event counter (pre-filled feed)
  const cur = events[k % events.length];
  const arrived = local >= TRAVEL;
  const p = progress(local, 0, TRAVEL);
  const from = polar(cur.src);
  const eased = 1 - Math.pow(1 - p, 3);
  const dot = { x: from.x + (50 - from.x) * eased, y: from.y + (50 - from.y) * eased };

  const feed = Array.from({ length: 5 }, (_, i) => k - i - (arrived ? 0 : 1));

  return (
    <div ref={ref} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
      {/* hub */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[30rem] sm:block">
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r={R * 0.55} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          {integrationList.map((_, i) => {
            const { x, y } = polar(i);
            const on = i === cur.src;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={on ? '#4ade80' : 'rgba(255,255,255,0.14)'}
                strokeWidth={on ? 0.45 : 0.3}
                strokeDasharray="1.2 1.6"
                className="animate-dash"
                style={{ transition: 'stroke 400ms' }}
              />
            );
          })}
          {!arrived && (
            <g>
              <circle cx={dot.x} cy={dot.y} r="2.2" fill="#4ade80" opacity="0.25" />
              <circle cx={dot.x} cy={dot.y} r="1.1" fill="#bbf7d0" />
            </g>
          )}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/5 backdrop-blur">
          <AnimatePresence>
            {arrived && (
              <motion.span
                key={k}
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute inset-0 rounded-[1.75rem] border-2 border-brand-400"
              />
            )}
          </AnimatePresence>
          <Image src="/favicon.png" alt="" width={56} height={56} className="relative rounded-2xl" />
        </div>

        {integrationList.map((it, i) => {
          const { x, y } = polar(i);
          const on = i === cur.src && local < TRAVEL + 500;
          return (
            <div key={it.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <div className={cn('flex flex-col items-center gap-1.5 transition-transform duration-500', on && 'scale-110')}>
                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-2xl bg-white transition-shadow duration-500',
                    on ? 'shadow-[0_0_0_3px_rgba(74,222,128,0.8),0_0_36px_rgba(74,222,128,0.45)]' : 'shadow-[0_6px_20px_rgba(0,0,0,0.25)]'
                  )}
                >
                  <IntegrationGlyph it={it} className="h-6 w-6" />
                </span>
                <span className={cn('whitespace-nowrap text-[11.5px] font-medium transition-colors', on ? 'text-white' : 'text-white/60')}>
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
              i === cur.src ? 'border-brand-400/60 bg-brand-500/15' : 'border-white/10 bg-white/[0.04]'
            )}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <IntegrationGlyph it={it} className="h-4 w-4" />
            </span>
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
        <ul className="relative h-[18rem] space-y-2 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
          <AnimatePresence initial={false} mode="popLayout">
            {feed.map((n, i) => {
              const e = events[n % events.length];
              const it = integrationList[e.src];
              return (
                <motion.li
                  key={n}
                  layout
                  initial={{ opacity: 0, y: -16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-colors duration-700',
                    i === 0 ? 'border-brand-400/40 bg-[#0F3328]' : 'border-white/10 bg-[#0B231C]'
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white">
                    <IntegrationGlyph it={it} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-[11px] font-medium text-white/50">{it.name}</span>
                    <span className="block truncate text-[13px] text-white">{e.text}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-white/40">{i === 0 ? 'now' : `${i * 2}s`}</span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
