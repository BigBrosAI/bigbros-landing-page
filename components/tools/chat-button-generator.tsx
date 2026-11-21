"use client";

import { useState } from 'react';
import { BrandIcon } from '@/components/landing/brand-icon';
import { CopyButton, PhoneFields, inputCls, labelCls, panelCls } from '@/components/tools/shared';
import { waLink } from '@/lib/tools';
import { cn } from '@/lib/utils';

const WA_PATH =
  'M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.7 12.7-12.6S23 3 16 3zm0 23.2c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 01-1.6-5.5C5.3 9.8 10.1 5 16 5s10.6 4.8 10.6 10.6S21.9 26.2 16 26.2zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z';

export function ChatButtonGenerator() {
  const [cc, setCc] = useState('91');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('Hi! I have a question.');
  const [label, setLabel] = useState('Chat with us');
  const [color, setColor] = useState('#25D366');
  const [side, setSide] = useState<'right' | 'left'>('right');
  const valid = number.replace(/\D/g, '').length >= 6;
  const link = valid ? waLink(cc, number, message) : 'https://wa.me/91XXXXXXXXXX';

  const snippet = `<!-- WhatsApp chat button · generated at bigbrosai.com/tools -->
<a href="${link}" target="_blank" rel="noopener" aria-label="${label || 'Chat on WhatsApp'}"
  style="position:fixed;${side}:20px;bottom:20px;z-index:9999;display:flex;align-items:center;gap:8px;padding:12px ${label ? '18px' : '12px'} 12px 12px;border-radius:999px;background:${color};color:#fff;font:600 15px/1 system-ui,sans-serif;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.2)">
  <svg width="26" height="26" viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="${WA_PATH}"/></svg>${label ? `\n  <span>${label}</span>` : ''}
</a>`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 [&>*]:min-w-0">
      <div className={`${panelCls} space-y-5`}>
        <PhoneFields cc={cc} setCc={setCc} number={number} setNumber={setNumber} />
        <label className="block">
          <span className={labelCls}>Greeting customers will send</span>
          <input value={message} onChange={(e) => setMessage(e.target.value)} className={inputCls} />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Button label (blank = icon only)</span>
            <input value={label} onChange={(e) => setLabel(e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Colour</span>
            <span className="flex h-11 items-center gap-3 rounded-xl border border-input px-3">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-7 w-9 cursor-pointer border-0 bg-transparent p-0" />
              <span className="font-mono text-sm">{color}</span>
            </span>
          </label>
        </div>
        <div>
          <span className={labelCls}>Position</span>
          <div className="flex gap-2">
            {(['right', 'left'] as const).map((s) => (
              <button key={s} type="button" onClick={() => setSide(s)} className={cn('h-10 rounded-full border px-4 text-sm font-semibold capitalize', side === s ? 'border-brand-600 bg-brand-50 text-brand-800' : 'border-input')}>
                Bottom {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className={`${panelCls} bg-grain relative h-56 overflow-hidden`}>
          <p className="text-sm font-semibold text-muted-foreground">Live preview</p>
          <a
            href={valid ? link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 flex items-center gap-2 rounded-full py-3 pl-3 text-[15px] font-semibold text-white shadow-lg"
            style={{ [side]: 20, background: color, paddingRight: label ? 18 : 12 }}
          >
            <BrandIcon slug="whatsapp" color="#fff" className="h-6 w-6" />
            {label && <span>{label}</span>}
          </a>
        </div>
        <div className={panelCls}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Paste before &lt;/body&gt;</p>
            <CopyButton text={snippet} label="Copy code" className="h-9 px-4" />
          </div>
          <pre className="max-h-56 overflow-auto rounded-xl bg-[#0D1B16] p-4 font-mono text-[12px] leading-relaxed text-[#C9F7D6]">{snippet}</pre>
          {!valid && <p className="mt-2 text-[13px] text-amber-700">Enter your number to put it in the code.</p>}
        </div>
      </div>
    </div>
  );
}
