import { cn } from '@/lib/utils';

/**
 * Scroll reveal without a JS animation library: the element is tagged with
 * `data-reveal` and <RevealObserver/> adds `.is-in` when it enters the viewport.
 * Styles live in globals.css and are disabled under prefers-reduced-motion.
 */
export function Reveal({
  delay = 0,
  y,
  as: Tag = 'div',
  className,
  style,
  children,
  ...rest
}: {
  /** Seconds. */
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'span' | 'p' | 'h2';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, 'style' | 'className' | 'children'>) {
  const vars = {
    ...(delay ? { '--reveal-delay': `${Math.round(delay * 1000)}ms` } : null),
    ...(y !== undefined ? { '--reveal-y': `${y}px` } : null),
    ...style,
  } as React.CSSProperties;
  return (
    <Tag data-reveal="" className={cn(className)} style={vars} {...rest}>
      {children}
    </Tag>
  );
}
