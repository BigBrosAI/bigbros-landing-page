import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ChevronRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { ProductCard } from '@/components/landing/product-card';
import { ClosingCta } from '@/components/landing/sections';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getProduct } from '@/lib/catalog';
import { SolutionChat } from '@/components/landing/solution-chat';
import { ItemIcon } from '@/components/site/item-icon';
import { solutionBySlug, solutions } from '@/lib/solutions';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionBySlug[slug];
  if (!s) return {};
  return pageMetadata({ title: s.seo.title, description: s.seo.description, path: `/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionBySlug[slug];
  if (!s) notFound();
  const products = s.products.map(getProduct).filter(Boolean);
  const others = solutions.filter((o) => o.slug !== s.slug);

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={[
            breadcrumbLd([['Solutions', '/solutions'], [s.name, `/solutions/${s.slug}`]]),
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: `WhatsApp automation for ${s.name.toLowerCase()}`,
              serviceType: 'WhatsApp Business API platform',
              description: s.seo.description,
              url: absoluteUrl(`/solutions/${s.slug}`),
              areaServed: { '@type': 'Country', name: 'India' },
              provider: { '@id': `${siteConfig.url}/#organization` },
              audience: { '@type': 'BusinessAudience', name: s.name },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]}
        />

        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
          {/* soft glow and orbit rings behind the phone */}
          <div aria-hidden className="pointer-events-none absolute right-[-10%] top-[8%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.22),transparent)] lg:right-[2%]" />
          <svg aria-hidden className="pointer-events-none absolute right-[-6%] top-[14%] hidden h-[36rem] w-[36rem] text-brand-600/15 lg:right-[6%] lg:block" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="62" stroke="currentColor" strokeDasharray="2 5" />
            <circle cx="100" cy="100" r="96" stroke="currentColor" strokeDasharray="2 7" />
          </svg>

          <Container className="relative grid grid-cols-1 items-center gap-14 pb-20 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:pb-24">
            <div className="max-w-xl">
              <Reveal>
                <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[13px] font-medium text-ink-600 shadow-sm backdrop-blur">
                  <Link href="/solutions" className="hover:text-foreground">
                    Solutions
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                  <span aria-current="page" className="inline-flex items-center gap-1.5 text-foreground">
                    <s.icon className="h-3.5 w-3.5 text-brand-600" /> {s.short}
                  </span>
                </nav>
              </Reveal>
              <Reveal delay={0.04} className="mt-7">
                <Kicker>WhatsApp for {s.name.toLowerCase()}</Kicker>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[3.6rem] lg:text-[4rem]">
                  {s.hero.title.endsWith(s.hero.accent) ? (
                    <>
                      {s.hero.title.slice(0, -s.hero.accent.length)}
                      <span className="text-gradient-brand">{s.hero.accent}</span>
                    </>
                  ) : (
                    s.hero.title
                  )}
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">{s.hero.subtitle}</p>
              </Reveal>
              <Reveal delay={0.16} className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href={siteConfig.links.signup} size="lg" arrow className="h-12 rounded-full px-6 text-[15px]">
                  Start for free
                </ButtonLink>
                <ButtonLink href={siteConfig.links.bookDemo} size="lg" variant="outline" className="h-12 rounded-full bg-card/80 px-6 text-[15px]">
                  Book a demo
                </ButtonLink>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-6 text-[13.5px] font-medium text-ink-600">
                  {[
                    { icon: ShieldCheck, label: 'Official WhatsApp Business API' },
                    { icon: Sparkles, label: 'Build flows with AI' },
                    { icon: Zap, label: 'Free plan to start' },
                  ].map((b) => (
                    <li key={b.label} className="flex items-center gap-2">
                      <b.icon className="h-4 w-4 text-brand-600" />
                      {b.label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <SolutionChat chat={s.chat} />
          </Container>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <Container>
            <Reveal className="max-w-3xl space-y-5 text-[17px] leading-[1.75] text-ink-600">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">How WhatsApp helps {s.name.toLowerCase()}</h2>
              {s.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>
          </Container>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <Container>
            <Kicker>Sound familiar?</Kicker>
            <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {s.pains.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.05} className="rounded-3xl border border-border bg-card p-6">
                  <ItemIcon icon={p.icon} brand={p.brand} tone="soft" className="bg-red-50 text-red-600 ring-red-100 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900" />
                  <h2 className="mt-4 text-lg font-bold tracking-tight">{p.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{p.body}</p>
                </Reveal>
              ))}
            </ul>

            <div className="mt-16">
              <Kicker>What you can automate</Kicker>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {s.useCases.map((u, i) => (
                  <Reveal as="li" key={u.title} delay={i * 0.04} className="flex gap-4 rounded-3xl border border-border bg-card p-6">
                    <ItemIcon icon={u.icon} brand={u.brand} />
                    <span>
                      <span className="block text-lg font-bold tracking-tight">{u.title}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-ink-600">{u.body}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-6 text-[15px] text-ink-600">
                Need message ideas?{' '}
                <Link href="/tools/whatsapp-business-message-templates" className="font-semibold text-foreground underline underline-offset-4">
                  Browse free greeting and away message templates
                </Link>
                .
              </p>
            </div>
          </Container>
        </section>

        {products.length > 0 && (
          <section className="border-t border-border bg-card/50 py-16 sm:py-20">
            <Container>
              <Kicker>Products you’ll use</Kicker>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {products.map((p) => (
                  <li key={p!.slug}>
                    <ProductCard p={p!} className="h-full" />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        <section className="border-t border-border py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <Kicker>Other industries</Kicker>
              <ul className="mt-5 flex flex-wrap gap-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/solutions/${o.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-shadow hover:shadow-lift"
                    >
                      {o.short} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Kicker>FAQ</Kicker>
              <Accordion type="single" collapsible className="mt-4 divide-y divide-border border-y border-border">
                {s.faqs.map((f, i) => (
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
