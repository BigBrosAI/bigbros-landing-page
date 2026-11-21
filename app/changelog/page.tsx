import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { ClosingCta } from '@/components/landing/sections';
import { cn } from '@/lib/utils';

/* Highlights compiled from the BigBrosAI dashboard's release history. */
const releases: { month: string; items: { tag: 'New' | 'Improved'; title: string; body: string }[] }[] = [
  {
    month: 'November 2026',
    items: [
      { tag: 'New', title: 'Team access editor', body: 'Choose exactly what each teammate can see and do; the dashboard adapts to each member’s access.' },
      { tag: 'Improved', title: 'Role-based live chat', body: 'Agent-only live chat, cleaner chat assignment and team actions for support teams.' },
    ],
  },
  {
    month: 'October 2026',
    items: [
      { tag: 'New', title: 'AI flow builder', body: 'Describe a chatbot in plain words and let AI build the flow for you, then edit it on the canvas.' },
      { tag: 'New', title: 'Apps', body: 'A home for integrations — connect your store, sheets and other tools from one place.' },
      { tag: 'New', title: 'Wallet top-up', body: 'Add money to your wallet from the dashboard to pay for messages.' },
      { tag: 'Improved', title: 'Analytics', body: 'A redesigned analytics page for campaign and conversation performance.' },
      { tag: 'Improved', title: 'Email dashboard & SMTP', body: 'SMTP credentials and a refreshed email dashboard for the Email API.' },
      { tag: 'Improved', title: 'WhatsApp Flows', body: 'Smoother WhatsApp Flows (forms) setup and handling.' },
      { tag: 'New', title: 'USD billing', body: 'International accounts can be charged in US dollars.' },
    ],
  },
  {
    month: 'September 2026',
    items: [
      { tag: 'New', title: 'Email marketing', body: 'Send email campaigns alongside WhatsApp from the same contacts.' },
      { tag: 'New', title: 'Multi-currency', body: 'Wallets and pricing in more than one currency.' },
      { tag: 'Improved', title: 'Agent details in live chat', body: 'See which agent is handling each conversation.' },
    ],
  },
  {
    month: 'July 2026',
    items: [
      { tag: 'New', title: 'API Call step in flows', body: 'Call your own server mid-flow and use the reply in the conversation.' },
      { tag: 'New', title: 'AI messages in flows', body: 'Let AI answer inside a chatbot flow.' },
      { tag: 'Improved', title: 'Campaigns redesign', body: 'A cleaner campaigns page with steps, filters and status at a glance.' },
      { tag: 'New', title: 'International messaging charges', body: 'Message customers outside India at Meta’s country rates.' },
    ],
  },
  {
    month: 'June 2026',
    items: [
      { tag: 'New', title: 'WhatsApp Pay', body: 'Collect payments inside WhatsApp conversations.' },
      { tag: 'New', title: 'QR campaigns', body: 'Start chatbot flows from a QR code.' },
      { tag: 'New', title: 'Meta Ads', body: 'Run click-to-WhatsApp ads and route leads into BigBrosAI.' },
      { tag: 'New', title: 'WhatsApp coexistence', body: 'Keep using the WhatsApp Business app on the same number as the API.' },
      { tag: 'Improved', title: 'Flow builder redesign', body: 'New node design, flow list with stats and a how-it-works guide.' },
    ],
  },
  {
    month: 'May 2026',
    items: [
      { tag: 'New', title: 'AI template generator', body: 'Draft WhatsApp templates with AI and submit them for approval.' },
      { tag: 'New', title: 'Video and location templates', body: 'Send templates with video headers or a location.' },
      { tag: 'New', title: 'Audiences', body: 'Build reusable audiences for campaigns, with import history.' },
      { tag: 'New', title: 'Plans & subscriptions', body: 'Self-serve plans with upgrades and limits.' },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero scene="changelog" kicker="Changelog" title="What’s new in BigBrosAI." subtitle="The features and improvements we’ve shipped, month by month." tight />
        <section className="pb-24">
          <Container className="max-w-4xl">
            <ol className="relative border-l border-border pl-8 sm:pl-10">
              {releases.map((r, i) => (
                <Reveal as="li" key={r.month} delay={Math.min(i, 3) * 0.04} className="relative pb-14 last:pb-0">
                  <span className={cn('absolute -left-[2.45rem] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background sm:-left-[2.95rem]', i === 0 ? 'bg-brand-600' : 'bg-border')} />
                  <h2 className="font-display text-2xl font-bold tracking-tight">{r.month}</h2>
                  <ul className="mt-5 space-y-3">
                    {r.items.map((it) => (
                      <li key={it.title} className="rounded-2xl border border-border bg-card p-5">
                        <div className="flex items-center gap-2">
                          <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-bold', it.tag === 'New' ? 'bg-brand-50 text-brand-800' : 'bg-sky-50 text-sky-700')}>{it.tag}</span>
                          <h3 className="font-semibold">{it.title}</h3>
                        </div>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-600">{it.body}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
