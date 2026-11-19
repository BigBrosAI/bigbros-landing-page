"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Bot, Camera, Check, CheckCheck, ChevronLeft, Loader2, Mic, Phone, Plus, Sparkles, Sticker, Video } from 'lucide-react';
import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import { useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/*
 * Illustrative product demo: an iPhone running WhatsApp, seen from the customer's
 * side. A scripted, time-driven scene (demo data only) — every visual derives from `t`.
 */
const QUESTION = 'Hi! Is the linen kurta available in M?';
const T = {
  typeStart: 700,
  charMs: 45,
  send: 700 + QUESTION.length * 45 + 250,
  reply1: 5000,
  product: 5900,
  me2: 7300,
  order: 8600,
  tapPay: 9900,
  sheetOpen: 10200,
  tapConfirm: 11500,
  processing: 11700,
  success: 12600,
  sheetClose: 13500,
  paidCard: 13900,
  reply2: 14900,
  loop: 19000,
};
const typingWindows: [number, number][] = [
  [3800, T.reply1],
  [5150, T.product],
  [7900, T.order],
  [14100, T.reply2],
];
const between = (t: number, a: number, b: number) => t >= a && t < b;
const ACCENT = '#1DAA61'; // iOS WhatsApp accent
type Tick = 'sent' | 'delivered' | 'read';

export function HeroPhone({ showEvents = true }: { showEvents?: boolean }) {
  const { ref, t, reduce } = useClock(T.loop, T.loop - 800);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 110, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 110, damping: 18 });
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

  const typed = t >= T.typeStart && t < T.send ? QUESTION.slice(0, Math.floor((t - T.typeStart) / T.charMs)) : '';
  const typing = typingWindows.some(([a, b]) => between(t, a, b));
  const sheetOpen = between(t, T.sheetOpen, T.sheetClose);
  const tick = (sent: number): Tick => (t >= sent + 1300 ? 'read' : t >= sent + 500 ? 'delivered' : 'sent');

  const messages = [
    { id: 'q', at: T.send, me: true, node: <Text me text={QUESTION} time="10:24" tick={tick(T.send)} /> },
    { id: 'r1', at: T.reply1, node: <Text text="Hi Rahul! 👋 Yes — olive and ivory are both in stock in M." time="10:24" /> },
    { id: 'p', at: T.product, node: <ProductMsg /> },
    { id: 'm2', at: T.me2, me: true, node: <Text me text="Olive please 😍" time="10:25" tick={tick(T.me2)} /> },
    { id: 'o', at: T.order, node: <OrderMsg tapping={between(t, T.tapPay, T.tapPay + 450)} paid={t >= T.success} /> },
    { id: 'pc', at: T.paidCard, me: true, node: <PaidMsg /> },
    { id: 'r2', at: T.reply2, node: <Text text="Payment received ✅ Order #1042 is confirmed and ships tomorrow 🚚" time="10:26" /> },
  ].filter((m) => t >= m.at);

  const events = [
    { at: T.send + 300, icon: <Bot className="h-4 w-4 text-brand-700" />, title: 'New chat', detail: 'Auto-assigned to AI agent' },
    { at: T.reply1, icon: <Sparkles className="h-4 w-4 text-violet-600" />, title: 'AI replied in 1.3s', detail: 'From your catalogue' },
    { at: T.order, icon: <BrandTile slug="whatsapp" size={20} />, title: 'Order sent', detail: '₹1,299 · Linen kurta' },
    { at: T.success, icon: <span className="font-display text-[13px] font-bold text-brand-700">₹</span>, title: '₹1,299 collected', detail: 'WhatsApp Pay · UPI' },
    { at: T.reply2, icon: <BrandTile slug="shopify" size={20} />, title: 'Order #1042', detail: 'Created in Shopify' },
  ].filter((e) => t >= e.at);

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="flex items-center justify-center">
      <div className="shrink-0 [perspective:1400px]">
        <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
          <IPhone>
            <StatusBar />
            {/* chat header */}
            <div className="flex items-center gap-2 border-b border-black/5 bg-[#F7F7F7] px-2 pb-2 pt-1">
              <span className="flex items-center" style={{ color: ACCENT }}>
                <ChevronLeft className="h-6 w-6" strokeWidth={2.4} />
                <span className="-ml-1 rounded-full px-1.5 text-[12.5px] font-semibold text-white" style={{ background: ACCENT }}>
                  12
                </span>
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(140deg,#C8B68E,#7A6A45)] text-[10px] font-bold text-white">
                H&amp;L
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="flex items-center gap-1 truncate text-[13.5px] font-semibold text-black">
                  Hearth &amp; Loom
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-label="Verified business">
                    <path fill={ACCENT} d="M12 1l2.6 2.2 3.4-.4.9 3.3 3 1.7-1.2 3.2 1.2 3.2-3 1.7-.9 3.3-3.4-.4L12 23l-2.6-2.2-3.4.4-.9-3.3-3-1.7L3.3 12 2.1 8.8l3-1.7.9-3.3 3.4.4z" />
                    <path d="M7.5 12.2l3 3 6-6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={typing ? 'typing' : 'biz'}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className={cn('truncate text-[11px]', typing ? 'font-medium' : 'text-black/50')}
                    style={typing ? { color: ACCENT } : undefined}
                  >
                    {typing ? 'typing…' : 'Business account'}
                  </motion.p>
                </AnimatePresence>
              </div>
              <Video className="h-[21px] w-[21px]" style={{ color: ACCENT }} />
              <Phone className="ml-3 mr-1 h-[18px] w-[18px]" style={{ color: ACCENT }} />
            </div>

            {/* thread */}
            <div className="relative h-[27rem] overflow-hidden bg-[#EFE7DD]">
              <Wallpaper />
              <div className="relative flex h-full flex-col justify-end gap-1 px-2.5 pb-2 [mask-image:linear-gradient(to_bottom,transparent,#000_10%)]">
                <DateChip>Yesterday</DateChip>
                <Row>
                  <Text text="Your order #0987 was delivered 📦 How did you like it?" time="18:02" />
                </Row>
                <Row me>
                  <Text me text="Loved it! The fabric is so soft 😍" time="18:10" tick="read" />
                </Row>
                <DateChip>Today</DateChip>
                <AnimatePresence initial={false} mode="popLayout">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      layout="position"
                      initial={{ opacity: 0, y: 18, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', stiffness: 430, damping: 32 }}
                      style={{ transformOrigin: m.me ? '100% 100%' : '0% 100%' }}
                      className={cn('flex', m.me ? 'justify-end' : 'justify-start')}
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
                      className="flex"
                    >
                      <span className="flex items-center gap-1 rounded-[14px] rounded-bl-[4px] bg-white px-3 py-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="typing-dot h-[6px] w-[6px] rounded-full bg-black/40" />
                        ))}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WhatsApp Pay sheet */}
              <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" animate={{ opacity: sheetOpen ? 0.4 : 0 }} transition={{ duration: 0.3 }} />
              <motion.div
                className="absolute inset-x-0 bottom-0 rounded-t-[22px] bg-[#F2F2F7] px-3 pb-3 pt-2"
                initial={false}
                animate={{ y: sheetOpen ? '0%' : '105%' }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              >
                <PaySheet t={t} />
              </motion.div>
            </div>

            {/* composer */}
            <div className="flex items-center gap-2.5 border-t border-black/5 bg-[#F7F7F7] px-2.5 pb-6 pt-2">
              <Plus className="h-6 w-6 shrink-0" style={{ color: ACCENT }} />
              <div className="flex h-[34px] min-w-0 flex-1 items-center rounded-full border border-black/10 bg-white px-3">
                <span className="min-w-0 flex-1 truncate text-[13.5px] text-black">
                  {typed}
                  {typed && <span className="ml-px inline-block h-4 w-[1.5px] translate-y-[3px] animate-pulse" style={{ background: ACCENT }} />}
                </span>
                <Sticker className="h-[18px] w-[18px] shrink-0 text-black/40" />
              </div>
              {typed ? (
                <motion.span
                  key="send"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: between(t, T.send - 160, T.send) ? 0.8 : 1, opacity: 1 }}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: ACCENT }}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                  </svg>
                </motion.span>
              ) : (
                <span className="flex items-center gap-3">
                  <Camera className="h-[22px] w-[22px]" style={{ color: ACCENT }} />
                  <Mic className="h-[22px] w-[22px]" style={{ color: ACCENT }} />
                </span>
              )}
            </div>
          </IPhone>
        </motion.div>
      </div>

      {/* dashboard events, synced to the chat */}
      {showEvents && (
        <div className="relative z-10 ml-5 hidden w-[13.5rem] shrink-0 md:block lg:hidden xl:block" aria-hidden>
          <p className="mb-2 pl-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Meanwhile, in your dashboard</p>
          <ul className="space-y-2">
            <AnimatePresence initial={false}>
              {events.slice(-4).map((e) => (
                <motion.li
                  key={e.title}
                  layout
                  initial={{ opacity: 0, x: -16, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  className="flex items-center gap-2.5 rounded-2xl border border-border/80 bg-card/95 px-3 py-2.5 shadow-lift backdrop-blur"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted">{e.icon}</span>
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-[12.5px] font-semibold text-foreground">{e.title}</span>
                    <span className="block truncate text-[11.5px] text-muted-foreground">{e.detail}</span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- device ---------- */

function IPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[19rem] max-w-[calc(100vw-2.5rem)] rounded-[3.1rem] bg-[linear-gradient(145deg,#5B5F66,#2B2E33_35%,#1B1D21_60%,#4A4E55)] p-[3px] shadow-[0_60px_100px_-40px_rgba(11,46,35,0.55),0_25px_40px_-20px_rgba(0,0,0,0.35)]">
      <span aria-hidden className="absolute -left-[3px] top-[6.5rem] h-7 w-[3px] rounded-l bg-[#3B3F45]" />
      <span aria-hidden className="absolute -left-[3px] top-[9rem] h-12 w-[3px] rounded-l bg-[#3B3F45]" />
      <span aria-hidden className="absolute -left-[3px] top-[12.6rem] h-12 w-[3px] rounded-l bg-[#3B3F45]" />
      <span aria-hidden className="absolute -right-[3px] top-[10rem] h-16 w-[3px] rounded-r bg-[#3B3F45]" />
      <div className="rounded-[2.95rem] bg-black p-[9px]">
        <div className="relative overflow-hidden rounded-[2.4rem] bg-white">
          {children}
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.16),transparent_32%)]" />
          <span aria-hidden className="absolute bottom-2 left-1/2 h-[5px] w-[7.5rem] -translate-x-1/2 rounded-full bg-black/85" />
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="relative flex h-11 items-end justify-between bg-[#F7F7F7] px-7 pb-1.5 text-[13px] font-semibold text-black">
      <span>9:41</span>
      <span aria-hidden className="absolute left-1/2 top-2.5 h-[25px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-[1.5px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px] bg-black" style={{ height: h }} />
          ))}
        </span>
        <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="black" aria-hidden>
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.1-1.2A10 10 0 008 .6 10 10 0 00.9 3.4L2 4.6a8.4 8.4 0 016-2.4zm0 3.3c1.4 0 2.7.5 3.7 1.4l1.1-1.2a7 7 0 00-9.6 0l1.1 1.2c1-.9 2.3-1.4 3.7-1.4zm0 3.3c.6 0 1.1.2 1.5.6L8 11 6.5 9.4c.4-.4.9-.6 1.5-.6z" />
        </svg>
        <span className="flex items-center">
          <span className="h-[12px] w-[23px] rounded-[4px] border border-black/40 p-[1.5px]">
            <span className="block h-full w-[80%] rounded-[2px] bg-black" />
          </span>
          <span className="ml-px h-1 w-[1.5px] rounded-r bg-black/40" />
        </span>
      </span>
    </div>
  );
}

function Wallpaper() {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.07]">
      <defs>
        <pattern id="wa-doodle" width="84" height="84" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#3B2F1E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 14c0-3 4-5 6-1 2-4 6-2 6 1 0 4-6 7-6 7s-6-3-6-7z" />
            <circle cx="60" cy="16" r="6" />
            <path d="M57 16h6M60 13v6" />
            <path d="M8 50l6-6 6 6-6 6z" />
            <path d="M44 46h18v10H52l-4 4v-4h-4z" />
            <path d="M70 62l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" />
            <path d="M20 72c4-4 10-4 14 0" />
            <circle cx="36" cy="30" r="2" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wa-doodle)" />
    </svg>
  );
}

function DateChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-1 flex justify-center">
      <span className="rounded-lg bg-white/90 px-2.5 py-[3px] text-[11px] font-medium text-black/55 shadow-[0_1px_0.5px_rgba(0,0,0,0.1)]">{children}</span>
    </div>
  );
}

function Row({ children, me }: { children: React.ReactNode; me?: boolean }) {
  return <div className={cn('flex', me ? 'justify-end' : 'justify-start')}>{children}</div>;
}

/* ---------- messages ---------- */

function Tail({ me }: { me?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 8 13" className={cn('absolute bottom-0 h-[13px] w-2', me ? '-right-[7px]' : '-left-[7px] -scale-x-100')}>
      <path d="M0 0v13h8C4 12 1 9 0 0z" fill={me ? '#D9FDD3' : '#fff'} />
    </svg>
  );
}

function Ticks({ state }: { state: Tick }) {
  if (state === 'sent') return <Check className="h-3.5 w-3.5 text-black/40" strokeWidth={2.4} />;
  return <CheckCheck className={cn('h-[15px] w-[15px] transition-colors duration-300', state === 'read' ? 'text-[#53BDEB]' : 'text-black/40')} strokeWidth={2.4} />;
}

function Meta({ time, tick }: { time: string; tick?: Tick }) {
  return (
    <span className="float-right ml-2 mt-[5px] inline-flex translate-y-[3px] items-center gap-[3px] text-[10.5px] leading-none text-black/45">
      {time}
      {tick && <Ticks state={tick} />}
    </span>
  );
}

