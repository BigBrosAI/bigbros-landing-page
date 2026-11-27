import { llmsFullTxt } from '@/lib/llms';

export const dynamic = 'force-static';

/** Full-text companion to /llms.txt: FAQs, products, comparisons, guides and blog posts. */
export function GET() {
  return new Response(llmsFullTxt(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
