/*
 * llms.txt and llms-full.txt (https://llmstxt.org): plain-Markdown summaries of the site
 * that AI assistants and AI search engines can read and cite. Generated from the same data
 * as the pages, so they stay in sync. Build-time only.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { products, integrations } from '@/lib/catalog';
import { plans, metaRates, pricingFaqs } from '@/lib/plans';
import { solutions } from '@/lib/solutions';
import { competitors } from '@/lib/compare';
import { guides } from '@/lib/guides';
import { tools } from '@/lib/tools';
import { integrationPages } from '@/lib/integration-pages';
import { getAllPosts, resolveHref } from '@/lib/blog';
import { faqs } from '@/components/landing/faq';
import { organizationDescription } from '@/lib/seo';
import { absoluteUrl, siteConfig } from '@/lib/site';

const link = (label: string, p: string, note?: string) => `- [${label}](${absoluteUrl(p)})${note ? `: ${note}` : ''}`;

function facts() {
  const paid = plans
    .filter((p) => p.monthly !== null)
    .map((p) => `${p.name} ${p.monthly === 0 ? 'free' : `₹${p.monthly!.toLocaleString('en-IN')}/month`}`)
    .join(', ');
  return [
    `- Company: ${siteConfig.legalName}, Mathura and Agra, Uttar Pradesh, India`,
    `- What it is: official WhatsApp Business API platform (Meta's WhatsApp Business Platform) with campaigns, shared inbox, AI chatbots, payments and email`,
    `- Plans: ${paid}, Enterprise custom. 10% off yearly. Prices exclude GST.`,
    `- WhatsApp message rates in India: ${metaRates.map((r) => `${r.label} ${r.value}`).join(', ')}`,
    `- Free extras: ₹50 signup bonus, unlimited free service conversations, 300 free transactional emails a day`,
    `- Integrations: ${integrations.map((i) => i.name).join(', ')}`,
    `- Program: member of NVIDIA Inception`,
    `- Contact: ${siteConfig.email}, ${siteConfig.phones.join(' / ')}, WhatsApp ${siteConfig.whatsapp.display}`,
    `- Sign up: ${siteConfig.links.signup}`,
  ].join('\n');
}

export function llmsTxt() {
  const posts = getAllPosts();
  return `# ${siteConfig.name}

> ${organizationDescription}

## Key facts

${facts()}

## Products

${products.map((p) => link(p.name, `/products/${p.slug}`, p.short)).join('\n')}
${link('Pricing', '/pricing', 'Plans, WhatsApp message rates by country and plan comparison')}
${link('Email API & marketing', '/email', '300 free transactional emails a day, then ₹0.125 per email')}

## Solutions by industry

${solutions.map((s) => link(s.name, `/solutions/${s.slug}`, s.seo.description)).join('\n')}

## Integrations

${integrationPages.map((i) => link(i.name, `/integrations/${i.slug}`, i.seo.description)).join('\n')}

## Comparisons

${competitors.map((c) => link(`BigBrosAI vs ${c.name}`, `/compare/${c.slug}`, c.intro)).join('\n')}

## Guides

${guides.map((g) => link(g.title, `/guides/${g.slug}`, g.description)).join('\n')}

## Blog

${posts.map((p) => link(p.title, `/blog/${p.slug}`, p.description)).join('\n')}

## Free tools

${tools.map((t) => link(t.name, `/tools/${t.slug}`, t.short)).join('\n')}

## Company

${link('About', '/about')}
${link('Security', '/security')}
${link('Contact', '/contact')}
${link('Privacy Policy', '/legal/privacy')}
${link('Terms of Service', '/legal/terms')}

## Optional

- [Full text for AI assistants](${absoluteUrl('/llms-full.txt')}): guides, blog posts and FAQs in one file
- [API documentation](${siteConfig.links.docs})
`;
}

/** Blog post Markdown with link shortcuts and site paths turned into absolute URLs. */
function postMarkdown(slug: string) {
  const file = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
  const { content } = matter(fs.readFileSync(file, 'utf8'));
  return content
    .replace(/^:::(cta|tip|note)(\{[^}\n]*\})?[ \t]*$/gm, '')
    .replace(/^:::[ \t]*$/gm, '')
    .replace(/\]\((signup|demo|pricing|whatsapp)\)/g, (_, k) => `](${absolute(resolveHref(k, slug, 'llms'))})`)
    .replace(/\]\((\/[^)\s]*)/g, (_, p) => `](${absoluteUrl(p)}`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const absolute = (u: string) => (u.startsWith('/') ? absoluteUrl(u) : u);

export function llmsFullTxt() {
  const posts = getAllPosts();
  const parts: string[] = [
    `# ${siteConfig.name}: full reference`,
    `> ${organizationDescription}`,
    `## Key facts\n\n${facts()}`,
    `## Frequently asked questions\n\n${[...faqs, ...pricingFaqs].map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}`,
    `## Products\n\n${products
      .map((p) => `### ${p.name}\n\nURL: ${absoluteUrl(`/products/${p.slug}`)}\n\n${p.seo.description}\n\n${p.features.map((f) => `- ${f.title}: ${f.body}`).join('\n')}\n\nPricing: ${p.plans}`)
      .join('\n\n')}`,
    `## Comparisons\n\n${competitors
      .map(
        (c) =>
          `### BigBrosAI vs ${c.name}\n\nURL: ${absoluteUrl(`/compare/${c.slug}`)} (competitor details from ${c.sourceUrl}, checked ${c.checkedOn})\n\n${c.overview.join('\n\n')}\n\n| | BigBrosAI | ${c.name} |\n|---|---|---|\n${c.rows
            .map((r) => `| ${r.label} | ${r.us} | ${r.them} |`)
            .join('\n')}\n\nChoose BigBrosAI if: ${c.bestFor.us}\n\nChoose ${c.name} if: ${c.bestFor.them}`
      )
      .join('\n\n')}`,
    `## Guides\n\n${guides
      .map(
        (g) =>
          `### ${g.title}\n\nURL: ${absoluteUrl(`/guides/${g.slug}`)} · Updated ${g.updated}\n\nKey takeaways:\n${g.takeaways.map((t) => `- ${t}`).join('\n')}\n\n${g.intro}\n\n${g.sections
            .map((s) => `#### ${s.heading}\n\n${[...s.paragraphs, ...(s.bullets ?? []).map((b) => `- ${b}`)].join('\n\n')}`)
            .join('\n\n')}`
      )
      .join('\n\n')}`,
    `## Blog posts\n\n${posts
      .map((p) => `### ${p.title}\n\nURL: ${absoluteUrl(`/blog/${p.slug}`)} · ${p.author}, ${p.authorRole} · ${p.date}\n\n${p.takeaways.length ? `Key takeaways:\n${p.takeaways.map((t) => `- ${t}`).join('\n')}\n\n` : ''}${postMarkdown(p.slug).replace(/^## /gm, '#### ')}`)
      .join('\n\n')}`,
  ];
  return parts.join('\n\n') + '\n';
}
