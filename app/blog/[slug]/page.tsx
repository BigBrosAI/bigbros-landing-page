import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays, Clock, Link2 } from 'lucide-react';
import { BrandIcon, type BrandSlug } from '@/components/landing/brand-icon';
import { initials } from '@/lib/blog-authors';
import { CategoryIcon } from '@/components/blog/category-icon';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { KeyTakeaways } from '@/components/site/key-takeaways';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Container, JsonLd } from '@/components/site/primitives';
import { Reveal } from '@/components/site/reveal';
import { PostCard } from '@/components/blog/post-card';
import { CtaCard, PostBody, SideCta } from '@/components/blog/blog-blocks';
import { formatDate, getAllPosts, getPost, resolveHref, toMeta } from '@/lib/blog';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { breadcrumbLd, ogImage, pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const base = pageMetadata({ title: p.title, description: p.description, path: `/blog/${p.slug}` });
  // Raster covers make better share cards; SVG covers fall back to the site card.
  const image = /\.(png|jpe?g|webp)$/i.test(p.cover) ? { url: p.cover, alt: p.coverAlt } : ogImage;
  return {
    ...base,
    openGraph: { ...base.openGraph, type: 'article', publishedTime: p.date, modifiedTime: p.updated ?? p.date, authors: [p.author], tags: p.tags, images: [image] },
    twitter: { ...base.twitter, images: [image.url] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const url = absoluteUrl(`/blog/${p.slug}`);
  const related = getAllPosts()
    .filter((o) => o.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3)
    .map(toMeta);
  const whatsappHref = resolveHref('whatsapp', p.slug);
  const share: { label: string; slug: BrandSlug; href: string }[] = [
    { label: 'Share on WhatsApp', slug: 'whatsapp', href: `https://wa.me/?text=${encodeURIComponent(`${p.title} ${url}`)}` },
    { label: 'Share on LinkedIn', slug: 'linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'Share on X', slug: 'x', href: `https://x.com/intent/post?text=${encodeURIComponent(p.title)}&url=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      <Navbar />
      <ReadingProgress targetId="post-body" />
      <main className="overflow-x-clip">
        <JsonLd
          data={[breadcrumbLd([['Blog', '/blog'], [p.title, `/blog/${p.slug}`]]), {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            articleSection: p.category,
            inLanguage: 'en-IN',
            wordCount: p.readMins * 220,
            isPartOf: { '@type': 'Blog', name: `${siteConfig.name} Blog`, url: absoluteUrl('/blog') },
            headline: p.title,
            description: p.description,
            image: absoluteUrl(p.cover),
            datePublished: p.date,
            dateModified: p.updated ?? p.date,
            author: { '@type': 'Person', name: p.author, jobTitle: p.authorRole },
            publisher: { '@id': `${siteConfig.url}/#organization` },
            mainEntityOfPage: url,
            keywords: p.tags.join(', '),
          }]}
        />

        {/* header */}
        <section className="relative -mt-16 overflow-hidden pt-16">
          <div aria-hidden className="bg-mesh absolute inset-0" />
          <div aria-hidden className="bg-grain absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
          <Container className="relative max-w-4xl pb-10 pt-12 text-center sm:pt-16">
            <Reveal>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> All posts
              </Link>
            </Reveal>
            <Reveal delay={0.04} className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[13px] text-ink-600">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-800 ring-1 ring-inset ring-brand-100 dark:bg-brand-900/40 dark:text-brand-200 dark:ring-brand-800">
                <CategoryIcon category={p.category} /> {p.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> {formatDate(p.date)}
              </span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {p.readMins} min read
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mx-auto mt-6 font-display text-[2.3rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[3.4rem]">{p.title}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">{p.description}</p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8 flex items-center justify-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white/70" style={{ background: p.authorColor }}>
                {initials(p.author)}
              </span>
              <span className="text-left text-sm leading-tight">
                <span className="block font-semibold">{p.author}</span>
                <span className="block text-ink-600">{p.authorRole} at BigBrosAI</span>
              </span>
            </Reveal>
          </Container>
        </section>

        {/* cover */}
        <Container className="max-w-6xl">
          <Reveal y={30} className="relative aspect-[16/8] overflow-hidden rounded-[2rem] border border-border bg-brand-50 shadow-lift">
            <Image src={p.cover} alt={p.coverAlt} fill priority unoptimized sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          </Reveal>
        </Container>

        {/* body */}
        <section className="py-14 sm:py-16">
          <Container className="grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <article id="post-body" className="mx-auto w-full max-w-[44rem]">
              <KeyTakeaways items={p.takeaways} />
              <PostBody blocks={p.blocks} />

              {p.tags.length > 0 && (
                <ul className="mt-12 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full bg-muted px-3 py-1.5 text-[13px] font-medium text-ink-600">
                      #{t}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-border py-5">
                <span className="text-sm font-semibold">Share this post</span>
                {share.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                  >
                    <BrandIcon slug={s.slug} className="h-4 w-4" />
                  </a>
                ))}
                <a href={url} className="ml-auto inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-foreground">
                  <Link2 className="h-4 w-4" /> Permalink
                </a>
              </div>

              {p.authorBio && (
                <div className="mt-8 flex gap-4 rounded-3xl border border-border bg-card p-6">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: p.authorColor }}>
                    {initials(p.author)}
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">Written by</p>
                    <p className="mt-1 text-lg font-bold tracking-tight">{p.author}</p>
                    <p className="text-sm text-ink-600">{p.authorRole} at BigBrosAI</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{p.authorBio}</p>
                  </div>
                </div>
              )}

              <div className="mt-10">
                <CtaCard cta={p.cta} variant="end" />
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {p.headings.length > 1 && (
                  <nav aria-label="On this page">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600">On this page</p>
                    <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-[14px]">
                      {p.headings.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className="text-ink-600 transition-colors hover:text-foreground">
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <SideCta cta={p.cta} whatsappHref={whatsappHref} />
              </div>
            </aside>
          </Container>
        </section>

        {related.length > 0 && (
          <section className="border-t border-border bg-card/50 py-16 sm:py-20">
            <Container>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Keep reading</h2>
              <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <PostCard post={r} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
