import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bigbrosai.com'),

  title: 'BIGBROS AI - WhatsApp campaigns. Supercharged by AI.',
  description:
    'Create, automate, and analyze WhatsApp broadcasts in minutes. No code, no hassle.',

  keywords: [
    'WhatsApp campaigns',
    'WhatsApp marketing',
    'AI WhatsApp',
    'bulk WhatsApp messages',
  ],

  authors: [{ name: 'BIGBROS AI Pvt. Ltd.' }],

  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },

  openGraph: {
    title: 'BIGBROS AI - WhatsApp campaigns. Supercharged by AI.',
    description:
      'Create, automate, and analyze WhatsApp broadcasts in minutes.',
    url: 'https://bigbrosai.com',
    siteName: 'BIGBROS AI',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'BIGBROS AI',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'BIGBROS AI',
    description:
      'Create, automate, and analyze WhatsApp broadcasts in minutes.',
    images: ['/favicon.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BIGBROS AI",
              url: "https://bigbrosai.com",
              logo: "https://bigbrosai.com/logo.png",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}