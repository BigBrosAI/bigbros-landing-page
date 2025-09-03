"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '1/1', sent: 1200, delivered: 1180, read: 850 },
  { date: '1/2', sent: 980, delivered: 965, read: 720 },
  { date: '1/3', sent: 1450, delivered: 1420, read: 1050 },
  { date: '1/4', sent: 1100, delivered: 1085, read: 790 },
  { date: '1/5', sent: 1650, delivered: 1630, read: 1200 },
  { date: '1/6', sent: 1300, delivered: 1280, read: 940 },
  { date: '1/7', sent: 1800, delivered: 1775, read: 1320 },
  { date: '1/8', sent: 1550, delivered: 1525, read: 1150 },
  { date: '1/9', sent: 2100, delivered: 2065, read: 1580 },
  { date: '1/10', sent: 1750, delivered: 1720, read: 1290 },
  { date: '1/11', sent: 1900, delivered: 1870, read: 1420 },
  { date: '1/12', sent: 2250, delivered: 2210, read: 1680 },
  { date: '1/13', sent: 1850, delivered: 1825, read: 1380 },
  { date: '1/14', sent: 2400, delivered: 2360, read: 1820 },
];

export function CampaignChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-xs fill-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            className="text-xs fill-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="sent" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="delivered" 
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="read" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}