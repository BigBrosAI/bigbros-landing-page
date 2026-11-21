"use client";

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Check, Copy } from 'lucide-react';
import { countryCodes } from '@/lib/tools';
import { cn } from '@/lib/utils';

export const inputCls =
  'h-11 w-full rounded-xl border border-input bg-background px-3.5 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-500 focus:ring-4 focus:ring-brand-100';
export const labelCls = 'mb-1.5 block text-sm font-medium';
export const panelCls = 'rounded-[2rem] border border-border bg-card p-6 shadow-card sm:p-8';

export function PhoneFields({ cc, setCc, number, setNumber }: { cc: string; setCc: (v: string) => void; number: string; setNumber: (v: string) => void }) {
  return (
    <div>
      <span className={labelCls}>WhatsApp number</span>
      <div className="flex gap-2">
        <select aria-label="Country code" value={cc} onChange={(e) => setCc(e.target.value)} className={cn(inputCls, 'w-[9.5rem] shrink-0')}>
          {countryCodes.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <input aria-label="Phone number" inputMode="tel" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="98765 43210" className={inputCls} />
      </div>
    </div>
  );
}

export function CopyButton({ text, label = 'Copy', className }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      disabled={!text}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          /* clipboard blocked — user can still select the text */
        }
      }}
      className={cn('shine inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-800 disabled:opacity-50', className)}
    >
      {done ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {done ? 'Copied!' : label}
    </button>
  );
}

/** PNG data URL and SVG markup for a QR code of `text`. */
export function useQr(text: string, opts: { color?: string; size?: number } = {}) {
  const { color = '#0B2E23', size = 512 } = opts;
  const [png, setPng] = useState('');
  const [svg, setSvg] = useState('');
  useEffect(() => {
    let alive = true;
    if (!text) return;
    const o = { margin: 2, width: size, errorCorrectionLevel: 'M' as const, color: { dark: color, light: '#FFFFFF' } };
    Promise.all([QRCode.toDataURL(text, o), QRCode.toString(text, { ...o, type: 'svg' })])
      .then(([p, s]) => {
        if (alive) {
          setPng(p);
          setSvg(s);
        }
      })
      .catch(() => null);
    return () => {
      alive = false;
    };
  }, [text, color, size]);
  return text ? { png, svg } : { png: '', svg: '' };
}

export function download(href: string, filename: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
