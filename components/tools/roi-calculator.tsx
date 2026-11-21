"use client";

import { useState } from 'react';
import { inputCls, labelCls, panelCls } from '@/components/tools/shared';
import { countryRates } from '@/lib/plans';

const fmt = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

function Slider({ label, value, set, min = 0, max = 100, step = 1, suffix = '%' }: { label: string; value: number; set: (n: number) => void; min?: number; max?: number; step?: number; suffix?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex justify-between text-sm font-medium">
        {label} <span className="tabular-nums text-brand-800">{value}{suffix}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
    </label>
  );
}

export function RoiCalculator() {
  const [market, setMarket] = useState('India');
  const [contacts, setContacts] = useState(5000);
  const [delivered, setDelivered] = useState(95);
  const [read, setRead] = useState(80);
  const [click, setClick] = useState(12);
  const [convert, setConvert] = useState(15);
  const [aov, setAov] = useState(1200);
  const rate = Number((countryRates.find((c) => c.market === market) ?? countryRates[0]).marketing);

  const nDelivered = contacts * (delivered / 100);
  const nRead = nDelivered * (read / 100);
  const nClick = nRead * (click / 100);
  const orders = nClick * (convert / 100);
  const revenue = orders * aov;
  const cost = nDelivered * rate;
  const roi = cost ? ((revenue - cost) / cost) * 100 : 0;

  const funnel = [
    { k: 'Delivered', v: nDelivered },
    { k: 'Read', v: nRead },
    { k: 'Clicked / replied', v: nClick },
    { k: 'Orders', v: orders },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
      <div className={`${panelCls} space-y-5`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Customer country</span>
            <select value={market} onChange={(e) => setMarket(e.target.value)} className={inputCls}>
              {countryRates.map((c) => (
                <option key={c.market} value={c.market}>{c.market} ({c.code})</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Contacts in broadcast</span>
            <input type="number" min={0} value={contacts} onChange={(e) => setContacts(Math.max(0, Number(e.target.value)))} className={inputCls} />
          </label>
        </div>
        <Slider label="Delivery rate" value={delivered} set={setDelivered} min={50} />
        <Slider label="Read rate" value={read} set={setRead} />
        <Slider label="Click / reply rate" value={click} set={setClick} max={60} />
        <Slider label="Conversion rate (of clicks)" value={convert} set={setConvert} max={60} />
        <label className="block">
          <span className={labelCls}>Average order value (₹)</span>
          <input type="number" min={0} value={aov} onChange={(e) => setAov(Math.max(0, Number(e.target.value)))} className={inputCls} />
        </label>
      </div>
      <div className="forest relative overflow-hidden rounded-[2rem] p-7 text-white">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-lime-300">Estimated campaign return</p>
        <p className="mt-3 font-display text-5xl font-bold tabular-nums">{roi >= 0 ? `${Math.round(roi).toLocaleString('en-IN')}%` : '—'}</p>
        <p className="text-sm text-white/60">ROI on message cost</p>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.06] p-4"><dt className="text-[12px] text-white/60">Revenue</dt><dd className="mt-1 text-xl font-bold tabular-nums">{fmt(revenue)}</dd></div>
          <div className="rounded-2xl bg-white/[0.06] p-4"><dt className="text-[12px] text-white/60">Message cost</dt><dd className="mt-1 text-xl font-bold tabular-nums">{fmt(cost)}</dd></div>
        </dl>
        <ul className="mt-6 space-y-2.5">
          {funnel.map((f) => (
            <li key={f.k}>
              <div className="flex justify-between text-[13px]"><span className="text-white/70">{f.k}</span><span className="tabular-nums">{Math.round(f.v).toLocaleString('en-IN')}</span></div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-lime-300 transition-[width] duration-500" style={{ width: `${contacts ? Math.max(1, (f.v / contacts) * 100) : 0}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[12px] leading-relaxed text-white/50">Uses Meta’s marketing rate for {market} (₹{rate.toFixed(4)} per delivered message). Estimates only — your results depend on your audience and offer.</p>
      </div>
    </div>
  );
}
