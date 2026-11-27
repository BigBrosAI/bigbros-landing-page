"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Clock,
  Headphones,
  HelpCircle,
  Image as ImageIcon,
  List,
  MapPin,
  Maximize2,
  Minus,
  MousePointerClick,
  Pencil,
  Redo2,
  Save,
  Undo2,
  Zap,
  BadgeCheck,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  CircleCheck,
  Contact,
  Copy,
  CreditCard,
  FileText,
  GitBranch,
  LayoutGrid,
  Lock,
  Megaphone,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Plug,
  Plus,
  RefreshCw,
  Search,
  SendHorizontal,
  Settings,
  Smile,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import Image from 'next/image';
import { BrandIcon } from '@/components/landing/brand-icon';
import { progress, useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/*
 * Animated replica of the BigBrosAI dashboard. Layout, colours and type follow the
 * real app (frontend-main-v2): #1D4B3E icon sidebar, 48px header with project name,
 * plan badge, quality rating and wallet, Outfit font, and the real screen layouts.
 * Drawn on a fixed 1120×680 canvas and scaled to fit. All names and numbers are demo data.
 */

const W = 1120;
const H = 680;
const CHROME = 40;
const HEADER = 48;
const SIDEBAR = 76;
const SCENE = 7600;
const BRAND = '#1D4B3E';
const GREEN = '#15803D'; // success-700
const LINK = '#26954F';

const nav = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Live Chat', icon: MessageCircle },
  { label: 'Contacts', icon: Contact },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Templates', icon: FileText },
  { label: 'Apps', icon: Plug },
  { label: 'WA Pay', icon: CreditCard },
  { label: 'Flows', icon: GitBranch },
];
const scenes = [
  { key: 'dashboard', title: 'Dashboard', path: 'dashboard', nav: 0 },
  { key: 'chat', title: 'Live Chat', path: 'live-chat', nav: 1 },
  { key: 'campaigns', title: 'Campaigns', path: 'campaigns', nav: 3 },
  { key: 'templates', title: 'Templates', path: 'templates', nav: 4 },
  { key: 'flows', title: 'Flows', path: 'flows', nav: 7 },
] as const;
const LOOP = SCENE * scenes.length;

const navY = (i: number) => CHROME + 60 + i * 56 + 28;
const at = (x: number, y: number) => ({ x: SIDEBAR + x, y: CHROME + HEADER + y });

// Flows editor geometry (used by the cursor path and the Flows screen)
const SIDEBAR_W = 230;
const NODE_W = 176;
// canvas-space positions (canvas origin = content (SIDEBAR_W, 48))
const PAY = { x: 616, y: 70 };
const DRAG_FROM = { x: 118, y: 196 }; // content coords of the filtered block
const DROP_AT = { x: SIDEBAR_W + PAY.x + NODE_W / 2, y: 48 + PAY.y + 40 };

type Way = { at: number; x: number; y: number; click?: boolean };
const paths: Way[][] = [
  [
    { at: 0, ...at(420, 150) },
    { at: 1600, ...at(300, 120) },
    { at: 3000, ...at(520, 170) },
    { at: 4400, ...at(220, 410) },
  ],
  [
    { at: 0, ...at(150, 230) },
    { at: 800, ...at(150, 166), click: true },
    { at: 1900, ...at(676, 28), click: true },
    { at: 3200, ...at(540, 562) },
    { at: 4900, ...at(758, 562), click: true },
  ],
  [
    { at: 0, ...at(930, 38) },
    { at: 1300, ...at(742, 300), click: true },
    { at: 3600, ...at(520, 360) },
  ],
  [
    { at: 0, ...at(300, 120) },
    { at: 1100, ...at(220, 196), click: true },
    { at: 3200, ...at(870, 330) },
  ],
  [
    { at: 0, ...at(520, 300) },
    { at: 500, ...at(118, 104), click: true },
    { at: 1900, ...at(DRAG_FROM.x, DRAG_FROM.y), click: true },
    { at: 2700, ...at(DROP_AT.x, DROP_AT.y), click: true },
    { at: 4300, ...at(842, 24), click: true },
    { at: 5200, ...at(972, 24), click: true },
  ],
];

