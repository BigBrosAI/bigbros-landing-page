import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Rss } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ButtonLink, Container } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { Kicker } from '@/components/landing/kicker';
import { BrandIcon } from '@/components/landing/brand-icon';
import { CompactPostCard } from '@/components/blog/post-card';
import { BlogExplorer } from '@/components/blog/blog-explorer';
import { CategoryIcon } from '@/components/blog/category-icon';
import { formatDate, getAllPosts, resolveHref, toMeta } from '@/lib/blog';
import { authors, initials } from '@/lib/blog-authors';
import { breadcrumbLd, pageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/site/primitives';
import { absoluteUrl, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Blog: WhatsApp Marketing, Chatbots & Growth Tips',
    description: 'The BigBrosAI blog: product updates, WhatsApp marketing strategies, AI chatbot tips and growth playbooks for Indian businesses.',
    path: '/blog',
  }),
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/rss.xml' } },
};

export default function BlogIndex() {
  const posts = getAllPosts().map(toMeta);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const picks = posts.filter((p) => p.slug !== featured?.slug).slice(0, 4);
  const topics = Array.from(new Set(posts.map((p) => p.category)));
  const writers = authors.map((a) => ({ ...a, count: posts.filter((p) => p.authorId === a.id).length })).filter((a) => a.count > 0);
  const waUpdates = `${resolveHref('whatsapp', 'blog-index')}`;

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <JsonLd
          data={[
            breadcrumbLd([['Blog', '/blog']]),
            {
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: `${siteConfig.name} Blog`,
              url: absoluteUrl('/blog'),
              publisher: { '@id': `${siteConfig.url}/#organization` },
              blogPost: posts.slice(0, 20).map((p) => ({
                '@type': 'BlogPosting',
                headline: p.title,
                url: absoluteUrl(`/blog/${p.slug}`),
                datePublished: p.date,
                author: { '@type': 'Person', name: p.author },
              })),
            },
          ]}
        />
        {/* hero */}
        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
          <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(190,242,100,0.35),transparent)]" />
          <Container className="relative pb-14 pt-14 sm:pt-20">
            <div className="max-w-3xl">
              <Reveal>
                <Kicker>The BigBrosAI blog</Kicker>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-[2.7rem] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[4.2rem]">
                  Grow your business <span className="text-gradient-brand">on WhatsApp</span>, one idea at a time.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">
                  Practical playbooks, AI and chatbot tips, and product news for Indian businesses that sell and support on WhatsApp.
                </p>
              </Reveal>
              <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-2">
                {topics.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-[13px] font-semibold text-ink-600 backdrop-blur">
                    <CategoryIcon category={t} /> {t}
                  </span>
                ))}
                <a href="/blog/rss.xml" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold text-ink-600 hover:text-foreground">
                  <Rss className="h-3.5 w-3.5 text-brand-600" /> RSS
                </a>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* featured + picks */}
        {featured && (
          <section className="pb-20">
            <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] [&>*]:min-w-0">
              <Reveal>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group relative flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-[2rem] border border-border bg-forest shadow-lift"
                >
                  <Image
                    src={featured.cover}
                    alt={featured.coverAlt}
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-transparent" />
                  <div className="relative p-7 text-white sm:p-10">
                    <span className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-3 py-1 text-[12px] font-bold text-forest">
                      <CategoryIcon category={featured.category} /> Featured · {featured.category}
                    </span>
                    <h2 className="mt-4 max-w-2xl font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]">{featured.title}</h2>
                    <p className="mt-3 line-clamp-2 max-w-2xl text-[16px] leading-relaxed text-white/75">{featured.description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-white/80">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white/30" style={{ background: featured.authorColor }}>
                        {initials(featured.author)}
                      </span>
                      <span>
                        <span className="font-semibold text-white">{featured.author}</span> · {formatDate(featured.date)} · {featured.readMins} min read
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-lime-300">
                        Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.08} className="flex flex-col rounded-[2rem] border border-border bg-card/60 p-5 sm:p-6">
                <p className="px-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Editor’s picks</p>
                <ul className="mt-3 flex-1 divide-y divide-border">
                  {picks.map((p, i) => (
                    <li key={p.slug} className="py-1.5">
                      <CompactPostCard post={p} index={i + 1} />
                    </li>
                  ))}
                </ul>
                <a
                  href={waUpdates}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 flex items-center gap-3 rounded-2xl bg-[#E7F8EE] p-4 transition-colors hover:bg-[#d8f3e3] dark:bg-brand-900/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]">
                    <BrandIcon slug="whatsapp" color="#fff" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 text-[14px] leading-snug">
                    <span className="block font-bold text-foreground">Questions about a post?</span>
                    <span className="text-ink-600">Chat with our team on WhatsApp</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink-600" />
                </a>
              </Reveal>
            </Container>
          </section>
        )}

        {/* all posts */}
        <section className="border-t border-border bg-card/40 py-16 sm:py-20">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <Kicker>All posts</Kicker>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Browse by topic</h2>
              </div>
              <p className="hidden text-sm text-ink-600 sm:block">{posts.length} articles</p>
            </div>
            <BlogExplorer posts={posts} />
          </Container>
        </section>

        {/* writers */}
        {writers.length > 0 && (
          <section className="py-16 sm:py-20">
            <Container>
              <Kicker>Meet the writers</Kicker>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {writers.map((a, i) => (
                  <Reveal as="li" key={a.id} delay={i * 0.05} className="rounded-3xl border border-border bg-card p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: a.color }}>
                      {initials(a.name)}
                    </span>
                    <p className="mt-4 text-lg font-bold tracking-tight">{a.name}</p>
                    <p className="text-sm font-medium text-brand-700">{a.role}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{a.bio}</p>
                    <p className="mt-3 text-[12px] font-semibold text-ink-600">
                      {a.count} {a.count === 1 ? 'article' : 'articles'}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {/* whatsapp banner */}
        <section className="pb-24">
          <Container>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0B2E23] p-8 text-white sm:p-12">
              <div aria-hidden className="bg-grain-light absolute inset-0 opacity-60" />
              <BrandIcon slug="whatsapp" color="rgba(190,242,100,0.10)" className="absolute -right-10 -top-10 h-72 w-72" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <p className="font-display text-3xl font-bold leading-tight tracking-tight">Try what you just read about.</p>
                  <p className="mt-2 text-white/75">Every idea on this blog runs on BigBrosAI. Start free with the official WhatsApp Business API and a ₹50 signup bonus.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href={resolveHref('signup', 'blog-index', 'banner')} size="lg" arrow className="rounded-full bg-lime-300 text-forest hover:bg-lime-200">
                    Start for free
                  </ButtonLink>
                  <a
                    href={waUpdates}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold transition-colors hover:bg-white/10"
                  >
                    <BrandIcon slug="whatsapp" className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
