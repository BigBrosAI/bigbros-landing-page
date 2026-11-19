import Link from 'next/link';
import type { VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { isExternal } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-site px-5 sm:px-8', className)}>{children}</div>;
}

/** Internal routes use next/link; dashboard and other absolute URLs are plain anchors. */
export function SmartLink({
  href,
  className,
  children,
  ...rest
}: { href: string; className?: string; children: React.ReactNode } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} rel="noopener" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  arrow,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  arrow?: boolean;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  return (
    <SmartLink href={href} className={cn(buttonVariants({ variant, size }), 'group', className)} {...rest}>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </SmartLink>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-sm font-semibold uppercase tracking-[0.14em] text-primary', className)}>{children}</p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Tag className="text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </Tag>
      {description && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}

export function IconChip({
  icon: Icon,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 dark:bg-brand-900/40 dark:text-brand-300 dark:ring-brand-800',
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
  );
}
