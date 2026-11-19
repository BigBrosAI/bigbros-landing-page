"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCheck, CircleCheck, Inbox, Search, SendHorizontal, Sparkles, Zap } from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';
import { useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/* Illustrative data for the animated inbox — not real customers. */
const agents = [
  { name: 'Priya', team: 'Support', color: 'bg-emerald-500' },
  { name: 'Arjun', team: 'Sales', color: 'bg-sky-500' },
  { name: 'Meera', team: 'Support', color: 'bg-amber-500' },
];

const chats = [
  { who: 'Rahul K.', text: 'Hi, where is my order #2231?', tag: 'Order status', reply: 'Hi Rahul! It’s out for delivery and will reach you by 6 pm today 🚚', thanks: 'Great, thanks!' },
  { who: 'Sana M.', text: 'Do you ship to Pune?', tag: 'Pre-sales', reply: 'Yes! We deliver across Pune in 2–3 days, free over ₹999.', thanks: 'Perfect 🙌' },
  { who: 'Imran', text: 'Payment failed but money got deducted', tag: 'Payments', reply: 'Sorry Imran! It auto-refunds within 24 hours — I’ve flagged it for you.', thanks: 'Okay, thank you' },
  { who: 'Neha P.', text: 'Is cash on delivery available?', tag: 'Pre-sales', reply: 'Yes, COD is available for your pincode 👍', thanks: 'Ordering now!' },
];

const CYCLE = 9000;
const S = { arrive: 300, assign: 900, open: 1300, typeStart: 2100, charMs: 32, send: 0, delivered: 0, read: 0, custTyping: 0, thanks: 0, resolve: 0 };
function timeline(reply: string) {
  const send = S.typeStart + reply.length * S.charMs + 200;
  return { ...S, send, delivered: send + 400, read: send + 900, custTyping: send + 1000, thanks: send + 1700, resolve: send + 2400 };
}

export function InboxDemo() {
  const { ref, t, loop, reduce } = useClock(CYCLE, 8500);
  const n = loop + 4; // start mid-shift so the list is already populated
  const cur = { ...chats[n % chats.length], agent: n % agents.length, key: n };
  const tl = timeline(cur.reply);
  const arrived = t >= tl.arrive;

  const prev = [1, 2, 3].map((k) => ({ ...chats[(n - k) % chats.length], agent: (n - k) % agents.length, key: n - k }));
  const list = arrived ? [cur, ...prev] : prev;

  const typed = t >= tl.typeStart && t < tl.send ? cur.reply.slice(0, Math.floor((t - tl.typeStart) / S.charMs)) : '';
  const tick = t >= tl.read ? 'read' : t >= tl.delivered ? 'delivered' : 'sent';
  const resolved = t >= tl.resolve;
  const showConv = t >= tl.open;
  const conv = showConv ? cur : prev[0];

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
      {/* top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Inbox className="h-4 w-4 text-brand-700" /> Live chat
          <motion.span
            key={list.length + n}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium tabular-nums text-brand-800"
          >
            {12 + (n % 5) + (arrived && !resolved ? 1 : 0)} open
          </motion.span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1.5">
            {agents.map((a, i) => {
              const active = i === cur.agent && t >= tl.assign && t < tl.assign + 1600;
              return (
                <span key={a.name} className="relative" title={`${a.name} · ${a.team}`}>
                  {active && !reduce && <span className="animate-soft-ping absolute inset-0 rounded-full bg-brand-400/60" />}
                  <span
                    className={cn(
                      'relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-card text-[10.5px] font-semibold text-white transition-transform duration-300',
                      a.color,
                      active && 'z-10 scale-110'
                    )}
                  >
                    {a.name[0]}
                  </span>
                </span>
              );
            })}
          </div>
          <Search className="hidden h-4 w-4 text-muted-foreground sm:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[12.5rem_minmax(0,1fr)] [&>*]:min-w-0">
        {/* conversation list */}
        <ul className="relative h-[13.5rem] overflow-hidden border-b border-border sm:h-[22rem] sm:border-b-0 sm:border-r">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((c, i) => {
              const isCur = c.key === n;
              const assigned = !isCur || t >= tl.assign;
              const replied = !isCur || t >= tl.send;
              const unread = isCur && t < tl.open;
              const selected = (isCur && showConv) || (!showConv && i === 0 && !isCur);
              return (
                <motion.li
                  key={c.key}
                  layout
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  className={cn(
                    'relative flex gap-2.5 border-b border-border px-3 py-3 transition-colors duration-500',
                    selected ? 'bg-brand-50/70' : unread ? 'bg-amber-50/70' : 'bg-card'
                  )}
                >
                  {selected && <span className="absolute inset-y-0 left-0 w-0.5 bg-brand-600" />}
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-ink-600">
                    {c.who[0]}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white">
                      <BrandIcon slug="whatsapp" className="h-2.5 w-2.5" />
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className={cn('truncate text-[12.5px]', unread ? 'font-bold' : 'font-semibold')}>{c.who}</p>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{isCur ? 'now' : `${i * 3}m`}</span>
                    </div>
                    <p className="truncate text-[11.5px] text-muted-foreground">{replied ? `You: ${c.reply}` : c.text}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <AnimatePresence>
                        {assigned && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1 rounded bg-white px-1 py-px text-[10px] font-medium text-ink-600 ring-1 ring-border"
                          >
                            <span className={cn('h-1.5 w-1.5 rounded-full', agents[c.agent].color)} />
                            {agents[c.agent].name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {(!isCur || resolved) && <CircleCheck className="h-3 w-3 text-brand-600" />}
                    </div>
                  </div>
                  {unread && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-8 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#25D366] px-1 text-[9.5px] font-bold text-white"
                    >
                      1
                    </motion.span>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* open conversation */}
        <div className="flex h-[18rem] min-w-0 flex-col bg-[#F4F7F5] sm:h-[22rem]">
          <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2">
            <div className="leading-tight">
              <p className="text-[12.5px] font-semibold">{conv.who}</p>
              <p className="text-[10.5px] text-muted-foreground">
                {conv.tag} · Assigned to {agents[conv.agent].name}
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={resolved || conv.key !== n ? 'r' : 'o'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10.5px] font-semibold',
                  resolved || conv.key !== n ? 'bg-brand-100 text-brand-800' : 'bg-amber-100 text-amber-800'
                )}
              >
                {resolved || conv.key !== n ? 'Resolved' : 'Open'}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={conv.key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 py-2"
            >
              <p className="mx-auto rounded-full bg-white px-2 py-0.5 text-[10px] text-muted-foreground shadow-sm">
                Auto-assigned to {agents[conv.agent].name} · round-robin
              </p>
              <Bubble text={conv.text} />
              {(conv.key !== n || t >= tl.send) && (
                <Bubble me text={conv.reply} tick={conv.key !== n ? 'read' : tick} />
              )}
              {conv.key === n && t >= tl.custTyping && t < tl.thanks && (
                <span className="flex w-fit items-center gap-1 rounded-xl rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-black/35" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-black/35" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-black/35" />
                </span>
              )}
              {(conv.key !== n || t >= tl.thanks) && <Bubble text={conv.thanks} />}
            </motion.div>
          </AnimatePresence>

          {/* composer */}
          <div className="relative border-t border-border bg-card p-2">
            <AnimatePresence>
              {conv.key === n && t >= tl.open + 300 && t < tl.typeStart + 300 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute bottom-full left-2 mb-1.5 flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1 text-[10.5px] font-medium text-violet-800 shadow-sm"
                >
                  <Sparkles className="h-3 w-3" /> AI suggested a reply
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="min-w-0 flex-1 truncate text-[12px]">
                {typed ? (
                  <>
                    {typed}
                    <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-brand-700" />
                  </>
                ) : (
                  <span className="text-muted-foreground">Type a reply, or / for quick replies</span>
                )}
              </p>
              <motion.span
                animate={{ scale: conv.key === n && Math.abs(t - tl.send) < 160 ? 0.8 : 1 }}
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-colors',
                  typed ? 'bg-brand-700' : 'bg-brand-700/40'
                )}
              >
                <SendHorizontal className="h-3.5 w-3.5" />
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ text, me, tick }: { text: string; me?: boolean; tick?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11.5px] leading-snug shadow-[0_1px_0.5px_rgba(0,0,0,0.1)]',
        me ? 'ml-auto rounded-tr-sm bg-[#D9FDD3]' : 'rounded-tl-sm bg-white'
      )}
    >
      {text}
      {me && (
        <span className="float-right ml-1.5 mt-1">
          {tick === 'sent' ? (
            <Check className="h-3 w-3 text-black/40" />
          ) : (
            <CheckCheck className={cn('h-3.5 w-3.5', tick === 'read' ? 'text-[#53BDEB]' : 'text-black/40')} />
          )}
        </span>
      )}
    </motion.div>
  );
}
