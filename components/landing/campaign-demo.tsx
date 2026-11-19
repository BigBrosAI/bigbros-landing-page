"use client";

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { Check, Clock3, FileSpreadsheet, LayoutTemplate, Radio, Send, ShieldCheck, TerminalSquare } from 'lucide-react';
import { useTicker } from '@/components/landing/use-ticker';
import { cn } from '@/lib/utils';

/* Illustrative campaign — numbers are demo values, not customer data. */
const AUDIENCE = 4812;
const sources = [
  { label: 'Broadcast', icon: Radio },
  { label: 'CSV upload', icon: FileSpreadsheet },
  { label: 'API', icon: TerminalSquare },
];

const stages = [
  { title: 'Audience', icon: FileSpreadsheet },
  { title: 'Template', icon: LayoutTemplate },
  { title: 'Approval', icon: ShieldCheck },
  { title: 'Send', icon: Send },
];

// ticks: 0 audience · 1 template · 2 approval pending · 3 approved · 4..7 sending/finished
const TICKS = 9;

export function CampaignDemo() {
  const { ref, step, reduce } = useTicker(TICKS, 1300, TICKS - 1);
  const stage = step <= 1 ? step : step <= 3 ? 2 : 3;
  const approved = step >= 3;
  const sending = step >= 4;
  const source = sources[Math.floor(step / 3) % sources.length];

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="text-sm font-semibold">Festive sale · Campaign</p>
        <div className="flex gap-1 rounded-full bg-muted p-0.5">
          {sources.map((s) => (
            <span
              key={s.label}
              className={cn(
                'flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-300',
                s.label === source.label ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
              )}
            >
              <s.icon className="h-3 w-3" /> {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* stepper */}
      <div className="px-4 pt-5">
        <ol className="relative grid grid-cols-4">
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-4 h-0.5 bg-border" />
          <motion.span
            aria-hidden
            className="absolute left-[12.5%] top-4 h-0.5 origin-left bg-brand-600"
            animate={{ width: `${(stage / 3) * 75}%` }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {stages.map((s, i) => {
            const done = i < stage || (i === 3 && step === TICKS - 1);
            const current = i === stage;
            return (
              <li key={s.title} className="relative flex flex-col items-center gap-2">
                <span
                  className={cn(
                    'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-card transition-all duration-500',
                    done ? 'border-brand-600 bg-brand-600 text-white' : current ? 'border-brand-600 text-brand-700' : 'border-border text-muted-foreground'
                  )}
                >
                  {current && !done && <span className="animate-soft-ping absolute inset-0 rounded-full bg-brand-400/40" />}
                  {done ? <Check className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
                </span>
                <span className={cn('text-[11.5px] font-medium', current || done ? 'text-foreground' : 'text-muted-foreground')}>
                  {s.title}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {/* template preview + approval */}
        <div className="rounded-2xl border border-border bg-[#EFEAE2] p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 truncate font-mono text-[10.5px] text-ink-600">festive_offer · Marketing</span>
            <span
              className={cn(
                'inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] font-semibold transition-colors duration-500',
                approved ? 'bg-brand-100 text-brand-800' : step >= 2 ? 'bg-amber-100 text-amber-800' : 'bg-white text-ink-600'
              )}
            >
              {approved ? <Check className="h-3 w-3" /> : <Clock3 className="h-3 w-3" />}
              {approved ? 'Approved' : step >= 2 ? 'Pending approval' : 'Draft'}
            </span>
          </div>
          <div className="mt-3 rounded-xl rounded-tl-sm bg-white p-3 text-[12.5px] leading-snug text-[#111B21] shadow-sm">
            Hi <span className="rounded bg-brand-100 px-1 font-medium text-brand-800">{'{{name}}'}</span>, our festive sale is live —
            take <b>20% off</b> everything until Sunday. 🎉
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-[11.5px] font-semibold text-[#0B5D3B]">
              <span className="rounded-md border border-black/5 py-1">Shop now</span>
              <span className="rounded-md border border-black/5 py-1">Stop offers</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-ink-600">
            {approved ? 'Approved by workspace admin' : 'Needs a manager’s sign-off before it can be sent'}
          </p>
        </div>

        {/* delivery stats */}
        <div className="flex flex-col justify-between rounded-2xl border border-border p-3">
          <div>
            <p className="text-[11px] text-muted-foreground">Audience</p>
            <p className="text-lg font-semibold tabular-nums">{AUDIENCE.toLocaleString('en-IN')} contacts</p>
          </div>
          <div className="mt-3 space-y-2.5">
            <Stat label="Sent" target={sending ? AUDIENCE : 0} reduce={reduce} />
            <Stat label="Delivered" target={sending ? Math.round(AUDIENCE * 0.97) : 0} reduce={reduce} />
            <Stat label="Read" target={sending && step >= 5 ? Math.round(AUDIENCE * 0.81) : 0} reduce={reduce} />
            <Stat label="Clicked" target={sending && step >= 6 ? Math.round(AUDIENCE * 0.24) : 0} reduce={reduce} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, target, reduce }: { label: string; target: number; reduce: boolean }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString('en-IN'));
  const width = useTransform(mv, (v) => `${(v / AUDIENCE) * 100}%`);
  useEffect(() => {
    if (reduce) {
      mv.set(target);
      return;
    }
    const c = animate(mv, target, { duration: target ? 1.4 : 0.3, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [target, reduce, mv]);
  return (
    <div>
      <div className="flex justify-between text-[11.5px]">
        <span className="text-ink-600">{label}</span>
        <motion.span className="font-semibold tabular-nums">{text}</motion.span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-400" style={{ width }} />
      </div>
    </div>
  );
}
