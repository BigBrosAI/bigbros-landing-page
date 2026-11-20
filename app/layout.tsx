import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { JsonLd } from '@/components/site/primitives';
import { RevealObserver } from '@/components/site/reveal-observer';
import { absoluteUrl, siteConfig } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// Outfit matches the BigBrosAI dashboard; used by the dashboard replica only.
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap', weight: ['400', '500', '600', '700', '800'] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['500', '600', '700', '800'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'WhatsApp Business API provider',
    'WhatsApp Business API India',
    'WhatsApp marketing software',
    'WhatsApp chatbot platform',
    'WhatsApp automation',
    'WhatsApp API for developers',
    'omnichannel business messaging',
  ],
  authors: [{ name: siteConfig.legalName }],
  icons: { icon: '/favicon.png', apple: '/logo.png' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: '/logo.png', width: 2131, height: 631, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F5F8F6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable} ${outfit.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Hide reveal targets before first paint; RevealObserver un-hides them on scroll. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js-motion');setTimeout(function(){if(!window.__bbReveal)document.documentElement.classList.remove('js-motion')},2500)",
          }}
        />
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: siteConfig.name,
              legalName: siteConfig.legalName,
              url: siteConfig.url,
              logo: absoluteUrl('/logo.png'),
              email: siteConfig.email,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
            },
          ]}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <RevealObserver />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
