"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Download, ExternalLink, QrCode } from 'lucide-react';
import { CopyButton, PhoneFields, download, inputCls, labelCls, panelCls, useQr } from '@/components/tools/shared';
import { waLink } from '@/lib/tools';

export function LinkGenerator() {
  const [cc, setCc] = useState('91');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('Hi! I’d like to know more about your products.');
  const valid = number.replace(/\D/g, '').length >= 6;
  const link = valid ? waLink(cc, number, message) : '';
  const { png } = useQr(link);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
      <div className={panelCls}>
        <div className="space-y-5">
          <PhoneFields cc={cc} setCc={setCc} number={number} setNumber={setNumber} />
          <label className="block">
            <span className={labelCls}>Pre-filled message (optional)</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className={`${inputCls} h-auto resize-y py-3`} />
          </label>
        </div>
        <div className="mt-7 rounded-2xl border border-border bg-muted/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your link</p>
          <p className="mt-1.5 break-all font-mono text-[14px] text-foreground">{link || 'Enter your number to generate the link'}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <CopyButton text={link} label="Copy link" />
          <a
            href={link || undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!link}
            className={`inline-flex h-11 items-center gap-2 rounded-full border border-input bg-card px-5 text-sm font-semibold ${link ? '' : 'pointer-events-none opacity-50'}`}
          >
            <ExternalLink className="h-4 w-4" /> Test link
          </a>
        </div>
      </div>
      <div className={`${panelCls} flex flex-col items-center justify-center text-center`}>
        {png ? (
          <>
            <Image src={png} alt="WhatsApp QR code" width={240} height={240} unoptimized className="rounded-2xl ring-1 ring-border" />
            <p className="mt-4 text-sm text-ink-600">Scan to open a chat with {cc && `+${cc}`} {number}</p>
            <button type="button" onClick={() => download(png, 'whatsapp-qr.png')} className="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-input bg-card px-5 text-sm font-semibold">
              <Download className="h-4 w-4" /> Download QR (PNG)
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-10 text-muted-foreground">
            <QrCode className="h-16 w-16" />
            <p className="mt-3 text-sm">Your QR code will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
