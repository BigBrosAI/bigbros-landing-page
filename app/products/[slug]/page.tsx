import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Tag } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { ProductCard, ProductGlyph } from '@/components/landing/product-card';
import { ProductVisual } from '@/components/landing/product-visual';
import { ClosingCta } from '@/components/landing/sections';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getProduct, products } from '@/lib/catalog';
import { absoluteUrl, siteConfig } from '@/lib/site';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.seo.title} | ${siteConfig.name}`, description: p.seo.description, url: absoluteUrl(`/products/${p.slug}`) },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = p.related.map(getProduct).filter(Boolean);

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
                { '@type': 'ListItem', position: 1, name: 'Products', item: absoluteUrl('/products') },
                { '@type': 'ListItem', position: 2, name: p.name, item: absoluteUrl(`/products/${p.slug}`) },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]}
        />

        {/* hero */}
        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />
          <Container className="relative grid items-center gap-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-28">
            <div>
              <Reveal>
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                  <Link href="/products" className="hover:text-foreground">
                    Products
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{p.name}</span>
                </nav>
              </Reveal>
              <Reveal delay={0.04} className="mt-6 flex items-center gap-3">
                <ProductGlyph p={p} size="lg" />
                <Kicker>{p.hero.eyebrow}</Kicker>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-6 font-display text-[2.4rem] font-bold leading-[1.04] tracking-[-0.04em] sm:text-[3.4rem]">{p.hero.title}</h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{p.hero.subtitle}</p>
              </Reveal>
              <Reveal delay={0.16} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={siteConfig.links.signup} size="xl" arrow className="rounded-full">
                  Start for free
                </ButtonLink>
                <ButtonLink href={siteConfig.links.bookDemo} size="xl" variant="outline" className="rounded-full">
                  Book a demo
                </ButtonLink>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {p.hero.chips.map((c) => (
                    <li key={c} className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-card/80 px-3 py-1.5 text-[13px] font-medium text-ink-600">
                      <Check className="h-3.5 w-3.5 text-brand-600" /> {c}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.15} y={36} className="relative">
              <ProductVisual visual={p.visual} />
            </Reveal>
          </Container>
        </section>

        {/* features */}
        <section className="border-t border-border py-20 sm:py-28">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <Kicker>Features</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.75rem] sm:leading-[1.08]">Everything in {p.name}.</h2>
              </Reveal>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f, i) => (
                <Reveal
                  as="li"
                  key={f.title}
                  delay={(i % 3) * 0.06}
                  className="group rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
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

        {/* how it works + use cases */}
        <section className="forest relative overflow-hidden py-20 sm:py-28">
          <div aria-hidden className="bg-grain-light absolute inset-0" />
          <Container className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <Kicker light>How it works</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.08]">Up and running in three steps.</h2>
              </Reveal>
              <ol className="mt-10 space-y-4">
                {p.steps.map((s, i) => (
                  <Reveal as="li" key={s.title} delay={i * 0.08} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-300 font-display text-sm font-bold text-forest">{i + 1}</span>
                    <span>
                      <span className="block font-semibold text-white">{s.title}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-white/65">{s.body}</span>
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>
            <div>
              <Reveal>
                <Kicker light>Use cases</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.08]">Built for real workflows.</h2>
              </Reveal>
              <ul className="mt-10 grid gap-4">
                {p.useCases.map((u, i) => (
                  <Reveal as="li" key={u.title} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="block font-semibold text-white">{u.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-white/65">{u.body}</span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.2} className="mt-6">
                <Link href="/pricing" className="group flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 text-forest">
                  <span className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-brand-700" />
                    <span>
                      <span className="block text-[12px] font-medium text-ink-500">Availability</span>
                      <span className="block font-semibold">{p.plans}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <Kicker>FAQ</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">{p.name}, answered.</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
                {p.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                    <AccordionTrigger className="py-5 text-left text-[17px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </Container>
        </section>

        {/* related */}
        <section className="border-t border-border bg-card/50 py-20 sm:py-24">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Works great with</h2>
              </Reveal>
              <Reveal>
                <Link href="/products" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 hover:underline">
                  All products <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} delay={i * 0.06}>
                  <ProductCard p={r} />
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
