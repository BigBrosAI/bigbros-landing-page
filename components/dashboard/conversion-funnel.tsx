"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { stage: 'Sent', count: 12847, rate: 100 },
  { stage: 'Delivered', count: 12642, rate: 98.4 },
  { stage: 'Read', count: 9481, rate: 75.0 },
  { stage: 'Clicked', count: 3186, rate: 25.2 },
  { stage: 'Converted', count: 637, rate: 5.0 },
];

export function ConversionFunnel() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            type="number"
            className="text-xs fill-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            type="category"
            dataKey="stage"
            className="text-xs fill-muted-foreground"
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value, name) => [
              `${value.toLocaleString()} (${data.find(d => d.count === value)?.rate}%)`,
              'Count'
            ]}
          />
          <Bar 
            dataKey="count" 
            fill="hsl(var(--primary))"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}