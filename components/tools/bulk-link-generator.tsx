"use client";

import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { CopyButton, download, inputCls, labelCls, panelCls } from '@/components/tools/shared';
import { countryCodes, normalizeNumber } from '@/lib/tools';

const csvCell = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);

export function BulkLinkGenerator() {
  const [cc, setCc] = useState('91');
  const [rows, setRows] = useState('Priya, 98765 43210\nRahul, +91 91234 56789\nAnita, 080-2345 6789');
  const [message, setMessage] = useState('Hi {name}, your order is ready for pickup! 🎉');

  const links = useMemo(
    () =>
      rows
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => {
          const parts = l.split(/[,\t;]/).map((p) => p.trim());
          const numPart = parts.find((p) => /\d{6,}/.test(p.replace(/\D/g, ''))) ?? '';
          const name = parts.find((p) => p !== numPart) ?? '';
          const n = normalizeNumber(numPart, cc);
          const text = message.replace(/\{name\}/gi, name || 'there');
          return { name, input: numPart || l, number: n, link: n ? `https://wa.me/${n}${text.trim() ? `?text=${encodeURIComponent(text)}` : ''}` : '' };
        }),
    [rows, message, cc],
  );
  const ok = links.filter((l) => l.link);
  const csv = ['name,number,link', ...ok.map((l) => [l.name, l.number, l.link].map(csvCell).join(','))].join('\n');

  return (
    <div className="space-y-6">
      <div className={`${panelCls} grid gap-5 lg:grid-cols-2`}>
        <label className="block">
          <span className={labelCls}>Contacts — one per line (name, number)</span>
          <textarea value={rows} onChange={(e) => setRows(e.target.value)} rows={7} className={`${inputCls} h-auto resize-y py-3 font-mono text-[14px]`} />
        </label>
        <div className="space-y-5">
          <label className="block">
            <span className={labelCls}>Default country code</span>
            <select value={cc} onChange={(e) => setCc(e.target.value)} className={inputCls}>
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Message — use {'{name}'} to personalise</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={`${inputCls} h-auto resize-y py-3`} />
          </label>
        </div>
      </div>
      <div className={panelCls}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">
            {ok.length} link{ok.length === 1 ? '' : 's'} ready{links.length > ok.length && <span className="font-normal text-amber-700"> · {links.length - ok.length} invalid</span>}
          </p>
          <div className="flex flex-wrap gap-2">
            <CopyButton text={ok.map((l) => l.link).join('\n')} label="Copy all links" />
            <button type="button" disabled={!ok.length} onClick={() => download(`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`, 'whatsapp-links.csv')} className="inline-flex h-11 items-center gap-2 rounded-full border border-input bg-card px-5 text-sm font-semibold disabled:opacity-50">
              <Download className="h-4 w-4" /> Download CSV
            </button>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead className="bg-muted/60 text-[12px] uppercase tracking-wide text-muted-foreground">
              <tr><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Number</th><th className="px-4 py-2.5">Link</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {links.map((l, i) => (
                <tr key={i}>
                  <td className="px-4 py-2.5">{l.name || '—'}</td>
                  <td className="px-4 py-2.5 font-mono">{l.number ? `+${l.number}` : <span className="text-amber-700">Invalid: {l.input}</span>}</td>
                  <td className="max-w-[320px] truncate px-4 py-2.5">
                    {l.link ? <a href={l.link} target="_blank" rel="noopener noreferrer" className="font-mono text-brand-800 hover:underline">{l.link}</a> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