function Text({ text, me, time, tick }: { text: string; me?: boolean; time: string; tick?: Tick }) {
  return (
    <div
      className={cn(
        'relative max-w-[78%] px-2.5 py-1.5 text-[14px] leading-[1.32] text-[#111B21] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]',
        me ? 'rounded-[14px] rounded-br-[4px] bg-[#D9FDD3]' : 'rounded-[14px] rounded-bl-[4px] bg-white'
      )}
    >
      <Tail me={me} />
      {text}
      <Meta time={time} tick={tick} />
    </div>
  );
}

function Kurta() {
  return (
    <svg aria-hidden viewBox="0 0 120 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="kurta-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ECE7DA" />
          <stop offset="1" stopColor="#D6CDB5" />
        </linearGradient>
        <linearGradient id="kurta-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7E8B57" />
          <stop offset="1" stopColor="#5F6B3F" />
        </linearGradient>
      </defs>
      <rect width="120" height="100" fill="url(#kurta-bg)" />
      <path d="M44 10 L60 17 L76 10 L98 24 L91 44 L83 40 L84 99 L36 99 L37 40 L29 44 L22 24 Z" fill="url(#kurta-fill)" />
      <path d="M60 17 L60 58" stroke="#4E5833" strokeWidth="1.4" />
      {[27, 37, 47].map((y) => (
        <circle key={y} cx="60" cy={y} r="1.7" fill="#ECE7DA" />
      ))}
    </svg>
  );
}

