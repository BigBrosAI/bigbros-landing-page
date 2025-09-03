"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  description: string;
}

export function KpiCard({ title, value, change, trend, icon: Icon, description }: KpiCardProps) {
  const isPositive = trend === 'up';
  
  return (
    <Card className="whatsapp-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs rounded-full",
              isPositive ? "text-primary bg-primary/10 border-primary/20" : 
              "text-red-500 bg-red-50 dark:bg-red-950 dark:text-red-400"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {change}
          </Badge>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}