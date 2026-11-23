import Link from 'next/link';
import { ArrowRight, Code2, Globe2, Megaphone } from 'lucide-react';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandTile } from '@/components/landing/brand-icon';

const items = [
  { icon: Code2, title: 'Transactional Email API', body: 'Receipts, OTPs and alerts from your backend — 300 free every day.', dark: true },
  { icon: Megaphone, title: 'Email marketing', body: 'Campaigns built in a drag-and-drop editor, with audiences and reports.' },
  { icon: Globe2, title: 'Your own domain', body: 'DKIM, SPF and DMARC so every email lands in the inbox.' },
];

/** Homepage band introducing the email product, linking to /email. */
export function EmailSection() {
  return (
    <section id="email" className="scroll-mt-16 border-t border-border py-24 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal className="flex items-center gap-3">
            <BrandTile slug="gmail" size={40} />
            <Kicker>Email, too</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              WhatsApp and email, <span className="text-brand-700">one workspace.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">
              Send transactional email and marketing campaigns from your own domain — alongside your WhatsApp conversations, with one contact list and one bill.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/email" className="shine inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-brand-800">
              Explore BigBrosAI Email <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm font-medium text-ink-600">300 free emails every day</span>
          </Reveal>
        </div>
        <ul className="grid gap-4">
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={i * 0.08}>
              <Link href="/email" className="group flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-lift">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${it.dark ? 'bg-forest text-lime-300' : 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100'}`}>
                  <it.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-bold tracking-tight">{it.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-ink-600">{it.body}</span>
                </span>
                <ArrowRight className="ml-auto mt-1 h-5 w-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
