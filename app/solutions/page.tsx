import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Container } from '@/components/site/primitives';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { ClosingCta } from '@/components/landing/sections';
import { solutions } from '@/lib/solutions';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'WhatsApp Business Solutions by Industry',
  description:
    'WhatsApp automation for clinics, coaching institutes, real estate, restaurants and e-commerce: booking bots, lead qualification, reminders and broadcasts.',
  path: '/solutions',
});

export default function SolutionsIndex() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="Solutions"
          title="WhatsApp, set up for your kind of business"
          subtitle="Ready-made flows and ideas for the businesses we work with most. Start from one and change anything."
          tight
        />
        <section className="pb-20">
          <Container>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 0.04}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="shine shine-soft shine-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lift"
                  >
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-lime-300 transition-transform duration-500 group-hover:-rotate-6">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <span className="flex items-center gap-1.5 text-lg font-bold tracking-tight">
                      {s.name}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.hero.title}</span>
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
