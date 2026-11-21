import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolShell } from '@/components/tools/tool-shell';
import { LinkGenerator } from '@/components/tools/link-generator';
import { QrGenerator } from '@/components/tools/qr-generator';
import { TextFormatter } from '@/components/tools/text-formatter';
import { PricingCalculator } from '@/components/tools/pricing-calculator';
import { ChatButtonGenerator } from '@/components/tools/chat-button-generator';
import { pageMetadata } from '@/lib/seo';
import { toolBySlug, tools } from '@/lib/tools';

const components: Record<string, React.ComponentType> = {
  'whatsapp-link-generator': LinkGenerator,
  'whatsapp-qr-code-generator': QrGenerator,
  'whatsapp-text-formatter': TextFormatter,
  'whatsapp-pricing-calculator': PricingCalculator,
  'whatsapp-chat-button': ChatButtonGenerator,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = toolBySlug[slug];
  if (!t) return {};
  return pageMetadata({ title: t.seo.title, description: t.seo.description, path: `/tools/${t.slug}` });
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  const Tool = components[slug];
  if (!tool || !Tool) notFound();
  return (
    <ToolShell tool={tool}>
      <Tool />
    </ToolShell>
  );
}
