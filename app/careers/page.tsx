import Link from 'next/link';
import { ArrowUpRight, BellRing, Briefcase, Clock, GraduationCap, Home, Mail, MapPin, Rocket, Users } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandIcon } from '@/components/landing/brand-icon';
import { siteConfig } from '@/lib/site';
import { jobs } from '@/lib/jobs';

const why = [
  { icon: Home, title: 'Remote-first', body: 'Work from wherever you do your best work, with flexible hours.' },
  { icon: Users, title: 'Close to customers', body: 'Talk to the businesses who use what you build, every week.' },
  { icon: Rocket, title: 'Real ownership', body: 'A small team where your work ships fast and matters.' },
  { icon: GraduationCap, title: 'Learn fast', body: 'Training on the product, WhatsApp marketing and B2B SaaS.' },
];

const linkedin = siteConfig.social.find((s) => s.slug === 'linkedin')?.href;

export default function CareersPage() {
  const resumeHref = `mailto:${siteConfig.helloEmail}?subject=${encodeURIComponent('Future openings — resume')}&body=${encodeURIComponent('Hi BigBrosAI team,\n\nI’d love to be considered for future roles. My resume is attached.\n\nName:\nRole I’m interested in:\nCity:\n')}`;
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero kicker="Careers" title="Build the future of business conversations." subtitle="We’re a small, remote-first team helping Indian businesses grow on WhatsApp." tight />

        <section className="pb-20">
          <Container className="max-w-4xl">
            <Reveal className="rounded-[2rem] border border-border bg-card p-8 text-center shadow-card sm:p-12">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-ink-600">
                <Briefcase className="h-7 w-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">No open positions right now</h2>
              <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-ink-600">
                We don’t have any openings at the moment. New roles are announced here and on LinkedIn — and we’re always happy to hear from people who love what we’re building.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={resumeHref} className="shine inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-semibold text-primary-foreground">
                  <Mail className="h-4 w-4" /> Send us your resume
                </a>
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-input bg-card px-7 font-semibold">
                    <BrandIcon slug="linkedin" className="h-4 w-4" /> Follow on LinkedIn
                  </a>
                )}
              </div>
              <p className="mt-5 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                <BellRing className="h-4 w-4" /> We keep resumes on file and reach out when a matching role opens.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="pb-20">
          <Container className="max-w-4xl">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <Kicker>Previous openings</Kicker>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Roles we’ve hired for</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">Applications closed</span>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {jobs.map((j, i) => (
                <Reveal as="li" key={j.slug} delay={i * 0.06}>
                  <Link href={`/careers/${j.slug}`} className="shine shine-soft shine-hover group flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-semibold text-brand-800 ring-1 ring-inset ring-brand-100">{j.team}</span>
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[12px] font-semibold text-ink-600">Closed</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold tracking-tight">{j.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-600">{j.summary}</p>
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {j.type}</span>
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-800">
                      Read the JD <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-t border-border bg-card/50 py-20">
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
