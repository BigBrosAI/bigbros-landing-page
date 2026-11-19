"use client";

/*
 * Chatbot flow with a live execution trace: a run walks the graph node by node,
 * lighting the edge it travels and writing to a run log. Alternate runs take the
 * Yes and No branches. Two SVG layouts share the nodes: wide (tablet/desktop) and tall (phones).
 */
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, CircleCheck, GitBranch, LayoutList, MessageSquare, UserRoundCheck } from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';
import { useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

type Kind = 'trigger' | 'ai' | 'condition' | 'action';
type Node = { id: string; kind: Kind; label: string; detail: string; short?: string };

const nodes: Node[] = [
  { id: 'trigger', kind: 'trigger', label: 'Message received', detail: 'Keyword: “price”' },
  { id: 'ai', kind: 'ai', label: 'AI reply', detail: 'Answers from your FAQs' },
  { id: 'cond', kind: 'condition', label: 'Returning customer?', detail: 'Checks contact tags' },
  { id: 'catalog', kind: 'action', label: 'Send catalogue', detail: 'Interactive list' },
  { id: 'ask', kind: 'action', label: 'Ask name & email', detail: 'Saves to attributes', short: 'Ask details' },
  { id: 'sheet', kind: 'action', label: 'Add to Google Sheets', detail: 'New lead row', short: 'Google Sheets' },
  { id: 'agent', kind: 'action', label: 'Hand off to Sales', detail: 'Assigns a live agent', short: 'Hand off' },
];

const edges: [string, string, string?][] = [
  ['trigger', 'ai'],
  ['ai', 'cond'],
  ['cond', 'catalog', 'Yes'],
  ['cond', 'ask', 'No'],
  ['ask', 'sheet'],
  ['catalog', 'agent'],
];

type Pos = Record<string, { x: number; y: number; w: number }>;
const H = 58;

const wide: { vb: [number, number]; pos: Pos } = {
  vb: [720, 330],
  pos: {
    trigger: { x: 10, y: 20, w: 190 },
    ai: { x: 265, y: 20, w: 190 },
    cond: { x: 520, y: 20, w: 190 },
    catalog: { x: 520, y: 140, w: 190 },
    ask: { x: 265, y: 140, w: 190 },
    sheet: { x: 10, y: 140, w: 190 },
    agent: { x: 520, y: 260, w: 190 },
  },
};

const tall: { vb: [number, number]; pos: Pos } = {
  vb: [340, 560],
  pos: {
    trigger: { x: 60, y: 10, w: 220 },
    ai: { x: 60, y: 110, w: 220 },
    cond: { x: 60, y: 210, w: 220 },
    catalog: { x: 4, y: 340, w: 160 },
    ask: { x: 176, y: 340, w: 160 },
    agent: { x: 4, y: 470, w: 160 },
    sheet: { x: 176, y: 470, w: 160 },
  },
};

const tone: Record<Kind, { chip: string; ring: string; text: string; tag: string }> = {
  trigger: { chip: '#FEF3C7', ring: '#FCD34D', text: '#92400E', tag: 'WHEN' },
  ai: { chip: '#EDE9FE', ring: '#C4B5FD', text: '#5B21B6', tag: 'AI' },
  condition: { chip: '#E0F2FE', ring: '#7DD3FC', text: '#075985', tag: 'IF' },
  action: { chip: '#DCFCE7', ring: '#86EFAC', text: '#166534', tag: 'DO' },
};

function edgePath(a: Pos[string], b: Pos[string]) {
  const sameRow = Math.abs(a.y - b.y) < 20;
  if (sameRow) {
    const right = b.x > a.x;
    const x1 = right ? a.x + a.w : a.x;
    const x2 = right ? b.x : b.x + b.w;
    const y = a.y + H / 2;
    const mid = (x1 + x2) / 2;
    return `M${x1} ${y} C ${mid} ${y}, ${mid} ${y}, ${x2} ${y}`;
  }
  const x1 = a.x + a.w / 2;
  const y1 = a.y + H;
  const x2 = b.x + b.w / 2;
  const y2 = b.y;
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}

/* ---------- run model ---------- */

const runs = {
  yes: ['trigger', 'ai', 'cond', 'catalog', 'agent'],
  no: ['trigger', 'ai', 'cond', 'ask', 'sheet'],
};
const STEP = 1500; // per node, including the edge travel into it
const START = 400;
const CYCLE = START + STEP * 5 + 2400;

const log: Record<string, { text: (yes: boolean) => string; icon: React.ReactNode }> = {
  trigger: { text: () => 'Trigger matched · keyword “price”', icon: <MessageSquare className="h-3.5 w-3.5 text-amber-600" /> },
  ai: { text: () => 'AI replied from “Pricing FAQ” · 1.2s', icon: <Bot className="h-3.5 w-3.5 text-violet-600" /> },
  cond: {
    text: (yes) => (yes ? 'Condition → Yes · tag “customer”' : 'Condition → No · new contact'),
    icon: <GitBranch className="h-3.5 w-3.5 text-sky-600" />,
  },
  catalog: { text: () => 'Catalogue sent · 12 products', icon: <LayoutList className="h-3.5 w-3.5 text-brand-700" /> },
  agent: { text: () => 'Handed off to Arjun · Sales', icon: <UserRoundCheck className="h-3.5 w-3.5 text-brand-700" /> },
  ask: { text: () => 'Collected name & email', icon: <MessageSquare className="h-3.5 w-3.5 text-brand-700" /> },
  sheet: { text: () => 'Row added to Google Sheets › Leads', icon: <BrandIcon slug="googlesheets" className="h-3.5 w-3.5" /> },
};

function runState(t: number, yes: boolean) {
  const path = yes ? runs.yes : runs.no;
  const status: Record<string, 'idle' | 'active' | 'done' | 'skipped'> = {};
  nodes.forEach((n) => (status[n.id] = 'idle'));
  path.forEach((id, k) => {
    const at = START + k * STEP;
    if (t >= at + STEP - 300) status[id] = 'done';
    else if (t >= at) status[id] = 'active';
  });
  const branched = t >= START + 3 * STEP;
  if (branched) nodes.forEach((n) => !path.includes(n.id) && (status[n.id] = 'skipped'));
  const lit = new Set<number>();
  edges.forEach(([a, b], i) => {
    const ia = path.indexOf(a);
    if (ia >= 0 && path[ia + 1] === b && t >= START + (ia + 1) * STEP - 450) lit.add(i);
  });
  const entries = path.filter((_, k) => t >= START + k * STEP + 200);
  return { status, lit, entries, finished: t >= START + 5 * STEP };
}

function FlowSvg({
  layout,
  className,
  compact,
  status,
  lit,
  runKey,
}: {
  layout: typeof wide;
  className?: string;
  compact?: boolean;
  status: Record<string, 'idle' | 'active' | 'done' | 'skipped'>;
  lit: Set<number>;
  runKey: number;
}) {
  const { vb, pos } = layout;
  return (
    <svg
      viewBox={`0 0 ${vb[0]} ${vb[1]}`}
      className={className}
      overflow="visible"
      role="img"
      aria-label="Example chatbot flow: a keyword trigger, an AI reply, a condition, then actions that send a catalogue and hand off to sales, or collect details into Google Sheets."
    >
      <defs>
        <filter id={`glow-${vb[0]}`} x="-20%" y="-40%" width="140%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#22c55e" floodOpacity="0.45" />
        </filter>
      </defs>
      {edges.map(([from, to, label], i) => {
        const d = edgePath(pos[from], pos[to]);
        const on = lit.has(i);
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#C9D2CC" strokeWidth={1.6} strokeDasharray="4 6" />
            {on && (
              <motion.path
                key={`${runKey}-${i}`}
                d={d}
                fill="none"
                stroke="#16a34a"
                strokeWidth={2.4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              />
            )}
            {label && <EdgeLabel text={label} a={pos[from]} b={pos[to]} on={on} />}
          </g>
        );
      })}
      {nodes.map((n) => {
        const p = pos[n.id];
        const t = tone[n.kind];
        const st = status[n.id];
        return (
          <g
            key={n.id}
            style={{ opacity: st === 'skipped' ? 0.4 : 1, transition: 'opacity 400ms' }}
            filter={st === 'active' ? `url(#glow-${vb[0]})` : undefined}
          >
            <rect
              x={p.x}
              y={p.y}
              width={p.w}
              height={H}
              rx={14}
              fill="#fff"
              stroke={st === 'active' ? '#16a34a' : st === 'done' ? '#86efac' : '#E5E2DA'}
              strokeWidth={st === 'active' ? 1.8 : 1}
              style={{ transition: 'stroke 300ms' }}
            />
            <rect x={p.x + 10} y={p.y + 12} width={34} height={34} rx={10} fill={t.chip} stroke={t.ring} />
            <text x={p.x + 27} y={p.y + 33} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={t.text} fontFamily="var(--font-geist-mono)">
              {t.tag}
            </text>
            <text x={p.x + 54} y={p.y + 26} fontSize={12.5} fontWeight={600} fill="#101828">
              {compact && p.w < 200 && n.short ? n.short : n.label}
            </text>
            <text x={p.x + 54} y={p.y + 42} fontSize={10.5} fill="#667085">
              {n.detail}
            </text>
            {st === 'active' && (
              <circle cx={p.x + p.w - 2} cy={p.y + 2} r={6} fill="#fff" stroke="#16a34a" strokeWidth={2} strokeDasharray="20 12" className="origin-center">
                <animateTransform attributeName="transform" type="rotate" from={`0 ${p.x + p.w - 2} ${p.y + 2}`} to={`360 ${p.x + p.w - 2} ${p.y + 2}`} dur="0.9s" repeatCount="indefinite" />
              </circle>
            )}
            {st === 'done' && (
              <g>
                <circle cx={p.x + p.w - 2} cy={p.y + 2} r={7} fill="#16a34a" />
                <path d={`M${p.x + p.w - 5.5} ${p.y + 2} l2.5 2.5 l4.5 -5`} fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function EdgeLabel({ text, a, b, on }: { text: string; a: Pos[string]; b: Pos[string]; on: boolean }) {
  const x = (a.x + a.w / 2 + b.x + b.w / 2) / 2;
  const y = (a.y + H + b.y) / 2;
  const sameCol = Math.abs(a.x - b.x) < 5;
  const lx = sameCol ? x + 22 : x;
  return (
    <g>
      <rect x={lx - 15} y={y - 10} width={30} height={20} rx={10} fill={on ? '#16a34a' : '#F2F4F7'} style={{ transition: 'fill 300ms' }} />
      <text x={lx} y={y + 4} textAnchor="middle" fontSize={10} fontWeight={600} fill={on ? '#fff' : '#475467'}>
        {text}
      </text>
    </g>
  );
}

export function FlowDemo() {
  const { ref, t, loop } = useClock(CYCLE, CYCLE - 200);
  const yes = loop % 2 === 0;
  const { status, lit, entries, finished } = runState(t, yes);
  const stamp = (k: number) => `10:24:${String(2 + Math.floor((k * STEP) / 1000)).padStart(2, '0')}.${(k * 3 + 1) % 10}`;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-border bg-[#FBFAF7] shadow-lift">
      <div aria-hidden className="bg-grain absolute inset-0 opacity-70" />
      <div className="relative flex items-center justify-between border-b border-border bg-card/70 px-4 py-3 backdrop-blur">
        <p className="text-sm font-semibold">Pricing enquiries · Flow</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-800">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-soft-ping absolute inset-0 rounded-full bg-brand-500" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-brand-600" />
          </span>
          Live · run #{1284 + loop}
        </span>
      </div>
      <div className="relative grid lg:grid-cols-[1fr_17rem]">
        <div className="p-3 sm:p-5">
          <FlowSvg layout={wide} status={status} lit={lit} runKey={loop} className="hidden w-full sm:block" />
          <FlowSvg layout={tall} status={status} lit={lit} runKey={loop} compact className="mx-auto block w-full max-w-sm sm:hidden" />
        </div>
        <div className="border-t border-border bg-card/80 p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Run log</p>
          <ol className="mt-3 space-y-2">
            <AnimatePresence initial={false}>
              {entries.map((id, k) => (
                <motion.li
                  key={`${loop}-${id}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2 text-[12px] leading-snug"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-muted">{log[id].icon}</span>
                  <span className="min-w-0">
                    <span className="block text-foreground">{log[id].text(yes)}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{stamp(k)}</span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
          <AnimatePresence>
            {finished && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn('mt-3 flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1.5 text-[11.5px] font-semibold text-brand-800')}
              >
                <CircleCheck className="h-3.5 w-3.5" /> Run completed in 7.4s
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