export function DashboardShowcase() {
  const { ref, t } = useClock(LOOP, SCENE * 1 + 5600, 50);
  const [offset, setOffset] = useState(0);
  const eff = (((t + offset) % LOOP) + LOOP) % LOOP;
  const sceneIdx = Math.floor(eff / SCENE);
  const local = eff % SCENE;
  const scene = scenes[sceneIdx];
  const next = scenes[(sceneIdx + 1) % scenes.length];

  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const way = [...paths[sceneIdx], { at: SCENE - 1300, x: SIDEBAR / 2, y: navY(next.nav), click: true }];
  const cur = [...way].reverse().find((w) => local >= w.at) ?? way[0];
  const clicking = way.some((w) => w.click && local >= w.at + 650 && local < w.at + 1050);
  const activeNav = local >= SCENE - 350 ? next.nav : scene.nav;
  const jump = (i: number) => setOffset((o) => o + (i * SCENE - eff));

  return (
    <div ref={ref}>
      <div className="no-scrollbar mx-auto mb-5 flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-border bg-card p-1.5 shadow-sm sm:w-fit">
        {scenes.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => jump(i)}
            className={cn('relative shrink-0 overflow-hidden rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors', i === sceneIdx ? 'text-white' : 'text-ink-600 hover:text-foreground')}
          >
            {i === sceneIdx && (
              <>
                <motion.span layoutId="dash-tab" className="absolute inset-0 rounded-full bg-forest" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                <span className="absolute bottom-0 left-0 h-[3px] bg-lime-300" style={{ width: `${(local / SCENE) * 100}%` }} />
              </>
            )}
            <span className="relative">{s.title}</span>
          </button>
        ))}
      </div>

      <div ref={box} className="frame-shine relative mx-auto w-full max-w-[1120px] rounded-[18px]" style={{ height: H * scale }}>
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[18px] border border-black/10 bg-white text-[13px] text-slate-900 shadow-[0_50px_100px_-40px_rgba(11,46,35,0.45),0_20px_40px_-20px_rgba(0,0,0,0.2)] [font-family:var(--font-outfit),sans-serif] [&_h1]:[font-family:var(--font-outfit)] [&_h2]:[font-family:var(--font-outfit)] [&_h3]:[font-family:var(--font-outfit)]"
          style={{ width: W, height: H, transform: `scale(${scale})` }}
        >
          {/* browser chrome */}
          <div className="flex h-10 items-center gap-3 border-b border-black/5 bg-[#F3F4F6] px-4">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </span>
            <div className="mx-auto flex h-7 w-[440px] items-center justify-center gap-1.5 rounded-lg bg-white text-[12px] text-black/55">
              <Lock className="h-3 w-3" /> dashboard.bigbrosai.com/pt/hearth-and-loom/{scene.path}
            </div>
          </div>

          <div className="flex" style={{ height: H - CHROME }}>
            {/* sidebar */}
            <aside className="flex shrink-0 flex-col items-center pt-3" style={{ width: SIDEBAR, background: BRAND }}>
              <span className="mb-2 flex h-11 w-11 items-center justify-center">
                <Image src="/favicon.png" alt="BigBrosAI" width={34} height={34} className="rounded-[9px]" />
              </span>
              {nav.map((n, i) => (
                <div key={n.label} className="flex h-14 flex-col items-center justify-center gap-1.5">
                  <span className={cn('flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300', i === activeNav ? 'bg-white shadow-[0_2px_6px_rgba(0,0,0,0.25)]' : 'text-white/80')} style={i === activeNav ? { color: GREEN } : undefined}>
                    <n.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className={cn('text-[10px] font-medium leading-none', i === activeNav ? 'text-white' : 'text-white/65')}>{n.label}</span>
                </div>
              ))}
              <div className="mt-auto flex h-14 flex-col items-center justify-center gap-1.5 pb-3 text-white/75">
                <Settings className="h-[18px] w-[18px]" />
                <span className="text-[10px] font-medium leading-none">Settings</span>
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col bg-gray-50">
              {/* header — mirrors AppHeader */}
              <header className="flex h-12 shrink-0 items-center border-b border-gray-200 bg-white pl-5">
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="flex items-center gap-2.5">
                    <p className="truncate text-base font-bold" style={{ color: GREEN }}>
                      Hearth &amp; Loom
                    </p>
                    <span className="flex items-center gap-1 rounded-full px-2 py-0.5 shadow-sm" style={{ background: BRAND }}>
                      <span className="text-[12px] font-semibold tracking-wide text-white">Pro</span>
                      <ArrowUpRight className="h-3 w-3 text-white/80" />
                    </span>
                  </div>
                  <p className="truncate text-xs text-slate-600">WhatsApp Business API Dashboard</p>
                </div>
                <div className="flex h-full items-center gap-3 border-l border-r border-gray-100 px-4">
                  <span className="text-[12px] font-bold uppercase text-slate-600">Quality Rating:</span>
                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-green-700">Excellent</span>
                </div>
                <div className="flex items-center gap-3 px-5">
                  <span className="flex items-center gap-2 rounded-full border border-[#ece4d6] bg-[#FFF8EC] px-3 py-1.5 text-[12.5px] font-semibold text-gray-900">
                    <Wallet className="h-4 w-4 text-amber-600" /> ₹2,450.00
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#047857] text-[11px] font-bold text-white">PS</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </span>
                </div>
              </header>

              <div className="relative min-h-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={scene.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28 }} className="absolute inset-0">
                    {scene.key === 'dashboard' && <DashboardScreen t={local} />}
                    {scene.key === 'chat' && <ChatScreen t={local} />}
                    {scene.key === 'campaigns' && <CampaignsScreen t={local} />}
                    {scene.key === 'templates' && <TemplatesScreen t={local} />}
                    {scene.key === 'flows' && <FlowsScreen t={local} />}
                  </motion.div>
                </AnimatePresence>
                <Toasts scene={scene.key} t={local} />
              </div>
            </div>
          </div>

          {/* cursor */}
          <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-50" animate={{ x: cur.x, y: cur.y }} transition={{ duration: 0.85, ease: [0.45, 0, 0.2, 1] }}>
            <AnimatePresence>
              {clicking && (
                <motion.span initial={{ scale: 0.3, opacity: 0.6 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-[#16A34A]/50" />
              )}
            </AnimatePresence>
            <motion.svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]" animate={{ scale: clicking ? 0.85 : 1 }}>
              <path d="M4 2.5l15 9.2-6.6 1.5 3.9 7.3-2.7 1.4-3.9-7.3L4.9 19z" fill="#101828" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- shared ---------- */

const cardCls = 'rounded-2xl border border-gray-200 bg-white';

function Avatar({ name, className }: { name: string; className?: string }) {
  const hues = ['#34D399,#047857', '#60A5FA,#1D4ED8', '#FBBF24,#B45309', '#F472B6,#BE185D', '#A78BFA,#6D28D9', '#2DD4BF,#0F766E'];
  const h = hues[(name.charCodeAt(0) + name.length) % hues.length];
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white', className ?? 'h-10 w-10')} style={{ background: h.split(',')[1] }}>
      {name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)}
    </span>
  );
}

