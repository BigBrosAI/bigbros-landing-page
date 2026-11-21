import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Guides & Resources — WhatsApp Marketing, Chatbots & API',
  description: 'Docs, video tutorials and plain-English guides to WhatsApp marketing, chatbots, pricing and the WhatsApp Business API from BigBrosAI.',
  path: '/blog',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
