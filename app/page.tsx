import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/landing/hero';
import {
  CapabilityMarquee,
  ClosingCta,
  FeatureBento,
  IntegrationsSection,
  PricingPreview,
  ProductChapters,
} from '@/components/landing/sections';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Faq } from '@/components/landing/faq';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <CapabilityMarquee />
        <ProductChapters />
        <IntegrationsSection />
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
