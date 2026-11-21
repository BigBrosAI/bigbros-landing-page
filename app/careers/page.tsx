import { Check, Clock, Gift, GraduationCap, Headphones, Home, IndianRupee, Mail, Phone, Rocket, Target, TrendingUp, Users } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

/* From the Sales, Marketing & Onboarding job description. */
const tracks = [
  {
    id: 'intern',
    name: 'Sales, Marketing & Onboarding Intern',
    tag: 'Internship · 3 months',
    pay: 'Incentive on every converted lead — up to ₹20,000 a month',
    rows: [
      ['Duration', '3 months, with a pre-placement offer for top performers'],
      ['Fixed pay', 'None'],
      ['Incentive', 'On every converted lead, up to ₹20,000 a month'],
      ['Best for', 'Students and freshers who want sales experience'],
    ],
  },
  {
    id: 'fulltime',
    name: 'Sales, Marketing & Onboarding Associate',
    tag: 'Full-time · Permanent',
    pay: '₹12,000 fixed a month + uncapped incentives',
    rows: [
      ['Duration', 'Permanent'],
      ['Fixed pay', '₹12,000 a month'],
      ['Incentive', 'On every converted lead, no upper limit — plus extra on leads you bring in'],
      ['Best for', 'Freshers and early-career sales people (0–2 years)'],
    ],
  },
];

const steps = [
  { icon: Phone, title: 'Call leads', body: 'Call the leads BigBrosAI assigns you (20–50 a day) and understand how each business talks to its customers today.' },
  { icon: Target, title: 'Pitch and demo', body: 'Show how broadcasts, AI templates, chatbots and the shared inbox solve their problem — with live screen-share demos when needed.' },
  { icon: TrendingUp, title: 'Follow up and convert', body: 'Follow up on WhatsApp, calls and email, handle objections on price, approval and setup, and move leads to a paid plan.' },
  { icon: Rocket, title: 'Onboard', body: 'Walk new customers through signup, WhatsApp API setup, their first template and first campaign or chatbot.' },
  { icon: Users, title: 'Market', body: 'Share customer stories and common questions with marketing, and help with campaigns, social posts and webinars.' },
  { icon: Headphones, title: 'Report', body: 'Log every call and next step in the CRM and share a short daily update on calls, demos and conversions.' },
];

const mustHave = [
  'Clear, confident spoken English (Hindi or a regional language is a plus)',
  'Comfortable making 20–50 calls a day and hearing “no”',
  'Own laptop or smartphone with a stable internet connection',
  'Basic comfort with WhatsApp, Google Sheets and online tools',
  'Interns: student or recent graduate, any stream · Full-time: graduate, any stream, 0–2 years’ experience',
];
const niceToHave = ['Experience in tele-sales, inside sales, customer support or a SaaS product', 'Knowledge of WhatsApp Business or digital marketing', 'Experience using a CRM'];
const perks = [
  { icon: Home, text: 'Work from home with flexible timings' },
  { icon: Target, text: 'Leads provided — your time goes into calling and closing' },
  { icon: IndianRupee, text: 'Incentive on every lead you convert' },
  { icon: GraduationCap, text: 'Training on the product, WhatsApp marketing and B2B sales' },
  { icon: Gift, text: 'Internship certificate and letter of recommendation (interns)' },
  { icon: TrendingUp, text: 'Pre-placement offers and a fast path to sales-lead roles' },
];

