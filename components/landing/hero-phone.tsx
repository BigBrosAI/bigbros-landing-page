"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, CheckCheck, ChevronLeft, CreditCard, Phone, ShoppingBag, Sparkles } from 'lucide-react';
import { useTicker } from '@/components/landing/use-ticker';
import { cn } from '@/lib/utils';

/*
 * Illustrative product demo — a scripted conversation, not real customer data.
 * Each tick reveals one more message; the script loops.
 */
type Msg =
  | { id: string; kind: 'in' | 'out'; text: string; ai?: boolean }
  | { id: string; kind: 'product' }
  | { id: string; kind: 'paid' }
  | { id: string; kind: 'system'; text: string };

const script: Msg[] = [
  { id: 'm1', kind: 'in', text: 'Hi! Is the linen kurta available in M?' },
  { id: 'm2', kind: 'out', ai: true, text: 'Yes! Olive and ivory are both in stock in M. Here’s the olive one 👇' },
  { id: 'm3', kind: 'product' },
  { id: 'm4', kind: 'in', text: 'Perfect, I’ll take it.' },
  { id: 'm5', kind: 'paid' },
  { id: 'm6', kind: 'system', text: 'Order #1042 synced to Shopify' },
];

const HOLD = 3; // extra ticks to hold the full conversation before looping

export function HeroPhone() {
  const { ref, step } = useTicker(script.length + HOLD, 1500, script.length + HOLD - 1);
  const visible = Math.min(step + 1, script.length);
  const shown = script.slice(0, visible);
  const typing = visible < script.length && script[visible].kind !== 'in' && script[visible].kind !== 'system';

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[20.5rem]">
      {/* phone */}
      <div className="relative rounded-[2.6rem] border border-black/10 bg-[#0E2A22] p-2.5 shadow-[0_40px_80px_-30px_rgba(14,42,34,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
        <div className="relative overflow-hidden rounded-[2.1rem] bg-[#EFEAE2]">
          {/* header */}
          <div className="flex items-center gap-2.5 bg-[#0B5D3B] px-3 pb-3 pt-7 text-white">
            <ChevronLeft className="h-4 w-4 opacity-80" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
              HL
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 text-[13px] font-semibold leading-tight">
                Hearth &amp; Loom <BadgeCheck className="h-3.5 w-3.5 text-brand-300" />
              </p>
              <p className="text-[11px] leading-tight text-white/70">{typing ? 'typing…' : 'online'}</p>
            </div>
            <Phone className="h-4 w-4 opacity-80" />
          </div>
          <span aria-hidden className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0E2A22]" />

          {/* thread */}
          <div className="flex h-[25rem] flex-col justify-end gap-2 overflow-hidden px-3 py-3 [mask-image:linear-gradient(to_bottom,transparent,#000_14%)] [background-image:radial-gradient(rgba(14,42,34,0.06)_1px,transparent_1px)] [background-size:14px_14px]">
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className={cn(
                    'flex',
                    m.kind === 'in' ? 'justify-start' : m.kind === 'system' ? 'justify-center' : 'justify-end'
                  )}
                >
                  <Bubble m={m} />
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  key="typing"
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-end"
                >
                  <span className="flex items-center gap-1 rounded-2xl rounded-br-md bg-[#D9FDD3] px-3 py-2.5">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#0B5D3B]" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#0B5D3B]" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[#0B5D3B]" />
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* composer */}
          <div className="flex items-center gap-2 px-3 pb-4">
            <div className="h-9 flex-1 rounded-full bg-white px-4 text-[12px] leading-9 text-black/35">Message</div>
            <span className="h-9 w-9 rounded-full bg-[#0B5D3B]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  if (m.kind === 'system') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-medium text-[#0B5D3B] shadow-sm">
        <ShoppingBag className="h-3 w-3" /> {m.text}
      </span>
    );
  }
  if (m.kind === 'product') {
    return (
      <div className="w-[12.5rem] overflow-hidden rounded-2xl rounded-br-md bg-[#D9FDD3] p-1.5 shadow-sm">
        <div className="relative h-24 rounded-xl bg-[linear-gradient(135deg,#6B7F4E,#9DAF7A)]">
          <span className="absolute bottom-2 left-2 rounded-md bg-black/30 px-1.5 py-0.5 text-[10px] font-medium text-white">
            Olive · M
          </span>
        </div>
        <div className="px-1.5 pb-1 pt-2">
          <p className="text-[12.5px] font-semibold text-[#111B21]">Linen kurta</p>
          <p className="text-[11.5px] text-[#111B21]/60">₹1,299 · Free delivery</p>
        </div>
        <div className="mt-1 rounded-lg bg-white/70 py-1.5 text-center text-[12px] font-semibold text-[#0B5D3B]">
          Buy now
        </div>
      </div>
    );
  }
  if (m.kind === 'paid') {
    return (
      <div className="w-[12.5rem] rounded-2xl rounded-br-md bg-[#D9FDD3] p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B5D3B] text-white">
            <CreditCard className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[11px] text-[#111B21]/60">Payment received</p>
            <p className="text-[15px] font-semibold leading-tight text-[#111B21]">₹1,299.00</p>
          </div>
        </div>
        <p className="mt-2 flex items-center gap-1 text-[10.5px] font-medium text-[#0B5D3B]">
          <CheckCheck className="h-3.5 w-3.5" /> Paid via WhatsApp Pay
        </p>
      </div>
    );
  }
  const out = m.kind === 'out';
  return (
    <div
      className={cn(
        'max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug text-[#111B21] shadow-sm',
        out ? 'rounded-br-md bg-[#D9FDD3]' : 'rounded-bl-md bg-white'
      )}
    >
      {out && m.ai && (
        <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-[#0B5D3B]">
          <Sparkles className="h-3 w-3" /> AI agent
        </span>
      )}
      {m.text}
      <span className="ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[9.5px] text-black/40">
        10:24 {out && <CheckCheck className="h-3 w-3 text-sky-500" />}
      </span>
    </div>
  );
}
