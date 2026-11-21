import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Clock, Info, Mail, MapPin } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { getJob, jobAbout, jobs } from '@/lib/jobs';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) return {};
  return pageMetadata({ title: `${j.title} — Careers`, description: j.summary, path: `/careers/${j.slug}` });
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) notFound();
  const resumeHref = `mailto:${siteConfig.helloEmail}?subject=${encodeURIComponent(`Future openings — ${j.title}`)}`;

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Careers', item: absoluteUrl('/careers') },
              { '@type': 'ListItem', position: 2, name: j.title, item: absoluteUrl(`/careers/${j.slug}`) },
            ],
          }}
        />
        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <Container className="relative max-w-4xl pb-12 pt-10 sm:pt-14">
            <Reveal>
              <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> All careers
              </Link>
            </Reveal>
            <Reveal delay={0.04} className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-semibold text-brand-800 ring-1 ring-inset ring-brand-100">{j.team}</span>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-[12px] font-semibold text-ink-600">Applications closed</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display text-[2.2rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[3rem]">{j.title}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px] text-ink-600">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {j.location}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {j.type}</span>
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="pb-24">
          <Container className="grid max-w-4xl gap-10 lg:max-w-6xl lg:grid-cols-[1fr_320px]">
            <article className="space-y-10">
              <Reveal className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[15px] text-amber-900">
                <Info className="mt-0.5 h-5 w-5 shrink-0" />
                <p>This role is no longer accepting applications. We’ve kept the description here for reference — send us your resume and we’ll reach out when it opens again.</p>
              </Reveal>

              <Reveal>
                <Kicker>About BigBrosAI</Kicker>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-600">{jobAbout}</p>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-600">{j.summary}</p>
              </Reveal>

              <Reveal>
                <Kicker>What you’ll do</Kicker>
                <ol className="mt-5 space-y-3">
                  {j.responsibilities.map((r, i) => (
                    <li key={r.title} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-bold text-brand-800">{i + 1}</span>
                      <span>
                        <span className="block font-semibold">{r.title}</span>
                        <span className="mt-0.5 block text-[15px] leading-relaxed text-ink-600">{r.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="grid gap-6 sm:grid-cols-2">
                {[
                  { h: 'Must have', items: j.mustHave },
                  { h: 'Good to have', items: j.goodToHave },
                ].map((g) => (
                  <div key={g.h}>
                    <h2 className="text-lg font-bold tracking-tight">{g.h}</h2>
                    <ul className="mt-3 space-y-2">
                      {g.items.map((x) => (
                        <li key={x} className="flex gap-2 text-[15px] leading-relaxed text-ink-600">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-brand-600" /> {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Reveal>

              <Reveal>
                <Kicker>What you get</Kicker>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {j.perks.map((x) => (
                    <li key={x} className="flex gap-2 rounded-xl bg-card p-3 text-[15px] text-ink-600 ring-1 ring-inset ring-border">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <h2 className="font-bold">Role at a glance</h2>
                <dl className="mt-4 space-y-3">
                  {j.facts.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">{f.label}</dt>
                      <dd className="mt-0.5 text-[15px] font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <a href={resumeHref} className="shine mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground">
                  <Mail className="h-4 w-4" /> Send resume for future roles
                </a>
                <p className="mt-3 text-center text-[13px] text-muted-foreground">Hiring process: phone screen, then a short mock sales call.</p>
              </Reveal>
            </aside>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