function ProductMsg() {
  return (
    <div className="relative w-[13.5rem] rounded-[14px] rounded-bl-[4px] bg-white p-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
      <Tail />
      <div className="h-28 overflow-hidden rounded-[10px]">
        <Kurta />
      </div>
      <div className="px-2 pb-1 pt-1.5">
        <p className="text-[13.5px] font-semibold text-[#111B21]">Linen kurta — Olive</p>
        <p className="text-[12px] text-black/50">Size M · Free delivery</p>
        <p className="mt-0.5 flex items-baseline justify-between text-[13.5px] font-semibold text-[#111B21]">
          ₹1,299 <span className="text-[10.5px] font-normal text-black/45">10:24</span>
        </p>
      </div>
      <div className="border-t border-black/[0.07] py-2 text-center text-[13.5px] font-medium text-[#027EB5]">View</div>
    </div>
  );
}

function OrderMsg({ tapping, paid }: { tapping: boolean; paid: boolean }) {
  return (
    <div className="relative w-[13.5rem] rounded-[14px] rounded-bl-[4px] bg-white shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
      <Tail />
      <div className="flex gap-2.5 p-2">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
          <Kurta />
        </div>
        <div className="min-w-0 leading-tight">
          <p className="text-[12px] text-black/50">Order details</p>
          <p className="truncate text-[13.5px] font-semibold text-[#111B21]">Linen kurta × 1</p>
          <p className="text-[13px] text-[#111B21]">₹1,299.00</p>
        </div>
      </div>
      <p className="px-2.5 pb-1.5 text-[13px] text-[#111B21]">
        Here’s your order — pay securely right here in WhatsApp.
        <span className="float-right ml-2 mt-1 text-[10.5px] text-black/45">10:25</span>
      </p>
      <div className="relative overflow-hidden border-t border-black/[0.07] py-2 text-center text-[13.5px] font-medium text-[#027EB5]">
        {paid ? 'View order' : 'Review and pay'}
        <AnimatePresence>
          {tapping && (
            <motion.span
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute left-1/2 top-1/2 -ml-4 -mt-4 h-8 w-8 rounded-full bg-[#027EB5]/40"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PaidMsg() {
  return (
    <div className="relative w-[13.5rem] rounded-[14px] rounded-br-[4px] bg-[#D9FDD3] p-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
      <Tail me />
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
          <BrandIcon slug="whatsapp" className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-[12px] text-black/55">Payment to Hearth &amp; Loom</p>
          <p className="font-display text-[17px] font-bold text-[#111B21]">₹1,299.00</p>
        </div>
      </div>
      <p className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-[#0B7A3E]">
        <CheckCheck className="h-3.5 w-3.5" /> Paid · UPI
        <span className="ml-auto text-[10.5px] font-normal text-black/45">10:26</span>
      </p>
    </div>
  );
}

function PaySheet({ t }: { t: number }) {
  const state = t >= T.success ? 'done' : t >= T.processing ? 'processing' : 'review';
  const tapping = between(t, T.tapConfirm, T.tapConfirm + 450);
  return (
    <div>
      <span className="mx-auto mb-2.5 block h-[5px] w-9 rounded-full bg-black/20" />
      <div className="flex items-center justify-between px-1">
        <span className="text-[13px] text-[#027EB5]">Cancel</span>
        <span className="flex items-center gap-1.5 text-[14px] font-semibold text-black">
          <BrandIcon slug="whatsapp" className="h-4 w-4" /> Payment
        </span>
        <span className="w-10" />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {state !== 'done' ? (
          <motion.div key="review" exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <div className="mt-3 overflow-hidden rounded-xl bg-white text-[13px] text-black">
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-black/55">Linen kurta × 1</span>
                <span>₹1,299.00</span>
              </div>
              <div className="flex justify-between border-t border-black/5 px-3 py-2.5">
                <span className="text-black/55">Delivery</span>
                <span style={{ color: ACCENT }}>Free</span>
              </div>
              <div className="flex justify-between border-t border-black/5 px-3 py-2.5 font-semibold">
                <span>Total</span>
                <span>₹1,299.00</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-[13px]">
              <span className="truncate text-black">
                UPI <span className="text-black/45">· rahul@okbank</span>
              </span>
              <span className="text-[#027EB5]">Change</span>
            </div>
            <div className="relative mt-3 flex h-11 items-center justify-center overflow-hidden rounded-full text-[15px] font-semibold text-white" style={{ background: ACCENT }}>
              {state === 'processing' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing
                </span>
              ) : (
                'Pay ₹1,299.00'
              )}
              <AnimatePresence>
                {tapping && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 7, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-1/2 top-1/2 -ml-4 -mt-4 h-8 w-8 rounded-full bg-white/50"
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: ACCENT }}>
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.1 }} />
              </svg>
            </span>
            <p className="mt-3 text-[16px] font-semibold text-black">₹1,299.00 paid</p>
            <p className="text-[12px] text-black/50">to Hearth &amp; Loom · UPI</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
