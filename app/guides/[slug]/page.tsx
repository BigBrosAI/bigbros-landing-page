import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, Clock } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { ClosingCta } from '@/components/landing/sections';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { guideBySlug, guides } from '@/lib/guides';
import { CategoryIcon } from '@/components/blog/category-icon';
import { KeyTakeaways } from '@/components/site/key-takeaways';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug[slug];
  if (!g) return {};
  return pageMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}` });
}

const isoDate = (s: string) => {
  const d = new Date(`${s} UTC`);
  return Number.isNaN(d.getTime()) ? s : d.toISOString().slice(0, 10);
};

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug[slug];
  if (!g) notFound();
  const more = guides.filter((o) => o.slug !== g.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={[
            breadcrumbLd([['Guides', '/guides'], [g.title, `/guides/${g.slug}`]]),
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: g.title,
              description: g.description,
              articleSection: g.category,
              inLanguage: 'en-IN',
              datePublished: isoDate(g.updated),
              dateModified: isoDate(g.updated),
              image: absoluteUrl('/og-image.png'),
              mainEntityOfPage: absoluteUrl(`/guides/${g.slug}`),
              author: { '@id': `${siteConfig.url}/#organization` },
              publisher: { '@id': `${siteConfig.url}/#organization` },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: g.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]}
        />

        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
          <Container className="relative max-w-4xl pb-12 pt-12 sm:pt-16">
            <Reveal>
              <Link href="/guides" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> All guides
              </Link>
            </Reveal>
            <Reveal delay={0.04} className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[13px] font-semibold text-brand-800 ring-1 ring-inset ring-brand-100 dark:bg-brand-900/40 dark:text-brand-200 dark:ring-brand-800">
                <CategoryIcon category={g.category} /> {g.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-600">
                <Clock className="h-3.5 w-3.5" /> {g.readMins} min read · Updated {g.updated}
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display text-[2.2rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl">{g.title}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">{g.intro}</p>
            </Reveal>
          </Container>
        </section>

        <section className="pb-20">
          <Container className="grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <nav aria-label="Contents" className="sticky top-24">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Contents</p>
                <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-[14px]">
                  {g.sections.map((s) => (
                    <li key={s.heading}>
                      <a href={`#${anchor(s.heading)}`} className="text-ink-600 transition-colors hover:text-foreground">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#faq" className="text-ink-600 transition-colors hover:text-foreground">
                      FAQ
                    </a>
                  </li>
                </ol>
              </nav>
            </aside>

            <article className="max-w-3xl">
              <KeyTakeaways items={g.takeaways} />
              {g.sections.map((s) => (
                <section key={s.heading} id={anchor(s.heading)} className="scroll-mt-24 pb-10">
                  <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="mt-4 text-[17px] leading-[1.8] text-ink-600">
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="mt-5 space-y-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-[16.5px] leading-[1.7] text-ink-600">
                          <Check className="mt-1.5 h-4 w-4 shrink-0 text-brand-600" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="my-4 flex flex-col items-start justify-between gap-4 rounded-3xl bg-forest p-7 text-white sm:flex-row sm:items-center">
                <div>
                  <p className="text-xl font-bold">Try it on BigBrosAI, free</p>
                  <p className="mt-1 text-white/70">Official WhatsApp Business API, a ₹50 signup bonus and 300 free emails a day.</p>
                </div>
                <ButtonLink href={siteConfig.links.signup} size="lg" arrow className="shrink-0 rounded-full bg-lime-300 text-forest hover:bg-lime-200">
                  Start for free
                </ButtonLink>
              </div>

              <section id="faq" className="scroll-mt-24 pt-10">
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">Frequently asked questions</h2>
                <Accordion type="single" collapsible className="mt-4 divide-y divide-border border-y border-border">
                  {g.faqs.map((f, i) => (
                    <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                      <AccordionTrigger className="py-4 text-left text-[16px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                      <AccordionContent className="pb-4 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <section className="pt-10">
                <h2 className="text-lg font-bold tracking-tight">Useful next steps</h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {g.related.map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-shadow hover:shadow-lift">
                        {label} <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          </Container>
        </section>

        <section className="border-t border-border bg-card/50 py-16">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight">More guides</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link href={`/guides/${m.slug}`} className="shine shine-soft shine-hover flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-lift">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">{m.category}</span>
                    <span className="mt-3 text-lg font-bold leading-snug tracking-tight">{m.title}</span>
                    <span className="mt-auto pt-4 text-[13px] text-ink-600">{m.readMins} min read</span>
                  </Link>
                </li>
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
