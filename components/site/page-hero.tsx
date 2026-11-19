import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { cn } from '@/lib/utils';

/** Shared hero for inner pages: mesh background, kicker, title, subtitle, optional actions. */
export function PageHero({
  kicker,
  title,
  subtitle,
  children,
  className,
  tight,
}: {
  kicker: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** Less bottom padding, for pages where content follows immediately. */
  tight?: boolean;
}) {
  return (
    <section className={cn('relative -mt-16 overflow-hidden pt-16', className)}>
      <div aria-hidden className="bg-mesh absolute inset-0" />
      <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />
      <Container className={cn('relative pt-14 text-center sm:pt-20', tight ? 'pb-8 sm:pb-10' : 'pb-16 sm:pb-20')}>
        <Reveal>
          <Kicker className="justify-center">{kicker}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.04em] sm:text-6xl">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">{subtitle}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.15} className="mt-9">
            {children}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
