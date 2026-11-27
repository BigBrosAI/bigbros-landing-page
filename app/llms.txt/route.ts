import { llmsTxt } from '@/lib/llms';

export const dynamic = 'force-static';

/** https://llmstxt.org summary of the site for AI assistants. */
export function GET() {
  return new Response(llmsTxt(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
