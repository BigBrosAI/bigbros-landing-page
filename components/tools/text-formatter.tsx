"use client";

import { useRef, useState } from 'react';
import { Bold, Code, Italic, List, ListOrdered, Quote, Strikethrough } from 'lucide-react';
import { CopyButton, inputCls, panelCls } from '@/components/tools/shared';
import { renderWhatsApp } from '@/lib/whatsapp-format';

const actions = [
  { icon: Bold, label: 'Bold', wrap: '*' },
  { icon: Italic, label: 'Italic', wrap: '_' },
  { icon: Strikethrough, label: 'Strikethrough', wrap: '~' },
  { icon: Code, label: 'Monospace', wrap: '```' },
] as const;
const lineActions = [
  { icon: List, label: 'Bulleted list', prefix: '- ' },
  { icon: ListOrdered, label: 'Numbered list', prefix: '1. ' },
  { icon: Quote, label: 'Quote', prefix: '> ' },
] as const;


export function TextFormatter() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('*Diwali sale is live!* 🪔\n\nGet _20% off_ everything until Sunday.\n- Free delivery\n- Cash on delivery\n\nUse code ```DIWALI20``` at checkout. ~Limited~ stock!');

  const apply = (fn: (sel: string) => string) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    const next = text.slice(0, a) + fn(text.slice(a, b) || 'text') + text.slice(b);
    setText(next);
    requestAnimationFrame(() => el.focus());
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 [&>*]:min-w-0">
      <div className={panelCls}>
        <div className="mb-3 flex flex-wrap gap-1.5" role="toolbar" aria-label="Formatting">
          {actions.map((a) => (
            <button key={a.label} type="button" title={a.label} aria-label={a.label} onClick={() => apply((s) => `${a.wrap}${s}${a.wrap}`)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background hover:border-brand-300 hover:bg-brand-50">
              <a.icon className="h-4 w-4" />
            </button>
          ))}
          <span className="mx-1 w-px bg-border" />
          {lineActions.map((a) => (
            <button
              key={a.label}
              type="button"
              title={a.label}
              aria-label={a.label}
              onClick={() =>
                apply((s) =>
                  s
                    .split('\n')
                    .map((l, i) => (a.prefix === '1. ' ? `${i + 1}. ${l}` : `${a.prefix}${l}`))
                    .join('\n')
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background hover:border-brand-300 hover:bg-brand-50"
            >
              <a.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        <textarea ref={ref} value={text} onChange={(e) => setText(e.target.value)} rows={11} className={`${inputCls} h-auto resize-y py-3 font-mono text-[14px]`} aria-label="Message text" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">{text.length} characters</span>
          <CopyButton text={text} label="Copy text" />
        </div>
      </div>
      <div className={panelCls}>
        <p className="mb-3 text-sm font-semibold text-muted-foreground">WhatsApp preview</p>
        <div className="rounded-2xl bg-[#EFE7DD] p-4">
          <div
            className="ml-auto max-w-[88%] whitespace-normal break-words rounded-xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2 text-[15px] leading-snug text-[#111B21] shadow-sm"
            dangerouslySetInnerHTML={{ __html: renderWhatsApp(text) }}
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-[13px] text-ink-600">
          <span><code className="font-mono">*bold*</code> → <b>bold</b></span>
          <span><code className="font-mono">_italic_</code> → <i>italic</i></span>
          <span><code className="font-mono">~strike~</code> → <s>strike</s></span>
          <span><code className="font-mono">```mono```</code> → <code className="font-mono">mono</code></span>
        </div>
      </div>
    </div>
  );
}