const applyHref = (role: string) => `mailto:${siteConfig.helloEmail}?subject=${encodeURIComponent(`Application — ${role}`)}&body=${encodeURIComponent('Hi BigBrosAI team,\n\nI’d like to apply. My resume is attached.\n\nName:\nPhone:\nCity:\n')}`;

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={tracks.map((t) => ({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: t.name,
            description: `<p>BigBrosAI is hiring a ${t.name} to turn BigBrosAI leads into paying, active customers. Leads are provided. You call them, demo the product, close the sale and get them set up. Fully remote with flexible timings.</p>`,
            datePosted: '2026-11-19',
            employmentType: t.id === 'intern' ? 'INTERN' : 'FULL_TIME',
            jobLocationType: 'TELECOMMUTE',
            applicantLocationRequirements: { '@type': 'Country', name: 'India' },
            hiringOrganization: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url, logo: absoluteUrl('/favicon.png') },
            ...(t.id === 'fulltime' ? { baseSalary: { '@type': 'MonetaryAmount', currency: 'INR', value: { '@type': 'QuantitativeValue', value: 12000, unitText: 'MONTH' } } } : {}),
            directApply: false,
          }))}
        />
        <PageHero
          kicker="Careers"
          title="Sell an AI product to real businesses — from home."
          subtitle="We’re hiring Sales, Marketing & Onboarding interns and associates. We provide the leads; you call, demo, close and get businesses live on WhatsApp."
        >
          <div className="flex flex-wrap justify-center gap-2 text-[13px] font-semibold">
            {['Work from home', 'Flexible timings', 'Leads provided', 'Uncapped incentives'].map((x) => (
              <span key={x} className="rounded-full border border-brand-200 bg-white/80 px-3 py-1.5 text-brand-800">
                {x}
              </span>
            ))}
          </div>
        </PageHero>

        <section className="pb-20">
          <Container>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Open roles</h2>
            </Reveal>
            <ul className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {tracks.map((t, i) => (
                <Reveal as="li" key={t.id} delay={i * 0.06} className={cn('flex flex-col rounded-[2rem] border p-7 sm:p-8', i === 1 ? 'ring-sweep forest border-transparent text-white' : 'border-border bg-card')}>
                  <span className={cn('w-fit rounded-full px-2.5 py-1 text-[11.5px] font-bold', i === 1 ? 'bg-lime-300 text-forest' : 'bg-brand-50 text-brand-800')}>{t.tag}</span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight">{t.name}</h3>
                  <p className={cn('mt-1 flex items-center gap-1.5 text-[15px] font-semibold', i === 1 ? 'text-lime-300' : 'text-brand-700')}>
                    <IndianRupee className="h-4 w-4" /> {t.pay}
                  </p>
                  <dl className={cn('mt-5 divide-y text-[14.5px]', i === 1 ? 'divide-white/10' : 'divide-border')}>
                    {t.rows.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 py-2.5">
                        <dt className={i === 1 ? 'text-white/55' : 'text-muted-foreground'}>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                    <div className="grid grid-cols-[7rem_1fr] gap-3 py-2.5">
                      <dt className={i === 1 ? 'text-white/55' : 'text-muted-foreground'}>Work mode</dt>
                      <dd>Remote, flexible hours</dd>
                    </div>
                  </dl>
                  <a
                    href={applyHref(t.name)}
                    className={cn('shine mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full px-6 text-sm font-semibold', i === 1 ? 'bg-lime-300 text-forest' : 'bg-primary text-primary-foreground')}
                  >
                    <Mail className="h-4 w-4" /> Apply by email
                  </a>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-t border-border py-20">
          <Container>
            <Reveal>
              <Kicker>What you’ll do</Kicker>
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={(i % 3) * 0.06} className="rounded-3xl border border-border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">
                    {i + 1}. {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-t border-border bg-card/50 py-20">
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3 [&>*]:min-w-0">
            <Reveal>
              <h3 className="text-xl font-bold">Must have</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-ink-600">
                {mustHave.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="text-xl font-bold">Good to have</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-ink-600">
                {niceToHave.map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /> {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-xl font-bold">What you get</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-ink-600">
                {perks.map((x) => (
                  <li key={x.text} className="flex gap-2.5">
                    <x.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {x.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <Reveal className="rounded-[2rem] bg-forest p-8 text-white sm:p-12">
              <h2 className="text-3xl font-bold tracking-tight">How to apply</h2>
              <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  `Email your resume to ${siteConfig.helloEmail} with the role (Intern or Full-time) in the subject.`,
                  'Do a 10-minute phone screen with our team.',
                  'Do a short mock sales call where you pitch BigBrosAI.',
                ].map((s, i) => (
                  <li key={s} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-300 font-bold text-forest">{i + 1}</span>
                    <p className="mt-3 text-[15px] text-white/80">{s}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 flex items-center gap-2 text-sm text-white/65">
                <Clock className="h-4 w-4" /> Questions about either role? Write to{' '}
                <a href={`mailto:${siteConfig.helloEmail}`} className="font-semibold text-lime-300 underline">
                  {siteConfig.helloEmail}
                </a>
              </p>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
