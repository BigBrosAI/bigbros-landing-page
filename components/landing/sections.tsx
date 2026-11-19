import { Check, ArrowUpRight } from 'lucide-react';
import {
  BarChart3,
  Bot,
  CreditCard,
  FileCheck2,
  Inbox,
  KeyRound,
  LayoutTemplate,
  Mail,
  Megaphone,
  Radio,
  ShieldCheck,
  Users,
  Workflow,
} from 'lucide-react';
import { ButtonLink, Container, SmartLink } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { InboxDemo } from '@/components/landing/inbox-demo';
import { CampaignDemo } from '@/components/landing/campaign-demo';
import { FlowDemo } from '@/components/landing/flow-demo';
import { IntegrationHub } from '@/components/landing/integrations-demo';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Kicker } from '@/components/landing/kicker';
import { BrandIcon, type BrandSlug } from '@/components/landing/brand-icon';

/* ---------- shared bits ---------- */

function Heading({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <h2
      className={cn(
        'mt-5 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl',
        light ? 'text-white' : 'text-foreground',
        className
      )}
    >
      {children}
    </h2>
  );
}

/* ---------- capability marquee ---------- */

const capabilities: { label: string; icon?: React.ComponentType<{ className?: string }>; brand?: BrandSlug }[] = [
  { label: 'WhatsApp Business API', brand: 'whatsapp' },
  { label: 'Live chat inbox', icon: Inbox },
  { label: 'Agent assignment', icon: Users },
  { label: 'Broadcast campaigns', icon: Radio },
  { label: 'CSV & API sends', icon: KeyRound },
  { label: 'Template approvals', icon: FileCheck2 },
  { label: 'AI chatbot flows', icon: Bot },
  { label: 'WhatsApp Pay', icon: CreditCard },
  { label: 'Shopify', brand: 'shopify' },
  { label: 'WooCommerce', brand: 'woocommerce' },
  { label: 'Google Sheets', brand: 'googlesheets' },
  { label: 'Meta click-to-WhatsApp ads', brand: 'meta' },
  { label: 'Email follow-ups', icon: Mail },
];

