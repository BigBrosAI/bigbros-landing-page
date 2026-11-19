"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  BadgeCheck,
  Bot,
  Check,
  CheckCheck,
  ChevronLeft,
  Loader2,
  Mic,
  Paperclip,
  Phone,
  SendHorizontal,
  Smile,
  Sparkles,
  Video,
} from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';
import { useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/*
 * Illustrative product demo seen from the customer's phone — a scripted,
 * time-driven scene (not real customer data). Every visual is derived from `t`.
 */
const QUESTION = 'Hi! Is the linen kurta available in M?';
const T = {
  typeStart: 600,
  charMs: 42,
  send: 600 + QUESTION.length * 42 + 250,
  delivered: 3150,
  read: 3600,
  reply1: 4900,
  product: 5800,
  tapBuy: 7000,
  sheetOpen: 7350,
  tapPay: 8700,
  processing: 8900,
  success: 9800,
  sheetClose: 10800,
  reply2: 11500,
  shopify: 12300,
  loop: 16000,
};
const typingWindows: [number, number][] = [
  [3600, T.reply1],
  [5050, T.product],
  [10950, T.reply2],
];

const between = (t: number, a: number, b: number) => t >= a && t < b;

export function HeroPhone() {
  const { ref, t, reduce } = useClock(T.loop, T.loop - 600);

  // pointer tilt (desktop only, skipped for reduced motion)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const typed = t < T.typeStart ? '' : t >= T.send ? '' : QUESTION.slice(0, Math.floor((t - T.typeStart) / T.charMs));
  const typing = typingWindows.some(([a, b]) => between(t, a, b));
  const sheetOpen = between(t, T.sheetOpen, T.sheetClose);
  const tick: 'sent' | 'delivered' | 'read' = t >= T.read ? 'read' : t >= T.delivered ? 'delivered' : 'sent';

  const messages = [
    { id: 'q', at: T.send, side: 'me' as const, node: <TextBubble me text={QUESTION} tick={tick} time="10:24" /> },
    {
      id: 'r1',
      at: T.reply1,
      side: 'them' as const,
      node: <TextBubble text="Yes! Olive and ivory are both in stock in M 🙌 Here’s the olive one:" time="10:24" />,
    },
    { id: 'p', at: T.product, side: 'them' as const, node: <ProductBubble tapping={between(t, T.tapBuy, T.tapBuy + 450)} /> },
    {
      id: 'r2',
      at: T.reply2,
      side: 'them' as const,
      node: <TextBubble text="Payment received ✅ Order #1042 is confirmed and ships tomorrow." time="10:26" />,
    },
    { id: 's', at: T.shopify, side: 'center' as const, node: <SystemChip /> },
  ].filter((m) => t >= m.at);

  const chips = [
    { at: T.send + 200, icon: <Bot className="h-4 w-4 text-brand-700" />, title: 'New chat · auto-assigned', detail: 'AI agent picked it up', slot: 'lt' },
    { at: T.reply1, icon: <Sparkles className="h-4 w-4 text-violet-600" />, title: 'AI replied in 1.3s', detail: 'Answered from your catalogue', slot: 'rt' },
    { at: T.success, icon: <BrandIcon slug="whatsapp" className="h-4 w-4" />, title: '₹1,299 collected', detail: 'WhatsApp Pay · UPI', slot: 'lb' },
    { at: T.shopify, icon: <BrandIcon slug="shopify" className="h-4 w-4" />, title: 'Order #1042 created', detail: 'Synced to Shopify', slot: 'rb' },
  ].filter((c) => t >= c.at);

  const slot: Record<string, string> = {
    lt: '-left-4 top-14 lg:-left-16',
    rt: '-right-4 top-[38%] lg:-right-12',
    lb: '-left-4 bottom-28 lg:-left-20',
    rb: '-right-4 bottom-10 lg:-right-10',
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[20.5rem] [perspective:1200px]"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        {/* phone */}
        <div className="relative rounded-[2.75rem] bg-[#0E2A22] p-[9px] shadow-[0_50px_90px_-35px_rgba(14,42,34,0.6),0_0_0_1px_rgba(255,255,255,0.08)_inset,0_0_0_2px_#0a1f19]">
          <span aria-hidden className="absolute -left-[3px] top-28 h-12 w-[3px] rounded-l bg-[#0a1f19]" />
          <span aria-hidden className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-r bg-[#0a1f19]" />
          <div className="relative overflow-hidden rounded-[2.2rem] bg-[#EFEAE2]">
            {/* status bar */}
            <div className="flex items-center justify-between bg-[#0B5D3B] px-6 pb-1 pt-2.5 text-[10.5px] font-semibold text-white">
              <span>10:26</span>
              <span aria-hidden className="h-[18px] w-[74px] rounded-full bg-[#0E2A22]" />
              <span className="flex items-center gap-1">
                <span className="flex items-end gap-px">
                  {[3, 5, 7, 9].map((h) => (
                    <span key={h} className="w-[2.5px] rounded-sm bg-white" style={{ height: h }} />
                  ))}
                </span>
                <span className="ml-0.5 h-[9px] w-[17px] rounded-[3px] border border-white/80 p-px">
                  <span className="block h-full w-3/4 rounded-[1px] bg-white" />
                </span>
              </span>
            </div>

            {/* chat header */}
            <div className="flex items-center gap-2 bg-[#0B5D3B] px-2.5 pb-2.5 pt-1 text-white">
              <ChevronLeft className="h-5 w-5 opacity-90" />
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9E3D3] text-[11px] font-bold text-[#0B5D3B]">
                H&amp;L
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[13px] font-semibold leading-tight">
                  Hearth &amp; Loom <BadgeCheck className="h-3.5 w-3.5 fill-[#25D366] text-[#0B5D3B]" />
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={typing ? 'typing' : 'online'}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="text-[11px] leading-tight text-white/75"
                  >
                    {typing ? 'typing…' : 'online'}
                  </motion.p>
                </AnimatePresence>
              </div>
              <Video className="h-[18px] w-[18px] opacity-90" />
              <Phone className="ml-2 h-4 w-4 opacity-90" />
            </div>

            {/* thread */}
            <div className="relative h-[24.5rem] overflow-hidden [background-image:radial-gradient(rgba(14,42,34,0.07)_1px,transparent_1px)] [background-size:14px_14px]">
              <div className="flex h-full flex-col justify-end gap-1.5 px-2.5 pb-2 pt-3 [mask-image:linear-gradient(to_bottom,transparent,#000_12%)]">
                <div className="mb-1 flex justify-center">
                  <span className="rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-medium text-black/50 shadow-sm">Yesterday</span>
                </div>
                <div className="flex justify-start">
                  <TextBubble text="Your order #0987 was delivered 📦 How did you like it?" time="18:02" />
                </div>
                <div className="flex justify-end">
                  <TextBubble me text="Loved it! The fabric is so soft 😍" tick="read" time="18:10" />
                </div>
                <div className="mb-1 mt-1 flex justify-center">
                  <span className="rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-medium text-black/50 shadow-sm">Today</span>
                </div>
                <AnimatePresence initial={false} mode="popLayout">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      layout="position"
                      initial={{ opacity: 0, y: 16, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      style={{ transformOrigin: m.side === 'me' ? '100% 100%' : '0% 100%' }}
                      className={cn('flex', m.side === 'me' ? 'justify-end' : m.side === 'center' ? 'justify-center' : 'justify-start')}
                    >
                      {m.node}
                    </motion.div>
                  ))}
                  {typing && (
                    <motion.div
                      key="typing"
                      layout="position"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="flex justify-start"
                    >
                      <span className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
                        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-black/40" />
                        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-black/40" />
                        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-black/40" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WhatsApp Pay sheet */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-black"
                animate={{ opacity: sheetOpen ? 0.35 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white px-4 pb-4 pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.15)]"
                initial={false}
                animate={{ y: sheetOpen ? '0%' : '105%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              >
                <PaySheet t={t} />
              </motion.div>
            </div>

            {/* composer */}
            <div className="flex items-center gap-1.5 bg-[#EFEAE2] px-2 pb-5 pt-1.5">
              <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 shadow-sm">
                <Smile className="h-[18px] w-[18px] shrink-0 text-black/40" />
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-[#111B21]">
                  {typed ? (
                    <>
                      {typed}
                      <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-[#0B5D3B]" />
                    </>
                  ) : (
                    <span className="text-black/35">Message</span>
                  )}
                </span>
                <Paperclip className="h-4 w-4 shrink-0 -rotate-45 text-black/40" />
              </div>
              <motion.span
                animate={{ scale: between(t, T.send - 150, T.send + 100) ? 0.82 : 1 }}
                transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B5D3B] text-white"
              >
                {typed ? <SendHorizontal className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </motion.span>
            </div>
            <span aria-hidden className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-black/70" />
          </div>
        </div>
      </motion.div>

      {/* dashboard events, synced to the conversation */}
      <AnimatePresence>
        {chips.map((c) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 14, scale: 0.9, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={cn('absolute z-10 hidden sm:block', slot[c.slot])}
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card/95 px-3 py-2.5 shadow-lift backdrop-blur">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted">{c.icon}</span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-[12.5px] font-semibold text-foreground">{c.title}</span>
                <span className="block whitespace-nowrap text-[11.5px] text-muted-foreground">{c.detail}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Ticks({ state }: { state: 'sent' | 'delivered' | 'read' }) {
  if (state === 'sent') return <Check className="h-3 w-3 text-black/40" />;
  return <CheckCheck className={cn('h-3.5 w-3.5 transition-colors duration-300', state === 'read' ? 'text-[#53BDEB]' : 'text-black/40')} />;
}

function TextBubble({ text, me, tick, time }: { text: string; me?: boolean; tick?: 'sent' | 'delivered' | 'read'; time: string }) {
  return (
    <div
      className={cn(
        'max-w-[80%] rounded-xl px-2.5 py-1.5 text-[12.5px] leading-snug text-[#111B21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]',
        me ? 'rounded-tr-sm bg-[#D9FDD3]' : 'rounded-tl-sm bg-white'
      )}
    >
      {text}
      <span className="float-right ml-2 mt-1.5 inline-flex items-center gap-0.5 text-[9.5px] leading-none text-black/45">
        {time} {me && tick && <Ticks state={tick} />}
      </span>
    </div>
  );
}

function ProductBubble({ tapping }: { tapping: boolean }) {
  return (
    <div className="w-[13rem] overflow-hidden rounded-xl rounded-tl-sm bg-white p-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
      <div className="relative h-28 overflow-hidden rounded-lg bg-[linear-gradient(160deg,#8A9A66,#5E6E43)]">
        {/* stylised garment */}
        <svg aria-hidden viewBox="0 0 120 100" className="absolute inset-x-0 bottom-0 mx-auto h-[92%]">
          <path d="M42 8 L60 16 L78 8 L100 22 L92 42 L84 38 L84 98 L36 98 L36 38 L28 42 L20 22 Z" fill="#B7C28F" />
          <path d="M60 16 L60 60" stroke="#8E9A68" strokeWidth="1.5" />
          {[26, 36, 46].map((y) => (
            <circle key={y} cx="60" cy={y} r="1.6" fill="#7B8657" />
          ))}
        </svg>
        <span className="absolute left-2 top-2 rounded-md bg-white/85 px-1.5 py-0.5 text-[9.5px] font-semibold text-[#3F4A2A]">In stock</span>
      </div>
      <div className="px-2 pb-1 pt-1.5">
        <p className="text-[12.5px] font-semibold text-[#111B21]">Linen kurta · Olive</p>
        <p className="text-[11px] text-black/50">Size M · Free delivery</p>
        <p className="mt-0.5 text-[12.5px] font-semibold text-[#111B21]">₹1,299</p>
      </div>
      <div className="relative mt-1 overflow-hidden border-t border-black/5 py-2 text-center text-[12.5px] font-semibold text-[#027EB5]">
        Buy now
        <AnimatePresence>
          {tapping && (
            <motion.span
              initial={{ scale: 0, opacity: 0.45 }}
              animate={{ scale: 3.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10 rounded-full bg-[#027EB5]/40"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SystemChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FFF5C4] px-2.5 py-1 text-[10.5px] font-medium text-[#54656F] shadow-sm">
      <BrandIcon slug="shopify" className="h-3 w-3" /> Order #1042 created in Shopify
    </span>
  );
}

function PaySheet({ t }: { t: number }) {
  const state = t >= T.success ? 'done' : t >= T.processing ? 'processing' : 'review';
  const tapping = between(t, T.tapPay, T.tapPay + 450);
  return (
    <div>
      <span className="mx-auto mb-3 block h-1 w-9 rounded-full bg-black/15" />
      <div className="flex items-center gap-2">
        <BrandIcon slug="whatsapp" className="h-4 w-4" />
        <p className="text-[13px] font-semibold text-[#111B21]">Payment</p>
        <span className="ml-auto text-[11px] text-black/45">Hearth &amp; Loom</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {state !== 'done' ? (
          <motion.div key="review" exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <div className="mt-3 space-y-1.5 rounded-xl bg-[#F7F8FA] p-2.5 text-[11.5px] text-[#111B21]">
              <div className="flex justify-between">
                <span className="text-black/55">Linen kurta × 1</span>
                <span>₹1,299</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/55">Delivery</span>
                <span className="text-[#0B5D3B]">Free</span>
              </div>
              <div className="flex justify-between border-t border-black/5 pt-1.5 font-semibold">
                <span>Total</span>
                <span>₹1,299.00</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-xl border border-black/10 px-2.5 py-2 text-[11.5px]">
              <span className="font-medium text-[#111B21]">UPI · rahul@okbank</span>
              <span className="text-[#027EB5]">Change</span>
            </div>
            <div className="relative mt-3 flex h-10 items-center justify-center overflow-hidden rounded-full bg-[#0B5D3B] text-[13px] font-semibold text-white">
              {state === 'processing' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </span>
              ) : (
                'Pay ₹1,299'
              )}
              <AnimatePresence>
                {tapping && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 6, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-1/2 top-1/2 -ml-4 -mt-4 h-8 w-8 rounded-full bg-white/50"
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-5 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.1 }} />
              </svg>
            </span>
            <p className="mt-2.5 text-[14px] font-semibold text-[#111B21]">₹1,299.00 paid</p>
            <p className="text-[11px] text-black/50">to Hearth &amp; Loom · UPI</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
