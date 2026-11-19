"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Inbox, Search, Sparkles, StickyNote } from 'lucide-react';
import { useTicker } from '@/components/landing/use-ticker';
import { cn } from '@/lib/utils';

/* Illustrative data for the animated inbox — not real customers. */
const agents = [
  { name: 'Priya', team: 'Support', color: 'bg-emerald-500' },
  { name: 'Arjun', team: 'Sales', color: 'bg-sky-500' },
  { name: 'Meera', team: 'Support', color: 'bg-amber-500' },
];

const incoming = [
  { who: 'Rahul K.', text: 'Where is my order #2231?', tag: 'Order status', agent: 0 },
  { who: 'Sana M.', text: 'Do you ship to Pune?', tag: 'Pre-sales', agent: 1 },
  { who: 'Vikram', text: 'Need to change my address', tag: 'Support', agent: 2 },
  { who: 'Ananya', text: 'Can I get a bulk discount?', tag: 'Pre-sales', agent: 1 },
  { who: 'Imran', text: 'Payment failed, help!', tag: 'Payments', agent: 0 },
  { who: 'Neha P.', text: 'Is COD available?', tag: 'Pre-sales', agent: 1 },
];

export function InboxDemo() {
  const { ref, tick: t } = useTicker(1_000_000, 2200, 0);
  const tick = t + 3; // start with a full list
  const count = 4;
  // newest first: the last `count` conversations up to the current tick
  const list = Array.from({ length: count }, (_, i) => {
    const n = tick - i;
    return n >= 0 ? { ...incoming[n % incoming.length], key: n } : null;
  }).filter(Boolean) as ((typeof incoming)[number] & { key: number })[];
  const latest = list[0];
  const load = agents.map((_, ai) => list.filter((c) => c.agent === ai).length + 2);

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Inbox className="h-4 w-4 text-brand-700" /> Live chat
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-800">{tick + 8} open</span>
        </div>
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="grid sm:grid-cols-[1fr_11.5rem]">
        <ul className="relative min-h-[19.5rem] divide-y divide-border">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((c, i) => (
              <motion.li
                key={c.key}
                layout
                initial={{ opacity: 0, y: -24, backgroundColor: 'rgba(220,252,231,1)' }}
                animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(220,252,231,0)' }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, backgroundColor: { duration: 1.6 } }}
                className="flex items-start gap-3 px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-ink-600">
                  {c.who.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{c.who}</p>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{i === 0 ? 'now' : `${i * 2}m`}</span>
                  </div>
                  <p className="truncate text-[13px] text-muted-foreground">{c.text}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10.5px] font-medium text-ink-600">{c.tag}</span>
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i === 0 ? 0.6 : 0 }}
                      className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-1.5 py-0.5 text-[10.5px] font-medium text-brand-800"
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full', agents[c.agent].color)} />
                      {agents[c.agent].name}
                    </motion.span>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="border-t border-border bg-muted/40 p-4 sm:border-l sm:border-t-0">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Agents</p>
          <ul className="mt-3 space-y-2.5">
            {agents.map((a, ai) => {
              const active = latest?.agent === ai;
              return (
                <li
                  key={a.name}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl border bg-card px-2.5 py-2 transition-all duration-500',
                    active ? 'border-brand-300 shadow-[0_0_0_3px_rgba(74,222,128,0.18)]' : 'border-border'
                  )}
                >
                  <span className="relative">
                    <span className={cn('flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white', a.color)}>
                      {a.name[0]}
                    </span>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-brand-500" />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-[12.5px] font-semibold">{a.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{a.team}</span>
                  </span>
                  <motion.span
                    key={load[ai]}
                    initial={{ scale: 1.4, color: '#15803d' }}
                    animate={{ scale: 1, color: '#475467' }}
                    className="text-xs font-semibold tabular-nums"
                  >
                    {load[ai]}
                  </motion.span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 space-y-2 text-[11.5px] text-ink-600">
            <p className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" /> Auto-assign: round-robin
            </p>
            <p className="flex items-center gap-1.5">
              <StickyNote className="h-3.5 w-3.5 text-brand-600" /> Private notes &amp; tags
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
