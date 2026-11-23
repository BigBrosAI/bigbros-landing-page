import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  Check,
  Code2,
  FileSpreadsheet,
  Globe2,
  KeyRound,
  LayoutTemplate,
  MailCheck,
  Megaphone,
  Paperclip,
  ShieldCheck,
  Sparkles,
  UserMinus,
  Webhook,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { ProductVisual } from '@/components/landing/product-visual';
import { BrandTile } from '@/components/landing/brand-icon';
import { ClosingCta } from '@/components/landing/sections';
import { ByCurrency, CurrencyToggle, Price } from '@/components/site/price';
import { emailPlans } from '@/lib/plans';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Email API & Email Marketing — 300 Free Emails Every Day',
  description:
    'Transactional email API and email marketing campaigns from BigBrosAI. Send from your own verified domain with DKIM, SPF and DMARC, a drag-and-drop builder, audiences and reports. 300 free emails every day.',
  path: '/email',
});

const marketing = [
  { icon: LayoutTemplate, title: 'Drag-and-drop builder', body: 'Design responsive emails from starter templates — no HTML needed.' },
  { icon: FileSpreadsheet, title: 'Audiences & CSV import', body: 'Bring your list in from a spreadsheet and keep it organised.' },
  { icon: Sparkles, title: 'Personalisation', body: 'Merge tags drop each subscriber’s name and details into the message.' },
  { icon: CalendarClock, title: 'Scheduling', body: 'Send now or schedule campaigns for the moment your audience reads.' },
  { icon: BarChart3, title: 'Campaign reports', body: 'See delivery, opens and clicks for every campaign you send.' },
  { icon: UserMinus, title: 'Unsubscribes handled', body: 'One-click unsubscribe and a suppression list keep you compliant.' },
];

const developer = [
  { icon: Webhook, title: 'Delivery webhooks', body: 'Delivered, bounced and complaint events in real time.' },
  { icon: KeyRound, title: 'Idempotency keys', body: 'Retry safely without sending duplicates.' },
  { icon: Paperclip, title: 'Attachments', body: 'Invoices, tickets and receipts as files.' },
  { icon: ShieldCheck, title: 'IP allowlist', body: 'Lock API access to your own servers.' },
];

const faqs = [
  { q: 'Is the free tier really free forever?', a: 'Yes. Every organisation gets 300 transactional emails per day — no credit card, no trial period and no expiry.' },
  { q: 'What do the paid email plans include?', a: 'Scale covers up to 100,000 emails a month with webhooks, inbound parsing and a dedicated IP. Volume covers up to 1,000,000 a month on multiple dedicated IPs with a 99.99% SLA. Email marketing campaigns run on Scale and Volume.' },
  { q: 'Can I send from my own domain?', a: 'Yes. Verify your domain by adding the DNS records we give you, and every email is signed with DKIM and aligned with SPF and DMARC.' },
  { q: 'Do I need a WhatsApp project to use email?', a: 'No. Create an Email project on its own, or run email alongside WhatsApp in the same workspace.' },
  { q: 'How do unsubscribes work?', a: 'Marketing emails include an unsubscribe link. People who opt out are added to your suppression list and skipped automatically.' },
];

const curl = `curl -X POST https://api.bigbrosai.com/api/v1/email/send \\
  -H "bigbrosai-api-key: $BBAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "orders@yourbrand.com",
    "to": ["priya@example.com"],
    "subject": "Your order #4821 is confirmed",
    "body_html": "<p>Thanks, Priya! It ships today.</p>",
    "idempotencyKey": "order-4821"
  }'`;

