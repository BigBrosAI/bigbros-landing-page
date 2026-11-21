"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Download, QrCode } from 'lucide-react';
import { PhoneFields, download, inputCls, labelCls, panelCls, useQr } from '@/components/tools/shared';
import { waLink } from '@/lib/tools';
import { cn } from '@/lib/utils';

const colors = ['#0B2E23', '#15803D', '#111827', '#1D4ED8', '#7C3AED', '#B45309'];

export function QrGenerator() {
  const [cc, setCc] = useState('91');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('Hi! I scanned your QR code.');
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(512);
  const valid = number.replace(/\D/g, '').length >= 6;
  const link = valid ? waLink(cc, number, message) : '';
  const { png, svg } = useQr(link, { color, size });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
      <div className={cn(panelCls, 'space-y-5')}>
        <PhoneFields cc={cc} setCc={setCc} number={number} setNumber={setNumber} />
        <label className="block">
          <span className={labelCls}>Message customers will send (optional)</span>
          <input value={message} onChange={(e) => setMessage(e.target.value)} className={inputCls} />
        </label>
        <div>
          <span className={labelCls}>QR colour</span>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button key={c} type="button" aria-label={`Colour ${c}`} onClick={() => setColor(c)} className={cn('h-9 w-9 rounded-full ring-offset-2 transition', color === c && 'ring-2 ring-brand-500')} style={{ background: c }} />
            ))}
            <label className="flex h-9 items-center gap-2 rounded-full border border-input px-3 text-sm">
              Custom
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0" />
            </label>
          </div>
        </div>
        <label className="block">
          <span className={labelCls}>Size: {size}px</span>
          <input type="range" min={256} max={1024} step={64} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-green-700" />
        </label>
      </div>
      <div className={cn(panelCls, 'flex flex-col items-center justify-center text-center')}>
        {png ? (
          <>
            <Image src={png} alt="WhatsApp QR code" width={260} height={260} unoptimized className="rounded-2xl ring-1 ring-border" />
            <p className="mt-4 text-sm text-ink-600">Opens a WhatsApp chat with +{cc} {number}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={() => download(png, 'whatsapp-qr.png')} className="shine inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
                <Download className="h-4 w-4" /> PNG
              </button>
              <button
                type="button"
                onClick={() => download(URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })), 'whatsapp-qr.svg')}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-input bg-card px-5 text-sm font-semibold"
              >
                <Download className="h-4 w-4" /> SVG
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-10 text-muted-foreground">
            <QrCode className="h-16 w-16" />
            <p className="mt-3 text-sm">Enter your number to create the QR code</p>
          </div>
        )}
      </div>
    </div>
  );
}
