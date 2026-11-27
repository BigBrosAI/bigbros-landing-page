import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Info, Plug } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container, JsonLd } from '@/components/site/primitives';
import { PageHero } from '@/components/site/page-hero';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { ClosingCta } from '@/components/landing/sections';
import { BrandIcon } from '@/components/landing/brand-icon';
import { ItemIcon, brandFor } from '@/components/site/item-icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { competitorBySlug, competitors, switchSteps, usFeatures, usIntegrations, usYearCost } from '@/lib/compare';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = competitorBySlug[slug];
  if (!c) return {};
  return pageMetadata({ title: c.seo.title, description: c.seo.description, path: `/compare/${c.slug}` });
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

function Section({ kicker, title, intro, children, muted }: { kicker: string; title: string; intro?: React.ReactNode; children: React.ReactNode; muted?: boolean }) {
  return (
    <section className={muted ? 'border-t border-border bg-card/50 py-16 sm:py-20' : 'border-t border-border py-16 sm:py-20'}>
      <Container>
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-600">{intro}</p>}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = competitorBySlug[slug];
  if (!c) notFound();
  const others = competitors.filter((o) => o.slug !== c.slug);
  const shared = usIntegrations.filter((i) => c.integrations.some((t) => i.toLowerCase().startsWith(t.toLowerCase())));

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
                { '@type': 'ListItem', position: 1, name: 'Compare', item: absoluteUrl('/compare') },
                { '@type': 'ListItem', position: 2, name: `BigBrosAI vs ${c.name}`, item: absoluteUrl(`/compare/${c.slug}`) },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]}
        />
        <PageHero kicker={`BigBrosAI vs ${c.name}`} title={`Looking for a ${c.name} alternative?`} subtitle={c.intro} tight>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href={siteConfig.links.signup} size="lg" arrow className="rounded-full">
              Start for free
            </ButtonLink>
            <ButtonLink href={siteConfig.links.bookDemo} size="lg" variant="outline" className="rounded-full">
              Book a switch call
            </ButtonLink>
          </div>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap justify-center gap-2 text-[13px] font-medium">
            {[
              ['#glance', 'At a glance'],
              ['#cost', 'Cost'],
              ['#features', 'Features'],
              ['#integrations', 'Integrations'],
              ['#switch', 'Switching'],
              ['#faq', 'FAQ'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full border border-border bg-card/80 px-3 py-1.5 text-ink-600 backdrop-blur transition-colors hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
        </PageHero>

        {/* at a glance */}
        <section id="glance" className="scroll-mt-24 pb-16">
          <Container>
            <Reveal>
              <div className="overflow-x-auto rounded-3xl border border-border bg-card">
                <table className="w-full min-w-[640px] text-left text-[15px]">
                  <caption className="sr-only">BigBrosAI and {c.name} compared</caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="w-[28%] px-5 py-4 font-mono text-[11.5px] font-medium uppercase tracking-[0.16em] text-ink-600">
                        At a glance
                      </th>
                      <th scope="col" className="bg-brand-50/70 px-5 py-4 text-base font-bold text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
                        BigBrosAI
                      </th>
                      <th scope="col" className="px-5 py-4 text-base font-bold">
                        {c.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.rows.map((r) => (
                      <tr key={r.label} className="border-b border-border last:border-0">
                        <th scope="row" className="px-5 py-4 font-semibold">
                          {r.label}
                        </th>
                        <td className="bg-brand-50/40 px-5 py-4 dark:bg-brand-900/15">{r.us}</td>
                        <td className="px-5 py-4 text-ink-600">{r.them}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope="row" className="px-5 py-4 font-semibold">
                        Integrations listed
                      </th>
                      <td className="bg-brand-50/40 px-5 py-4 dark:bg-brand-900/15">{usIntegrations.length}, including Shopify, WooCommerce and Google Sheets</td>
                      <td className="px-5 py-4 text-ink-600">{c.integrations.length}+, see the full list below</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 flex items-start gap-2 text-sm text-ink-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {c.name} details are from{' '}
                  <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-4 hover:text-foreground">
                    their public pricing page
                  </a>
                  , checked on {c.checkedOn}. Prices change, so check their page for the latest. BigBrosAI prices exclude GST, and WhatsApp message
                  charges are billed separately on every platform.
                </span>
              </p>
            </Reveal>

            <Reveal className="mt-14 max-w-3xl space-y-5 text-[17px] leading-[1.75] text-ink-600">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                BigBrosAI vs {c.name}: the full picture
              </h2>
              {c.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>

            <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {c.reasons.map((r, i) => (
                <Reveal as="li" key={r.title} delay={i * 0.05} className="rounded-3xl border border-border bg-card p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{r.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        {/* cost */}
        <div id="cost" className="scroll-mt-16">
          <Section
            kicker="What it costs"
            title="Your first year, platform fee only"
            intro="A simple way to compare: what each entry plan costs over 12 months, before GST and WhatsApp message charges. Message charges depend on how much you send, so add them with the calculator."
            muted
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Reveal className="rounded-3xl border-2 border-brand-600 bg-card p-7">
                <p className="text-sm font-semibold text-brand-700">BigBrosAI · {usYearCost.plan}</p>
                <p className="mt-3 font-display text-5xl font-bold tracking-tight">{inr(usYearCost.amount)}</p>
                <p className="mt-2 text-[15px] text-ink-600">Owner + 4 agents. Chatbot flows are an add-on (5 for ₹2,199). Starter is free if you only need live chat and templates.</p>
              </Reveal>
              <Reveal delay={0.06} className="rounded-3xl border border-border bg-card p-7">
                <p className="text-sm font-semibold text-ink-600">
                  {c.name} · {c.yearCost ? c.yearCost.plan : 'entry plan'}
                </p>
                {c.yearCost ? (
                  <>
                    <p className="mt-3 font-display text-5xl font-bold tracking-tight">{inr(c.yearCost.amount)}</p>
                    <p className="mt-2 text-[15px] text-ink-600">Based on {c.yearCost.basis}.</p>
                  </>
                ) : (
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                    {c.name}’s plan prices weren’t shown on their pricing page when we checked, so we haven’t estimated a yearly cost. Compare add-ons and message
                    rates in the table above.
                  </p>
                )}
              </Reveal>
            </div>
            <p className="mt-6 text-[15px] text-ink-600">
              Want the full picture with messages?{' '}
              <Link href="/tools/whatsapp-pricing-calculator" className="font-semibold text-foreground underline underline-offset-4">
                Use the free WhatsApp pricing calculator
              </Link>{' '}
              or read{' '}
              <Link href="/guides/whatsapp-business-api-pricing-india" className="font-semibold text-foreground underline underline-offset-4">
                how WhatsApp API pricing works in India
              </Link>
              .
            </p>
          </Section>
        </div>

        {/* features */}
        <div id="features" className="scroll-mt-16">
          <Section kicker="Features" title="Everything you get with BigBrosAI" intro="One platform for WhatsApp, automation, your team inbox, payments and email.">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {usFeatures.map((g, i) => (
                <Reveal as="li" key={g.group} delay={(i % 3) * 0.05} className="rounded-3xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <ItemIcon icon={g.icon} brand={g.brand} tone="soft" />
                    <h3 className="text-lg font-bold tracking-tight">{g.group}</h3>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[15px] leading-snug text-ink-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </Section>
        </div>

        {/* integrations */}
        <div id="integrations" className="scroll-mt-16">
          <Section
            kicker="Integrations"
            title={`Integrations: BigBrosAI vs ${c.name}`}
            intro={
              <>
                Both connect to the tools most Indian businesses use{shared.length ? `, including ${shared.slice(0, 3).join(', ')}` : ''}. {c.name} lists a longer catalogue today,
                so check that the apps you rely on are covered.
              </>
            }
            muted
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Reveal className="rounded-3xl border border-border bg-card p-6">
                <p className="flex items-center gap-2 text-lg font-bold tracking-tight">
                  <Plug className="h-5 w-5 text-brand-600" /> BigBrosAI
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {usIntegrations.map((i) => (
                    <li key={i} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[13.5px] font-medium text-brand-800 ring-1 ring-inset ring-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:ring-brand-800">
                      {brandFor(i) ? <BrandIcon slug={brandFor(i)!} className="h-3.5 w-3.5" /> : <Plug className="h-3.5 w-3.5 opacity-60" />}
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[14.5px] text-ink-600">
                  Anything else connects through the REST API and webhooks.{' '}
                  <Link href="/integrations" className="font-semibold text-foreground underline underline-offset-4">
                    See how each integration works
                  </Link>
                  .
                </p>
              </Reveal>
              <Reveal delay={0.06} className="rounded-3xl border border-border bg-card p-6">
                <p className="flex items-center gap-2 text-lg font-bold tracking-tight">
                  <Plug className="h-5 w-5 text-ink-600" /> {c.name}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.integrations.map((i) => (
                    <li key={i} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-[13.5px] font-medium text-ink-600">
                      {brandFor(i) && <BrandIcon slug={brandFor(i)!} className="h-3.5 w-3.5" />}
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[14.5px] text-ink-600">
                  From{' '}
                  <a href={c.integrationsUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-4 hover:text-foreground">
                    {c.name}’s website
                  </a>
                  , checked on {c.checkedOn}. Some may be paid add-ons or limited to higher plans.
                </p>
              </Reveal>
            </div>
          </Section>
        </div>

        {/* who it's for */}
        <Section kicker="Which one is right for you" title="An honest take">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Reveal className="rounded-3xl bg-forest p-7 text-white">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-lime-300">Choose BigBrosAI if</p>
              <p className="mt-3 text-lg leading-relaxed">{c.bestFor.us}</p>
            </Reveal>
            <Reveal delay={0.06} className="rounded-3xl border border-border bg-card p-7">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-600">Choose {c.name} if</p>
              <p className="mt-3 text-lg leading-relaxed text-ink-600">{c.bestFor.them}</p>
            </Reveal>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold tracking-tight">Where {c.name} may suit you better</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {c.theirStrengths.map((s) => (
                <li key={s} className="rounded-2xl border border-border bg-card p-4 text-[15px] leading-relaxed text-ink-600">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* switching */}
        <div id="switch" className="scroll-mt-16">
          <Section kicker="Switching" title={`Moving from ${c.name} in four steps`} muted>
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {switchSteps.map((st, i) => (
                <Reveal as="li" key={st.title} delay={i * 0.05} className="rounded-3xl border border-border bg-card p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 font-bold text-white">{i + 1}</span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{st.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{st.body}</p>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8">
              <ButtonLink href={siteConfig.links.bookDemo} arrow className="rounded-full">
                Book a free switch call
              </ButtonLink>
            </div>
          </Section>
        </div>

        {/* faq */}
        <section id="faq" className="scroll-mt-16 border-t border-border py-16 sm:py-20">
          <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <Kicker>FAQ</Kicker>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em]">BigBrosAI vs {c.name}: common questions</h2>
              <p className="mt-4 text-[15px] text-ink-600">More comparisons:</p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/compare/${o.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-shadow hover:shadow-lift"
                    >
                      vs {o.name} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
              {c.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                  <AccordionTrigger className="py-4 text-left text-[16px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="pb-4 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
          <Container>
            <p className="mt-12 text-xs text-ink-600">
              {competitors.map((x) => x.name).join(', ')} are trademarks of their respective owners. BigBrosAI is not affiliated with or endorsed by them.
            </p>
          </Container>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
