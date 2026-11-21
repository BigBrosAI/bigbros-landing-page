import Link from 'next/link';
import { ArrowUpRight, Clock, GraduationCap, Home, Mail, MapPin, Mic, PhoneCall, Rocket, Send, Users } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandIcon } from '@/components/landing/brand-icon';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { applyHref, jobs } from '@/lib/jobs';

const why = [
  { icon: Home, title: 'Remote-first', body: 'Work from wherever you do your best work, with flexible hours.' },
  { icon: Users, title: 'Close to customers', body: 'Talk to the businesses who use what we build, every week.' },
  { icon: Rocket, title: 'Real ownership', body: 'A small team where your work ships fast and matters.' },
  { icon: GraduationCap, title: 'Learn fast', body: 'Training on the product, WhatsApp marketing and B2B SaaS.' },
];

const process = [
  { icon: Send, title: 'Apply', body: `Email your resume to ${siteConfig.helloEmail} with the role in the subject line.` },
  { icon: PhoneCall, title: 'Phone screen', body: 'A quick 10-minute call with our team.' },
  { icon: Mic, title: 'Mock sales call', body: 'Pitch BigBrosAI to us in a short role-play — then you’re in.' },
];

const linkedin = siteConfig.social.find((s) => s.slug === 'linkedin')?.href;

export default function CareersPage() {
  const resumeHref = `mailto:${siteConfig.helloEmail}?subject=${encodeURIComponent('Application — general')}&body=${encodeURIComponent('Hi BigBrosAI team,\n\nI’d love to join BigBrosAI. My resume is attached.\n\nName:\nRole I’m interested in:\nCity:\n')}`;
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={jobs.map((j) => ({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: j.title,
            description: `${j.summary} ${j.responsibilities.map((r) => `${r.title}: ${r.body}`).join(' ')}`,
            datePosted: j.datePosted,
            employmentType: j.type === 'Internship' ? 'INTERN' : 'FULL_TIME',
            jobLocationType: 'TELECOMMUTE',
            applicantLocationRequirements: { '@type': 'Country', name: 'India' },
            hiringOrganization: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url, logo: absoluteUrl('/favicon.png') },
            url: absoluteUrl(`/careers/${j.slug}`),
          }))}
        />
        <PageHero kicker="We’re hiring" title="Build the future of business conversations." subtitle="We’re a small, remote-first team helping Indian businesses grow on WhatsApp — and we’re growing. Come sell, market and onboard with us." tight />

        <section className="pb-20">
          <Container className="max-w-4xl">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <Kicker>Open positions</Kicker>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Join the Sales & Marketing team</h2>
              </div>
              <span className="hidden items-center gap-2 text-sm font-medium text-brand-800 sm:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
                </span>
                {jobs.length} roles open
              </span>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {jobs.map((j, i) => (
                <Reveal as="li" key={j.slug} delay={i * 0.06} className="shine shine-soft shine-hover group relative rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-lift">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-semibold text-brand-800 ring-1 ring-inset ring-brand-100">{j.team}</span>
                        <span className="rounded-full bg-lime-100 px-2.5 py-0.5 text-[12px] font-semibold text-forest">Hiring now</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold tracking-tight">
                        <Link href={`/careers/${j.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
                          {j.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-600">{j.summary}</p>
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {j.type}</span>
                      </p>
                    </div>
                    <div className="relative z-10 flex shrink-0 gap-2">
                      <Link href={`/careers/${j.slug}`} className="inline-flex h-10 items-center gap-1 rounded-full border border-input bg-card px-4 text-sm font-semibold">
                        Read the JD <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <a href={applyHref(j)} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground">
                        <Mail className="h-4 w-4" /> Apply
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-border p-5 sm:flex-row sm:items-center">
              <p className="text-[15px] text-ink-600">Don’t see the right role? We’d still love to hear from you.</p>
              <div className="flex gap-2">
                <a href={resumeHref} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-input bg-card px-4 text-sm font-semibold">
                  <Mail className="h-4 w-4" /> Send your resume
                </a>
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 rounded-full border border-input bg-card px-4 text-sm font-semibold">
                    <BrandIcon slug="linkedin" className="h-4 w-4" /> LinkedIn
                  </a>
                )}
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="forest relative overflow-hidden py-20">
          <div aria-hidden className="bg-grain-light absolute inset-0" />
          <Container className="relative">
            <Reveal>
              <Kicker light>How hiring works</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-[2.4rem]">Three quick steps.</h2>
            </Reveal>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {process.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 font-display text-sm font-bold text-forest">{i + 1}</span>
                    <p.icon className="h-5 w-5 text-white/70" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/65">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <Reveal>
              <Kicker>Why BigBrosAI</Kicker>
            </Reveal>
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {why.map((w, i) => (
                <Reveal as="li" key={w.title} delay={i * 0.06} className="rounded-3xl border border-border bg-card p-6">
                  <w.icon className="h-6 w-6 text-brand-700" />
                  <h3 className="mt-4 text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{w.body}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-8">
              <Link href="/about" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 hover:underline">
                Read about life at BigBrosAI <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
