import { cn } from '@/lib/utils';

export function Kicker({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.2em]',
        light ? 'text-brand-300' : 'text-brand-700',
        className
      )}
    >
      <span className={cn('h-px w-6', light ? 'bg-brand-300/60' : 'bg-brand-600/50')} />
      {children}
    </p>
  );
}
