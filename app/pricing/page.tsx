import type { Metadata } from 'next';
import { Check, Mail, MessageSquareText, Minus } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { ClosingCta } from '@/components/landing/sections';
import { PlanCards } from '@/components/pricing/plan-cards';
import { CountryRates } from '@/components/pricing/country-rates';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { pageMetadata } from '@/lib/seo';
import { softwareApplicationLd } from '@/lib/structured-data';
import { comparison, metaRates, plans, pricingFaqs, terminology } from '@/lib/plans';

export const metadata: Metadata = pageMetadata({
  title: 'Pricing — Simple, Transparent WhatsApp API Plans',
  description:
    'Start free with the WhatsApp Business API, a ₹50 signup bonus and 300 free emails a day. Basic ₹999/month, Pro ₹2,199/month, Enterprise custom. Save 10% yearly.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd data={softwareApplicationLd()} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: pricingFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          }}
        />
        <PageHero scene="pricing"
          kicker="Transparent pricing"
          title={
            <>
              Simple pricing. <span className="text-gradient-brand">No hidden fees.</span>
            </>
          }
          subtitle="Start free, scale as you grow and cancel anytime. Platform fees are flat — WhatsApp messages are billed at Meta’s rates with no markup."
          tight
        />

        <section className="pb-20">
          <Container>
            <PlanCards />
            <Reveal className="mt-6 grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
                <Mail className="h-5 w-5 shrink-0 text-brand-700" />
                <p className="text-sm">
                  <b>Email:</b> 300 free emails / day on every plan · ₹0.125 / email after
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
                <MessageSquareText className="h-5 w-5 shrink-0 text-brand-700" />
                <p className="text-sm">
                  <b>SMS (coming soon):</b> OTP, alerts & promotions · ₹0.14–0.20 / SMS, volume based
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Meta rates */}
        <section className="forest relative overflow-hidden py-16 sm:py-20">
          <div aria-hidden className="bg-grain-light absolute inset-0" />
          <Container className="relative">
            <Reveal>
              <Kicker light>WhatsApp message rates · India</Kicker>
            </Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metaRates.map((r, i) => (
                <Reveal as="li" key={r.label} delay={i * 0.06} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="text-sm font-medium text-white/60">{r.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-white">{r.value}</p>
                  <p className="mt-1 text-[13px] text-white/55">{r.note}</p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-white/50">Per delivered message. Charged by Meta, passed through without markup.</p>
          </Container>
        </section>

        {/* comparison */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <Kicker className="justify-center">Compare plans</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.75rem] sm:leading-[1.08]">Every feature, side by side.</h2>
              </Reveal>
            </div>
            <Reveal className="mt-12 overflow-x-auto rounded-3xl border border-border bg-card shadow-card">
              <table className="w-full min-w-[46rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="w-[34%] px-5 py-4 font-display text-base font-bold">Features</th>
                    {plans.map((p) => (
                      <th key={p.id} className={`px-4 py-4 text-center font-display text-base font-bold ${p.popular ? 'bg-brand-50 text-brand-900' : ''}`}>
                        {p.name}
                        <span className="block font-sans text-[12px] font-medium text-muted-foreground">
                          {p.monthly === null ? 'Custom' : p.monthly === 0 ? 'Free' : `₹${p.monthly.toLocaleString('en-IN')}/mo`}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                {comparison.map((g) => (
                  <tbody key={g.group}>
                    <tr>
                      <td colSpan={5} className="bg-muted/50 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-800">
                        {g.group}
                      </td>
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r.label} className="border-t border-border">
                        <td className="px-5 py-3.5">
                          <span className="font-medium">{r.label}</span>
                          {r.hint && <span className="block text-[12px] text-muted-foreground">{r.hint}</span>}
                        </td>
                        {r.values.map((v, i) => (
                          <td key={i} className={`px-4 py-3.5 text-center ${plans[i].popular ? 'bg-brand-50/50' : ''}`}>
                            {v === true ? (
                              <Check className="mx-auto h-4 w-4 text-brand-600" aria-label="Included" />
                            ) : v === false ? (
                              <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" aria-label="Not included" />
                            ) : (
                              <span className="text-[13px] text-ink-600">{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </Reveal>
          </Container>
        </section>

        {/* country rates */}
        <section className="border-t border-border bg-card/50 py-20 sm:py-28">
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 [&>*]:min-w-0">
            <div>
              <Reveal>
                <Kicker>Country-wise rates</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">What a message costs, wherever your customers are.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-lg leading-relaxed text-ink-600">
                  Meta charges per delivered template message based on the recipient’s country. Service conversations are always free.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <CountryRates />
            </Reveal>
          </Container>
        </section>

        {/* terminology */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <Kicker>Pricing terms</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">WhatsApp pricing, made easy.</h2>
              </Reveal>
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {terminology.map((t, i) => (
                <Reveal as="li" key={t.title} delay={(i % 3) * 0.06} className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{t.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <Kicker>Pricing FAQ</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">Questions about billing?</h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
                {pricingFaqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                    <AccordionTrigger className="py-5 text-left text-[17px] font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </Container>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
