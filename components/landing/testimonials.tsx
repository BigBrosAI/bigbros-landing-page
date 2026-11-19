import { Quote } from 'lucide-react';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { testimonials } from '@/lib/testimonials';
import { cn } from '@/lib/utils';

type T = (typeof testimonials)[number];
const tones = ['from-emerald-400 to-teal-600', 'from-lime-400 to-green-600', 'from-sky-400 to-emerald-600', 'from-amber-300 to-lime-600', 'from-teal-300 to-cyan-600', 'from-green-300 to-emerald-700'];

function Card({ t, i }: { t: T; i: number }) {
  return (
    <figure className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <span className="inline-flex items-center rounded-full bg-lime-200/70 px-2.5 py-1 text-[11.5px] font-semibold text-forest">{t.highlight}</span>
      <blockquote className="mt-4 text-[15.5px] leading-relaxed text-foreground">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white', tones[i % tones.length])}>
          {t.name
            .split(' ')
            .map((w) => w[0])
            .join('')}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-[13px] text-muted-foreground">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Customer stories: three columns drifting vertically at different speeds (static on mobile and with reduced motion). */
export function Testimonials() {
  const cols = [testimonials.slice(0, 2), testimonials.slice(2, 4), testimonials.slice(4, 6)];
  return (
    <section id="customers" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div aria-hidden className="bg-mesh absolute inset-0 opacity-60" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker className="justify-center">Customer stories</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-[2.1rem] font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl">Teams that grow on WhatsApp with BigBrosAI.</h2>
          </Reveal>
        </div>

        {/* mobile / tablet: simple stack */}
        <div className="mt-12 grid gap-4 md:hidden">
          {testimonials.slice(0, 4).map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <Card t={t} i={i} />
            </Reveal>
          ))}
        </div>

        {/* desktop: drifting columns */}
        <Reveal className="relative mt-14 hidden h-[40rem] grid-cols-3 gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)] md:grid">
          {cols.map((col, c) => (
            <div key={c} className="marquee-pause overflow-hidden">
              <div className={cn('flex flex-col gap-5', c === 1 ? 'animate-drift-down' : 'animate-drift-up')} style={{ animationDuration: `${38 + c * 8}s` }}>
                {[...col, ...col, ...col, ...col].map((t, k) => (
                  <div key={k} aria-hidden={k >= col.length}>
                    <Card t={t} i={c * 2 + (k % col.length)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
