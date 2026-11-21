"use client";

import { useMemo, useState } from 'react';
import { countryRates, inr, plans } from '@/lib/plans';
import { inputCls, labelCls, panelCls } from '@/components/tools/shared';

const num = (v: string) => Math.max(0, Math.floor(Number(v.replace(/[^\d]/g, '')) || 0));

export function PricingCalculator() {
  const [market, setMarket] = useState('India');
  const [mk, setMk] = useState('5000');
  const [ut, setUt] = useState('2000');
  const [au, setAu] = useState('1000');
  const [plan, setPlan] = useState('basic');
  const r = countryRates.find((c) => c.market === market) ?? countryRates[0];
  const rate = (v: string) => (v === '—' ? 0 : Number(v));
  const rows = useMemo(
    () => [
      { label: 'Marketing', count: num(mk), rate: rate(r.marketing) },
      { label: 'Utility', count: num(ut), rate: rate(r.utility) },
      { label: 'Authentication', count: num(au), rate: rate(r.auth) },
    ],
    [mk, ut, au, r]
  );
  const messages = rows.reduce((a, b) => a + b.count * b.rate, 0);
  const p = plans.find((x) => x.id === plan);
  const planCost = p?.monthly ?? 0;
  const total = messages + planCost;
  const fmt = (n: number) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
      <div className={`${panelCls} space-y-5`}>
        <label className="block">
          <span className={labelCls}>Where are your customers?</span>
          <select value={market} onChange={(e) => setMarket(e.target.value)} className={inputCls}>
            {countryRates.map((c) => (
              <option key={c.market} value={c.market}>
                {c.market} {c.code.startsWith('+') ? `(${c.code})` : ''}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            ['Marketing / month', mk, setMk, r.marketing],
            ['Utility / month', ut, setUt, r.utility],
            ['Authentication / month', au, setAu, r.auth],
          ].map(([l, v, set, rt]) => (
            <label key={l as string} className="block">
              <span className={labelCls}>{l as string}</span>
              <input inputMode="numeric" value={v as string} onChange={(e) => (set as (x: string) => void)(e.target.value)} className={inputCls} />
              <span className="mt-1 block text-xs text-muted-foreground">{rt === '—' ? 'Not available' : `₹${rt} each`}</span>
            </label>
          ))}
        </div>
        <label className="block">
          <span className={labelCls}>BigBrosAI plan</span>
          <select value={plan} onChange={(e) => setPlan(e.target.value)} className={inputCls}>
            {plans
              .filter((x) => x.monthly !== null)
              .map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name} — {x.monthly === 0 ? 'Free' : `${inr(x.monthly!)}/month`}
                </option>
              ))}
          </select>
        </label>
        <p className="text-[13px] text-muted-foreground">Replies inside the 24-hour customer service window are free and aren’t included here.</p>
      </div>
      <div className="rounded-[2rem] bg-forest p-6 text-white shadow-lift sm:p-8">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-lime-300">Estimated monthly cost</p>
        <p className="mt-3 font-display text-5xl font-bold tracking-tight">{fmt(total)}</p>
        <dl className="mt-6 divide-y divide-white/10 text-[15px]">
          {rows.map((x) => (
            <div key={x.label} className="flex justify-between py-2.5">
              <dt className="text-white/70">
                {x.label} · {x.count.toLocaleString('en-IN')} × ₹{x.rate}
              </dt>
              <dd className="font-semibold">{fmt(x.count * x.rate)}</dd>
            </div>
          ))}
          <div className="flex justify-between py-2.5">
            <dt className="text-white/70">{p?.name} plan</dt>
            <dd className="font-semibold">{fmt(planCost)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-[13px] text-white/55">Message charges are Meta’s rates for {r.market}, passed through without markup. Estimates exclude taxes.</p>
      </div>
    </div>
  );
}
