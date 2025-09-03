import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { CodePreviewSection } from '@/components/sections/code-preview-section';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CodePreviewSection />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}