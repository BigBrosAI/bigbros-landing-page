"use client";

import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, Plus, Reply, X } from 'lucide-react';
import { CopyButton, inputCls, labelCls, panelCls } from '@/components/tools/shared';
import { renderWhatsApp } from '@/lib/whatsapp-format';
import { cn } from '@/lib/utils';

const LIMITS = { header: 60, body: 1024, footer: 60, button: 25 };
type Btn = { kind: 'reply' | 'url'; text: string };

function Counter({ n, max }: { n: number; max: number }) {
  return <span className={cn('text-[12px] tabular-nums', n > max ? 'font-semibold text-red-600' : 'text-muted-foreground')}>{n}/{max}</span>;
}

export function TemplateBuilder() {
  const [category, setCategory] = useState('MARKETING');
  const [header, setHeader] = useState('Diwali Sale 🪔');
  const [body, setBody] = useState('Hi {{1}}, our Diwali sale is live! Get *{{2}} off* on everything until Sunday. Use code DIWALI at checkout.');
  const [footer, setFooter] = useState('Reply STOP to opt out');
  const [buttons, setButtons] = useState<Btn[]>([{ kind: 'url', text: 'Shop now' }, { kind: 'reply', text: 'Not interested' }]);
  const vars = useMemo(() => Array.from(new Set((body.match(/\{\{\s*(\d+)\s*\}\}/g) ?? []).map((v) => Number(v.replace(/\D/g, ''))))).sort((a, b) => a - b), [body]);
  const [samples, setSamples] = useState<Record<number, string>>({ 1: 'Priya', 2: '20%' });

  const issues = useMemo(() => {
    const out: string[] = [];
    if (header.length > LIMITS.header) out.push(`Header is over ${LIMITS.header} characters.`);
    if (!body.trim()) out.push('Body text is required.');
    if (body.length > LIMITS.body) out.push(`Body is over ${LIMITS.body} characters.`);
    if (footer.length > LIMITS.footer) out.push(`Footer is over ${LIMITS.footer} characters.`);
    vars.forEach((v, i) => v !== i + 1 && out.push(`Variables must be numbered in order: {{${i + 1}}} is missing.`));
    if (/^\s*\{\{/.test(body) || /\}\}[\s.!?]*$/.test(body)) out.push('Body can’t start or end with a variable — add text around it.');
    if (/\}\}\s*\{\{/.test(body)) out.push('Two variables sit next to each other — put words between them.');
    const words = body.replace(/\{\{\d+\}\}/g, '').trim().split(/\s+/).filter(Boolean).length;
    if (vars.length && words < vars.length * 3) out.push('Too many variables for the amount of text — Meta may reject it.');
    if (/\n{3,}/.test(body)) out.push('Avoid more than two line breaks in a row.');
    buttons.forEach((b, i) => b.text.length > LIMITS.button && out.push(`Button ${i + 1} is over ${LIMITS.button} characters.`));
    if (category === 'MARKETING' && !/stop|opt.?out|unsubscribe/i.test(body + footer + buttons.map((b) => b.text).join(' ')))
      out.push('Tip: marketing templates do better with an opt-out (e.g. “Reply STOP to opt out”).');
    return Array.from(new Set(out));
  }, [header, body, footer, buttons, vars, category]);

  const filled = body.replace(/\{\{\s*(\d+)\s*\}\}/g, (_, n) => samples[Number(n)] || `{{${n}}}`);
  const json = JSON.stringify(
    {
      category,
      components: [
        ...(header ? [{ type: 'HEADER', format: 'TEXT', text: header }] : []),
        { type: 'BODY', text: body, ...(vars.length ? { example: { body_text: [vars.map((v) => samples[v] || `sample${v}`)] } } : {}) },
        ...(footer ? [{ type: 'FOOTER', text: footer }] : []),
        ...(buttons.length ? [{ type: 'BUTTONS', buttons: buttons.map((b) => (b.kind === 'url' ? { type: 'URL', text: b.text, url: 'https://example.com' } : { type: 'QUICK_REPLY', text: b.text })) }] : []),
      ],
    },
    null,
    2,
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
      <div className={cn(panelCls, 'space-y-5')}>
        <label className="block">
          <span className={labelCls}>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            <option value="MARKETING">Marketing</option>
            <option value="UTILITY">Utility</option>
            <option value="AUTHENTICATION">Authentication</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 flex justify-between text-sm font-medium">Header (optional) <Counter n={header.length} max={LIMITS.header} /></span>
          <input value={header} onChange={(e) => setHeader(e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 flex justify-between text-sm font-medium">Body <Counter n={body.length} max={LIMITS.body} /></span>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} className={`${inputCls} h-auto resize-y py-3`} />
          <button type="button" onClick={() => setBody((b) => `${b} {{${vars.length + 1}}}`)} className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-800">
            <Plus className="h-3.5 w-3.5" /> Add variable {`{{${vars.length + 1}}}`}
          </button>
        </label>
        {vars.length > 0 && (
          <div>
            <span className={labelCls}>Sample values</span>
            <div className="grid grid-cols-2 gap-2">
              {vars.map((v) => (
                <input key={v} aria-label={`Sample for {{${v}}}`} placeholder={`{{${v}}}`} value={samples[v] ?? ''} onChange={(e) => setSamples((s) => ({ ...s, [v]: e.target.value }))} className={inputCls} />
              ))}
            </div>
          </div>
        )}
        <label className="block">
          <span className="mb-1.5 flex justify-between text-sm font-medium">Footer (optional) <Counter n={footer.length} max={LIMITS.footer} /></span>
          <input value={footer} onChange={(e) => setFooter(e.target.value)} className={inputCls} />
        </label>
        <div>
          <span className={labelCls}>Buttons (up to 3)</span>
          <div className="space-y-2">
            {buttons.map((b, i) => (
              <div key={i} className="flex gap-2">
                <select aria-label="Button type" value={b.kind} onChange={(e) => setButtons((bs) => bs.map((x, j) => (j === i ? { ...x, kind: e.target.value as Btn['kind'] } : x)))} className={cn(inputCls, 'w-36 shrink-0')}>
                  <option value="reply">Quick reply</option>
                  <option value="url">Visit website</option>
                </select>
                <input aria-label={`Button ${i + 1} text`} value={b.text} onChange={(e) => setButtons((bs) => bs.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))} className={inputCls} />
                <button type="button" aria-label="Remove button" onClick={() => setButtons((bs) => bs.filter((_, j) => j !== i))} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-input text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          {buttons.length < 3 && (
            <button type="button" onClick={() => setButtons((bs) => [...bs, { kind: 'reply', text: '' }])} className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-800">
              <Plus className="h-3.5 w-3.5" /> Add button
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className={panelCls}>
          <p className="text-sm font-medium text-muted-foreground">Preview</p>
          <div className="bg-grain mt-3 rounded-2xl bg-[#EFEAE2] p-4">
            <div className="max-w-[92%] overflow-hidden rounded-xl rounded-tl-sm bg-white text-[#111B21] shadow-sm">
              <div className="px-3 py-2">
                {header && <p className="font-bold">{header}</p>}
                <p className="mt-1 whitespace-normal break-words text-[15px] leading-snug" dangerouslySetInnerHTML={{ __html: renderWhatsApp(filled) }} />
                {footer && <p className="mt-1.5 text-[13px] text-[#667781]">{footer}</p>}
                <p className="mt-0.5 text-right text-[11px] text-[#667781]">10:24</p>
              </div>
              {buttons.filter((b) => b.text).map((b, i) => (
                <div key={i} className="flex items-center justify-center gap-1.5 border-t border-black/5 py-2 text-[14px] font-medium text-[#00A5F4]">
                  {b.kind === 'url' ? <ExternalLink className="h-4 w-4" /> : <Reply className="h-4 w-4" />} {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={panelCls}>
          <p className="flex items-center gap-2 font-semibold">
            {issues.filter((x) => !x.startsWith('Tip')).length ? <AlertTriangle className="h-5 w-5 text-amber-600" /> : <CheckCircle2 className="h-5 w-5 text-brand-600" />}
            {issues.filter((x) => !x.startsWith('Tip')).length ? 'Fix before submitting' : 'Looks ready to submit'}
          </p>
          {issues.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-[14px] text-ink-600">
              {issues.map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" /> {x}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <CopyButton text={body} label="Copy body" />
            <CopyButton text={json} label="Copy API JSON" className="border border-input bg-card text-foreground hover:bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
