import Image from 'next/image';
import { cn } from '@/lib/utils';

/** Full-colour wordmark. `tone="light"` uses the white-wordmark PNG for dark backgrounds. */
export function Logo({
  className,
  width = 132,
  tone = 'dark',
  priority,
}: {
  className?: string;
  width?: number;
  tone?: 'dark' | 'light';
  priority?: boolean;
}) {
  const height = Math.round((width * 631) / 2131);
  return (
    <span className={cn('relative inline-flex', className)}>
      <Image
        src={tone === 'light' ? '/logo-black.png' : '/logo.png'}
        alt="BigBrosAI"
        width={width}
        height={height}
        priority={priority}
      />
    </span>
  );
}
