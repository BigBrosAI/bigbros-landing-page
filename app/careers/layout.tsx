import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Careers at BigBrosAI',
  description: 'Join BigBrosAI, a remote-first team helping Indian businesses grow on WhatsApp. We’re hiring remote Sales, Marketing & Onboarding associates and interns — apply today.',
  path: '/careers',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
