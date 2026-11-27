import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatDate, type PostMeta } from '@/lib/blog-shared';
import { initials } from '@/lib/blog-authors';
import { CategoryIcon } from '@/components/blog/category-icon';
import { cn } from '@/lib/utils';

/** Grid card for a blog post. `large` is the featured layout: image beside the text. */
export function PostCard({ post, large, className }: { post: PostMeta; large?: boolean; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex h-full overflow-hidden rounded-[1.75rem] border border-border bg-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift',
        large ? 'flex-col lg:grid lg:grid-cols-[1.15fr_1fr]' : 'flex-col',
        className
      )}
    >
      <div className={cn('relative overflow-hidden bg-brand-50', large ? 'aspect-[16/9] lg:aspect-auto lg:min-h-[22rem]' : 'aspect-[16/9]')}>
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          unoptimized
          sizes={large ? '(min-width: 1024px) 640px, 100vw' : '(min-width: 1024px) 400px, 100vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-forest shadow-sm backdrop-blur">
          <CategoryIcon category={post.category} /> {post.category}
        </span>
      </div>
      <div className={cn('flex flex-1 flex-col', large ? 'p-7 sm:p-9 lg:justify-center' : 'p-6')}>
        {large && <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">Featured</span>}
        <h3 className={cn('font-display font-bold leading-[1.15] tracking-[-0.02em] text-foreground', large ? 'mt-3 text-[1.9rem] sm:text-[2.2rem]' : 'text-[1.3rem]')}>
          {post.title}
        </h3>
        <p className={cn('text-ink-600', large ? 'mt-4 text-[17px] leading-relaxed' : 'mt-2.5 line-clamp-3 text-[15px] leading-relaxed')}>{post.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-[13px] text-ink-600">
          <span className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold text-white" style={{ background: post.authorColor }}>
              {initials(post.author)}
            </span>
            <span>
              {post.author} · {formatDate(post.date)}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readMins} min
            <ArrowUpRight className="ml-1 h-4 w-4 text-brand-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Small horizontal card: thumbnail beside the title. Used for picks and side lists. */
export function CompactPostCard({ post, index }: { post: PostMeta; index?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-card">
      <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-brand-50">
        <Image src={post.cover} alt="" fill unoptimized sizes="112px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {index !== undefined && (
          <span className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-[11px] font-bold text-forest">{index}</span>
        )}
      </span>
      <span className="min-w-0">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-brand-700">
          <CategoryIcon category={post.category} className="h-3 w-3" /> {post.category}
        </span>
        <span className="mt-1 line-clamp-2 block text-[15px] font-bold leading-snug tracking-tight text-foreground group-hover:text-brand-800 dark:group-hover:text-brand-200">
          {post.title}
        </span>
        <span className="mt-1 block text-[12px] text-ink-600">
          {post.author} · {post.readMins} min
        </span>
      </span>
    </Link>
  );
}
