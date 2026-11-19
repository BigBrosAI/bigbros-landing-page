"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Check, CheckCheck, Clock3, Heart, Mail, MessageCircle, MoreHorizontal, Send, ShoppingCart, Star } from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';
import { progress, useClock } from '@/components/landing/use-clock';
import { cn } from '@/lib/utils';

/* Illustrative product visuals — demo data only. */

function Frame({ title, right, children, dark }: { title: string; right?: React.ReactNode; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={cn('overflow-hidden rounded-3xl border shadow-lift', dark ? 'border-white/10 bg-[#0D1B16] text-white' : 'border-border bg-card')}>
      <div className={cn('flex items-center justify-between border-b px-4 py-3', dark ? 'border-white/10' : 'border-border')}>
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </span>
          <p className={cn('ml-2 text-[12.5px] font-semibold', dark ? 'text-white/80' : '')}>{title}</p>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

/* ---------- API: request typed, response streamed, webhooks arrive ---------- */

const REQUEST = `curl -X POST https://api.bigbrosai.com/v1/messages \\
  -H "Authorization: Bearer $BBAI_KEY" \\
  -d '{
    "to": "+919876543210",
    "template": "order_shipped",
    "params": ["Rahul", "#1042"]
  }'`;

export function ApiVisual() {
  const { ref, t } = useClock(9000, 8800, 40);
  const typed = REQUEST.slice(0, Math.floor(progress(t, 200, 2600) * REQUEST.length));
  const events = [
    { at: 3300, label: 'message.sent', color: 'text-white/60' },
    { at: 4100, label: 'message.delivered', color: 'text-brand-300' },
    { at: 5200, label: 'message.read', color: 'text-sky-300' },
  ].filter((e) => t >= e.at);
  return (
    <div ref={ref}>
      <Frame dark title="Send a template" right={<span className="font-mono text-[10.5px] text-white/40">REST · v1</span>}>
        <pre className="min-h-[10.5rem] overflow-hidden whitespace-pre-wrap break-all px-4 py-3 font-mono text-[11.5px] leading-relaxed text-[#C9F7D6]">
          {typed}
          {t < 2700 && <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-brand-400" />}
        </pre>
        <div className="border-t border-white/10 px-4 py-3 font-mono text-[11.5px]">
          <AnimatePresence>
            {t >= 2900 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-white/80">
                <span className="rounded bg-brand-500/20 px-1.5 py-0.5 text-brand-300">200 OK</span>{' '}
                {'{ "id": "wamid.HBgM…", "status": "accepted" }'}
              </motion.div>
            )}
          </AnimatePresence>
          <ul className="mt-2 space-y-1">
            <AnimatePresence>
              {events.map((e) => (
                <motion.li key={e.label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                  <span className="text-white/35">webhook →</span>
                  <span className={e.color}>{e.label}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </Frame>
      {/* phone notification */}
      <AnimatePresence>
        {t >= 3600 && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 -mt-6 ml-auto mr-4 w-[17rem] rounded-2xl border border-border bg-card p-3 shadow-lift sm:-mt-10 sm:mr-[-1rem]"
          >
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <BrandIcon slug="whatsapp" className="h-3.5 w-3.5" /> WhatsApp · now
            </div>
            <p className="mt-1 text-[12.5px] font-semibold">Hearth &amp; Loom</p>
            <p className="text-[12px] text-ink-600">Hi Rahul, your order #1042 has shipped 🚚 Track it here.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Ads: Instagram ad → tap → WhatsApp chat ---------- */

export function AdsVisual() {
  const { ref, t } = useClock(9000, 8800);
  const tapped = t >= 2600;
  return (
    <div ref={ref} className="relative mx-auto grid max-w-lg items-center gap-4 sm:grid-cols-2">
      <motion.div animate={{ scale: tapped ? 0.96 : 1, opacity: tapped ? 0.75 : 1 }} className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <span className="h-7 w-7 rounded-full bg-[linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)] p-[2px]">
            <span className="block h-full w-full rounded-full bg-card" />
          </span>
          <div className="leading-tight">
            <p className="text-[12px] font-semibold">hearthandloom</p>
            <p className="text-[10.5px] text-muted-foreground">Sponsored</p>
          </div>
          <MoreHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
        </div>
        <div className="relative h-40 bg-[linear-gradient(160deg,#8A9A66,#4E5D37)]">
          <p className="absolute bottom-3 left-3 font-display text-xl font-bold leading-tight text-white">
            Festive edit
            <br />
            20% off
          </p>
        </div>
        <div className="relative m-2 flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#25D366] py-2 text-[12.5px] font-semibold text-white">
          <BrandIcon slug="whatsapp" color="#fff" className="h-3.5 w-3.5" /> Send WhatsApp message
          {t >= 2200 && t < 2700 && (
            <motion.span initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 5, opacity: 0 }} className="absolute h-8 w-8 rounded-full bg-white/60" />
          )}
        </div>
        <div className="flex gap-3 px-3 pb-3 text-muted-foreground">
          <Heart className="h-4 w-4" />
          <MessageCircle className="h-4 w-4" />
          <Send className="h-4 w-4" />
          <span className="ml-auto flex items-center gap-1 text-[10.5px]">
            <BrandIcon slug="meta" className="h-3 w-3" /> Meta ads
          </span>
        </div>
      </motion.div>
      <div className="min-h-[15rem] rounded-3xl border border-border bg-[#EFEAE2] p-3 shadow-lift">
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#0B5D3B]">
          <BrandIcon slug="whatsapp" className="h-3.5 w-3.5" /> Chat opened from ad
        </p>
        <div className="space-y-1.5 text-[12px]">
          {[
            { at: 3000, me: true, text: 'Hi! I saw the festive edit ad 👋' },
            { at: 3900, me: false, text: 'Welcome! What are you shopping for today?' },
            { at: 4600, me: false, chips: ['Kurtas', 'Sarees', 'Home'] },
            { at: 5800, me: true, text: 'Kurtas' },
          ]
            .filter((m) => t >= m.at)
            .map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn('flex', m.me ? 'justify-end' : 'justify-start')}>
                {m.chips ? (
                  <div className="flex flex-wrap gap-1">
                    {m.chips.map((c) => (
                      <span key={c} className="rounded-full border border-[#027EB5]/30 bg-white px-2 py-0.5 text-[11px] font-medium text-[#027EB5]">
                        {c}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className={cn('max-w-[85%] rounded-xl px-2.5 py-1.5 shadow-sm', m.me ? 'rounded-tr-sm bg-[#D9FDD3]' : 'rounded-tl-sm bg-white')}>{m.text}</span>
                )}
              </motion.div>
            ))}
        </div>
        <AnimatePresence>
          {t >= 6600 && (
            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10.5px] font-semibold text-brand-800 shadow-sm">
              <Check className="h-3 w-3" /> Lead tagged “Festive ad” · assigned to Sales
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Forms: native form sheet filling in ---------- */

export function FormsVisual() {
  const { ref, t } = useClock(9500, 9300, 40);
  const name = 'Ayesha Patel'.slice(0, Math.floor(progress(t, 1200, 2200) * 12));
  const email = 'ayesha@mail.com'.slice(0, Math.floor(progress(t, 2600, 3700) * 15));
  const picked = t >= 4400;
  const done = t >= 5600;
  return (
    <div ref={ref} className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-[2.2rem] border-[9px] border-forest bg-[#EFEAE2] shadow-lift">
      <div className="bg-[#0B5D3B] px-4 py-3 text-[13px] font-semibold text-white">Hearth &amp; Loom</div>
      <div className="relative h-[24rem] p-3">
        <div className="flex justify-start">
          <span className="rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[12px] shadow-sm">Get early access to our festive sale 🎉</span>
        </div>
        <motion.div
          initial={false}
          animate={{ y: t >= 600 && !done ? '0%' : '105%' }}
          transition={{ type: 'spring', stiffness: 240, damping: 30 }}
          className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.12)]"
        >
          <span className="mx-auto mb-3 block h-1 w-9 rounded-full bg-black/15" />
          <p className="text-[14px] font-semibold">Join the early-access list</p>
          <div className="mt-3 space-y-2.5 text-[12px]">
            <Field label="Name" value={name} active={t >= 1100 && t < 2300} />
            <Field label="Email" value={email} active={t >= 2500 && t < 3800} />
            <div>
              <p className="mb-1 text-[11px] text-black/50">Interested in</p>
              <div className="flex gap-1.5">
                {['Kurtas', 'Sarees', 'Home'].map((c, i) => (
                  <span
                    key={c}
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors duration-300',
                      picked && i === 0 ? 'border-[#0B5D3B] bg-[#0B5D3B] text-white' : 'border-black/10'
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className={cn('mt-4 rounded-full py-2.5 text-center text-[13px] font-semibold text-white transition-colors', t >= 5000 ? 'bg-[#0B5D3B]' : 'bg-[#0B5D3B]/40')}>
            Submit
          </div>
          <p className="mt-2 text-center text-[10px] text-black/40">Managed by the business</p>
        </motion.div>
        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-x-3 bottom-4 space-y-1.5">
              <div className="flex justify-end">
                <span className="rounded-xl rounded-tr-sm bg-[#D9FDD3] px-2.5 py-1.5 text-[12px] shadow-sm">
                  ✅ Form submitted <CheckCheck className="ml-1 inline h-3.5 w-3.5 text-[#53BDEB]" />
                </span>
              </div>
              <span className="mx-auto flex w-fit items-center gap-1.5 rounded-lg bg-[#FFF5C4] px-2.5 py-1 text-[10.5px] text-[#54656F]">
                <BrandIcon slug="googlesheets" className="h-3 w-3" /> Row added to “Early access”
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div>
      <p className="mb-1 text-[11px] text-black/50">{label}</p>
      <div className={cn('h-9 rounded-lg border px-3 leading-9 transition-colors', active ? 'border-[#0B5D3B] ring-2 ring-[#0B5D3B]/15' : 'border-black/10')}>
        {value}
        {active && <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 animate-pulse bg-[#0B5D3B]" />}
      </div>
    </div>
  );
}

/* ---------- Email: free-tier meter + delivery log ---------- */

export function EmailVisual() {
  const { ref, t } = useClock(10000, 9800);
  const sent = Math.round(progress(t, 300, 8000) * 214);
  const log = [
    { at: 900, to: 'rahul@…', subj: 'Your invoice #INV-1042', status: 'Delivered' },
    { at: 2100, to: 'sana@…', subj: 'Verify your email', status: 'Delivered' },
    { at: 3300, to: 'imran@…', subj: 'Payment received', status: 'Opened' },
    { at: 4500, to: 'neha@…', subj: 'Your booking is confirmed', status: 'Delivered' },
    { at: 5700, to: 'old@…', subj: 'Password reset', status: 'Bounced' },
  ].filter((l) => t >= l.at);
  return (
    <div ref={ref}>
      <Frame title="Email API" right={<span className="flex items-center gap-1 text-[11px] text-muted-foreground"><BadgeCheck className="h-3.5 w-3.5 text-brand-600" /> mail.yourbrand.com</span>}>
        <div className="grid gap-3 p-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-border p-4">
            <p className="text-[11px] text-muted-foreground">Free today</p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums">
              {sent}
              <span className="text-base font-semibold text-muted-foreground"> / 300</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-lime-300" style={{ width: `${(sent / 300) * 100}%` }} />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Then ₹0.125 per email</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['DKIM', 'SPF', 'DMARC'].map((k) => (
                <span key={k} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-brand-800">
                  <Check className="h-3 w-3" /> {k}
                </span>
              ))}
            </div>
          </div>
          <ul className="space-y-1.5">
            <AnimatePresence initial={false}>
              {log.map((l) => (
                <motion.li key={l.subj} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2.5 rounded-xl border border-border px-3 py-2">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12px] font-medium">{l.subj}</span>
                    <span className="block text-[10.5px] text-muted-foreground">{l.to}</span>
                  </span>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold',
                      l.status === 'Bounced' ? 'bg-red-50 text-red-700' : l.status === 'Opened' ? 'bg-sky-50 text-sky-700' : 'bg-brand-50 text-brand-800'
                    )}
                  >
                    {l.status}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </Frame>
    </div>
  );
}

/* ---------- Journey: contacts moving through a sequence ---------- */

const journey = [
  { icon: ShoppingCart, title: 'Cart abandoned', detail: 'Shopify event', tone: 'bg-amber-50 text-amber-700' },
  { icon: Clock3, title: 'Wait 30 minutes', detail: 'Delay', tone: 'bg-slate-100 text-slate-600' },
  { icon: MessageCircle, title: 'WhatsApp reminder', detail: 'Template · cart_reminder', tone: 'bg-brand-50 text-brand-700' },
  { icon: Clock3, title: 'Not purchased in 1 day?', detail: 'Condition', tone: 'bg-sky-50 text-sky-700' },
  { icon: Mail, title: 'Email with 10% code', detail: 'Email API', tone: 'bg-violet-50 text-violet-700' },
];

export function JourneyVisual() {
  const { ref, t } = useClock(9000, 8800);
  const active = Math.min(journey.length - 1, Math.floor(progress(t, 300, 7200) * journey.length));
  const counts = [128, 128, 127, 41, 39];
  return (
    <div ref={ref}>
      <Frame title="Abandoned cart · Journey" right={<span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-brand-800">Active</span>}>
        <ol className="relative space-y-2.5 p-4">
          <span aria-hidden className="absolute bottom-8 left-[2.15rem] top-8 w-px bg-border" />
          <motion.span
            aria-hidden
            className="absolute left-[2.15rem] top-8 w-px origin-top bg-brand-600"
            animate={{ height: `calc(${(active / (journey.length - 1)) * 100}% - 4rem)` }}
            transition={{ duration: 0.6 }}
          />
          {journey.map((s, i) => (
            <li key={s.title} className="relative flex items-center gap-3">
              <span className={cn('relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-4 ring-card transition-transform duration-300', s.tone, i === active && 'scale-110')}>
                <s.icon className="h-4 w-4" />
              </span>
              <div
                className={cn(
                  'flex flex-1 items-center justify-between rounded-xl border px-3 py-2 transition-all duration-300',
                  i === active ? 'border-brand-300 shadow-[0_0_0_3px_rgba(74,222,128,0.15)]' : 'border-border',
                  i > active && 'opacity-50'
                )}
              >
                <span className="leading-tight">
                  <span className="block text-[12.5px] font-semibold">{s.title}</span>
                  <span className="block text-[10.5px] text-muted-foreground">{s.detail}</span>
                </span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{i <= active ? counts[i] : '—'}</span>
              </div>
            </li>
          ))}
        </ol>
        <AnimatePresence>
          {t >= 7600 && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mx-4 mb-4 rounded-xl bg-brand-50 px-3 py-2 text-[12px] font-semibold text-brand-800">
              89 carts recovered this week
            </motion.p>
          )}
        </AnimatePresence>
      </Frame>
    </div>
  );
}

/* ---------- Analytics: bars and a line drawing in ---------- */

const bars = [42, 58, 51, 66, 72, 61, 84];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function AnalyticsVisual() {
  const { ref, t } = useClock(9000, 8800);
  const p = progress(t, 200, 2400);
  const kpis = [
    { label: 'Delivered', value: 97.2 },
    { label: 'Read', value: 81.4 },
    { label: 'Clicked', value: 24.1 },
  ];
  const line = bars.map((b, i) => `${(i / (bars.length - 1)) * 300},${120 - b * 1.2}`).join(' ');
  return (
    <div ref={ref}>
      <Frame title="Campaign performance" right={<span className="text-[11px] text-muted-foreground">Last 7 days</span>}>
        <div className="grid grid-cols-3 gap-2 p-4 pb-0">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-border p-3">
              <p className="text-[10.5px] text-muted-foreground">{k.label}</p>
              <p className="font-display text-xl font-bold tabular-nums">{(k.value * p).toFixed(1)}%</p>
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="relative h-36">
            <div className="absolute inset-0 flex items-end gap-2.5">
              {bars.map((b, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-300"
                    style={{ height: `${b * progress(t, 200 + i * 120, 1200 + i * 120)}%` }}
                  />
                </div>
              ))}
            </div>
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <motion.polyline
                key={Math.floor(t / 9000)}
                points={line}
                fill="none"
                stroke="#0d9488"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: t >= 1400 ? 1 : 0 }}
                transition={{ duration: 1.2 }}
              />
            </svg>
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            {days.map((d) => (
              <span key={d} className="flex-1 text-center">
                {d}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2 text-[11.5px]">
            <Star className="h-3.5 w-3.5 text-amber-500" /> Variant B outperformed A by <b>+18%</b> clicks
          </div>
        </div>
      </Frame>
    </div>
  );
}
