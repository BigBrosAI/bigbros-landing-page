"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  CircleCheck,
  Contact,
  CreditCard,
  FileText,
  GitBranch,
  LayoutGrid,
  Lock,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plug,
  Plus,
  Search,
  SendHorizontal,
  Settings,
  Smile,
  Sparkles,
  Tag,
} from 'lucide-react';
import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import { progress, useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/*
 * Animated replica of the BigBrosAI dashboard (layout mirrors the real app's
 * sidebar and screens). Drawn on a fixed 1120×680 canvas and scaled to fit.
 * All names and numbers are demo data.
 */

const W = 1120;
const H = 680;
const CHROME = 40;
const HEADER = 56;
const SIDEBAR = 76;
const SCENE = 7600;

const nav = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Live Chat', icon: MessageCircle },
  { label: 'Contacts', icon: Contact },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Templates', icon: FileText },
  { label: 'Flows', icon: GitBranch },
  { label: 'Apps', icon: Plug },
  { label: 'WA Pay', icon: CreditCard },
];
const scenes = [
  { key: 'dashboard', title: 'Dashboard', nav: 0 },
  { key: 'chat', title: 'Live Chat', nav: 1 },
  { key: 'campaigns', title: 'Campaigns', nav: 3 },
  { key: 'templates', title: 'Templates', nav: 4 },
  { key: 'flows', title: 'Flows', nav: 5 },
] as const;
const LOOP = SCENE * scenes.length;

const navY = (i: number) => CHROME + 64 + i * 58 + 29; // centre of a sidebar item
const content = (x: number, y: number) => ({ x: SIDEBAR + x, y: CHROME + HEADER + y });

type Way = { at: number; x: number; y: number; click?: boolean };
/** Cursor path per scene (canvas px); the last waypoint always heads to the next nav item. */
const paths: Way[][] = [
  [
    { at: 0, ...content(520, 120) },
    { at: 1800, ...content(420, 300) },
    { at: 3400, ...content(560, 260) },
  ],
  [
    { at: 0, ...content(140, 120) },
    { at: 900, ...content(140, 100), click: true },
    { at: 2000, ...content(650, 28), click: true },
    { at: 3200, ...content(420, 548) },
    { at: 4900, ...content(764, 556), click: true },
  ],
  [
    { at: 0, ...content(860, 40) },
    { at: 1500, ...content(655, 222), click: true },
    { at: 3600, ...content(520, 330) },
  ],
  [
    { at: 0, ...content(200, 160) },
    { at: 1100, ...content(220, 94), click: true },
    { at: 3200, ...content(640, 300) },
  ],
  [
    { at: 0, ...content(300, 200) },
    { at: 1200, ...content(700, 556), click: true },
    { at: 3800, ...content(520, 260) },
  ],
];

