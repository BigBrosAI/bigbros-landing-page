"use client";

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { countryRates } from '@/lib/plans';

export function CountryRates() {
  const [q, setQ] = useState('');
  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? countryRates.filter((r) => r.market.toLowerCase().includes(s) || r.code.includes(s)) : countryRates;
  }, [q]);
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold">Per-message rates by destination (INR)</p>
        <label className="relative block">
          <span className="sr-only">Search country</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a country or code"
            className="h-10 w-full rounded-full border border-input bg-background pl-9 pr-4 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 sm:w-64"
          />
        </label>
      </div>
      <div className="max-h-[28rem] overflow-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="sticky top-0 bg-card text-[11.5px] uppercase tracking-wide text-muted-foreground shadow-[0_1px_0_hsl(var(--border))]">
            <tr>
              <th className="px-4 py-3 font-semibold">Market</th>
              <th className="px-4 py-3 text-right font-semibold">Marketing</th>
              <th className="px-4 py-3 text-right font-semibold">Utility</th>
              <th className="px-4 py-3 text-right font-semibold">Authentication</th>
              <th className="px-4 py-3 text-right font-semibold">Auth (intl.)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.market} className="transition-colors hover:bg-muted/50">
                <td className="px-4 py-3">
                  <span className="font-medium">{r.market}</span> <span className="ml-1 font-mono text-[11px] text-muted-foreground">{r.code}</span>
                </td>
                {[r.marketing, r.utility, r.auth, r.authIntl].map((v, i) => (
                  <td key={i} className="px-4 py-3 text-right font-mono tabular-nums text-ink-600">
                    {v === '—' ? '—' : `₹${v}`}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No match — the “Other” default rate applies.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
