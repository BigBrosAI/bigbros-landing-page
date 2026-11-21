import Link from 'next/link';
import { ArrowUpRight, BookOpen, Calculator, History, PlayCircle, Rocket, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container, SmartLink } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandTile } from '@/components/landing/brand-icon';
import { ProductCard } from '@/components/landing/product-card';
import { ClosingCta } from '@/components/landing/sections';
import { products } from '@/lib/catalog';
import { siteConfig } from '@/lib/site';

const youtube = siteConfig.social.find((s) => s.slug === 'youtube')?.href ?? 'https://youtube.com/@bigbrosai';

const resources = [
  { icon: BookOpen, title: 'Documentation', body: 'Setup guides and the full API reference for WhatsApp and email.', href: siteConfig.links.docs, cta: 'Open the docs' },
  { icon: PlayCircle, title: 'Video tutorials', body: 'Watch how to connect your number, build flows and run campaigns.', href: youtube, cta: 'Watch on YouTube', brand: 'youtube' as const },
  { icon: Calculator, title: 'WhatsApp pricing explained', body: 'Service windows, message categories and per-country rates in plain words.', href: '/pricing', cta: 'Read the guide' },
  { icon: Rocket, title: 'Getting started', body: 'Create a free workspace, link Meta Business Manager and send your first template.', href: '/products/whatsapp-business-api', cta: 'See the steps' },
  { icon: History, title: 'Changelog', body: 'Everything we’ve shipped recently, month by month.', href: '/changelog', cta: 'See what’s new' },
  { icon: ShieldCheck, title: 'Security', body: 'How we protect your account, data and customers.', href: '/security', cta: 'Learn more' },
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="Guides & resources"
          title="Learn to grow on WhatsApp."
          subtitle="Docs, video tutorials and plain-English guides to WhatsApp marketing, chatbots and the Business API."
          tight
        />
        <section className="pb-20">
          <Container>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((r, i) => (
                <Reveal as="li" key={r.title} delay={(i % 3) * 0.06}>
                  <SmartLink href={r.href} className="shine shine-soft shine-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                    {r.brand ? (
                      <BrandTile slug={r.brand} size={44} />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <r.icon className="h-5 w-5" />
                      </span>
                    )}
                    <h2 className="mt-5 text-lg font-bold tracking-tight">{r.title}</h2>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{r.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
                      {r.cta} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </SmartLink>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
        <section className="border-t border-border bg-card/50 py-20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <div>
                <Reveal>
                  <Kicker>Product guides</Kicker>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight">How each product works</h2>
                </Reveal>
              </div>
              <Reveal>
                <Link href="/products" className="hidden items-center gap-1 text-sm font-semibold text-brand-800 hover:underline sm:inline-flex">
                  All products <ArrowUpRight className="h-4 w-4" />
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
          </Container>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
