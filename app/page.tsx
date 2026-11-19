import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/landing/hero';
import {
  ClosingCta,
  FeatureBento,
  IntegrationsSection,
  PricingPreview,
  DashboardSection,
  ProductChapters,
  ProductShowcase,
} from '@/components/landing/sections';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Faq } from '@/components/landing/faq';
import { PromoMarquee } from '@/components/landing/promo-marquee';
import { Testimonials } from '@/components/landing/testimonials';
import { CustomerLogos } from '@/components/landing/customer-logos';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <CustomerLogos />
        <PromoMarquee />
        <DashboardSection />
        <ProductChapters />
        <IntegrationsSection />
        <ProductShowcase />
        <FeatureBento />
        <HowItWorks />
        <Testimonials />
        <PricingPreview />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
