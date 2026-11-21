import { Suspense } from 'react';
import { ArrowUpRight, BookOpen, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { BrandTile } from '@/components/landing/brand-icon';
import { ContactForm } from '@/components/contact/contact-form';
import { absoluteUrl, siteConfig } from '@/lib/site';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: absoluteUrl('/contact'),
            mainEntity: {
              '@type': 'Organization',
              name: siteConfig.legalName,
              email: siteConfig.email,
              telephone: siteConfig.phones[0],
              address: { '@type': 'PostalAddress', streetAddress: 'E-93, Govind Nagar, Near Shiv Park', addressLocality: 'Mathura', addressRegion: 'Uttar Pradesh', postalCode: '281001', addressCountry: 'IN' },
            },
          }}
        />
        <PageHero scene="contact"
          kicker="Contact"
          title="Talk to the BigBrosAI team."
          subtitle="Book a demo, ask about pricing or get help with your account. A real person replies — usually within one business day."
          tight
        />

        <section className="pb-24">
          <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_0.75fr] [&>*]:min-w-0">
            <Reveal className="rounded-[2rem] border border-border bg-card p-6 shadow-card sm:p-9">
              <h2 className="text-2xl font-bold tracking-tight">Send us a message</h2>
              <p className="mt-1 text-[15px] text-ink-600">Fields marked * are required.</p>
              <div className="mt-7">
                <Suspense fallback={<div className="h-[34rem]" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </Reveal>

            <div className="space-y-4">
              <Reveal delay={0.05}>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent('Hi BigBrosAI, I’d like to know more about the WhatsApp Business API.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shine group flex items-center gap-4 rounded-3xl bg-forest p-6 text-white"
                >
                  <BrandTile slug="whatsapp" size={48} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold">Chat on WhatsApp</span>
                    <span className="block text-sm text-white/70">{siteConfig.whatsapp.display} · fastest reply</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-lime-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
              <Reveal delay={0.1} className="rounded-3xl border border-border bg-card p-6">
                <ul className="space-y-5 text-[15px]">
                  <li className="flex gap-3.5">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                    <span>
                      <span className="block font-semibold">Email</span>
                      <a href={`mailto:${siteConfig.email}`} className="block text-ink-600 hover:text-foreground">{siteConfig.email}</a>
                      <a href={`mailto:${siteConfig.helloEmail}`} className="block text-ink-600 hover:text-foreground">{siteConfig.helloEmail}</a>
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                    <span>
                      <span className="block font-semibold">Phone</span>
                      {siteConfig.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-ink-600 hover:text-foreground">
                          {p}
                        </a>
                      ))}
                    </span>
                  </li>
                  <li className="flex gap-3.5">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                    <span>
                      <span className="block font-semibold">Business hours</span>
                      {siteConfig.hours.map((h) => (
                        <span key={h} className="block text-ink-600">{h}</span>
                      ))}
                    </span>
                  </li>
                  {siteConfig.offices.map((o) => (
                    <li key={o.label} className="flex gap-3.5">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                      <span>
                        <span className="block font-semibold">{o.label}</span>
                        {o.lines.map((l) => (
                          <span key={l} className="block text-ink-600">{l}</span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.15}>
                <a href={siteConfig.links.docs} className="group flex items-center gap-3.5 rounded-3xl border border-border bg-card p-5 transition-shadow hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">Developer docs</span>
                    <span className="block text-sm text-ink-600">API reference and setup guides</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
