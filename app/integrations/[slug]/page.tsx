import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, Lightbulb } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandTile } from '@/components/landing/brand-icon';
import { ProductCard } from '@/components/landing/product-card';
import { ItemIcon } from '@/components/site/item-icon';
import { ClosingCta } from '@/components/landing/sections';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getProduct } from '@/lib/catalog';
import { integrationPageBySlug, integrationPages } from '@/lib/integration-pages';
import { solutionBySlug } from '@/lib/solutions';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return integrationPages.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const it = integrationPageBySlug[slug];
  if (!it) return {};
  return pageMetadata({ title: it.seo.title, description: it.seo.description, path: `/integrations/${it.slug}` });
}

export default async function IntegrationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const it = integrationPageBySlug[slug];
  if (!it) notFound();
  const products = it.products.map(getProduct).filter(Boolean);
  const sols = it.solutions.map((s) => solutionBySlug[s]).filter(Boolean);
  const others = integrationPages.filter((o) => o.slug !== it.slug);

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Integrations', item: absoluteUrl('/integrations') },
                { '@type': 'ListItem', position: 2, name: it.name, item: absoluteUrl(`/integrations/${it.slug}`) },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: `How to connect ${it.name} to BigBrosAI`,
              step: it.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: it.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]}
        />

        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
          <div aria-hidden className="pointer-events-none absolute right-[8%] top-1/2 hidden h-72 w-72 -translate-y-[40%] lg:block">
            <svg className="absolute inset-0 h-full w-full text-brand-600/20" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="58" stroke="currentColor" strokeDasharray="2 5" />
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeDasharray="2 7" />
            </svg>
            <div className="animate-float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="block rotate-[-6deg] rounded-[2rem] bg-card p-5 shadow-lift">
                <BrandTile slug={it.brand} size={72} />
              </span>
            </div>
            <div className="animate-float absolute bottom-6 left-0" style={{ animationDelay: '-2.5s' }}>
              <span className="block rounded-2xl bg-card p-2.5 shadow-float">
                <BrandTile slug="whatsapp" size={36} />
              </span>
            </div>
          </div>
          <Container className="relative pb-16 pt-12 sm:pt-16">
            <Reveal>
              <Link href="/integrations" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> All integrations
              </Link>
            </Reveal>
            <Reveal delay={0.04} className="mt-6 flex items-center gap-3">
              <BrandTile slug={it.brand} size={44} />
              <Kicker>
                {it.name} · {it.category}
              </Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 max-w-2xl font-display text-[2.4rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl">{it.hero.title}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">{it.hero.subtitle}</p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.links.signup} size="lg" arrow className="rounded-full">
                Connect {it.name} free
              </ButtonLink>
              <ButtonLink href={siteConfig.links.bookDemo} size="lg" variant="outline" className="rounded-full">
                Book a demo
              </ButtonLink>
            </Reveal>
          </Container>
        </section>

        {/* overview */}
        <section className="pb-16">
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 [&>*]:min-w-0">
            <Reveal className="space-y-5 text-[17px] leading-[1.75] text-ink-600">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Why connect {it.name} to WhatsApp</h2>
              {it.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={0.06} className="h-fit rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <p className="flex items-center gap-2 font-semibold">
                <Lightbulb className="h-5 w-5 text-brand-600" /> Good to know
              </p>
              <ul className="mt-4 space-y-3">
                {it.goodToKnow.map((g) => (
                  <li key={g} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-600">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        <section className="border-t border-border bg-card/50 py-16 sm:py-20">
          <Container>
            <Kicker>What you can do</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">What {it.name} + BigBrosAI does</h2>
            <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {it.capabilities.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 0.04} className="flex gap-4 rounded-3xl border border-border bg-card p-6">
                  <ItemIcon icon={c.icon} brand={c.brand} />
                  <span>
                    <span className="block text-lg font-bold tracking-tight">{c.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-ink-600">{c.body}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <Container>
            <Kicker>Setup</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">How to connect {it.name}</h2>
            <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {it.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.05} className="relative rounded-3xl border border-border bg-card p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest font-bold text-lime-300">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        {(products.length > 0 || sols.length > 0) && (
          <section className="border-t border-border bg-card/50 py-16 sm:py-20">
            <Container>
              <Kicker>Works with</Kicker>
              {products.length > 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {products.map((p) => (
                    <li key={p!.slug}>
                      <ProductCard p={p!} className="h-full" />
                    </li>
                  ))}
                </ul>
              )}
              {sols.length > 0 && (
                <p className="mt-8 text-[15px] text-ink-600">
                  Popular with:{' '}
                  {sols.map((s, i) => (
                    <span key={s!.slug}>
                      {i > 0 && ', '}
                      <Link href={`/solutions/${s!.slug}`} className="font-semibold text-foreground underline underline-offset-4">
                        {s!.name.toLowerCase()}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </Container>
          </section>
        )}

        <section className="border-t border-border py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <Kicker>More integrations</Kicker>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/integrations/${o.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-shadow hover:shadow-lift"
                    >
                      <BrandTile slug={o.brand} size={24} /> {o.name} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker>FAQ</Kicker>
              <Accordion type="single" collapsible className="mt-4 divide-y divide-border border-y border-border">
                {it.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                    <AccordionTrigger className="py-4 text-left text-[16px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
