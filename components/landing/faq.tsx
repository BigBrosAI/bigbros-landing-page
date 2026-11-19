import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Container, JsonLd, SmartLink } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { siteConfig } from '@/lib/site';

export const faqs = [
  {
    q: 'Is BigBrosAI built on the official WhatsApp Business API?',
    a: 'Yes. BigBrosAI uses the official WhatsApp Business Platform from Meta, so your number gets a verified business profile, approved message templates and reliable delivery.',
  },
  {
    q: 'Can several people reply from the same WhatsApp number?',
    a: 'Yes. Your whole team works from one shared live-chat inbox. Conversations can be assigned automatically or handed between agents, with notes and full history on every chat.',
  },
  {
    q: 'What kinds of campaigns can I send?',
    a: 'You can broadcast to a saved audience, upload a CSV of contacts, or trigger messages from your own systems through the API. Campaigns can require approval before they go out.',
  },
  {
    q: 'Do I need to code to build a chatbot?',
    a: 'No. Chatbot flows are built on a visual canvas with triggers, AI replies, conditions and actions. A conversation can be handed to a live agent at any point.',
  },
  {
    q: 'Which tools does it connect to?',
    a: 'Shopify, WooCommerce and Google Sheets, plus WhatsApp Pay for payments, Meta click-to-WhatsApp ads and email. Developers can also use the REST API and webhooks.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes — the Starter plan is free, so you can set up your workspace and try the platform before upgrading.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-t border-border py-24 sm:py-32">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <Kicker>FAQ</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              Something else on your mind?{' '}
              <SmartLink href={siteConfig.links.contactSales} className="font-semibold text-brand-800 underline-offset-4 hover:underline">
                Talk to our team
              </SmartLink>
              .
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-0">
                <AccordionTrigger className="py-5 text-left text-[17px] font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-ink-600">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
