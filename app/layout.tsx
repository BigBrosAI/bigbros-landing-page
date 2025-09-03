import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BIGBROS AI - WhatsApp campaigns. Supercharged by AI.',
  description: 'Create, automate, and analyze WhatsApp broadcasts in minutes—no code, no hassle.',
  keywords: ['WhatsApp marketing', 'AI campaigns', 'bulk messaging', 'automation'],
  authors: [{ name: 'BIGBROS AI Pvt. Ltd.' }],
  openGraph: {
    title: 'BIGBROS AI - WhatsApp campaigns. Supercharged by AI.',
    description: 'Create, automate, and analyze WhatsApp broadcasts in minutes—no code, no hassle.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIGBROS AI - WhatsApp campaigns. Supercharged by AI.',
    description: 'Create, automate, and analyze WhatsApp broadcasts in minutes—no code, no hassle.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}