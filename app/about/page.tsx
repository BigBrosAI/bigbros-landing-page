import Link from 'next/link';
import { ArrowUpRight, HeartHandshake, Lightbulb, MapPin, Rocket, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink, Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandIcon, BrandTile } from '@/components/landing/brand-icon';
import { ProductCard } from '@/components/landing/product-card';
import { ClosingCta } from '@/components/landing/sections';
import { products } from '@/lib/catalog';
import { activeAffiliations, siteConfig } from '@/lib/site';

const customers = ['Clinics & hospitals', 'Retailers', 'D2C brands', 'Coaching centres', 'Real-estate firms', 'Growing small businesses'];
const values = [
  { icon: Lightbulb, title: 'Simple beats clever', body: 'If a shop owner can’t set it up in an afternoon, we haven’t finished building it.' },
  { icon: HeartHandshake, title: 'Customers first', body: 'Every feature starts with a conversation a real business needed to have with its customers.' },
  { icon: ShieldCheck, title: 'Built on trust', body: 'Official WhatsApp Business API, opt-in respected, and your data used only to serve you.' },
  { icon: Rocket, title: 'Ship fast', body: 'We release improvements every week — see the changelog for what landed recently.' },
];

export default function AboutPage() {
  const nvidia = activeAffiliations[0];
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="About us"
          title="We help businesses grow on the app their customers already use."
          subtitle="BigBrosAI is a WhatsApp marketing and automation platform built for Indian businesses — one place for every business conversation, from campaigns to customer support."
        >
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-brand-800">
              <BrandTile slug="whatsapp" size={24} className="rounded-full" /> Official WhatsApp Business API
            </span>
            {nvidia && (
              <a href={nvidia.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-ink-600">
                <span className="flex h-6 items-center gap-1 rounded-full bg-black px-2">
                  <BrandIcon slug="nvidia" className="h-3.5 w-3.5" />
                  <span className="text-[10.5px] font-bold text-white">NVIDIA</span>
                </span>
                {nvidia.label}
              </a>
            )}
          </div>
        </PageHero>

        <section className="py-20 sm:py-24">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
            <div>
              <Reveal>
                <Kicker>Our mission</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">Make WhatsApp the easiest way to sell and support.</h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
                <p>Most customers in India already talk to businesses on WhatsApp — but most businesses still run those chats from one phone, a spreadsheet and a lot of copy-paste.</p>
                <p>
                  BigBrosAI turns that into a system: approved broadcasts with segmentation, an AI assistant for templates, no-code chatbot flows, a shared team inbox and dashboards
                  that show what each campaign earned — all on the official WhatsApp Business API.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="rounded-[2rem] border border-border bg-card p-7 shadow-card sm:p-9">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">Who we build for</p>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {customers.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 rounded-2xl bg-muted/60 px-4 py-3 text-[15px] font-medium">
                    <Users className="h-4 w-4 text-brand-700" /> {c}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-3 border-t border-border pt-6 text-[15px] text-ink-600">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  {siteConfig.legalName} · Registered in Mathura, Uttar Pradesh, with an office in Agra
                </p>
                <p className="flex items-start gap-2.5">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  Ten products on one platform — WhatsApp, email and payments
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="forest relative overflow-hidden py-20 sm:py-24">
          <div aria-hidden className="rule-shine absolute inset-x-0 top-0" />
          <Container className="relative">
            <Reveal>
              <Kicker light>What we value</Kicker>
            </Reveal>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.06} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
                  <v.icon className="h-6 w-6 text-lime-300" />
                  <h3 className="mt-4 text-lg font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">{v.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className="py-20 sm:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <Reveal>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What we’ve built</h2>
              </Reveal>
              <Reveal className="flex gap-4 text-sm font-semibold">
                <Link href="/changelog" className="inline-flex items-center gap-1 text-brand-800 hover:underline">
                  Changelog <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/careers" className="inline-flex items-center gap-1 text-brand-800 hover:underline">
                  We’re hiring <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((p, i) => (
                <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
                  <ProductCard p={p} />
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-8 text-center">
              <ButtonLink href="/products" variant="outline" arrow className="rounded-full">
                See all products
              </ButtonLink>
            </Reveal>
          </Container>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