export function CapabilityMarquee() {
  const row = [...capabilities, ...capabilities];
  return (
    <section aria-label="Platform capabilities" className="marquee-pause relative border-y border-border bg-card/60 py-4">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="animate-marquee flex w-max gap-3">
          {row.map((c, i) => (
            <li
              key={i}
              aria-hidden={i >= capabilities.length}
              className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-ink-600"
            >
              {c.brand ? <BrandIcon slug={c.brand} /> : c.icon ? <c.icon className="h-4 w-4 text-brand-700" /> : null}
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- product chapters ---------- */

function Chapter({
  id,
  index,
  kicker,
  title,
  body,
  points,
  demo,
  flip,
  stacked,
}: {
  id: string;
  index: string;
  kicker: string;
  title: React.ReactNode;
  body: string;
  points: string[];
  demo: React.ReactNode;
  flip?: boolean;
  /** Copy on top, demo full-width below. */
  stacked?: boolean;
}) {
  return (
    <div id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div
        className={cn(
          'grid items-center gap-12',
          stacked
            ? 'lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-x-16 lg:gap-y-12'
            : flip
              ? 'lg:grid-cols-[1.18fr_0.82fr] lg:gap-16'
              : 'lg:grid-cols-[0.82fr_1.18fr] lg:gap-16',
          flip && 'lg:[&>*:first-child]:order-2'
        )}
      >
        <div>
          <Reveal className="flex items-center gap-4">
            <span className="font-mono text-sm text-muted-foreground">{index}</span>
            <Kicker>{kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading>{title}</Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">{body}</p>
          </Reveal>
          <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={0.14 + i * 0.05} className="flex gap-3 text-[15px] text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {p}
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1} y={40} className={cn(stacked && 'lg:col-span-2')}>
          {demo}
        </Reveal>
      </div>
    </div>
  );
}

export function ProductChapters() {
  return (
    <section aria-labelledby="platform-heading" className="relative">
      <Container>
        <div className="mx-auto max-w-3xl pt-24 text-center sm:pt-32">
          <Reveal>
            <Kicker className="justify-center">The platform</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading>
              <span id="platform-heading">
                One dashboard for every conversation{' '}
                <span className="text-muted-foreground">— from first hello to paid order.</span>
              </span>
            </Heading>
          </Reveal>
        </div>

        <Chapter
          id="inbox"
          index="01"
          kicker="Live chat"
          title="A shared inbox your whole team can reply from."
          body="Every WhatsApp chat lands in one live inbox. Conversations are routed to the right agent automatically, with the full history, tags and private notes beside them."
          points={[
            'Many agents on one business number',
            'Auto-assignment and manual hand-offs between teams',
            'Quick replies, notes, tags and contact profiles',
          ]}
          demo={<InboxDemo />}
        />

        <Chapter
          id="campaigns"
          index="02"
          kicker="Campaigns"
          title="Broadcasts that go out only when they’re ready."
          body="Send to a saved audience, upload a CSV, or trigger messages from your own systems through the API. An approval step keeps every campaign on-brand before it reaches a customer."
          points={[
            'Broadcast, CSV upload and API campaigns',
            'Template library with Meta approval status',
            'Approval workflow before anything is sent',
            'Delivered, read and click reporting per campaign',
          ]}
          demo={<CampaignDemo />}
          flip
        />

        <Chapter
          id="flows"
          index="03"
          kicker="AI chatbot flows"
          title="Automate the repetitive chats. Keep the human ones."
          body="Build chatbot flows on a visual canvas — triggers, AI replies, conditions and actions — and hand off to a live agent the moment a customer needs one."
          points={[
            'Drag-and-drop flow builder',
            'AI replies grounded in your own content',
            'Save answers to contacts or Google Sheets',
          ]}
          demo={<FlowDemo />}
          stacked
        />
      </Container>
    </section>
  );
}

/* ---------- integrations (dark band) ---------- */

export function IntegrationsSection() {
  return (
    <section id="integrations" className="forest relative scroll-mt-16 overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="bg-grain-light absolute inset-0" />
      <div
        aria-hidden
        className="absolute -left-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.18),transparent)]"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Kicker light>Integrations &amp; payments</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading light>
              Plugged into your store, your sheets <span className="text-white/45">and your ads.</span>
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Connect Shopify, WooCommerce and Google Sheets in a few clicks, capture leads from Meta click-to-WhatsApp
              ads, follow up by email and collect payments with WhatsApp Pay — without leaving the chat.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.12} y={40} className="mt-14">
          <IntegrationHub />
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- bento of supporting features ---------- */

const extras = [
  {
    icon: LayoutTemplate,
    title: 'Template studio',
    body: 'Create marketing, utility and authentication templates with media and buttons, then track their review status.',
    span: 'lg:col-span-2',
  },
  { icon: ShieldCheck, title: 'Roles & approvals', body: 'Decide who can create, approve and send — per workspace.', span: '' },
  { icon: Megaphone, title: 'Meta ads', body: 'Run click-to-WhatsApp ads and route every lead straight into the inbox.', span: '' },
  { icon: Mail, title: 'Email', body: 'Follow a WhatsApp message with a detailed email from the same contact list.', span: '' },
  {
    icon: BarChart3,
    title: 'Analytics',
    body: 'Delivery, read and reply rates for every campaign, plus response times for every agent.',
    span: 'lg:col-span-2',
  },
  { icon: Workflow, title: 'Developer API & webhooks', body: 'Send messages from your backend and receive events in real time.', span: '' },
];

export function FeatureBento() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Kicker>And everything around it</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading>The details that make WhatsApp work at scale.</Heading>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ButtonLink href={siteConfig.links.docs} variant="outline" arrow className="rounded-full">
              Read the docs
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {extras.map((f, i) => (
            <Reveal
              as="li"
              key={f.title}
              delay={(i % 4) * 0.06}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift',
                f.span
              )}
            >
              <span
                aria-hidden
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-6 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-ink-600">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------- pricing preview ---------- */

/** Mirrors the monthly plans on /pricing — keep the two in sync. */
const plans = [
  {
    name: 'Starter',
    price: 'Free',
    note: 'For trying it out',
    features: ['100 messages / month', '1 team member', 'Basic templates', 'Campaign analytics'],
    cta: 'Start free',
  },
  {
    name: 'Growth',
    price: '₹1,500',
    note: 'For growing teams',
    features: ['5,000 messages / month', '5 team members', 'AI template assistant', 'Automations & segmentation'],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Scale',
    price: '₹3,200',
    note: 'For high-volume senders',
    features: ['25,000 messages / month', 'Unlimited team members', 'Advanced flows & integrations', 'API access'],
    cta: 'Talk to sales',
  },
];

export function PricingPreview() {
  return (
    <section className="border-t border-border bg-card/50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker className="justify-center">Pricing</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading>Start free. Upgrade when the chats pile up.</Heading>
          </Reveal>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-4 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 0.08}
              className={cn(
                'relative flex flex-col rounded-3xl border p-7',
                p.featured ? 'ring-sweep forest border-transparent shadow-lift' : 'border-border bg-card'
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className={cn('text-lg font-semibold', p.featured && 'text-white')}>{p.name}</h3>
                {p.featured && (
                  <span className="rounded-full bg-brand-400/15 px-2.5 py-1 text-[11px] font-semibold text-brand-300">
                    Most popular
                  </span>
                )}
              </div>
              <p className={cn('mt-1 text-sm', p.featured ? 'text-white/60' : 'text-muted-foreground')}>{p.note}</p>
              <p className={cn('mt-6 flex items-baseline gap-1.5', p.featured && 'text-white')}>
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                {p.price !== 'Free' && (
                  <span className={cn('text-sm', p.featured ? 'text-white/60' : 'text-muted-foreground')}>/ month</span>
                )}
              </p>
              <ul className="mt-6 space-y-3 text-[15px]">
                {p.features.map((f) => (
                  <li key={f} className={cn('flex gap-2.5', p.featured ? 'text-white/85' : 'text-ink-600')}>
                    <Check className={cn('mt-0.5 h-4 w-4 shrink-0', p.featured ? 'text-brand-300' : 'text-brand-700')} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <ButtonLink
                  href={p.name === 'Scale' ? siteConfig.links.contactSales : siteConfig.links.signup}
                  variant={p.featured ? 'default' : 'outline'}
                  className={cn('w-full rounded-full', p.featured && 'bg-brand-500 text-[#0E2A22] hover:bg-brand-400')}
                  size="lg"
                >
                  {p.cta}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 text-center">
          <SmartLink href="/pricing" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 hover:underline">
            Compare every feature and yearly pricing <ArrowUpRight className="h-4 w-4" />
          </SmartLink>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- closing CTA ---------- */

export function ClosingCta() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal y={30}>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-800 px-6 py-16 text-center text-white sm:px-12 sm:py-24">
            <div aria-hidden className="bg-grain-light absolute inset-0" />
            <svg aria-hidden viewBox="0 0 400 400" className="absolute -bottom-40 -right-24 h-[30rem] w-[30rem] opacity-30">
              {[0, 1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx="200"
                  cy="200"
                  r={60 + i * 34}
                  fill="none"
                  stroke="#86efac"
                  strokeWidth="1"
                  className="animate-dash"
                  style={{ animationDuration: `${3 + i}s` }}
                />
              ))}
            </svg>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                Your customers are already on WhatsApp. Meet them there.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/75">
                Create a free workspace, connect your number and send your first approved campaign today.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href={siteConfig.links.signup}
                  size="xl"
                  arrow
                  className="w-full rounded-full bg-white text-brand-900 hover:bg-brand-50 sm:w-auto"
                >
                  Start free
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.links.bookDemo}
                  size="xl"
                  variant="outline"
                  className="w-full rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  Talk to us
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
