"use client";

import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { CopyButton, download, inputCls, labelCls, panelCls } from '@/components/tools/shared';
import { countryCodes, normalizeNumber } from '@/lib/tools';

export function NumberCleaner() {
  const [cc, setCc] = useState('91');
  const [plus, setPlus] = useState(true);
  const [input, setInput] = useState('98765 43210\n+91-91234-56789\n09876543210\n919876543210\n12345\n(080) 2345 6789\nrahul: 7012345678');

  const res = useMemo(() => {
    const seen = new Set<string>();
    const valid: string[] = [];
    const invalid: string[] = [];
    let dupes = 0;
    input
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((s) => {
        const n = normalizeNumber(s.replace(/^[^\d+(]+/, ''), cc);
        if (!n) invalid.push(s);
        else if (seen.has(n)) dupes++;
        else {
          seen.add(n);
          valid.push(n);
        }
      });
    return { valid, invalid, dupes };
  }, [input, cc]);

  const out = res.valid.map((n) => (plus ? `+${n}` : n));
  const csv = ['phone', ...out].join('\n');

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 [&>*]:min-w-0">
      <div className={`${panelCls} space-y-5`}>
        <label className="block">
          <span className={labelCls}>Paste your numbers (any format, one per line or comma-separated)</span>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className={`${inputCls} h-auto resize-y py-3 font-mono text-[14px]`} />
        </label>
        <div className="flex flex-wrap items-end gap-4">
          <label className="block flex-1">
            <span className={labelCls}>Default country code</span>
            <select value={cc} onChange={(e) => setCc(e.target.value)} className={inputCls}>
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </label>
          <label className="flex h-11 items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={plus} onChange={(e) => setPlus(e.target.checked)} className="h-4 w-4 accent-[hsl(var(--primary))]" /> Add “+” prefix
          </label>
        </div>
      </div>
      <div className={panelCls}>
        <dl className="grid grid-cols-3 gap-3 text-center">
          {[
            { k: 'Valid', v: res.valid.length, c: 'text-brand-700' },
            { k: 'Duplicates removed', v: res.dupes, c: 'text-ink-600' },
            { k: 'Invalid', v: res.invalid.length, c: 'text-amber-700' },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-muted/50 p-3">
              <dd className={`font-display text-2xl font-bold ${s.c}`}>{s.v}</dd>
              <dt className="text-[12px] text-muted-foreground">{s.k}</dt>
            </div>
          ))}
        </dl>
        <textarea readOnly aria-label="Cleaned numbers" value={out.join('\n')} rows={7} className={`${inputCls} mt-5 h-auto resize-y py-3 font-mono text-[14px]`} />
        {res.invalid.length > 0 && <p className="mt-2 break-words text-[13px] text-amber-700">Skipped: {res.invalid.join(', ')}</p>}
        <div className="mt-5 flex flex-wrap gap-3">
          <CopyButton text={out.join('\n')} label="Copy numbers" />
          <button type="button" disabled={!out.length} onClick={() => download(`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`, 'whatsapp-contacts.csv')} className="inline-flex h-11 items-center gap-2 rounded-full border border-input bg-card px-5 text-sm font-semibold disabled:opacity-50">
            <Download className="h-4 w-4" /> Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}
