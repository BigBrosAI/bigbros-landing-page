import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, KeyRound, Lock, Mail, MessageCircleOff, ShieldCheck, UserCog } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageHero } from '@/components/site/page-hero';
import { Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { BrandTile } from '@/components/landing/brand-icon';
import { siteConfig } from '@/lib/site';

const practices = [
  { icon: BadgeCheck, title: 'Official WhatsApp Business Platform', body: 'Messages are sent through Meta’s official WhatsApp Business API — no unofficial clients or scraped sessions that put your number at risk.' },
  { icon: Lock, title: 'Encrypted connections', body: 'The website, dashboard and APIs are served only over HTTPS, so data is encrypted in transit.' },
  { icon: UserCog, title: 'Role-based access', body: 'Owners decide what each teammate can see and do. Agents can be limited to the conversations assigned to them.' },
  { icon: KeyRound, title: 'Scoped API keys & IP allowlists', body: 'Each project has its own API keys. The Email API can be locked to your server IPs, and idempotency keys prevent duplicate sends.' },
  { icon: Mail, title: 'Authenticated email', body: 'Email is sent only from domains you verify, with DKIM, SPF and DMARC records for deliverability and anti-spoofing.' },
  { icon: MessageCircleOff, title: 'Consent and opt-outs', body: 'Marketing on WhatsApp requires opt-in. BigBrosAI keeps opt-in status on each contact and honours opt-outs.' },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <PageHero scene="security"
          kicker="Security"
          title="Your conversations, handled with care."
          subtitle="How BigBrosAI protects your account, your data and your customers’ trust on the official WhatsApp Business Platform."
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 py-1 pl-1 pr-3 text-[13px] font-medium text-brand-800">
            <BrandTile slug="whatsapp" size={24} className="rounded-full" /> Built on the official WhatsApp Business API
          </span>
        </PageHero>

        <section className="pb-20">
          <Container>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {practices.map((p, i) => (
                <Reveal as="li" key={p.title} delay={(i % 3) * 0.06} className="rounded-3xl border border-border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 text-lg font-bold tracking-tight">{p.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{p.body}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-t border-border py-20">
          <Container className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>*]:min-w-0">
            <Reveal className="rounded-[2rem] bg-forest p-8 text-white">
              <ShieldCheck className="h-7 w-7 text-lime-300" />
              <h2 className="mt-4 text-2xl font-bold">Report a security issue</h2>
              <p className="mt-2 text-white/70">Found a vulnerability? Email us with the details and steps to reproduce. Please give us reasonable time to fix it before sharing it publicly.</p>
              <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Security report')}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime-300 px-5 py-2.5 text-sm font-semibold text-forest">
                <Mail className="h-4 w-4" /> {siteConfig.email}
              </a>
            </Reveal>
            <Reveal delay={0.05} className="rounded-[2rem] border border-border bg-card p-8">
              <h2 className="text-2xl font-bold">How we use your data</h2>
              <p className="mt-2 text-ink-600">Our privacy policy explains what we collect, why, and the choices you have. The platform usage policy sets the rules for messaging on BigBrosAI.</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/legal/privacy" className="inline-flex items-center gap-1 text-brand-800 hover:underline">
                  Privacy Policy <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/legal/plateform-policy" className="inline-flex items-center gap-1 text-brand-800 hover:underline">
                  Platform Usage Policy <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/legal/terms" className="inline-flex items-center gap-1 text-brand-800 hover:underline">
                  Terms of Service <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
