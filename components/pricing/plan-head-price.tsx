"use client";

import { money, useCurrency } from '@/lib/currency';
import { planPriceIn, plans } from '@/lib/plans';

/** Monthly price under each plan name in the comparison table, in the visitor's currency. */
export function PlanHeadPrice({ id }: { id: string }) {
  const c = useCurrency();
  const p = plans.find((x) => x.id === id);
  if (!p) return null;
  const pr = planPriceIn(p, false, c);
  return <>{pr === null ? 'Custom' : pr.perMonth === 0 ? 'Free' : `${money(pr.perMonth, c)}/mo`}</>;
}