export function DashboardShowcase() {
  const { ref, t } = useClock(LOOP, SCENE * 1 + 5200, 50);
  const [offset, setOffset] = useState(0);
  const eff = (((t + offset) % LOOP) + LOOP) % LOOP;
  const sceneIdx = Math.floor(eff / SCENE);
  const local = eff % SCENE;
  const scene = scenes[sceneIdx];
  const next = scenes[(sceneIdx + 1) % scenes.length];

  // scale the fixed canvas to the container width
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // cursor
  const way = [...paths[sceneIdx], { at: SCENE - 1300, x: SIDEBAR / 2, y: navY(next.nav), click: true }];
  const cur = [...way].reverse().find((w) => local >= w.at) ?? way[0];
  const clicking = way.some((w) => w.click && local >= w.at + 650 && local < w.at + 1050);
  const activeNav = local >= SCENE - 350 ? next.nav : scene.nav;

  const jump = (i: number) => setOffset((o) => o + (i * SCENE - eff));

  return (
    <div ref={ref}>
      {/* scene tabs */}
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

      <div ref={box} className="relative mx-auto w-full max-w-[1120px]" style={{ height: H * scale }}>
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[18px] border border-black/10 bg-white text-[13px] text-[#101828] shadow-[0_50px_100px_-40px_rgba(11,46,35,0.45),0_20px_40px_-20px_rgba(0,0,0,0.2)]"
          style={{ width: W, height: H, transform: `scale(${scale})` }}
        >
          {/* browser chrome */}
          <div className="flex h-10 items-center gap-3 border-b border-black/5 bg-[#F3F4F6] px-4">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </span>
            <div className="mx-auto flex h-7 w-[420px] items-center justify-center gap-1.5 rounded-lg bg-white text-[12px] text-black/55">
              <Lock className="h-3 w-3" /> dashboard.bigbrosai.com/pt/hearth-loom/{scene.key === 'chat' ? 'live-chat' : scene.key}
            </div>
          </div>

          <div className="flex" style={{ height: H - CHROME }}>
            {/* sidebar — mirrors the real app */}
            <aside className="flex shrink-0 flex-col items-center bg-[#1D4B3E] pt-3" style={{ width: SIDEBAR }}>
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                  <circle cx="17" cy="6" r="2.4" fill="#fff" />
                  {[0, 1, 2, 3, 4].map((k) => {
                    const a = (200 + k * 18) * (Math.PI / 180);
                    return <line key={k} x1={15.5 + Math.cos(a) * 3} y1={8 - Math.sin(a) * 3} x2={15.5 + Math.cos(a) * 12} y2={8 - Math.sin(a) * 12} stroke="#fff" strokeWidth="2" strokeLinecap="round" />;
                  })}
                </svg>
              </span>
              {nav.map((n, i) => (
                <div key={n.label} className="flex h-[58px] flex-col items-center justify-center gap-1">
                  <span
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300',
                      i === activeNav ? 'bg-white text-[#15803D] shadow-[0_2px_8px_rgba(0,0,0,0.25)]' : 'text-white/75'
                    )}
                  >
                    <n.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className={cn('text-[9.5px] font-semibold', i === activeNav ? 'text-white' : 'text-white/60')}>{n.label}</span>
                </div>
              ))}
              <div className="mt-auto flex h-[58px] flex-col items-center justify-center gap-1 text-white/70">
                <Settings className="h-[18px] w-[18px]" />
                <span className="text-[9.5px] font-semibold">Settings</span>
              </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col bg-[#F7F8FA]">
              {/* header */}
              <header className="flex h-14 shrink-0 items-center gap-4 border-b border-black/5 bg-white px-5">
                <AnimatePresence mode="wait">
                  <motion.p key={scene.key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="w-40 font-display text-[17px] font-bold">
                    {scene.title}
                  </motion.p>
                </AnimatePresence>
                <div className="flex h-9 w-[320px] items-center gap-2 rounded-lg border border-black/10 px-3 text-[12.5px] text-black/40">
                  <Search className="h-4 w-4" /> Search contacts, chats, campaigns…
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <span className="flex items-center gap-2 rounded-full bg-[#ECFDF3] px-3 py-1.5 text-[12px] font-medium text-[#067647]">
                    <BrandIcon slug="whatsapp" className="h-3.5 w-3.5" /> +91 98•••• 4410
                    <span className="h-1.5 w-1.5 rounded-full bg-[#17B26A]" />
                  </span>
                  <span className="relative">
                    <Bell className="h-5 w-5 text-black/55" />
                    <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#F04438]" />
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(140deg,#34D399,#047857)] text-[11px] font-bold text-white">PS</span>
                    <ChevronDown className="h-4 w-4 text-black/40" />
                  </span>
                </div>
              </header>

              {/* screens */}
              <div className="relative min-h-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scene.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
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
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-50"
            animate={{ x: cur.x, y: cur.y }}
            transition={{ duration: 0.85, ease: [0.45, 0, 0.2, 1] }}
          >
            <AnimatePresence>
              {clicking && (
                <motion.span
                  initial={{ scale: 0.3, opacity: 0.6 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-[#16A34A]/50"
                />
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

/* ---------- toasts ---------- */

function Toasts({ scene, t }: { scene: string; t: number }) {
  const all: Record<string, { at: number; text: string; tone: 'ok' | 'info' }[]> = {
    dashboard: [{ at: 4200, text: 'Campaign “Diwali sale” completed · 4,812 sent', tone: 'ok' }],
    chat: [
      { at: 2600, text: 'Assigned to Priya Sharma', tone: 'info' },
      { at: 5700, text: 'Message delivered', tone: 'ok' },
    ],
    campaigns: [{ at: 2200, text: 'Campaign approved — sending now', tone: 'ok' }],
    templates: [{ at: 3700, text: 'Template “diwali_offer” approved by Meta', tone: 'ok' }],
    flows: [{ at: 2000, text: 'Flow published', tone: 'ok' }],
  };
  const list = (all[scene] ?? []).filter((x) => t >= x.at && t < x.at + 2600);
  return (
    <div className="pointer-events-none absolute right-5 top-4 z-20 space-y-2">
      <AnimatePresence>
        {list.map((x) => (
          <motion.div
            key={x.text}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="flex items-center gap-2.5 rounded-xl border border-black/5 bg-white px-3.5 py-2.5 text-[12.5px] font-medium shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]"
          >
            <CircleCheck className={cn('h-4 w-4', x.tone === 'ok' ? 'text-[#17B26A]' : 'text-[#2E90FA]')} />
            {x.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------- shared bits ---------- */

const card = 'rounded-xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]';
const pill = (tone: 'green' | 'amber' | 'blue' | 'red' | 'gray') =>
  ({
    green: 'bg-[#ECFDF3] text-[#067647]',
    amber: 'bg-[#FFFAEB] text-[#B54708]',
    blue: 'bg-[#EFF8FF] text-[#175CD3]',
    red: 'bg-[#FEF3F2] text-[#B42318]',
    gray: 'bg-[#F2F4F7] text-[#344054]',
  })[tone];

function Avatar({ name, className }: { name: string; className?: string }) {
  const hues = ['#34D399,#047857', '#60A5FA,#1D4ED8', '#FBBF24,#B45309', '#F472B6,#BE185D', '#A78BFA,#6D28D9'];
  const h = hues[name.charCodeAt(0) % hues.length];
  return (
    <span className={cn('flex shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white', className ?? 'h-9 w-9')} style={{ background: `linear-gradient(140deg,${h})` }}>
      {name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)}
    </span>
  );
}

/* ---------- Dashboard ---------- */

const series = [32, 41, 38, 52, 47, 61, 58, 72, 66, 81, 77, 92, 88, 104];

function DashboardScreen({ t }: { t: number }) {
  const p = progress(t, 200, 1800);
  const kpis = [
    { label: 'Messages sent', value: Math.round(12480 * p).toLocaleString('en-IN'), delta: '+12.4%' },
    { label: 'Delivered', value: `${(97.2 * p).toFixed(1)}%`, delta: '+0.8%' },
    { label: 'Read rate', value: `${(81.4 * p).toFixed(1)}%`, delta: '+3.1%' },
    { label: 'Open chats', value: String(Math.round(18 * p)), delta: '6 unassigned' },
  ];
  const cw = 620;
  const ch = 230;
  const pts = series.map((v, i) => [(i / (series.length - 1)) * cw, ch - (v / 110) * ch] as const);
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ');
  const hover = Math.min(series.length - 1, Math.floor(progress(t, 2600, 4200) * (series.length - 1)));
  const feed = [
    { at: 600, icon: <MessageCircle className="h-4 w-4 text-[#16A34A]" />, text: 'New chat from Ayesha K.', time: 'now' },
    { at: 1500, icon: <BrandTile slug="shopify" size={18} />, text: 'Order #1042 synced from Shopify', time: '1m' },
    { at: 2600, icon: <CreditCard className="h-4 w-4 text-[#7C3AED]" />, text: '₹1,299 received via WhatsApp Pay', time: '2m' },
    { at: 3600, icon: <FileText className="h-4 w-4 text-[#2E90FA]" />, text: 'Template “order_update” approved', time: '5m' },
    { at: 4600, icon: <Megaphone className="h-4 w-4 text-[#F79009]" />, text: 'Diwali sale completed · 4,812 sent', time: '8m' },
  ].filter((f) => t >= f.at);

  return (
    <div className="space-y-4 p-5">
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className={cn(card, 'p-4')}>
            <p className="text-[12px] font-medium text-black/50">{k.label}</p>
            <p className="mt-1.5 font-display text-[26px] font-bold tabular-nums">{k.value}</p>
            <p className="mt-1 text-[11.5px] font-medium text-[#067647]">{k.delta}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_330px] gap-4">
        <div className={cn(card, 'p-4')}>
          <div className="flex items-center justify-between">
            <p className="font-semibold">Conversations · last 14 days</p>
            <span className={cn('rounded-md px-2 py-0.5 text-[11px] font-medium', pill('gray'))}>Daily</span>
          </div>
          <svg viewBox={`0 0 ${cw} ${ch + 20}`} className="mt-3 h-[260px] w-full overflow-visible">
            {[0, 1, 2, 3].map((g) => (
              <line key={g} x1="0" x2={cw} y1={(g * ch) / 3} y2={(g * ch) / 3} stroke="#EAECF0" />
            ))}
            <motion.polygon points={`0,${ch} ${line} ${cw},${ch}`} fill="url(#dash-area)" initial={{ opacity: 0 }} animate={{ opacity: p }} />
            <defs>
              <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#22C55E" stopOpacity="0.25" />
                <stop offset="1" stopColor="#22C55E" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.polyline points={line} fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: p }} transition={{ duration: 0.05 }} />
            {t >= 2600 && (
              <g>
                <line x1={pts[hover][0]} x2={pts[hover][0]} y1="0" y2={ch} stroke="#16A34A" strokeDasharray="3 3" />
                <circle cx={pts[hover][0]} cy={pts[hover][1]} r="5" fill="#fff" stroke="#16A34A" strokeWidth="2.5" />
                <g transform={`translate(${Math.min(pts[hover][0] + 10, cw - 120)},${Math.max(pts[hover][1] - 46, 0)})`}>
                  <rect width="112" height="38" rx="8" fill="#101828" />
                  <text x="10" y="16" fill="#fff" fontSize="10.5" opacity="0.6">
                    Nov {6 + hover}
                  </text>
                  <text x="10" y="30" fill="#fff" fontSize="12" fontWeight="600">
                    {series[hover] * 12} chats
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>
        <div className={cn(card, 'p-4')}>
          <p className="font-semibold">Live activity</p>
          <ul className="mt-3 space-y-2.5">
            <AnimatePresence initial={false}>
              {[...feed].reverse().map((f) => (
                <motion.li key={f.text} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 rounded-lg bg-[#F9FAFB] px-3 py-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">{f.icon}</span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px]">{f.text}</span>
                  <span className="text-[11px] text-black/40">{f.time}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Live chat ---------- */

const REPLY = 'Hi Ayesha! Your order #2231 is out for delivery and will reach you by 6 pm today 🚚';

function ChatScreen({ t }: { t: number }) {
  const arrived = t >= 500;
  const assigned = t >= 2600;
  const typed = t >= 3300 && t < 5600 ? REPLY.slice(0, Math.floor(progress(t, 3300, 5300) * REPLY.length)) : '';
  const sent = t >= 5600;
  const tick = t >= 6400 ? 'read' : t >= 5900 ? 'delivered' : 'sent';
  const chats = [
    { name: 'Ayesha Khan', text: arrived ? 'Where is my order #2231?' : '', unread: !sent ? 1 : 0, time: 'now', isNew: true },
    { name: 'Sana Mirza', text: 'Do you ship to Pune?', unread: 2, time: '3m' },
    { name: 'Imran Shaikh', text: 'You: Refund initiated ✅', unread: 0, time: '12m' },
    { name: 'Neha Patil', text: 'Is COD available?', unread: 0, time: '25m' },
    { name: 'Vikram Rao', text: 'Thanks for the quick help!', unread: 0, time: '1h' },
    { name: 'Ananya Iyer', text: 'Can I change the size?', unread: 0, time: '2h' },
  ].filter((c) => !c.isNew || arrived);

  return (
    <div className="grid h-full grid-cols-[290px_1fr_250px]">
      {/* list */}
      <div className="flex flex-col border-r border-black/5 bg-white">
        <div className="flex gap-1 border-b border-black/5 p-3 text-[12px] font-medium">
          {['All 18', 'Mine 6', 'Unassigned 3'].map((x, i) => (
            <span key={x} className={cn('rounded-md px-2.5 py-1.5', i === 0 ? 'bg-[#ECFDF3] text-[#067647]' : 'text-black/55')}>
              {x}
            </span>
          ))}
        </div>
        <ul className="flex-1 overflow-hidden">
          <AnimatePresence initial={false}>
            {chats.map((c, i) => (
              <motion.li
                key={c.name}
                layout
                initial={{ opacity: 0, x: -20, backgroundColor: '#ECFDF3' }}
                animate={{ opacity: 1, x: 0, backgroundColor: i === 0 ? '#F0FDF4' : '#FFFFFF' }}
                className={cn('relative flex gap-3 border-b border-black/[0.04] px-3.5 py-3', i === 0 && 'border-l-[3px] border-l-[#16A34A]')}
              >
                <span className="relative">
                  <Avatar name={c.name} />
                  <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-px">
                    <BrandIcon slug="whatsapp" className="h-3 w-3" />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between">
                    <span className={cn('truncate text-[13px]', c.unread ? 'font-bold' : 'font-semibold')}>{c.name}</span>
                    <span className="text-[11px] text-black/40">{c.time}</span>
                  </span>
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12px] text-black/55">{i === 0 && sent ? `You: ${REPLY}` : c.text}</span>
                    {c.unread > 0 && <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#25D366] px-1 text-[10px] font-bold text-white">{c.unread}</span>}
                  </span>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      {/* conversation */}
      <div className="flex min-w-0 flex-col bg-[#EFE7DD]">
        <div className="flex items-center gap-3 border-b border-black/5 bg-white px-4 py-2.5">
          <Avatar name="Ayesha Khan" />
          <div className="leading-tight">
            <p className="font-semibold">Ayesha Khan</p>
            <p className="text-[11.5px] text-black/50">+91 98•••• 2231 · Order status</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <motion.span
              key={assigned ? 'a' : 'u'}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn('flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1.5 text-[12px] font-medium', assigned ? 'border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]' : 'border-black/10 text-black/60')}
            >
              {assigned ? <Avatar name="Priya Sharma" className="h-5 w-5 text-[8px]" /> : <Tag className="h-3.5 w-3.5" />}
              {assigned ? 'Priya Sharma' : 'Assign'}
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
            <span className="rounded-lg bg-[#16A34A] px-3 py-1.5 text-[12px] font-semibold text-white">Resolve</span>
            <MoreHorizontal className="h-4 w-4 text-black/40" />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-5 py-4">
          <span className="mx-auto rounded-md bg-white/80 px-2 py-0.5 text-[11px] text-black/50">Today</span>
          {arrived && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-[60%] rounded-xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
              Hi, where is my order #2231? <span className="ml-2 text-[10.5px] text-black/40">10:24</span>
            </motion.div>
          )}
          {assigned && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto rounded-md bg-[#FFF7D6] px-2.5 py-1 text-[11px] text-black/60">
              Chat assigned to Priya Sharma
            </motion.p>
          )}
          {sent && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[62%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2 shadow-sm">
              {REPLY}
              <span className="ml-2 inline-flex items-center gap-0.5 text-[10.5px] text-black/40">
                10:25 {tick === 'sent' ? <Check className="h-3.5 w-3.5" /> : <CheckCheck className={cn('h-3.5 w-3.5', tick === 'read' && 'text-[#53BDEB]')} />}
              </span>
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-black/5 bg-white px-4 py-3">
          <Smile className="h-5 w-5 text-black/40" />
          <Paperclip className="h-5 w-5 text-black/40" />
          <div className="min-w-0 flex-1 truncate rounded-lg bg-[#F2F4F7] px-3 py-2 text-[13px]">
            {typed ? (
              <>
                {typed}
                <span className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-[#16A34A]" />
              </>
            ) : (
              <span className="text-black/40">Type a message, or / for quick replies</span>
            )}
          </div>
          <span className="flex items-center gap-1 rounded-md bg-[#F4F3FF] px-2 py-1 text-[11px] font-medium text-[#5925DC]">
            <Sparkles className="h-3.5 w-3.5" /> AI reply
          </span>
          <span className={cn('flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors', typed ? 'bg-[#16A34A]' : 'bg-[#16A34A]/40')}>
            <SendHorizontal className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* contact */}
      <div className="space-y-4 border-l border-black/5 bg-white p-4">
        <div className="flex flex-col items-center text-center">
          <Avatar name="Ayesha Khan" className="h-14 w-14 text-base" />
          <p className="mt-2 font-semibold">Ayesha Khan</p>
          <p className="text-[12px] text-black/50">+91 98•••• 2231</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-black/40">Tags</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {['Repeat buyer', 'Pune', 'VIP'].map((x) => (
              <span key={x} className={cn('rounded-md px-2 py-0.5 text-[11.5px] font-medium', pill(x === 'VIP' ? 'amber' : 'green'))}>
                {x}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 text-[12.5px]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-black/40">Attributes</p>
          {[
            ['Orders', '3'],
            ['Lifetime value', '₹4,870'],
            ['Opted in', 'Yes'],
          ].map(([k, v]) => (
            <p key={k} className="flex justify-between">
              <span className="text-black/50">{k}</span>
              <span className="font-medium">{v}</span>
            </p>
          ))}
        </div>
        <div className={cn(card, 'p-3')}>
          <p className="flex items-center gap-1.5 text-[12px] font-semibold">
            <BrandTile slug="shopify" size={18} /> Last order
          </p>
          <p className="mt-1.5 text-[12.5px]">#2231 · Linen kurta × 2</p>
          <span className={cn('mt-1.5 inline-block rounded-md px-2 py-0.5 text-[11px] font-medium', pill('blue'))}>Out for delivery</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Campaigns ---------- */

function CampaignsScreen({ t }: { t: number }) {
  const approved = t >= 2100;
  const run = progress(t, 2600, 6200);
  const done = t >= 6200;
  const total = 4812;
  const rows = [
    { name: 'Diwali sale', type: 'Broadcast', audience: total, status: done ? 'Completed' : approved ? 'Running' : 'Pending approval', live: true },
    { name: 'Cart reminder', type: 'API', audience: 1290, status: 'Running', sent: 0.64 },
    { name: 'New arrivals', type: 'CSV', audience: 8200, status: 'Scheduled', sent: 0 },
    { name: 'Order updates', type: 'API', audience: 3410, status: 'Completed', sent: 1 },
    { name: 'Win-back · 60 days', type: 'Broadcast', audience: 2150, status: 'Completed', sent: 1 },
  ];
  const tone = (s: string) => (s === 'Completed' ? 'green' : s === 'Running' ? 'blue' : s === 'Scheduled' ? 'gray' : 'amber');
  const stat = [
    { label: 'Sent today', v: Math.round(9204 + run * total) },
    { label: 'Delivered', v: Math.round(8930 + run * total * 0.97) },
    { label: 'Read', v: Math.round(7210 + run * total * 0.81) },
    { label: 'Clicked', v: Math.round(1904 + run * total * 0.24) },
  ];
  return (
    <div className="space-y-4 p-5">
      <div className="flex items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-white p-1 text-[12px] font-medium shadow-sm">
          {['All', 'Broadcast', 'CSV', 'API'].map((x, i) => (
            <span key={x} className={cn('rounded-md px-3 py-1.5', i === 0 ? 'bg-[#ECFDF3] text-[#067647]' : 'text-black/55')}>
              {x}
            </span>
          ))}
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-lg bg-[#16A34A] px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-sm">
          <Plus className="h-4 w-4" /> New campaign
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {stat.map((s) => (
          <div key={s.label} className={cn(card, 'px-4 py-3')}>
            <p className="text-[12px] text-black/50">{s.label}</p>
            <p className="font-display text-[22px] font-bold tabular-nums">{s.v.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>
      <div className={cn(card, 'overflow-hidden')}>
        <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_1fr_1.6fr] gap-4 border-b border-black/5 bg-[#F9FAFB] px-4 py-2.5 text-[11.5px] font-semibold text-black/50">
          <span>Campaign</span>
          <span>Source</span>
          <span>Audience</span>
          <span>Status</span>
          <span>Delivery</span>
        </div>
        {rows.map((r) => {
          const sent = r.live ? run : r.sent ?? 0;
          return (
            <div key={r.name} className={cn('grid grid-cols-[1.4fr_0.8fr_0.8fr_1fr_1.6fr] items-center gap-4 border-b border-black/[0.04] px-4 py-3', r.live && 'bg-[#F6FEF9]')}>
              <span className="flex items-center gap-2 font-semibold">
                <Megaphone className="h-4 w-4 text-black/40" /> {r.name}
              </span>
              <span className={cn('w-fit rounded-md px-2 py-0.5 text-[11.5px] font-medium', pill('gray'))}>{r.type}</span>
              <span className="tabular-nums">{r.audience.toLocaleString('en-IN')}</span>
              <span className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.span key={r.status} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className={cn('rounded-full px-2.5 py-0.5 text-[11.5px] font-medium', pill(tone(r.status)))}>
                    {r.status === 'Running' && <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#2E90FA]" />}
                    {r.status}
                  </motion.span>
                </AnimatePresence>
                {r.live && !approved && <span className="rounded-md border border-[#16A34A] px-2 py-0.5 text-[11px] font-semibold text-[#16A34A]">Approve</span>}
              </span>
              <span className="flex items-center gap-3">
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#F2F4F7]">
                  <span className="block h-full rounded-full bg-[linear-gradient(90deg,#16A34A,#4ADE80)]" style={{ width: `${sent * 100}%` }} />
                </span>
                <span className="w-24 text-right text-[11.5px] tabular-nums text-black/55">
                  {Math.round(sent * r.audience).toLocaleString('en-IN')} sent
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Templates ---------- */

function TemplatesScreen({ t }: { t: number }) {
  const approved = t >= 3700;
  const list = [
    { name: 'diwali_offer', cat: 'Marketing', lang: 'en', status: approved ? 'Approved' : 'In review' },
    { name: 'order_update', cat: 'Utility', lang: 'en', status: 'Approved' },
    { name: 'otp_login', cat: 'Authentication', lang: 'en', status: 'Approved' },
    { name: 'cart_reminder', cat: 'Marketing', lang: 'hi', status: 'Approved' },
    { name: 'feedback_request', cat: 'Utility', lang: 'en', status: 'Rejected' },
  ];
  const sel = t >= 1800 ? 0 : 1;
  return (
    <div className="grid h-full grid-cols-[1fr_330px] gap-4 p-5">
      <div className={cn(card, 'overflow-hidden')}>
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="font-semibold">Message templates</p>
          <span className="flex items-center gap-1.5 rounded-lg bg-[#16A34A] px-3 py-1.5 text-[12px] font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" /> Create with AI
          </span>
        </div>
        {list.map((x, i) => (
          <div key={x.name} className={cn('flex items-center gap-4 border-b border-black/[0.04] px-4 py-3.5 transition-colors', i === sel && 'bg-[#F6FEF9]')}>
            <FileText className="h-4 w-4 text-black/40" />
            <span className="w-44 font-mono text-[12.5px] font-medium">{x.name}</span>
            <span className={cn('rounded-md px-2 py-0.5 text-[11.5px] font-medium', pill(x.cat === 'Marketing' ? 'amber' : x.cat === 'Utility' ? 'blue' : 'gray'))}>{x.cat}</span>
            <span className="text-[12px] text-black/45">{x.lang}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={x.status}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                className={cn('ml-auto rounded-full px-2.5 py-0.5 text-[11.5px] font-medium', pill(x.status === 'Approved' ? 'green' : x.status === 'Rejected' ? 'red' : 'amber'))}
              >
                {x.status}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className={cn(card, 'flex flex-col p-4')}>
        <p className="font-semibold">Preview</p>
        <div className="mt-3 flex-1 rounded-xl bg-[#EFE7DD] p-3">
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl rounded-tl-sm bg-white p-1.5 shadow-sm">
              {sel === 0 ? (
                <>
                  <div className="flex h-24 items-end rounded-lg bg-[linear-gradient(135deg,#F59E0B,#B45309)] p-2.5 font-display text-[18px] font-bold text-white">Diwali sale 🪔</div>
                  <p className="px-1.5 pt-2 text-[12.5px] leading-snug">
                    Hi <span className="rounded bg-[#ECFDF3] px-1 text-[#067647]">{'{{1}}'}</span>, take 20% off everything until Sunday. Use code <b>DIWALI20</b>.
                  </p>
                </>
              ) : (
                <p className="px-1.5 py-1 text-[12.5px] leading-snug">
                  Hi <span className="rounded bg-[#ECFDF3] px-1 text-[#067647]">{'{{1}}'}</span>, your order <b>{'{{2}}'}</b> has shipped and will arrive by <b>{'{{3}}'}</b>.
                </p>
              )}
              <div className="mt-2 grid grid-cols-2 border-t border-black/5 text-center text-[12px] font-medium text-[#027EB5]">
                <span className="py-1.5">{sel === 0 ? 'Shop now' : 'Track order'}</span>
                <span className="border-l border-black/5 py-1.5">{sel === 0 ? 'Stop offers' : 'Get help'}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-black/50">
          <BrandIcon slug="meta" className="h-3.5 w-3.5" /> Submitted to Meta for review
        </p>
      </div>
    </div>
  );
}

/* ---------- Flows ---------- */

const flowNodes = [
  { x: 40, y: 150, title: 'Keyword: “price”', kind: 'Trigger', color: '#F79009' },
  { x: 250, y: 150, title: 'AI reply', kind: 'AI', color: '#7A5AF8' },
  { x: 460, y: 150, title: 'Returning customer?', kind: 'Condition', color: '#2E90FA' },
  { x: 460, y: 300, title: 'Send catalogue', kind: 'Action', color: '#16A34A' },
  { x: 250, y: 300, title: 'Assign to Sales', kind: 'Action', color: '#16A34A' },
];
const flowEdges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

function FlowsScreen({ t }: { t: number }) {
  const active = Math.min(flowNodes.length - 1, Math.floor(progress(t, 2400, 6600) * flowNodes.length));
  const running = t >= 2400;
  const chat = [
    { at: 2500, me: true, text: 'price?' },
    { at: 3400, me: false, text: 'Our kurtas start at ₹999. Want to see the catalogue?' },
    { at: 4300, me: false, text: '🛍️ Catalogue · 12 items' },
    { at: 5600, me: false, text: 'Connecting you to our sales team…' },
  ].filter((c) => t >= c.at);
  const NW = 170;
  const NH = 64;
  const centre = (i: number) => ({ x: flowNodes[i].x + NW / 2, y: flowNodes[i].y + NH / 2 });
  return (
    <div className="grid h-full grid-cols-[1fr_300px]">
      <div className="relative bg-[radial-gradient(#D0D5DD_1px,transparent_1px)] [background-size:18px_18px]">
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-lg bg-white px-3 py-1.5 text-[12.5px] font-semibold shadow-sm">Pricing enquiries</span>
          <span className={cn('rounded-full px-2.5 py-1 text-[11.5px] font-medium', pill(running ? 'green' : 'gray'))}>{running ? '● Running' : 'Draft'}</span>
        </div>
        <svg className="absolute inset-0 h-full w-full">
          {flowEdges.map(([a, b], i) => {
            const A = centre(a);
            const B = centre(b);
            const sameRow = Math.abs(A.y - B.y) < 5;
            const d = sameRow
              ? `M${A.x + (B.x > A.x ? NW / 2 : -NW / 2)} ${A.y} L${B.x - (B.x > A.x ? NW / 2 : -NW / 2)} ${B.y}`
              : `M${A.x} ${A.y + NH / 2} L${B.x} ${B.y - NH / 2}`;
            const lit = running && active > i;
            return (
              <g key={i}>
                <path d={d} stroke="#98A2B3" strokeWidth="1.5" strokeDasharray="4 5" fill="none" />
                {lit && <motion.path d={d} stroke="#16A34A" strokeWidth="2.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />}
              </g>
            );
          })}
        </svg>
        {flowNodes.map((n, i) => {
          const isActive = running && i === active;
          const done = running && i < active;
          return (
            <div
              key={n.title}
              className={cn('absolute rounded-xl border bg-white px-3 py-2.5 shadow-sm transition-all duration-300', isActive ? 'border-[#16A34A] shadow-[0_0_0_4px_rgba(22,163,74,0.15)]' : 'border-black/10')}
              style={{ left: n.x, top: n.y, width: NW, height: NH }}
            >
              <p className="text-[10.5px] font-bold uppercase tracking-wide" style={{ color: n.color }}>
                {n.kind}
              </p>
              <p className="mt-0.5 truncate text-[12.5px] font-semibold">{n.title}</p>
              {done && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A] text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
            </div>
          );
        })}
        <span className="absolute bottom-4 right-4 rounded-lg bg-[#16A34A] px-3.5 py-2 text-[12.5px] font-semibold text-white shadow-sm">Publish</span>
      </div>
      <div className="flex flex-col border-l border-black/5 bg-white">
        <p className="border-b border-black/5 px-4 py-3 font-semibold">Test chat</p>
        <div className="flex flex-1 flex-col justify-end gap-2 bg-[#EFE7DD] p-3">
          <AnimatePresence initial={false}>
            {chat.map((c) => (
              <motion.div
                key={c.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('max-w-[85%] rounded-xl px-2.5 py-1.5 text-[12.5px] shadow-sm', c.me ? 'ml-auto rounded-tr-sm bg-[#D9FDD3]' : 'rounded-tl-sm bg-white')}
              >
                {c.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
