import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarCheck,
  Coffee,
  GraduationCap,
  HeartHandshake,
  Home,
  Lightbulb,
  MapPin,
  MessageCircle,
  PartyPopper,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Users,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import { ClosingCta } from '@/components/landing/sections';
import { products } from '@/lib/catalog';
import { activeAffiliations, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

const mosaic = [
  { icon: Home, label: 'Remote-first', tone: 'bg-brand-600 text-white', span: 'row-span-2' },
  { icon: Sun, label: 'Flexible hours', tone: 'bg-lime-200 text-forest', span: '' },
  { icon: MessageCircle, label: 'Close to customers', tone: 'bg-white text-forest ring-1 ring-border', span: '' },
  { icon: Rocket, label: 'Ship every week', tone: 'bg-forest text-white', span: 'col-span-2' },
  { icon: GraduationCap, label: 'Learn by doing', tone: 'bg-sky-100 text-sky-900', span: '' },
  { icon: PartyPopper, label: 'Celebrate wins', tone: 'bg-amber-100 text-amber-900', span: '' },
];

const milestones = [
  { when: 'May 2026', title: 'Plans & AI templates', body: 'Self-serve plans and an AI assistant for writing WhatsApp templates.' },
  { when: 'Jun 2026', title: 'Payments & ads', body: 'WhatsApp Pay, click-to-WhatsApp ads and QR campaigns go live.' },
  { when: 'Sep 2026', title: 'Email joins WhatsApp', body: 'Email marketing and multi-currency billing for growing teams.' },
  { when: 'Oct 2026', title: 'AI flow builder', body: 'Describe a chatbot in plain words and let AI build the flow.' },
  { when: 'Nov 2026', title: 'Backed by NVIDIA', body: 'Team access controls, a new website — and NVIDIA in our corner.' },
];

const life = [
  { icon: Home, title: 'Work from anywhere', body: 'We’re remote-first. Pick the hours that suit you, as long as customers get answers when they need them.' },
  { icon: Users, title: 'Everyone talks to customers', body: 'Clinics, shops, coaching centres, D2C brands — hearing their day-to-day is how we decide what to build next.' },
  { icon: Rocket, title: 'Small team, big ownership', body: 'You own your work end to end, from the first idea to the moment a customer uses it.' },
  { icon: GraduationCap, title: 'Grow fast', body: 'Hands-on training on the product, WhatsApp marketing and B2B sales, and a quick path to bigger roles.' },
  { icon: Coffee, title: 'Low ego, high trust', body: 'Ask questions, share half-finished work, disagree kindly. Good ideas win, not titles.' },
  { icon: PartyPopper, title: 'Celebrate the wins', body: 'A customer’s first live campaign is a team moment. So is every release we ship.' },
];

const rhythm = [
  { icon: CalendarCheck, day: 'Monday', text: 'Plan the week around what customers asked for' },
  { icon: MessageCircle, day: 'Every day', text: 'Calls, chats and demos with real businesses' },
  { icon: Rocket, day: 'Every week', text: 'Ship improvements — they land in the changelog' },
  { icon: Sparkles, day: 'Friday', text: 'Share wins, learnings and what’s next' },
];

const values = [
  { icon: Lightbulb, title: 'Simple beats clever', body: 'If a shop owner can’t set it up in an afternoon, we’re not done.' },
  { icon: HeartHandshake, title: 'Customers first', body: 'Every feature starts with a conversation a real business needed to have.' },
  { icon: ShieldCheck, title: 'Built on trust', body: 'Official WhatsApp Business API, opt-ins respected, data used only to serve you.' },
  { icon: Target, title: 'Outcomes over output', body: 'We measure success in replies, orders and happy customers — not features shipped.' },
];

export default function AboutPage() {
  const nvidia = activeAffiliations[0];
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        {/* hero */}
        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,#000_25%,transparent_75%)]" />
          <Container className="relative grid grid-cols-1 items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 [&>*]:min-w-0">
            <div>
              <Reveal>
                <Kicker>About BigBrosAI</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.04em] sm:text-6xl">
                  Built in India for businesses that <span className="text-gradient-brand">live on WhatsApp.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
                  BigBrosAI is a WhatsApp marketing and automation platform. We help clinics, retailers, D2C brands, coaching centres and real-estate firms turn everyday chats into
                  orders, bookings and loyal customers.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-brand-800">
                  <BrandTile slug="whatsapp" size={24} className="rounded-full" /> Official WhatsApp Business API
                </span>
                {nvidia && (
                  <a href={nvidia.href} target="_blank" rel="noopener noreferrer" className="frame-shine inline-flex items-center gap-2 rounded-full border border-border bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-ink-600">
                    <span className="flex h-6 items-center gap-1 rounded-full bg-black px-2">
                      <BrandIcon slug="nvidia" className="h-3.5 w-3.5" />
                      <span className="text-[10.5px] font-bold text-white">NVIDIA</span>
                    </span>
                    {nvidia.label}
                  </a>
                )}
              </Reveal>
            </div>
            <Reveal delay={0.15} y={30}>
              <ul className="grid auto-rows-[7.5rem] grid-cols-2 gap-3 sm:auto-rows-[8.5rem] sm:grid-cols-3">
                {mosaic.map((m, i) => (
                  <li
                    key={m.label}
                    className={cn('shine shine-soft group flex flex-col justify-between rounded-3xl p-5 shadow-card transition-transform duration-500 hover:-translate-y-1', m.tone, m.span, i === 0 && 'sm:row-span-2')}
                    style={{ animationDelay: `${i * 0.8}s` }}
                  >
                    <m.icon className="h-6 w-6" />
                    <span className="font-display text-lg font-bold leading-tight">{m.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        {/* mission + facts */}
        <section className="py-20 sm:py-24">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
            <div>
              <Reveal>
                <Kicker>Why we exist</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">One phone and a spreadsheet shouldn’t be your sales team.</h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
                <p>Your customers already message you on WhatsApp. But most businesses still answer from one phone, track orders in a spreadsheet and copy-paste the same replies all day.</p>
                <p>We built BigBrosAI to turn that into a system — approved broadcasts, AI-written templates, no-code chatbots, a shared team inbox and payments in the chat — on the official API, at a price small businesses can afford.</p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="grid grid-cols-2 gap-3 self-start">
              {[
                { k: `${products.length}`, v: 'products on one platform' },
                { k: 'Free', v: 'WhatsApp API to start' },
                { k: '2', v: 'offices in Uttar Pradesh' },
                { k: '24×7', v: 'AI replies for your customers' },
              ].map((s) => (
                <div key={s.v} className="rounded-3xl border border-border bg-card p-6">
                  <p className="font-display text-4xl font-bold tracking-tight text-brand-700">{s.k}</p>
                  <p className="mt-1 text-[15px] text-ink-600">{s.v}</p>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* journey */}
        <section className="border-y border-border bg-card/50 py-20 sm:py-24">
          <Container>
            <Reveal>
              <Kicker>Our journey</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Shipping, one release at a time.</h2>
            </Reveal>
            <ol className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-4">
              <span aria-hidden className="rule-shine rule-shine-dark absolute left-0 right-0 top-[11px] hidden md:block" />
              {milestones.map((m, i) => (
                <Reveal as="li" key={m.when} delay={i * 0.06} className="relative pl-8 md:pl-0 md:pt-10">
                  <span className={cn('absolute left-0 top-1 h-[22px] w-[22px] rounded-full border-4 border-background md:top-0', i === milestones.length - 1 ? 'bg-brand-600' : 'bg-brand-300')} />
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-700">{m.when}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight">{m.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">{m.body}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-10">
              <Link href="/changelog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 hover:underline">
                See the full changelog <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </Container>
        </section>

        {/* life at BigBrosAI */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <Kicker>Life at BigBrosAI</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.75rem] sm:leading-[1.08]">How we work — and why people like working here.</h2>
              </Reveal>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {life.map((l, i) => (
                <Reveal as="li" key={l.title} delay={(i % 3) * 0.06} className="shine shine-soft shine-hover group rounded-3xl border border-border bg-card p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <l.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">{l.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{l.body}</p>
                </Reveal>
              ))}
            </ul>

            {/* weekly rhythm */}
            <Reveal className="mt-10 overflow-hidden rounded-[2rem] bg-forest p-7 text-white sm:p-10">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-lime-300">Our weekly rhythm</p>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {rhythm.map((r) => (
                  <li key={r.day} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <r.icon className="h-5 w-5 text-lime-300" />
                    <p className="mt-3 font-display text-lg font-bold">{r.day}</p>
                    <p className="mt-1 text-[14.5px] text-white/70">{r.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        {/* values */}
        <section className="border-t border-border bg-card/50 py-20 sm:py-24">
          <Container>
            <Reveal>
              <Kicker>What we value</Kicker>
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.06} className="rounded-3xl border border-border bg-card p-6">
                  <v.icon className="h-6 w-6 text-brand-700" />
                  <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{v.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        {/* where we are */}
        <section className="py-20 sm:py-24">
          <Container className="grid grid-cols-1 gap-4 lg:grid-cols-3 [&>*]:min-w-0">
            {siteConfig.offices.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.06} className="rounded-3xl border border-border bg-card p-6">
                <MapPin className="h-6 w-6 text-brand-700" />
                <h3 className="mt-4 text-lg font-bold">{o.label}</h3>
                {o.lines.map((l) => (
                  <p key={l} className="text-[15px] text-ink-600">
                    {l}
                  </p>
                ))}
              </Reveal>
            ))}
            <Reveal delay={0.12} className="flex flex-col justify-between rounded-3xl bg-brand-800 p-6 text-white">
              <div>
                <h3 className="text-lg font-bold">Say hello</h3>
                <p className="mt-1 text-[15px] text-white/75">{siteConfig.legalName}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <ButtonLink href="/contact" size="sm" className="rounded-full bg-white text-brand-900 hover:bg-brand-50">
                  Contact us
                </ButtonLink>
                {siteConfig.social.slice(0, 4).map((s) => (
                  <a key={s.slug} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
                    <BrandIcon slug={s.slug} color="#fff" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