export default function EmailPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'BigBrosAI Email',
              serviceType: 'Transactional email API and email marketing',
              provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
              url: absoluteUrl('/email'),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]}
        />

        {/* hero */}
        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />
          <Container className="relative grid items-center gap-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-28">
            <div>
              <Reveal className="flex items-center gap-3">
                <BrandTile slug="gmail" size={44} />
                <Kicker>BigBrosAI Email</Kicker>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.04em] sm:text-[3.6rem]">
                  Email that lands <span className="text-brand-700">in the inbox.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
                  Transactional email from your backend and marketing campaigns for your customers — from your own verified domain, in the same workspace as WhatsApp.
                </p>
              </Reveal>
              <Reveal delay={0.14} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={siteConfig.links.signup} size="xl" arrow className="rounded-full">
                  Start free — 300 emails/day
                </ButtonLink>
                <ButtonLink href={siteConfig.links.docs} size="xl" variant="outline" className="rounded-full">
                  Read the API docs
                </ButtonLink>
              </Reveal>
              <Reveal delay={0.18}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {['300 free / day, forever', 'DKIM · SPF · DMARC', 'Campaigns & reports'].map((c) => (
                    <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-card/80 px-3 py-1.5 text-[13px] font-medium text-ink-600">
                      <Check className="h-3.5 w-3.5 text-brand-600" /> {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.12} y={36} className="relative">
              <ProductVisual visual="email" />
            </Reveal>
          </Container>
        </section>

        {/* two products */}
        <section className="border-t border-border py-20 sm:py-24">
          <Container>
            <Reveal>
              <Kicker>Two ways to send</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-[2.75rem] sm:leading-[1.08]">One email platform for your app and your audience.</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <Reveal className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-lime-300"><Code2 className="h-6 w-6" /></span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">Transactional Email API</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">Receipts, OTPs, password resets and alerts — one POST request per email from your backend.</p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-ink-600">
                  {['300 free emails every day', 'Delivery webhooks and a full send log', 'Attachments and idempotency keys'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{x}</li>
                  ))}
                </ul>
                <Link href="/products/email-api" className="mt-auto inline-flex items-center gap-1 pt-8 text-sm font-semibold text-brand-800 hover:underline">
                  Email API details <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
              <Reveal delay={0.06} className="flex flex-col rounded-3xl border border-border bg-card p-8 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100"><Megaphone className="h-6 w-6" /></span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">Email Marketing</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">Newsletters, offers and announcements — designed in a builder and sent to your audience.</p>
                <ul className="mt-6 space-y-2.5 text-[15px] text-ink-600">
                  {['Drag-and-drop builder with starter templates', 'Audiences, CSV import and personalisation', 'Scheduling, reports and unsubscribes'].map((x) => (
                    <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{x}</li>
                  ))}
                </ul>
                <a href="#marketing" className="mt-auto inline-flex items-center gap-1 pt-8 text-sm font-semibold text-brand-800 hover:underline">
                  See marketing features <ArrowRight className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* marketing features */}
        <section id="marketing" className="scroll-mt-20 border-t border-border bg-card/50 py-20 sm:py-24">
          <Container>
            <Reveal>
              <Kicker>Email marketing</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-[2.75rem] sm:leading-[1.08]">Campaigns your customers actually open.</h2>
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {marketing.map((f, i) => (
                <Reveal as="li" key={f.title} delay={(i % 3) * 0.06} className="group rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{f.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        {/* developers */}
        <section className="forest relative overflow-hidden py-20 sm:py-28">
          <div aria-hidden className="bg-grain-light absolute inset-0" />
          <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <Kicker light>For developers</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.08]">One request. Delivered.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/65">A simple REST API with an API key from your dashboard. Send from any language or framework.</p>
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {developer.map((f, i) => (
                  <Reveal as="li" key={f.title} delay={i * 0.06} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <f.icon className="h-5 w-5 text-lime-300" />
                    <p className="mt-3 font-semibold text-white">{f.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-white/60">{f.body}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-white/10 bg-[#071d16] shadow-lift">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-white/15" /><span className="h-3 w-3 rounded-full bg-white/15" /><span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-[12px] text-white/50">send-email.sh</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-lime-200/90"><code>{curl}</code></pre>
            </Reveal>
          </Container>
        </section>

        {/* deliverability */}
        <section className="py-20 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <Kicker>Deliverability</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">Your domain. Fully authenticated.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-[17px] leading-relaxed text-ink-600">Mail from a domain your customers recognise, signed and aligned so inbox providers trust it.</p>
              </Reveal>
            </div>
            <ol className="space-y-4">
              {[
                { icon: Globe2, title: 'Add your domain', body: 'Enter the domain you want to send from in the dashboard.' },
                { icon: ShieldCheck, title: 'Publish DNS records', body: 'Copy the DKIM, SPF and DMARC records to your DNS provider.' },
                { icon: MailCheck, title: 'Verify and send', body: 'Once verified, every email is signed and ready for the inbox.' },
              ].map((st, i) => (
                <Reveal as="li" key={st.title} delay={i * 0.08} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-lime-300">{i + 1}</span>
                  <span>
                    <span className="flex items-center gap-2 font-semibold"><st.icon className="h-4 w-4 text-brand-700" />{st.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-ink-600">{st.body}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {/* pricing */}
        <section className="border-t border-border bg-card/50 py-20 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <Kicker className="justify-center">Pricing</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">Start free. Upgrade as you grow.</h2>
              </Reveal>
            </div>
            <Reveal className="mt-8 flex justify-center">
              <CurrencyToggle />
            </Reveal>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
              {emailPlans.map((pl, i) => (
                <Reveal key={pl.id} delay={i * 0.06} className={`relative flex flex-col rounded-3xl border p-7 ${pl.popular ? 'forest border-transparent shadow-lift' : 'border-border bg-card shadow-card'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold ${pl.popular ? 'text-white' : ''}`}>{pl.name}</h3>
                    {pl.popular && <span className="rounded-full bg-lime-300 px-2.5 py-1 text-[11px] font-bold text-forest">Most popular</span>}
                  </div>
                  <p className={`mt-1.5 text-sm ${pl.popular ? 'text-white/65' : 'text-muted-foreground'}`}>{pl.blurb}</p>
                  <p className={`mt-5 font-display text-4xl font-bold tracking-tight ${pl.popular ? 'text-white' : ''}`}>
                    {pl.inr === 0 ? 'Free' : <Price inr={pl.inr} usd={pl.usd} />}
                    {pl.inr !== 0 && <span className={`text-sm font-medium ${pl.popular ? 'text-white/60' : 'text-muted-foreground'}`}> / month</span>}
                  </p>
                  <p className={`mt-2 text-sm font-semibold ${pl.popular ? 'text-lime-300' : 'text-brand-700'}`}>{pl.volume}</p>
                  <ul className="mt-6 space-y-2.5 text-[14px]">
                    {pl.features.map((f) => (
                      <li key={f} className={`flex gap-2.5 ${pl.popular ? 'text-white/85' : 'text-ink-600'}`}>
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${pl.popular ? 'text-lime-300' : 'text-brand-600'}`} />{f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={siteConfig.links.signup} variant={pl.popular ? 'default' : 'outline'} size="lg" className={`mt-auto w-full rounded-full ${pl.popular ? 'bg-lime-300 text-forest hover:bg-lime-200' : ''}`}>
                    {pl.inr === 0 ? 'Start free' : `Choose ${pl.name}`}
                  </ButtonLink>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-[13px] text-muted-foreground">
              <ByCurrency inr="Beyond your plan, extra emails are ₹0.125 each. Prices exclude GST." usd="Beyond your plan, extra emails are billed pay as you go." />
            </p>
            <Reveal className="mt-8 text-center">
              <Link href="/pricing" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 hover:underline">
                Compare all plans <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </Container>
        </section>

        {/* better together */}
        <section className="py-20 sm:py-24">
          <Container>
            <Reveal className="grid items-center gap-8 rounded-[2rem] border border-border bg-card p-8 shadow-card sm:p-12 lg:grid-cols-[1fr_auto]">
              <div>
                <Kicker>Better together</Kicker>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Pair a WhatsApp message with a detailed email.</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-600">Confirm the order on WhatsApp, send the invoice by email — from one workspace, one contact list and one bill.</p>
              </div>
              <div className="flex items-center gap-3">
                <BrandTile slug="whatsapp" size={56} />
                <span className="text-2xl font-bold text-ink-400">+</span>
                <BrandTile slug="gmail" size={56} />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-20 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <Kicker>FAQ</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">Email, answered.</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                    <AccordionTrigger className="py-5 text-left text-[17px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </Container>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
