"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileSpreadsheet, LayoutTemplate, Radio, Send, ShieldCheck, TerminalSquare } from 'lucide-react';
import { progress, useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/* Illustrative campaign — numbers are demo values, not customer data. */
const AUDIENCE = 4812;
const DOTS = 84;
const CYCLE = 13500;
const T = { upload: 0, uploaded: 1400, template: 1600, approval: 2800, approved: 4400, send: 5000, done: 10800 };

const sources = [
  { label: 'Broadcast', icon: Radio, detail: 'Segment · Diwali shoppers' },
  { label: 'CSV upload', icon: FileSpreadsheet, detail: 'contacts.csv' },
  { label: 'API', icon: TerminalSquare, detail: 'POST /v1/campaigns' },
];
const stages = [
  { title: 'Audience', icon: FileSpreadsheet },
  { title: 'Template', icon: LayoutTemplate },
  { title: 'Approval', icon: ShieldCheck },
  { title: 'Send', icon: Send },
];

const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
// each recipient gets its own sent / delivered / read moments
const recipients = Array.from({ length: DOTS }, (_, i) => {
  const sent = T.send + rand(i) * 2600;
  const delivered = sent + 350 + rand(i + 99) * 700;
  const read = rand(i + 7) < 0.8 ? delivered + 600 + rand(i + 3) * 2600 : Infinity;
  const clicked = read !== Infinity && rand(i + 51) < 0.3;
  return { sent, delivered, read, clicked };
});

function frac(t: number, key: 'sent' | 'delivered' | 'read') {
  let s = 0;
  for (const r of recipients) if (Number.isFinite(r[key])) s += progress(t, r[key], r[key] + 250);
  return s / DOTS;
}

export function CampaignDemo() {
  const { ref, t, loop } = useClock(CYCLE, CYCLE - 400);
  const stage = t < T.template ? 0 : t < T.approval ? 1 : t < T.send ? 2 : 3;
  const approved = t >= T.approved;
  const source = sources[loop % sources.length];
  const rows = Math.round(progress(t, T.upload + 200, T.uploaded) * AUDIENCE);
  const done = t >= T.done;

  const sent = frac(t, 'sent');
  const delivered = frac(t, 'delivered') * 0.97;
  const read = frac(t, 'read') * 0.97;
  const clicked = recipients.filter((r) => r.clicked && t >= r.read + 400).length / DOTS;

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="text-sm font-semibold">Diwali sale · Campaign</p>
        <div className="flex gap-1 rounded-full bg-muted p-0.5">
          {sources.map((s) => (
            <span
              key={s.label}
              className={cn(
                'relative flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-300',
                s.label === source.label ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {s.label === source.label && (
                <motion.span layoutId="campaign-source" className="absolute inset-0 rounded-full bg-card shadow-sm" />
              )}
              <s.icon className="relative h-3 w-3" />
              <span className="relative">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* stepper */}
      <div className="px-4 pt-5">
        <ol className="relative grid grid-cols-4">
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-4 h-0.5 bg-border" />
          <span
            aria-hidden
            className="absolute left-[12.5%] top-4 h-0.5 bg-brand-600 transition-[width] duration-700 ease-out-expo"
            style={{ width: `${(stage / 3) * 75}%` }}
          />
          {stages.map((s, i) => {
            const isDone = i < stage || (i === 3 && done);
            const current = i === stage && !isDone;
            return (
              <li key={s.title} className="relative flex flex-col items-center gap-2">
                <span
                  className={cn(
                    'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card transition-all duration-500',
                    isDone ? 'border-brand-600 bg-brand-600 text-white' : current ? 'border-brand-600 text-brand-700' : 'border-border text-muted-foreground'
                  )}
                >
                  {current && <span className="animate-soft-ping absolute inset-0 rounded-full bg-brand-400/40" />}
                  {isDone ? <Check className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
                </span>
                <span className={cn('text-[11.5px] font-medium', current || isDone ? 'text-foreground' : 'text-muted-foreground')}>{s.title}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-[1fr_1.05fr]">
        {/* left: audience + template + approval */}
        <div className="space-y-2.5">
          <div className="rounded-2xl border border-border p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-medium text-ink-600">
                <source.icon className="h-3.5 w-3.5 text-brand-700" /> <span className="font-mono">{source.detail}</span>
              </span>
              <span className="tabular-nums text-muted-foreground">{rows < AUDIENCE ? 'Importing…' : 'Ready'}</span>
            </div>
            <p className="mt-1.5 text-lg font-semibold tabular-nums">{rows.toLocaleString('en-IN')} contacts</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${(rows / AUDIENCE) * 100}%` }} />
            </div>
          </div>

          <motion.div
            animate={{ opacity: t >= T.template ? 1 : 0.35 }}
            className="relative rounded-2xl border border-border bg-[#EFEAE2] p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate font-mono text-[10.5px] text-ink-600">diwali_offer · Marketing</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={approved ? 'a' : t >= T.approval ? 'p' : 'd'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold',
                    approved ? 'bg-brand-100 text-brand-800' : t >= T.approval ? 'bg-amber-100 text-amber-800' : 'bg-white text-ink-600'
                  )}
                >
                  {approved ? <Check className="h-3 w-3" /> : t >= T.approval ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" /> : null}
                  {approved ? 'Approved' : t >= T.approval ? 'Pending approval' : 'Draft'}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-2.5 rounded-xl rounded-tl-sm bg-white p-2.5 text-[12px] leading-snug text-[#111B21] shadow-sm">
              Hi <span className="rounded bg-brand-100 px-1 font-medium text-brand-800">{'{{name}}'}</span>, our Diwali sale is live — take{' '}
              <b>20% off</b> everything until Sunday. 🪔
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-[11px] font-semibold text-[#027EB5]">
                <span className="rounded-md border border-black/5 py-1">Shop now</span>
                <span className="rounded-md border border-black/5 py-1">Stop offers</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[10.5px] text-ink-600">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-[8.5px] font-bold text-white">A</span>
              {approved ? 'Approved by Ananya (Admin)' : t >= T.approval ? 'Waiting for Ananya (Admin)…' : 'Drafted by Arjun'}
            </div>
            {/* approval stamp */}
            <AnimatePresence>
              {approved && t < T.send + 900 && (
                <motion.span
                  initial={{ opacity: 0, scale: 1.8, rotate: -18 }}
                  animate={{ opacity: 1, scale: 1, rotate: -12 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="pointer-events-none absolute right-4 top-14 rounded-md border-2 border-brand-600 px-2 py-0.5 font-mono text-[12px] font-bold uppercase tracking-widest text-brand-700"
                >
                  Approved
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* right: live delivery */}
        <div className="flex flex-col rounded-2xl border border-border p-3">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">Live delivery</p>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[10.5px] font-semibold transition-colors',
                done ? 'bg-brand-100 text-brand-800' : t >= T.send ? 'bg-sky-100 text-sky-800' : 'bg-muted text-muted-foreground'
              )}
            >
              {done ? 'Completed' : t >= T.send ? 'Sending' : 'Queued'}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-12 gap-[3px]">
            {recipients.map((r, i) => {
              const state = t >= r.read ? 'read' : t >= r.delivered ? 'delivered' : t >= r.sent ? 'sent' : 'queued';
              return (
                <span
                  key={i}
                  className={cn(
                    'aspect-square rounded-[3px] transition-[background-color,transform] duration-300',
                    state === 'queued' && 'bg-muted',
                    state === 'sent' && 'scale-90 bg-brand-200',
                    state === 'delivered' && 'bg-brand-500',
                    state === 'read' && 'bg-[#53BDEB]'
                  )}
                />
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
            <Legend className="bg-brand-200" label="Sent" />
            <Legend className="bg-brand-500" label="Delivered" />
            <Legend className="bg-[#53BDEB]" label="Read" />
          </div>
          <dl className="mt-auto grid grid-cols-4 gap-1 border-t border-border pt-3 text-center">
            <Stat label="Sent" v={sent} />
            <Stat label="Delivered" v={delivered} />
            <Stat label="Read" v={read} />
            <Stat label="Clicked" v={clicked} />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn('h-2 w-2 rounded-[2px]', className)} /> {label}
    </span>
  );
}

function Stat({ label, v }: { label: string; v: number }) {
  return (
    <div>
      <dd className="text-[13px] font-semibold tabular-nums">{Math.round(v * AUDIENCE).toLocaleString('en-IN')}</dd>
      <dt className="text-[10px] text-muted-foreground">{label}</dt>
    </div>
  );
}
