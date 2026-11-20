import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/site/primitives';
import { softwareApplicationLd } from '@/lib/structured-data';
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

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'BigBrosAI',
    description:
      'Official WhatsApp Business API platform for campaigns, shared live chat, AI chatbots, WhatsApp Pay and email. Free WhatsApp API, ₹50 signup bonus and 300 free emails a day.',
    path: '/',
  }),
  title: { absolute: 'BigBrosAI — Free WhatsApp Business API & AI Chatbot Platform' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd data={softwareApplicationLd()} />
        <Hero />
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
