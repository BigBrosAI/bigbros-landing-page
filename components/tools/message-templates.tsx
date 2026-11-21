"use client";

import { useState } from 'react';
import { CopyButton, inputCls, labelCls, panelCls } from '@/components/tools/shared';
import { renderWhatsApp } from '@/lib/whatsapp-format';
import { cn } from '@/lib/utils';

type Kind = 'Greeting' | 'Away' | 'Quick reply' | 'Follow-up';
const industries = ['Any business', 'Retail & D2C', 'Clinic', 'Coaching', 'Real estate', 'Restaurant'] as const;
type Industry = (typeof industries)[number];

const library: { kind: Kind; industry: Industry; title: string; text: string }[] = [
  { kind: 'Greeting', industry: 'Any business', title: 'Warm welcome', text: 'Hi! 👋 Thanks for messaging *{business}*. How can we help you today?' },
  { kind: 'Greeting', industry: 'Any business', title: 'Menu style', text: 'Welcome to *{business}*! Reply with a number:\n1. Products & prices\n2. Track my order\n3. Talk to our team' },
  { kind: 'Greeting', industry: 'Retail & D2C', title: 'Shop greeting', text: 'Hi there! 🛍️ Welcome to *{business}*. Browse our catalogue here: {website}\nReply with a product name and we’ll share details.' },
  { kind: 'Greeting', industry: 'Clinic', title: 'Appointment greeting', text: 'Hello! Thank you for contacting *{business}*. To book an appointment, please share your name, preferred date and time. 🩺' },
  { kind: 'Greeting', industry: 'Coaching', title: 'Admissions greeting', text: 'Hi! 📚 Welcome to *{business}*. Which course are you interested in? We’ll share batch timings and fees.' },
  { kind: 'Greeting', industry: 'Real estate', title: 'Property enquiry', text: 'Hi! 🏡 Thanks for reaching out to *{business}*. Tell us your preferred location and budget, and we’ll share matching properties.' },
  { kind: 'Greeting', industry: 'Restaurant', title: 'Order & reserve', text: 'Hi! 🍽️ Welcome to *{business}*. Reply *MENU* to see today’s menu or *BOOK* to reserve a table.' },
  { kind: 'Away', industry: 'Any business', title: 'After hours', text: 'Thanks for your message! Our team is available *{hours}*. We’ll get back to you as soon as we’re back. 🙏' },
  { kind: 'Away', industry: 'Any business', title: 'Holiday', text: 'Hi! *{business}* is closed for the holidays. We’ll reply to every message when we reopen. Thank you for your patience!' },
  { kind: 'Away', industry: 'Clinic', title: 'Clinic closed', text: 'Our clinic is closed right now (hours: {hours}). For emergencies, please call your nearest hospital. We’ll confirm your appointment when we reopen.' },
  { kind: 'Quick reply', industry: 'Retail & D2C', title: 'Order status', text: 'Your order *#{order}* has been shipped! 📦 Track it here: {website}' },
  { kind: 'Quick reply', industry: 'Retail & D2C', title: 'Payment link', text: 'Here’s your secure payment link for ₹{amount}: {website}\nYour order will be confirmed once payment is received.' },
  { kind: 'Quick reply', industry: 'Any business', title: 'Location', text: 'You can find us here: {address} 📍\nOpen {hours}.' },
  { kind: 'Quick reply', industry: 'Coaching', title: 'Fee details', text: 'The fee for this course is ₹{amount}. You can pay in instalments. Want us to block a seat for you?' },
  { kind: 'Follow-up', industry: 'Any business', title: 'Gentle nudge', text: 'Hi {name}, just checking in — did you get a chance to look at our last message? Happy to answer any questions. 😊' },
  { kind: 'Follow-up', industry: 'Retail & D2C', title: 'Abandoned cart', text: 'Hi {name}, you left something in your cart 🛒 Complete your order here: {website}' },
  { kind: 'Follow-up', industry: 'Clinic', title: 'Appointment reminder', text: 'Hi {name}, a reminder of your appointment at *{business}* tomorrow at {time}. Reply *YES* to confirm or *NO* to reschedule.' },
  { kind: 'Follow-up', industry: 'Real estate', title: 'Site visit', text: 'Hi {name}, would you like to schedule a site visit this weekend? Reply with a day that works for you. 🏡' },
  { kind: 'Follow-up', industry: 'Any business', title: 'Review request', text: 'Thanks for choosing *{business}*, {name}! 🙏 Could you take 30 seconds to leave us a review? {website}' },
];

const kinds: (Kind | 'All')[] = ['All', 'Greeting', 'Away', 'Quick reply', 'Follow-up'];

export function MessageTemplates() {
  const [kind, setKind] = useState<Kind | 'All'>('All');
  const [industry, setIndustry] = useState<Industry | 'All'>('All');
  const [business, setBusiness] = useState('');
  const [hours, setHours] = useState('Mon–Sat, 10 AM – 7 PM');
  const [website, setWebsite] = useState('');

  const fill = (t: string) =>
    t
      .replace(/\{business\}/g, business || 'Your Business')
      .replace(/\{hours\}/g, hours || 'Mon–Sat, 10 AM – 7 PM')
      .replace(/\{website\}/g, website || 'https://yourwebsite.com');

  const list = library.filter((l) => (kind === 'All' || l.kind === kind) && (industry === 'All' || l.industry === industry || l.industry === 'Any business'));

  return (
    <div className="space-y-6">
      <div className={`${panelCls} grid gap-4 sm:grid-cols-3`}>
        <label className="block"><span className={labelCls}>Business name</span><input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Your Business" className={inputCls} /></label>
        <label className="block"><span className={labelCls}>Working hours</span><input value={hours} onChange={(e) => setHours(e.target.value)} className={inputCls} /></label>
        <label className="block"><span className={labelCls}>Website / link</span><input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourwebsite.com" className={inputCls} /></label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {kinds.map((k) => (
          <button key={k} type="button" onClick={() => setKind(k)} className={cn('h-9 rounded-full border px-4 text-sm font-semibold transition-colors', kind === k ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-card hover:bg-muted')}>
            {k}
          </button>
        ))}
        <select aria-label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value as Industry | 'All')} className={cn(inputCls, 'ml-auto h-9 w-auto text-sm')}>
          <option value="All">All industries</option>
          {industries.filter((i) => i !== 'Any business').map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {list.map((l) => {
          const text = fill(l.text);
          return (
            <li key={l.title} className="flex flex-col rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{l.title}</p>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-semibold text-brand-800">{l.kind}{l.industry !== 'Any business' && ` · ${l.industry}`}</span>
              </div>
              <div className="mt-3 flex-1 rounded-2xl bg-[#EFEAE2] p-3">
                <p className="ml-auto w-fit max-w-[92%] whitespace-normal break-words rounded-xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2 text-[14px] leading-snug text-[#111B21] shadow-sm" dangerouslySetInnerHTML={{ __html: renderWhatsApp(text) }} />
              </div>
              <CopyButton text={text} label="Copy message" className="mt-4 h-10 self-start" />
            </li>
          );
        })}
      </ul>
      <p className="text-[13px] text-muted-foreground">Placeholders like {'{name}'}, {'{order}'} and {'{amount}'} are left for you — BigBrosAI fills them automatically from your contact data.</p>
    </div>
  );
}
