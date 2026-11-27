import { BookOpen, Bot, IndianRupee, Megaphone, Rocket, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import { BrandIcon } from '@/components/landing/brand-icon';

/** Icon for a blog category. WhatsApp topics get the WhatsApp logo. */
export function CategoryIcon({ category, className = 'h-3.5 w-3.5' }: { category: string; className?: string }) {
  const c = category.toLowerCase();
  if (c.includes('whatsapp')) return <BrandIcon slug="whatsapp" className={className} />;
  if (c.includes('product') || c.includes('getting started')) return <Rocket className={className} />;
  if (c.includes('pricing')) return <IndianRupee className={className} />;
  if (c.includes('ai') || c.includes('automation')) return <Bot className={className} />;
  if (c.includes('playbook')) return <BookOpen className={className} />;
  if (c.includes('growth')) return <TrendingUp className={className} />;
  if (c.includes('marketing')) return <Megaphone className={className} />;
  if (c.includes('commerce') || c.includes('retail')) return <ShoppingBag className={className} />;
  return <Sparkles className={className} />;
}
