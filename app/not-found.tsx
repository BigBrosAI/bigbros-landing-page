import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container } from '@/components/site/primitives';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="py-28 sm:py-36">
        <Container className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand-700">404</p>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">This page doesn’t exist.</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-600">The link may be old or mistyped. Try one of these instead.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" className="rounded-full">
              Go to homepage
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="outline" className="rounded-full">
              Explore products
            </ButtonLink>
            <ButtonLink href="/pricing" size="lg" variant="outline" className="rounded-full">
              See pricing
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