function Toasts({ scene, t }: { scene: string; t: number }) {
  const all: Record<string, { at: number; text: string }[]> = {
    dashboard: [{ at: 4600, text: 'Campaign “Diwali sale” completed' }],
    chat: [
      { at: 2500, text: 'Conversation assigned to Priya Nair' },
      { at: 5800, text: 'Message delivered' },
    ],
    campaigns: [{ at: 2000, text: 'Campaign started — sending now' }],
    templates: [{ at: 3700, text: 'Template “diwali_offer” approved by Meta' }],
    flows: [
      { at: 5000, text: 'Flow is live' },
      { at: 6400, text: 'Changes saved' },
    ],
  };
  const list = (all[scene] ?? []).filter((x) => t >= x.at && t < x.at + 2600);
  return (
    <div className={cn('pointer-events-none absolute right-5 z-20 space-y-2', scene === 'flows' ? 'top-16' : 'top-4')}>
      <AnimatePresence>
        {list.map((x) => (
          <motion.div
            key={x.text}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)]"
          >
            <CircleCheck className="h-4 w-4 text-green-400" />
            {x.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Dashboard (mirrors dashboard/page.tsx when connected) ---------- */

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const lines = [
  { key: 'Sent', color: '#22C55E', v: [820, 1240, 980, 1460, 1710, 1380, 1920] },
  { key: 'Delivered', color: '#3B82F6', v: [790, 1200, 950, 1410, 1660, 1330, 1870] },
  { key: 'Read', color: '#F59E0B', v: [610, 930, 770, 1160, 1390, 1080, 1560] },
  { key: 'Failed', color: '#EF4444', v: [18, 26, 14, 30, 22, 19, 24] },
];

function DashboardScreen({ t }: { t: number }) {
  const p = progress(t, 200, 1900);
  const cw = 640;
  const ch = 150;
  const max = 2000;
  const pt = (v: number, i: number) => `${(i / 6) * cw},${ch - (v / max) * ch}`;
  const hover = t >= 1600 ? Math.min(6, Math.floor(progress(t, 1600, 3200) * 6)) : -1;
  const campaigns = [
    { name: 'Diwali sale', status: t >= 4600 ? 'Completed' : 'Running', sent: t >= 4600 ? '4,812' : Math.round(2600 + progress(t, 0, 4600) * 2212).toLocaleString('en-IN'), ctr: '24.1%', color: '#22C55E' },
    { name: 'Cart reminder', status: 'Running', sent: '826', ctr: '18.4%', color: '#3B82F6' },
    { name: 'Order updates', status: 'Completed', sent: '3,410', ctr: '9.2%', color: '#8B5CF6' },
  ];
  const statusColor: Record<string, string> = { Completed: '#16A34A', Running: '#2563EB', Scheduled: '#64748B' };
  const tpl = [
    { label: 'Approved', n: 18, color: '#22C55E' },
    { label: 'Pending', n: 3, color: '#F59E0B' },
    { label: 'Rejected', n: 1, color: '#EF4444' },
    { label: 'Paused', n: 1, color: '#94A3B8' },
  ];
  const total = tpl.reduce((a, b) => a + b.n, 0);
  const starts = tpl.map((_, i) => tpl.slice(0, i).reduce((a, b) => a + (b.n / total) * 100, 0));
  return (
    <div className="grid h-full grid-cols-[1fr_300px] gap-5 overflow-hidden p-5">
      <div className="min-w-0 space-y-5">
        <div className={cn(cardCls, 'p-5')}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[17px] font-extrabold tracking-tight text-gray-900">Message Overview</h3>
            <span className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-[12.5px] font-medium text-gray-700">
              Last 7 Days <ChevronDown className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="mb-3 flex items-center gap-5">
            {lines.map((l) => (
              <span key={l.key} className="flex items-center gap-1.5">
                <span className="h-[3px] w-5 rounded-full" style={{ background: l.color }} />
                <span className="text-[12px] font-semibold text-gray-600">{l.key}</span>
              </span>
            ))}
          </div>
          <svg viewBox={`0 0 ${cw} ${ch + 22}`} className="h-[172px] w-full overflow-visible">
            {[0, 1, 2, 3].map((g) => (
              <line key={g} x1="0" x2={cw} y1={(g * ch) / 3} y2={(g * ch) / 3} stroke="#F1F5F9" />
            ))}
            {days.map((d, i) => (
              <text key={d} x={(i / 6) * cw} y={ch + 18} fontSize="11" fill="#94A3B8" textAnchor={i === 0 ? 'start' : i === 6 ? 'end' : 'middle'}>
                {d}
              </text>
            ))}
            {lines.map((l) => (
              <motion.polyline key={l.key} points={l.v.map(pt).join(' ')} fill="none" stroke={l.color} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: p }} transition={{ duration: 0.05 }} />
            ))}
            {hover >= 0 && (
              <g>
                <line x1={(hover / 6) * cw} x2={(hover / 6) * cw} y1="0" y2={ch} stroke="#CBD5E1" strokeDasharray="3 3" />
                {lines.slice(0, 3).map((l) => (
                  <circle key={l.key} cx={(hover / 6) * cw} cy={ch - (l.v[hover] / max) * ch} r="4" fill="#fff" stroke={l.color} strokeWidth="2" />
                ))}
                <g transform={`translate(${Math.min((hover / 6) * cw + 12, cw - 128)},4)`}>
                  <rect width="122" height="70" rx="10" fill="#fff" stroke="#E2E8F0" />
                  <text x="12" y="18" fontSize="11" fontWeight="600" fill="#0F172A">
                    {days[hover]}
                  </text>
                  {lines.slice(0, 3).map((l, k) => (
                    <g key={l.key}>
                      <circle cx="16" cy={33 + k * 14} r="3.5" fill={l.color} />
                      <text x="26" y={37 + k * 14} fontSize="10.5" fill="#475569">
                        {l.key}
                      </text>
                      <text x="110" y={37 + k * 14} fontSize="10.5" fontWeight="600" fill="#0F172A" textAnchor="end">
                        {l.v[hover].toLocaleString('en-IN')}
                      </text>
                    </g>
                  ))}
                </g>
              </g>
            )}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className={cn(cardCls, 'overflow-hidden')}>
            <div className="flex items-center justify-between px-5 pb-3 pt-4">
              <h3 className="text-[17px] font-extrabold tracking-tight text-gray-900">Recent Campaigns</h3>
              <span className="text-[13px] font-semibold" style={{ color: LINK }}>
                View all
              </span>
            </div>
            {campaigns.map((c) => (
              <div key={c.name} className="flex items-center gap-3 border-t border-gray-50 px-5 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: `${c.color}1A` }}>
                  <Megaphone className="h-[17px] w-[17px]" style={{ color: c.color }} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-gray-900">{c.name}</span>
                  <span className="mt-0.5 block text-xs font-medium" style={{ color: statusColor[c.status] }}>
                    {c.status}
                  </span>
                </span>
                <span className="min-w-[52px] text-right">
                  <span className="block text-[13px] font-semibold tabular-nums text-gray-900">{c.sent}</span>
                  <span className="text-[11px] text-gray-400">Sent</span>
                </span>
                <span className="min-w-[44px] text-right">
                  <span className="block text-[13px] font-semibold text-gray-900">{c.ctr}</span>
                  <span className="text-[11px] text-gray-400">CTR</span>
                </span>
              </div>
            ))}
          </div>
          <div className={cn(cardCls, 'overflow-hidden')}>
            <div className="flex items-center justify-between px-5 pb-2 pt-4">
              <h3 className="text-[16px] font-bold text-gray-900">Template Overview</h3>
              <span className="text-[13px] font-semibold" style={{ color: LINK }}>
                View all
              </span>
            </div>
            <div className="flex items-center gap-4 px-5 pb-4">
              <svg viewBox="0 0 42 42" className="h-[104px] w-[104px] shrink-0">
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#F1F5F9" strokeWidth="5" />
                <g transform="rotate(-90 21 21)">
                  {tpl.map((s, i) => {
                    const len = (s.n / total) * 100 * p;
                    return <circle key={s.label} cx="21" cy="21" r="15.9" fill="none" stroke={s.color} strokeWidth="5" pathLength={100} strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={-starts[i] * p} />;
                  })}
                </g>
                <text x="21" y="23.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0F172A">
                  {total}
                </text>
              </svg>
              <div className="min-w-0 flex-1">
                {tpl.map((s) => (
                  <div key={s.label} className="flex items-center border-b border-gray-50 py-1.5 last:border-b-0">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    <span className="ml-2 flex-1 text-[13px] text-gray-500">{s.label}</span>
                    <span className="text-[13px] font-semibold text-gray-800">{s.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className={cn(cardCls, 'p-4')}>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8C7A52] text-[13px] font-bold text-white">H&amp;L</span>
            <div className="min-w-0 leading-tight">
              <p className="flex items-center gap-1 font-semibold text-gray-900">
                Hearth &amp; Loom <BadgeCheck className="h-4 w-4 fill-[#25D366] text-white" />
              </p>
              <p className="mt-0.5 text-[12px] text-gray-500">+91 98•••• 4410</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 text-[12px] text-gray-600">
            <span className="flex items-center gap-1.5">
              <BrandIcon slug="whatsapp" className="h-3.5 w-3.5" /> wa.me/9198••••4410
            </span>
            <Copy className="h-3.5 w-3.5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#ece4d6]">
          <div className="relative bg-[#FFF8EC] px-5 py-5">
            <svg aria-hidden viewBox="0 0 120 80" className="absolute bottom-0 right-0 h-20 w-28 opacity-60">
              <circle cx="96" cy="60" r="34" fill="#F6D9A8" />
              <circle cx="70" cy="74" r="20" fill="#F2C987" />
            </svg>
            <p className="relative mb-1.5 text-[13px] font-medium text-[#8a7a6a]">Wallet Balance</p>
            <p className="relative mb-4 text-[28px] font-bold leading-none text-gray-900">₹2,450.00</p>
            <span className="relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white" style={{ background: BRAND }}>
              <Plus className="h-3.5 w-3.5" /> Add Money
            </span>
          </div>
          <div className="flex items-center justify-between bg-white px-5 py-3 text-[13px] font-semibold text-gray-700">
            View Transactions <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <div className={cn(cardCls, 'p-4')}>
          <p className="text-[15px] font-bold text-gray-900">Messaging Limits</p>
          <p className="mt-3 flex items-baseline gap-1.5">
            <span className="text-[22px] font-bold text-gray-900">10K</span>
            <span className="text-[12px] text-gray-500">per 24 hrs</span>
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${18 + p * 30}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-[12.5px]">
            <span className="text-gray-500">Service Messages</span>
            <span className="font-semibold text-green-700">Unlimited</span>
          </div>
          <p className="mt-2 text-[11.5px] text-gray-400">Resets in a rolling 24-hour window</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Live chat (mirrors live-chat/page.tsx: WhatsApp-Web layout) ---------- */

const WA = { header: '#F0F2F5', chat: '#EFEAE2', out: '#D9FDD3', text: '#111B21', sec: '#667781', muted: '#8696A0', divider: '#E9EDEF' };
const CUSTOMER = 'Ayesha Khan';
const REPLY = 'Hi Ayesha! Your order #2231 is out for delivery and will reach you by 6 pm today 🚚';

function ChatScreen({ t }: { t: number }) {
  const selected = t >= 1400;
  const assigned = t >= 2500;
  const typed = t >= 3300 && t < 5600 ? REPLY.slice(0, Math.floor(progress(t, 3300, 5300) * REPLY.length)) : '';
  const sent = t >= 5600;
  const tick = t >= 6500 ? 'read' : t >= 6000 ? 'delivered' : 'sent';
  const chats = [
    { name: CUSTOMER, text: sent ? `You: ${REPLY}` : 'Where is my order #2231?', unread: sent ? 0 : 2, time: '10:24' },
    { name: 'Sana Mirza', text: 'Do you ship to Pune?', unread: 1, time: '10:19' },
    { name: 'Imran Shaikh', text: 'You: Refund initiated ✅', unread: 0, time: '09:58' },
    { name: 'Neha Patil', text: 'Is cash on delivery available?', unread: 0, time: '09:41' },
    { name: 'Vikram Rao', text: 'Thanks for the quick help!', unread: 0, time: 'Yesterday' },
    { name: 'Ananya Iyer', text: 'Can I exchange the size?', unread: 0, time: 'Yesterday' },
  ];
  return (
    <div className="grid h-full grid-cols-[300px_1fr_260px] bg-white">
      <div className="flex flex-col border-r" style={{ borderColor: WA.divider }}>
        <div className="flex h-[52px] items-center justify-between px-4">
          <span className="text-[17px] font-semibold" style={{ color: WA.text }}>
            Live Chat
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: WA.muted }}>
            <span className="h-2 w-2 rounded-full" style={{ background: BRAND }} /> Online
          </span>
        </div>
        <div className="flex gap-1 px-3 pb-1 pt-1">
          {['Chats', 'History'].map((x, i) => (
            <span key={x} className="flex-1 rounded-full py-1.5 text-center text-[13px] font-semibold" style={i === 0 ? { background: BRAND, color: '#fff' } : { background: WA.header, color: WA.muted }}>
              {x}
            </span>
          ))}
        </div>
        <div className="px-3 pb-2 pt-1.5">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px]" style={{ background: WA.header, color: WA.muted }}>
            <Search className="h-[15px] w-[15px]" /> Search
          </div>
        </div>
        <ul className="flex-1 overflow-hidden">
          {chats.map((c, i) => (
            <li key={c.name} className="flex items-center gap-3 px-4 py-2 transition-colors" style={{ background: i === 0 && selected ? WA.header : '#fff' }}>
              <Avatar name={c.name} className="h-11 w-11" />
              <span className="min-w-0 flex-1 border-b pb-2.5 pt-1" style={{ borderColor: WA.divider }}>
                <span className="flex items-center justify-between">
                  <span className="truncate text-[14.5px]" style={{ color: WA.text }}>
                    {c.name}
                  </span>
                  <span className="text-[11.5px]" style={{ color: c.unread ? '#1FA855' : WA.muted }}>
                    {c.time}
                  </span>
                </span>
                <span className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="truncate text-[13px]" style={{ color: WA.sec }}>
                    {c.text}
                  </span>
                  {c.unread > 0 && (
                    <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[11px] font-semibold text-white" style={{ background: '#25D366' }}>
                      {c.unread}
                    </span>
                  )}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="flex h-14 items-center gap-3 px-4" style={{ background: WA.header }}>
          <Avatar name={CUSTOMER} />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[15px]" style={{ color: WA.text }}>
              {CUSTOMER}
            </p>
            <p className="text-[12.5px]" style={{ color: WA.sec }}>
              +91 98•••• 2231
            </p>
          </div>
          <motion.span
            key={assigned ? 'a' : 'u'}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white px-2.5 py-1.5 text-[12px] font-medium"
            style={{ borderColor: assigned ? '#ABEFC6' : WA.divider, color: assigned ? GREEN : WA.sec }}
          >
            {assigned ? <Avatar name="Priya Nair" className="h-5 w-5 text-[8px]" /> : <Users className="h-3.5 w-3.5" />}
            {assigned ? 'Priya Nair' : 'Unassigned'}
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
          <MoreVertical className="h-5 w-5" style={{ color: WA.sec }} />
        </div>
        <div className="relative flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-[6%] py-4" style={{ background: WA.chat }}>
          <ChatDoodle />
          <span className="relative mx-auto mb-1 rounded-lg bg-white px-3 py-1 text-[12px] shadow-sm" style={{ color: WA.sec }}>
            TODAY
          </span>
          <Bubble>Hi, where is my order #2231? It was supposed to arrive yesterday.</Bubble>
          {assigned && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mx-auto my-1 rounded-lg bg-[#FFF3C4] px-3 py-1 text-[12px]" style={{ color: '#54656F' }}>
              Conversation assigned to Priya Nair
            </motion.p>
          )}
          {sent && (
            <Bubble me tick={tick}>
              {REPLY}
            </Bubble>
          )}
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5" style={{ background: WA.header }}>
          <Smile className="h-6 w-6" style={{ color: WA.sec }} />
          <Paperclip className="h-5 w-5" style={{ color: WA.sec }} />
          <div className="min-w-0 flex-1 truncate rounded-lg bg-white px-3 py-2.5 text-[14px]" style={{ color: WA.text }}>
            {typed ? (
              <>
                {typed}
                <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-[#00A884]" />
              </>
            ) : (
              <span style={{ color: WA.muted }}>Type a message</span>
            )}
          </div>
          <span className="flex items-center gap-1 whitespace-nowrap rounded-lg border bg-white px-2.5 py-2 text-[12px] font-medium" style={{ borderColor: WA.divider, color: WA.sec }}>
            <FileText className="h-3.5 w-3.5" /> Send Template
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors" style={{ background: typed ? '#00A884' : '#00A88466' }}>
            <SendHorizontal className="h-[18px] w-[18px]" />
          </span>
        </div>
      </div>

      <div className="flex flex-col border-l" style={{ borderColor: WA.divider }}>
        <div className="flex h-14 items-center px-4 text-[15px] font-medium" style={{ background: WA.header, color: WA.text }}>
          Contact Info
        </div>
        <div className="flex flex-col items-center border-b px-4 py-5 text-center" style={{ borderColor: WA.divider }}>
          <Avatar name={CUSTOMER} className="h-[72px] w-[72px] text-lg" />
          <p className="mt-3 text-[16px]" style={{ color: WA.text }}>
            {CUSTOMER}
          </p>
          <p className="text-[13px]" style={{ color: WA.sec }}>
            +91 98•••• 2231
          </p>
        </div>
        <dl className="space-y-3.5 px-4 py-4 text-[13px]">
          <div className="flex items-center justify-between">
            <dt style={{ color: WA.sec }}>Chat Status</dt>
            <dd className="rounded-full bg-green-50 px-2 py-0.5 text-[11.5px] font-semibold text-green-700">Open</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt style={{ color: WA.sec }}>Activity</dt>
            <dd className="flex items-center gap-1.5" style={{ color: WA.text }}>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Active (within 24h)
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt style={{ color: WA.sec }}>Ad Opt-in</dt>
            <dd style={{ color: WA.text }}>Yes</dd>
          </div>
          <div>
            <dt className="mb-1.5" style={{ color: WA.sec }}>
              Tags
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {['Repeat buyer', 'Pune', 'VIP'].map((x) => (
                <span key={x} className="rounded-md bg-[#E8F2EF] px-2 py-0.5 text-[12px] font-medium" style={{ color: BRAND }}>
                  {x}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="mb-1.5" style={{ color: WA.sec }}>
              Attributes
            </dt>
            <dd className="space-y-1">
              {[
                ['City', 'Pune'],
                ['Orders', '3'],
                ['Lifetime value', '₹4,870'],
              ].map(([k, v]) => (
                <p key={k} className="flex justify-between">
                  <span style={{ color: WA.muted }}>{k}</span>
                  <span style={{ color: WA.text }}>{v}</span>
                </p>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ChatDoodle() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]">
      <defs>
        <pattern id="dash-doodle" width="90" height="90" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#3B2F1E" strokeWidth="1.3" strokeLinecap="round">
            <path d="M12 14c0-3 4-5 6-1 2-4 6-2 6 1 0 4-6 7-6 7s-6-3-6-7z" />
            <circle cx="62" cy="18" r="6" />
            <path d="M44 50h18v10H52l-4 4v-4h-4z" />
            <path d="M74 66l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" />
            <path d="M10 56l6-6 6 6-6 6z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dash-doodle)" />
    </svg>
  );
}

function Bubble({ children, me, tick }: { children: React.ReactNode; me?: boolean; tick?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn('relative max-w-[65%] rounded-lg px-2.5 py-1.5 text-[14px] leading-[1.35] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]', me ? 'ml-auto rounded-tr-none' : 'rounded-tl-none')}
      style={{ color: WA.text, background: me ? WA.out : '#fff' }}
    >
      {children}
      <span className="float-right ml-2 mt-1.5 inline-flex translate-y-0.5 items-center gap-0.5 text-[11px]" style={{ color: WA.muted }}>
        {me ? '10:26' : '10:24'}
        {me && (tick === 'sent' ? <Check className="h-3.5 w-3.5" /> : <CheckCheck className={cn('h-4 w-4', tick === 'read' && 'text-[#53BDEB]')} />)}
      </span>
    </motion.div>
  );
}

/* ---------- Campaigns (mirrors campaigns/page.tsx) ---------- */

const STATUS: Record<string, { dot: string; text: string; pulse?: boolean }> = {
  Completed: { dot: 'bg-green-500', text: 'text-green-700' },
  Running: { dot: 'bg-blue-500', text: 'text-blue-700', pulse: true },
  Scheduled: { dot: 'bg-slate-400', text: 'text-slate-600' },
};

function CampaignsScreen({ t }: { t: number }) {
  const started = t >= 1950;
  const run = progress(t, 2300, 6300);
  const done = t >= 6300;
  const rows = [
    { name: 'Diwali sale', type: 'Broadcast', created: '20 Nov, 10:05', audience: 4812, status: done ? 'Completed' : started ? 'Running' : 'Scheduled', sends: Math.round(run * 4812), live: true },
    { name: 'Cart reminder', type: 'API', created: '20 Nov, 08:30', audience: 1290, status: 'Running', sends: 826 },
    { name: 'New arrivals', type: 'CSV', created: '19 Nov, 18:12', audience: 8200, status: 'Scheduled', sends: 0 },
    { name: 'Order updates', type: 'API', created: '19 Nov, 09:00', audience: 3410, status: 'Completed', sends: 3410 },
    { name: 'Win-back · 60 days', type: 'Broadcast', created: '18 Nov, 16:45', audience: 2150, status: 'Completed', sends: 2150 },
  ];
  return (
    <div className="flex h-full flex-col bg-[#f8fafd] p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-slate-900">Campaigns</h2>
            <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">12 total</span>
          </div>
          <p className="mt-1 text-[13px] text-slate-500">Send broadcast, CSV and API campaigns to your WhatsApp audience.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dadce0] bg-white text-slate-500">
            <RefreshCw className="h-4 w-4" />
          </span>
          <span className="flex h-9 items-center gap-2 rounded-lg px-4 text-[12px] font-semibold text-white" style={{ background: GREEN }}>
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" /> Create Campaign
          </span>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { step: 'Step 1', title: 'Connect WhatsApp', sub: 'Business account connected', icon: <CheckCircle2 className="h-[18px] w-[18px] text-green-700" />, bg: 'bg-green-50' },
          { step: 'Step 2', title: 'Approve Templates', sub: 'Create and submit message templates to Meta', icon: <FileText className="h-[18px] w-[18px] text-sky-700" />, bg: 'bg-sky-50' },
          { step: 'Step 3', title: 'Import Contacts', sub: 'Prepare audiences before sending', icon: <Users className="h-[18px] w-[18px] text-violet-700" />, bg: 'bg-violet-50' },
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-3 rounded-lg border border-[#dadce0] bg-white px-4 py-3">
            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', s.bg)}>{s.icon}</span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase text-slate-400">{s.step}</span>
              <span className="block truncate text-[13px] font-semibold text-slate-900">{s.title}</span>
              <span className="block truncate text-[12px] text-slate-500">{s.sub}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#dadce0] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#dadce0] px-4 py-3">
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-[12px] font-semibold">
            <span className="rounded-md bg-white px-3 py-1.5 text-slate-900 shadow-sm">All campaigns</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500">
              Scheduled <span className="rounded-full bg-slate-200 px-1.5 text-[10px] font-bold text-slate-600">{started ? 1 : 2}</span>
            </span>
            <span className="px-3 py-1.5 text-slate-500">Cancelled</span>
          </div>
          <div className="flex h-9 w-56 items-center gap-2 rounded-lg border border-[#dadce0] px-3 text-[13px] text-slate-400">
            <Search className="h-4 w-4" /> Search campaigns
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="border-b border-[#dadce0] bg-[#f8fafd]">
            <tr className="text-[11px] font-semibold uppercase text-slate-500">
              <th className="w-12 py-3 pl-5" />
              <th className="px-3 py-3">Campaign</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">Created</th>
              <th className="px-3 py-3">Sends</th>
              <th className="px-3 py-3">Status</th>
              <th className="py-3 pl-3 pr-5 text-right">Audience</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => {
              const st = STATUS[r.status];
              return (
                <tr key={r.name} className={cn('text-[13px]', r.live && started && !done && 'bg-blue-50/40')}>
                  <td className="py-3 pl-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                      <BrandIcon slug="whatsapp" className="h-4 w-4" />
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-900">{r.name}</td>
                  <td className="px-3 py-3 text-slate-600">{r.type}</td>
                  <td className="px-3 py-3 text-slate-500">{r.created}</td>
                  <td className="px-3 py-3">
                    <span className="font-semibold tabular-nums text-slate-900">{r.sends.toLocaleString('en-IN')}</span>
                    <span className="mt-1 block h-1 w-24 overflow-hidden rounded-full bg-slate-100">
                      <span className="block h-full rounded-full bg-green-500" style={{ width: `${(r.sends / r.audience) * 100}%` }} />
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        <motion.span key={r.status} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className={cn('flex items-center gap-1.5 text-[12.5px] font-medium', st.text)}>
                          <span className={cn('h-2 w-2 rounded-full', st.dot, st.pulse && 'animate-pulse')} />
                          {r.status}
                        </motion.span>
                      </AnimatePresence>
                      {r.live && !started && <span className="rounded-md border border-green-600 px-2 py-0.5 text-[11px] font-semibold text-green-700">Send now</span>}
                    </span>
                  </td>
                  <td className="py-3 pl-3 pr-5 text-right tabular-nums text-slate-700">{r.audience.toLocaleString('en-IN')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Templates (mirrors templates/page.tsx) ---------- */

function TemplatesScreen({ t }: { t: number }) {
  const approved = t >= 3700;
  const sel = t >= 1800 ? 0 : 1;
  const list = [
    { name: 'diwali_offer', img: '/demo/diwali-offer.svg', cat: 'Marketing', lang: 'English', status: approved ? 'Approved' : 'Pending', quality: approved ? 'High' : '—', used: 'Never' },
    { name: 'order_update', img: '/demo/order-shipped.svg', cat: 'Utility', lang: 'English', status: 'Approved', quality: 'High', used: '2h ago' },
    { name: 'otp_login', img: '', cat: 'Authentication', lang: 'English', status: 'Approved', quality: 'High', used: '5m ago' },
    { name: 'cart_reminder', img: '', cat: 'Marketing', lang: 'Hindi', status: 'Approved', quality: 'Medium', used: '1d ago' },
    { name: 'feedback_request', img: '', cat: 'Utility', lang: 'English', status: 'Rejected', quality: '—', used: 'Never' },
  ];
  const catCls: Record<string, string> = { Marketing: 'bg-amber-50 text-amber-700', Utility: 'bg-sky-50 text-sky-700', Authentication: 'bg-violet-50 text-violet-700' };
  const stCls: Record<string, string> = { Approved: 'bg-green-50 text-green-700', Pending: 'bg-amber-50 text-amber-700', Rejected: 'bg-red-50 text-red-700' };
  return (
    <div className="grid h-full grid-cols-[1fr_320px] gap-5 p-5">
      <div className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
          <div>
            <h2 className="text-[17px] font-bold text-gray-900">Message templates</h2>
            <p className="text-[12px] text-gray-500">Templates must be approved by Meta before you can send them.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-[12px] font-semibold text-violet-700">
              <Sparkles className="h-3.5 w-3.5" /> AI generated
            </span>
            <span className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-white" style={{ background: GREEN }}>
              <Plus className="h-3.5 w-3.5" /> Create Template
            </span>
          </div>
        </div>
        <div className="border-b border-gray-100 px-5 py-2.5">
          <div className="flex h-9 w-72 items-center gap-2 rounded-lg border border-gray-200 px-3 text-[13px] text-gray-400">
            <Search className="h-4 w-4" /> Search templates by name
          </div>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-gray-50 text-[11px] font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-5 py-2.5">Template</th>
              <th className="px-3 py-2.5">Category</th>
              <th className="px-3 py-2.5">Language</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5">Quality</th>
              <th className="px-3 py-2.5">Last used</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {list.map((x, i) => (
              <tr key={x.name} className={cn('transition-colors', i === sel && 'bg-green-50/50')}>
                <td className="px-5 py-2.5">
                  <span className="flex items-center gap-2.5 font-medium text-gray-900">
                    {x.img ? (
                      <Image src={x.img} alt="" width={60} height={32} unoptimized className="h-8 w-[60px] rounded-md object-cover ring-1 ring-black/5" />
                    ) : (
                      <span className="flex h-8 w-[60px] items-center justify-center rounded-md bg-gray-100 text-gray-400">
                        <FileText className="h-4 w-4" />
                      </span>
                    )}
                    {x.name}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span className={cn('rounded-md px-2 py-0.5 text-[11.5px] font-medium', catCls[x.cat])}>{x.cat}</span>
                </td>
                <td className="px-3 py-3 text-gray-600">{x.lang}</td>
                <td className="px-3 py-3">
                  <AnimatePresence mode="wait">
                    <motion.span key={x.status} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }} className={cn('inline-block rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold', stCls[x.status])}>
                      {x.status}
                    </motion.span>
                  </AnimatePresence>
                </td>
                <td className="px-3 py-3 text-gray-600">{x.quality}</td>
                <td className="px-3 py-3 text-gray-500">{x.used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-[15px] font-bold text-gray-900">Preview</p>
        <p className="text-[12px] text-gray-500">{sel === 0 ? 'diwali_offer · Marketing' : 'order_update · Utility'}</p>
        <div className="relative mt-3 flex-1 overflow-hidden rounded-xl p-3" style={{ background: WA.chat }}>
          <ChatDoodle />
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-lg rounded-tl-none bg-white p-1.5 shadow-sm">
              {sel === 0 ? (
                <>
                  <Image src="/demo/diwali-offer.svg" alt="" width={600} height={320} unoptimized className="h-auto w-full rounded-md" />
                  <p className="px-1.5 pt-2 text-[13px] leading-snug" style={{ color: WA.text }}>
                    Hi <b>{'{{1}}'}</b>, take 20% off everything until Sunday. Use code <b>DIWALI20</b> at checkout.
                  </p>
                  <p className="px-1.5 pt-1 text-[11.5px]" style={{ color: WA.muted }}>
                    Reply STOP to opt out
                  </p>
                </>
              ) : (
                <>
                  <Image src="/demo/order-shipped.svg" alt="" width={600} height={320} unoptimized className="h-auto w-full rounded-md" />
                  <p className="px-1.5 pt-2 text-[13px] leading-snug" style={{ color: WA.text }}>
                    Hi <b>{'{{1}}'}</b>, your order <b>{'{{2}}'}</b> has shipped and will arrive by <b>{'{{3}}'}</b>.
                  </p>
                </>
              )}
              <div className="mt-2 divide-y divide-gray-100 border-t border-gray-100 text-center text-[13px] font-medium text-[#027EB5]">
                <p className="py-2">{sel === 0 ? 'Shop now' : 'Track order'}</p>
                <p className="py-2">{sel === 0 ? 'Stop promotions' : 'Get help'}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-gray-500">
          <BrandIcon slug="meta" className="h-3.5 w-3.5" /> {approved || sel === 1 ? 'Approved by Meta' : 'Submitted to Meta for review'}
        </p>
      </div>
    </div>
  );
}

/* ---------- Flows (mirrors flows editor: FlowBuilder + NodeBase) ---------- */

const FC = {
  primary: '#15803d', primaryBg: '#f0fdf4', primaryBorder: '#bbf7d0',
  amber: '#d97706', amberBg: '#fffbeb', amberBorder: '#fde68a',
  violet: '#7c3aed', violetBg: '#f5f3ff', violetBorder: '#ddd6fe',
  sky: '#0284c7', skyBg: '#f0f9ff', skyBorder: '#bae6fd',
  orange: '#ea580c', orangeBg: '#fff7ed', orangeBorder: '#fed7aa',
  gray100: '#f3f4f6', gray200: '#e5e7eb', gray400: '#9ca3af', gray900: '#111827',
};

const blockGroups = [
  { label: 'Send', items: [
    { label: 'Text & Buttons', desc: 'Message with up to 3 buttons', icon: MessageCircle, c: FC.primary, bg: FC.primaryBg, b: FC.primaryBorder },
    { label: 'Media & Buttons', desc: 'Image, video or file with buttons', icon: ImageIcon, c: FC.primary, bg: FC.primaryBg, b: FC.primaryBorder },
    { label: 'List Menu', desc: 'Up to 10 options in a list', icon: List, c: FC.violet, bg: FC.violetBg, b: FC.violetBorder },
    { label: 'Template', desc: 'Approved WhatsApp template', icon: Zap, c: FC.amber, bg: FC.amberBg, b: FC.amberBorder },
  ] },
  { label: 'Ask', items: [
    { label: 'Ask Question', desc: 'Save a reply, with validation', icon: HelpCircle, c: FC.sky, bg: FC.skyBg, b: FC.skyBorder },
    { label: 'Ask Location', desc: "Request the user's location", icon: MapPin, c: FC.sky, bg: FC.skyBg, b: FC.skyBorder },
    { label: 'WhatsApp Form', desc: 'Send a Meta WhatsApp Flow form', icon: FileText, c: FC.violet, bg: FC.violetBg, b: FC.violetBorder },
  ] },
  { label: 'Logic', items: [
    { label: 'Condition', desc: 'Branch on a variable', icon: GitBranch, c: FC.violet, bg: FC.violetBg, b: FC.violetBorder },
    { label: 'Business Hours', desc: 'Branch on open / closed', icon: Clock, c: FC.orange, bg: FC.orangeBg, b: FC.orangeBorder },
  ] },
];
const payBlock = { label: 'Collect Payment', desc: 'WhatsApp Pay order with paid / not paid', icon: CreditCard, c: FC.primary, bg: FC.primaryBg, b: FC.primaryBorder };

function BlockItem({ it, active }: { it: (typeof blockGroups)[number]['items'][number]; active?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5 rounded-lg px-2 py-1.5', active && 'bg-gray-50 ring-1 ring-gray-200')}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border" style={{ background: it.bg, borderColor: it.b, color: it.c }}>
        <it.icon className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[12.5px] font-semibold text-gray-900">{it.label}</span>
        <span className="block truncate text-[10.5px] text-gray-400">{it.desc}</span>
      </span>
    </div>
  );
}

function FlowNode({ x, y, accent, tint, icon: Icon, label, selected, children, inHandle = true }: { x: number; y: number; accent: string; tint: string; icon: React.ComponentType<{ className?: string }>; label: string; selected?: boolean; children: React.ReactNode; inHandle?: boolean }) {
  return (
    <div
      className="absolute bg-white"
      style={{
        left: x,
        top: y,
        width: NODE_W,
        borderRadius: 14,
        border: `1px solid ${selected ? accent : '#e2e8f0'}`,
        boxShadow: selected ? `0 0 0 3px ${accent}26, 0 10px 28px rgba(15,23,42,0.12)` : '0 1px 2px rgba(15,23,42,0.05), 0 6px 16px rgba(15,23,42,0.06)',
      }}
    >
      {inHandle && <span className="absolute -left-[5px] top-[18px] h-2.5 w-2.5 rounded-full border-2 border-white" style={{ background: accent }} />}
      <div className="flex h-11 items-center gap-2 border-b px-3" style={{ borderColor: FC.gray100, background: tint }}>
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-lg border" style={{ background: `${accent}17`, borderColor: `${accent}2e`, color: accent }}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="truncate text-[12.5px] font-bold" style={{ color: FC.gray900 }}>
          {label}
        </span>
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-[9.5px] font-bold uppercase tracking-[0.06em]" style={{ color: FC.gray400 }}>{children}</p>;
}

function NodeButton({ children, color = FC.primary }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="relative mt-1.5 flex h-7 items-center justify-center rounded-lg border text-[11.5px] font-semibold" style={{ borderColor: FC.gray200, color }}>
      {children}
      <span className="absolute -right-[16px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white" style={{ background: color }} />
    </div>
  );
}

/** Bezier edge between two canvas points, React Flow style. */
function edge(ax: number, ay: number, bx: number, by: number) {
  const dx = Math.max(40, (bx - ax) / 2);
  return `M${ax} ${ay} C ${ax + dx} ${ay}, ${bx - dx} ${by}, ${bx} ${by}`;
}

function FlowsScreen({ t }: { t: number }) {
  const searching = t >= 1150;
  const query = 'pay'.slice(0, Math.max(0, Math.floor(progress(t, 1200, 1700) * 3)));
  const dragging = t >= 2550 && t < 3600;
  const dropped = t >= 3600;
  const linked = t >= 3800;
  const live = t >= 4950;
  const saving = t >= 5850 && t < 6400;
  const dirty = dropped && t < 5850;
  const g = progress(t, 2700, 3550);
  const ease = 1 - Math.pow(1 - g, 3);
  const ghost = { x: DRAG_FROM.x + (DROP_AT.x - DRAG_FROM.x) * ease, y: DRAG_FROM.y + (DROP_AT.y - DRAG_FROM.y) * ease };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* editor top bar */}
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-200 px-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500">
          <ArrowLeft className="h-4 w-4" />
        </span>
        <span className="flex items-center gap-1.5 px-1 text-[14px] font-semibold text-gray-900">
          Pricing enquiries <Pencil className="h-3.5 w-3.5 text-gray-400" />
        </span>
        {dirty && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-amber-700">Unsaved</span>}
        <span className="mx-1 h-5 w-px bg-gray-200" />
        <span className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500"><Undo2 className="h-4 w-4" /></span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300"><Redo2 className="h-4 w-4" /></span>
        <div className="ml-auto flex items-center gap-2">
          <span className="flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-semibold" style={{ borderColor: FC.violetBorder, background: FC.violetBg, color: FC.violet }}>
            <Sparkles className="h-3.5 w-3.5" /> Edit with AI
          </span>
          <span className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-[12px] font-semibold text-gray-700">
            <Bot className="h-3.5 w-3.5" /> AI Routing
          </span>
          <span className="flex h-8 items-center gap-2 rounded-lg border px-2.5 text-[12px] font-semibold transition-colors" style={{ borderColor: live ? FC.primaryBorder : FC.gray200, background: live ? FC.primaryBg : '#fff', color: live ? FC.primary : '#374151' }}>
            <span className="relative inline-block h-[18px] w-[30px] rounded-full transition-colors" style={{ background: live ? BRAND : '#d1d5db' }}>
              <span className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white shadow transition-all" style={{ left: live ? 14 : 2 }} />
            </span>
            {live ? 'Live' : 'Draft'}
          </span>
          <span className="flex h-8 items-center gap-1.5 rounded-lg px-3.5 text-[12px] font-semibold text-white" style={{ background: dirty || saving ? FC.primary : '#86efac' }}>
            {saving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* block library */}
        <aside className="flex shrink-0 flex-col border-r border-gray-200 bg-white" style={{ width: SIDEBAR_W }}>
          <div className="border-b px-3 pb-2 pt-3" style={{ borderColor: FC.gray100 }}>
            <p className="mb-2 text-[13px] font-bold text-gray-900">Blocks</p>
            <div className={cn('flex h-8 items-center gap-2 rounded-lg border px-2.5 text-[12px]', searching ? 'border-green-500 ring-2 ring-green-100' : 'border-gray-200')}>
              <Search className="h-3.5 w-3.5 text-gray-400" />
              {query ? <span className="text-gray-900">{query}<span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-green-600" /></span> : <span className="text-gray-400">Search blocks</span>}
            </div>
            <p className="mt-2 flex items-center gap-1 text-[10.5px] text-gray-400">
              <MousePointerClick className="h-3 w-3" /> Click or drag onto the canvas
            </p>
          </div>
          <div className="flex-1 overflow-hidden px-2 pt-2">
            {query.length >= 2 ? (
              <>
                <p className="px-2 pb-1 pt-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-gray-400">Actions</p>
                <div className={cn('transition-opacity', dragging && 'opacity-40')}>
                  <BlockItem it={payBlock} active={t >= 2000} />
                </div>
              </>
            ) : (
              blockGroups.map((grp) => (
                <div key={grp.label} className="mb-1">
                  <p className="px-2 pb-1 pt-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-gray-400">{grp.label}</p>
                  {grp.items.map((it) => (
                    <BlockItem key={it.label} it={it} />
                  ))}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* canvas */}
        <div className="relative min-w-0 flex-1 overflow-hidden" style={{ background: '#f8fafc', backgroundImage: 'radial-gradient(#b4bfcd 1.1px, transparent 1.1px)', backgroundSize: '20px 20px' }}>
          <svg className="absolute inset-0 h-full w-full overflow-visible">
            {[
              edge(16 + NODE_W + 5, 40 + 22, 216 - 5, 40 + 22),
              edge(216 + NODE_W + 16, 40 + 44 + 10 + 64 + 14, 416 - 5, 24 + 22),
              edge(216 + NODE_W + 16, 40 + 44 + 10 + 64 + 14 + 34, 416 - 5, 300 + 22),
            ].map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#b1b1b7" strokeWidth="1.6" />
            ))}
            {linked && (
              <motion.path d={edge(416 + NODE_W + 16, 24 + 44 + 10 + 74 + 26 + 14, PAY.x - 5, PAY.y + 22)} fill="none" stroke={FC.primary} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
            )}
          </svg>

          <FlowNode x={16} y={40} accent={FC.primary} tint="#f0fdf4" icon={GitBranch} label="Flow Start" inHandle={false}>
            <FieldLabel>Keywords</FieldLabel>
            <div className="flex flex-wrap gap-1">
              {['price', 'pricing', 'cost'].map((k) => (
                <span key={k} className="rounded-md border px-1.5 py-0.5 text-[11px] font-medium" style={{ borderColor: FC.primaryBorder, background: FC.primaryBg, color: FC.primary }}>
                  {k}
                </span>
              ))}
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t pt-2 text-[11px] text-gray-600" style={{ borderColor: FC.gray100 }}>
              Start on any message
              <span className="relative inline-block h-[14px] w-[24px] rounded-full bg-gray-300">
                <span className="absolute left-[2px] top-[2px] h-[10px] w-[10px] rounded-full bg-white" />
              </span>
            </div>
            <span className="absolute -right-[5px] top-[18px] h-2.5 w-2.5 rounded-full border-2 border-white" style={{ background: FC.primary }} />
          </FlowNode>

          <FlowNode x={216} y={40} accent={FC.primary} tint="#f0fdf4" icon={MessageCircle} label="Text & Buttons">
            <div className="h-16 rounded-lg px-2 py-1.5 text-[11.5px] leading-snug text-gray-700" style={{ background: '#f9fafb' }}>
              Hi {'{{name}}'} 👋 Our linen kurtas start at ₹999. What would you like to do?
            </div>
            <NodeButton>View catalogue</NodeButton>
            <NodeButton>Talk to sales</NodeButton>
          </FlowNode>

          <FlowNode x={416} y={24} accent={FC.primary} tint="#f0fdf4" icon={ImageIcon} label="Media & Buttons">
            <div className="relative h-[74px] overflow-hidden rounded-lg">
              <Image src="/demo/diwali-offer.svg" alt="" fill unoptimized className="object-cover" />
            </div>
            <p className="mt-1.5 h-[26px] text-[11px] leading-snug text-gray-600">Festive edit · 12 styles</p>
            <NodeButton>Buy now</NodeButton>
          </FlowNode>

          <FlowNode x={416} y={300} accent={FC.orange} tint="#fff7ed" icon={Headphones} label="Human Handoff">
            <FieldLabel>Assign to</FieldLabel>
            <div className="flex items-center justify-between rounded-lg border px-2 py-1.5 text-[11.5px] text-gray-800" style={{ borderColor: FC.gray200 }}>
              Sales team <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
            <p className="mt-2 text-[10.5px] text-gray-400">Notifies the assigned agent</p>
          </FlowNode>

          <AnimatePresence>
            {dropped && (
              <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 26 }} className="absolute inset-0" style={{ transformOrigin: `${PAY.x + NODE_W / 2}px ${PAY.y + 40}px` }}>
                <FlowNode x={PAY.x} y={PAY.y} accent={FC.primary} tint="#f0fdf4" icon={CreditCard} label="Collect Payment" selected={t < 5200}>
                  <FieldLabel>Amount</FieldLabel>
                  <div className="rounded-lg border px-2 py-1.5 text-[12px] font-semibold text-gray-900" style={{ borderColor: FC.gray200 }}>
                    ₹1,299.00 <span className="font-normal text-gray-400">· UPI</span>
                  </div>
                  <NodeButton>Paid</NodeButton>
                  <NodeButton color="#e11d48">Not paid</NodeButton>
                </FlowNode>
              </motion.div>
            )}
          </AnimatePresence>

          {/* zoom controls + minimap */}
          <div className="absolute bottom-4 left-4 flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm">
            {[Plus, Minus, Maximize2].map((Ico, k) => (
              <span key={k} className="flex h-7 w-7 items-center justify-center border-b border-gray-100 last:border-b-0">
                <Ico className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 h-[84px] w-[132px] rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
            <div className="relative h-full w-full">
              {[[2, 14], [28, 14], [54, 8], [54, 46], ...(dropped ? [[80, 18]] : [])].map(([l, tp], k) => (
                <span key={k} className="absolute h-4 w-[20px] rounded-sm bg-gray-300" style={{ left: `${l}%`, top: tp }} />
              ))}
              <span className="absolute inset-0 rounded border-2 border-green-600/40" />
            </div>
          </div>
        </div>
      </div>

      {/* drag ghost (content coordinates) */}
      {dragging && (
        <div className="pointer-events-none absolute z-30 w-[200px] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] rounded-lg border border-gray-200 bg-white p-1 opacity-95 shadow-[0_12px_30px_rgba(15,23,42,0.18)]" style={{ left: ghost.x, top: ghost.y }}>
          <BlockItem it={payBlock} />
        </div>
      )}
    </div>
  );
}

/* ---------- Standalone flow editor (used by the chatbot sections) ---------- */

const FW = W - SIDEBAR; // editor area of the dashboard canvas
const FH = H - CHROME - HEADER;
const FLOW_LOOP = SCENE;

/**
 * The dashboard's flow editor on its own, scaled to fit — same Blocks library,
 * top bar, nodes and drag-and-drop animation as the Flows screen above.
 */
export function FlowEditorDemo() {
  const { ref, t } = useClock(FLOW_LOOP, FLOW_LOOP - 900, 50);
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / FW)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const way = paths[4].map((w) => ({ ...w, x: w.x - SIDEBAR, y: w.y - CHROME - HEADER }));
  const cur = [...way].reverse().find((w) => t >= w.at) ?? way[0];
  const clicking = way.some((w) => w.click && t >= w.at + 650 && t < w.at + 1050);

  return (
    <div ref={ref}>
      <div ref={box} className="frame-shine relative w-full rounded-2xl" style={{ height: FH * scale }}>
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-2xl border border-black/10 bg-white text-[13px] text-slate-900 shadow-lift [font-family:var(--font-outfit),sans-serif]"
          style={{ width: FW, height: FH, transform: `scale(${scale})` }}
        >
          <div className="relative h-full">
            <FlowsScreen t={t} />
          </div>
          <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-50" animate={{ x: cur.x, y: cur.y }} transition={{ duration: 0.85, ease: [0.45, 0, 0.2, 1] }}>
            <AnimatePresence>
              {clicking && (
                <motion.span initial={{ scale: 0.3, opacity: 0.6 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-[#16A34A]/50" />
              )}
            </AnimatePresence>
            <svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]">
              <path d="M4 2.5l15 9.2-6.6 1.5 3.9 7.3-2.7 1.4-3.9-7.3L4.9 19z" fill="#101828" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <div className="pointer-events-none absolute right-5 top-16 z-20">
            <AnimatePresence>
              {[
                { at: 5000, text: 'Flow is live' },
                { at: 6400, text: 'Changes saved' },
              ]
                .filter((x) => t >= x.at && t < x.at + 2400)
                .map((x) => (
                  <motion.div key={x.text} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-medium text-white shadow-lg">
                    <CircleCheck className="h-4 w-4 text-green-400" /> {x.text}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
