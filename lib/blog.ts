/*
 * Blog engine. Posts are Markdown files in /content/blog (see content/blog/README.md).
 * Read at build time only: every blog page is statically generated.
 *
 * Marketing links: in a post, link to `signup`, `demo`, `pricing` or `whatsapp` and the
 * right URL is filled in, with UTM tags (utm_source=blog, utm_campaign=<post slug>) so
 * signups from each post can be attributed. Dashboard links get the same tags.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Marked, type Tokens } from 'marked';
import { siteConfig } from '@/lib/site';
import type { PostMeta } from '@/lib/blog-shared';
import { getAuthor } from '@/lib/blog-authors';

export { formatDate, type PostMeta } from '@/lib/blog-shared';

const DIR = path.join(process.cwd(), 'content', 'blog');

export type BlogCta = { title: string; body: string; button: string; href: string };
export type Block = { type: 'html'; html: string } | ({ type: 'cta' } & BlogCta) | { type: 'callout'; tone: 'tip' | 'note'; html: string };

export type Post = PostMeta & { blocks: Block[]; headings: { id: string; text: string }[]; cta: BlogCta; takeaways: string[] };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Adds blog UTM tags to a URL (absolute or site-relative). Existing params are kept. */
export function withUtm(url: string, campaign: string, content: string) {
  const [base, hash] = url.split('#');
  const sep = base.includes('?') ? '&' : '?';
  const q = `utm_source=blog&utm_medium=content&utm_campaign=${encodeURIComponent(campaign)}&utm_content=${encodeURIComponent(content)}`;
  return `${base}${sep}${q}${hash ? `#${hash}` : ''}`;
}

/** Turns a link shortcut from a post into a real, tracked URL. */
export function resolveHref(href: string, slug: string, content = 'inline') {
  switch (href.trim()) {
    case 'signup':
      return withUtm(siteConfig.links.signup, slug, content);
    case 'demo':
      return withUtm(siteConfig.links.bookDemo, slug, content);
    case 'pricing':
      return withUtm('/pricing', slug, content);
    case 'whatsapp':
      return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent('Hi BigBrosAI! I read your blog and want to know more.')}`;
  }
  if (href.startsWith(siteConfig.links.dashboard)) return withUtm(href, slug, content);
  return href;
}

function renderer(slug: string, headings: { id: string; text: string }[]) {
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth }: Tokens.Heading) {
        const html = this.parser.parseInline(tokens);
        const id = slugify(html);
        if (depth === 2) headings.push({ id, text: html.replace(/<[^>]+>/g, '') });
        return `<h${depth} id="${id}">${html}</h${depth}>`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const url = resolveHref(href, slug);
        const external = /^https?:\/\//.test(url) && !url.startsWith(siteConfig.url);
        const t = title ? ` title="${escapeAttr(title)}"` : '';
        const ext = external ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${escapeAttr(url)}"${t}${ext}>${this.parser.parseInline(tokens)}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        const img = `<img src="${escapeAttr(href)}" alt="${escapeAttr(text)}" loading="lazy" decoding="async" />`;
        return title ? `<figure>${img}<figcaption>${title}</figcaption></figure>` : `<figure>${img}</figure>`;
      },
    },
  });
  return md;
}

/** `key="value"` pairs from a `:::cta{...}` block opener. */
function attrs(s = '') {
  const out: Record<string, string> = {};
  for (const m of Array.from(s.matchAll(/(\w+)="([^"]*)"/g))) out[m[1]] = m[2];
  return out;
}

function parseBody(body: string, slug: string) {
  const headings: { id: string; text: string }[] = [];
  const md = renderer(slug, headings);
  const blocks: Block[] = [];
  const re = /^:::(cta|tip|note)(\{[^}\n]*\})?[ \t]*\n([\s\S]*?)^:::[ \t]*$/gm;
  let last = 0;
  let n = 0;
  for (const m of Array.from(body.matchAll(re))) {
    const before = body.slice(last, m.index);
    if (before.trim()) blocks.push({ type: 'html', html: md.parse(before) as string });
    const [, kind, rawAttrs, inner] = m;
    if (kind === 'cta') {
      const a = attrs(rawAttrs);
      const lines = inner.trim().split('\n');
      const title = lines[0]?.replace(/^#+\s*/, '') ?? '';
      n += 1;
      blocks.push({
        type: 'cta',
        title,
        body: lines.slice(1).join(' ').trim(),
        button: a.button || 'Start for free',
        href: resolveHref(a.href || 'signup', slug, `cta-${n}`),
      });
    } else {
      blocks.push({ type: 'callout', tone: kind as 'tip' | 'note', html: md.parse(inner) as string });
    }
    last = (m.index ?? 0) + m[0].length;
  }
  const rest = body.slice(last);
  if (rest.trim()) blocks.push({ type: 'html', html: md.parse(rest) as string });
  return { blocks, headings };
}

const toDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : '');

function files() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md');
}

function load(file: string): Post | null {
  const slug = file.replace(/\.md$/, '');
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
  if (data.draft && process.env.NODE_ENV === 'production') return null;
  const a = getAuthor(String(data.author ?? 'riya-kapoor'));
  const words = content.split(/\s+/).filter(Boolean).length;
  const { blocks, headings } = parseBody(content, slug);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: toDate(data.date),
    updated: data.updated ? toDate(data.updated) : undefined,
    author: a.name,
    authorId: a.id,
    authorRole: data.authorRole ? String(data.authorRole) : a.role,
    authorBio: a.bio,
    authorColor: a.color,
    category: String(data.category ?? 'Updates'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? '/og-image.png'),
    coverAlt: String(data.coverAlt ?? data.title ?? ''),
    featured: Boolean(data.featured),
    readMins: Math.max(1, Math.round(words / 220)),
    blocks,
    headings,
    takeaways: Array.isArray(data.takeaways) ? data.takeaways.map(String) : [],
    cta: {
      title: String(data.cta?.title ?? 'Grow your business on WhatsApp'),
      body: String(data.cta?.body ?? 'Official WhatsApp Business API, AI chatbots, campaigns and a shared inbox. Start free with a ₹50 signup bonus.'),
      button: String(data.cta?.button ?? 'Start for free'),
      href: resolveHref(String(data.cta?.href ?? 'signup'), slug, 'end-cta'),
    },
  };
}

let cache: Post[] | null = null;

/** All published posts, newest first. Drafts are shown in development only. */
export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === 'production') return cache;
  cache = files()
    .map(load)
    .filter((p): p is Post => !!p)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export function toMeta(p: Post): PostMeta {
  const { blocks, headings, cta, takeaways, ...meta } = p;
  return meta;
}
