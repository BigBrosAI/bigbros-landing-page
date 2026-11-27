import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Container } from '@/components/site/primitives';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { ClosingCta } from '@/components/landing/sections';
import { guides } from '@/lib/guides';
import { CategoryIcon } from '@/components/blog/category-icon';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'WhatsApp for Business Guides: Pricing, Chatbots, Templates & Broadcasts',
  description:
    'Practical guides to the WhatsApp Business API for Indian businesses: pricing, app vs API, building chatbots, template approval, broadcasts and abandoned cart recovery.',
  path: '/guides',
});

export default function GuidesIndex() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="Guides"
          title={
            <>
              Learn WhatsApp for business, <span className="text-gradient-brand">the practical way</span>.
            </>
          }
          subtitle="Plain-English guides on pricing, chatbots, templates and campaigns, written for Indian businesses."
          tight
        />
        <section className="pb-20">
          <Container>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((g, i) => (
                <Reveal as="li" key={g.slug} delay={(i % 3) * 0.05}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="shine shine-soft shine-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lift"
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">{g.category}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 dark:bg-brand-900/40 dark:text-brand-200 dark:ring-brand-800">
                        <CategoryIcon category={g.category} className="h-[18px] w-[18px]" />
                      </span>
                    </span>
                    <span className="mt-3 text-xl font-bold leading-snug tracking-tight">{g.title}</span>
                    <span className="mt-3 text-[15px] leading-relaxed text-ink-600">{g.description}</span>
                    <span className="mt-auto pt-5 text-[13px] font-medium text-ink-600">{g.readMins} min read</span>
                  </Link>
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
