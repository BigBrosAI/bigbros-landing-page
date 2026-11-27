import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * AI assistants and AI search engines. They are allowed so BigBrosAI can be cited in
 * ChatGPT, Perplexity, Claude, Gemini, Copilot and Google AI Overviews.
 * To opt out of AI *training* only (while staying visible in AI search), move
 * GPTBot, Google-Extended, Applebot-Extended and CCBot into a disallow rule.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'Meta-ExternalAgent',
  'Amazonbot',
  'YouBot',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: AI_CRAWLERS, allow: ['/', '/llms.txt', '/llms-full.txt'], disallow: ['/api/'] },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
