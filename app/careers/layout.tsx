import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Careers — Sales, Marketing & Onboarding (Remote)',
  description: 'BigBrosAI is hiring Sales, Marketing & Onboarding interns and associates. Work from home, leads provided, ₹12,000/month fixed + uncapped incentives for full-time.',
  path: '/careers',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
