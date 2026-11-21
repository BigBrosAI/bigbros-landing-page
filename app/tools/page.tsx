import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { ClosingCta } from '@/components/landing/sections';
import { pageMetadata } from '@/lib/seo';
import { tools } from '@/lib/tools';

export const metadata = pageMetadata({
  title: 'Free WhatsApp Tools for Business — 10 Tools, No Signup',
  description: 'Free WhatsApp tools: link and QR code generators, template builder, bulk links, contact list cleaner, text formatter, pricing and ROI calculators, chat button and message templates.',
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero scene="tools" kicker="Free tools" title="Free WhatsApp tools for your business." subtitle="No signup, no cost. Create chat links and QR codes, build and check templates, clean contact lists, estimate costs and ROI, and add WhatsApp to your website." tight />
        <section className="pb-24">
          <Container>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t, i) => (
                <Reveal as="li" key={t.slug} delay={(i % 3) * 0.06} className={i === 0 || i === tools.length - 1 ? 'lg:col-span-2' : ''}>
                  <Link href={`/tools/${t.slug}`} className="shine shine-soft shine-hover group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <t.icon className="h-6 w-6" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold tracking-tight">{t.name}</h2>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-600">{t.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
                      Use tool <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
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
