import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { JsonLd } from '@/components/site/primitives';
import { RevealObserver } from '@/components/site/reveal-observer';
import { WhatsAppFab } from '@/components/site/whatsapp-fab';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { ogImage } from '@/lib/seo';

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
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: 'technology',
  icons: { icon: [{ url: '/favicon.png', type: 'image/png' }], shortcut: '/favicon.ico', apple: '/favicon.png' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_IN',
    url: '/',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bigbrosai',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Google Search Console: set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the HTML-tag token.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  formatDetection: { telephone: false, email: false, address: false },
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
              '@id': `${siteConfig.url}/#organization`,
              name: siteConfig.name,
              legalName: siteConfig.legalName,
              url: siteConfig.url,
              logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.png'), width: 800, height: 800 },
              image: absoluteUrl('/logo.png'),
              email: siteConfig.email,
              sameAs: siteConfig.social.filter((s) => s.slug !== 'whatsapp').map((s) => s.href),
              contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: siteConfig.email, availableLanguage: ['English', 'Hindi'] }],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${siteConfig.url}/#website`,
              name: siteConfig.name,
              url: siteConfig.url,
              inLanguage: 'en-IN',
              publisher: { '@id': `${siteConfig.url}/#organization` },
            },
          ]}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <RevealObserver />
          <WhatsAppFab />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
