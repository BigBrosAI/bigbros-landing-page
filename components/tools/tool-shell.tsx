import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ProductGlyph } from '@/components/landing/product-card';
import { getProduct } from '@/lib/catalog';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { tools, type Tool } from '@/lib/tools';
import { absoluteUrl, siteConfig } from '@/lib/site';

/** Page frame for a free tool: header, the tool itself, how-to, FAQ, more tools and a CTA. */
export function ToolShell({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  const others = tools.filter((t) => t.slug !== tool.slug).slice(0, 3);
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: tool.name,
              url: absoluteUrl(`/tools/${tool.slug}`),
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
              publisher: { '@id': `${siteConfig.url}/#organization` },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: tool.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]}
        />
        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
          {/* graphic: the tool's icon on a forest tile inside orbit rings */}
          <div aria-hidden className="pointer-events-none absolute right-[6%] top-1/2 hidden h-72 w-72 -translate-y-[40%] lg:block">
            <svg className="absolute inset-0 h-full w-full text-brand-600/20" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="58" stroke="currentColor" strokeDasharray="2 5" />
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeDasharray="2 7" />
            </svg>
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] items-center justify-center rounded-[2rem] bg-forest text-lime-300 shadow-lift">
              <tool.icon className="h-12 w-12" />
            </div>
            <div className="animate-float absolute left-0 top-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-semibold shadow-float">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600" /> 100% free
              </span>
            </div>
            <div className="animate-float absolute bottom-10 right-0" style={{ animationDelay: '-2.5s' }}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-semibold shadow-float">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300 ring-1 ring-forest/20" /> No signup
              </span>
            </div>
          </div>
          <Container className="relative pb-10 pt-12 sm:pt-16">
            <Reveal>
              <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> All free tools
              </Link>
            </Reveal>
            <Reveal delay={0.04} className="mt-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                <tool.icon className="h-6 w-6" />
              </span>
              <Kicker>Free tool</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display text-[2.3rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:max-w-2xl">{tool.name}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600 lg:max-w-xl">{tool.intro}</p>
            </Reveal>
          </Container>
        </section>

        <section className="pb-16">
          <Container>
            {children}
            <aside
              aria-label="Do more with BigBrosAI"
              className="mt-8 flex flex-col gap-5 rounded-3xl border border-brand-100 bg-brand-50/60 p-6 dark:border-brand-900/50 dark:bg-brand-900/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                {getProduct(tool.upsell.product) && <ProductGlyph p={getProduct(tool.upsell.product)!} />}
                <div>
                  <p className="text-lg font-bold tracking-tight">{tool.upsell.title}</p>
                  <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                    {tool.upsell.body}{' '}
                    <Link href={`/products/${tool.upsell.product}`} className="font-semibold text-foreground underline underline-offset-4">
                      See how
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
                <ButtonLink href={siteConfig.links.signup} arrow className="rounded-full">
                  Try it free
                </ButtonLink>
                <span className="text-xs text-ink-600">Free plan · ₹50 signup bonus</span>
              </div>
            </aside>
          </Container>
        </section>

        <section className="border-t border-border py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <Kicker>How it works</Kicker>
              <ol className="mt-6 space-y-3">
                {tool.how.map((s, i) => (
                  <li key={s} className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-[15px]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <Kicker>FAQ</Kicker>
              <Accordion type="single" collapsible className="mt-4 divide-y divide-border border-y border-border">
                {tool.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                    <AccordionTrigger className="py-4 text-left text-[16px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-4 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>

        <section className="border-t border-border bg-card/50 py-16">
          <Container>
            <h2 className="text-2xl font-bold tracking-tight">More free WhatsApp tools</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {others.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tools/${t.slug}`} className="shine shine-soft shine-hover group flex h-full items-start gap-3 rounded-3xl border border-border bg-card p-5 transition-shadow hover:shadow-lift">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 font-semibold">
                        {t.name} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-600">{t.short}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-forest p-7 text-white sm:flex-row sm:items-center">
              <div>
                <p className="text-xl font-bold">Ready for more than a link?</p>
                <p className="mt-1 text-white/70">Broadcasts, chatbots, a shared inbox and payments — on the official WhatsApp API. Free to start.</p>
              </div>
              <ButtonLink href={siteConfig.links.signup} size="lg" arrow className="shrink-0 rounded-full bg-lime-300 text-forest hover:bg-lime-200">
                Start for free
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
