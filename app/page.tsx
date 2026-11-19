import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/landing/hero';
import {
  ClosingCta,
  FeatureBento,
  IntegrationsSection,
  PricingPreview,
  ProductChapters,
  ProductShowcase,
} from '@/components/landing/sections';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Faq } from '@/components/landing/faq';
import { PromoMarquee } from '@/components/landing/promo-marquee';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <PromoMarquee />
        <ProductChapters />
        <IntegrationsSection />
        <ProductShowcase />
        <FeatureBento />
        <HowItWorks />
        <PricingPreview />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
