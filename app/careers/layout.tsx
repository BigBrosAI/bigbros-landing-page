import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Careers at BigBrosAI',
  description: 'Join BigBrosAI, a remote-first team helping Indian businesses grow on WhatsApp. No open positions right now — send us your resume for future roles.',
  path: '/careers',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
