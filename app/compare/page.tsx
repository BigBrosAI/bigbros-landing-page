import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Container } from '@/components/site/primitives';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { ClosingCta } from '@/components/landing/sections';
import { competitors } from '@/lib/compare';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Compare WhatsApp Business API Platforms: BigBrosAI vs Wati, Interakt, AiSensy',
  description:
    'Side-by-side comparisons of BigBrosAI with Wati, Interakt and AiSensy: free plans, monthly prices, chatbots, team seats and WhatsApp message rates in India.',
  path: '/compare',
});

export default function CompareIndex() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero
          kicker="Compare"
          title="How BigBrosAI compares"
          subtitle="Honest, side-by-side comparisons with other WhatsApp Business API platforms, using each vendor’s public pricing."
          tight
        />
        <section className="pb-20">
          <Container>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {competitors.map((c, i) => (
                <Reveal as="li" key={c.slug} delay={i * 0.05}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="shine shine-soft shine-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lift"
                  >
                    <span className="flex items-center gap-1.5 text-lg font-bold tracking-tight">
                      BigBrosAI vs {c.name}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-2 text-[15px] leading-relaxed text-ink-600">{c.intro}</span>
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
