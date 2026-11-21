import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Container } from '@/components/site/primitives';
import { Kicker } from '@/components/landing/kicker';
import { cn } from '@/lib/utils';

const legalLinks = [
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/refund', label: 'Refund Policy' },
  { href: '/legal/plateform-policy', label: 'Platform Usage Policy' },
];

/** Shared layout for legal documents: title, real last-updated date, sibling nav and readable typography. */
export function LegalShell({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  const date = new Date(`${updated}T00:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <section className="border-b border-border bg-mesh">
          <Container className="pb-12 pt-14 sm:pt-20">
            <Kicker>Legal</Kicker>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last updated on {date}</p>
          </Container>
        </section>
        <Container className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-[14rem_1fr] [&>*]:min-w-0">
          <nav aria-label="Legal documents" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
              {legalLinks.map((l) => (
                <li key={l.href} className="shrink-0">
                  <Link
                    href={l.href}
                    className={cn(
                      'block rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                      l.href === path ? 'bg-brand-50 text-brand-800' : 'text-ink-600 hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="max-w-3xl rounded-[2rem] border border-border bg-card p-6 text-[15.5px] leading-relaxed text-ink-600 shadow-card sm:p-10 [&_a]:text-brand-800 [&_a]:underline [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:mt-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_section+section]:mt-9 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
