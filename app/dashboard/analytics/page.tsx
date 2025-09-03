"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDateRangePicker } from '@/components/dashboard/date-range-picker';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { CampaignChart } from '@/components/dashboard/campaign-chart';
import { ConversionFunnel } from '@/components/dashboard/conversion-funnel';
import { 
  Send, 
  TrendingUp, 
  Users2, 
  DollarSign,
  Download,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const campaignPerformance = [
  { name: 'Welcome Series', sent: 1247, delivered: 1235, read: 892, clicked: 267 },
  { name: 'Product Launch', sent: 3421, delivered: 3398, read: 2156, clicked: 542 },
  { name: 'Flash Sale', sent: 2156, delivered: 2134, read: 1567, clicked: 423 },
  { name: 'Newsletter', sent: 1890, delivered: 1876, read: 1234, clicked: 189 }
];

const deviceData = [
  { name: 'Mobile', value: 78, color: 'hsl(var(--chart-1))' },
  { name: 'Desktop', value: 15, color: 'hsl(var(--chart-2))' },
  { name: 'Tablet', value: 7, color: 'hsl(var(--chart-3))' }
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your campaign performance and engagement metrics
          </p>
        </div>
        <div className="flex gap-2">
          <CalendarDateRangePicker />
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Revenue"
          value="$47,853"
          change="+23.1%"
          trend="up"
          icon={DollarSign}
          description="This month"
        />
        <KpiCard
          title="Messages Sent"
          value="12,847"
          change="+12.3%"
          trend="up"
          icon={Send}
          description="This month"
        />
        <KpiCard
          title="Click Rate"
          value="24.8%"
          change="+4.2%"
          trend="up"
          icon={TrendingUp}
          description="Average CTR"
        />
        <KpiCard
          title="New Contacts"
          value="1,247"
          change="+8.7%"
          trend="up"
          icon={Users2}
          description="This month"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Messages Over Time</CardTitle>
            <CardDescription>Daily message volume for the last 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <CampaignChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>How contacts move through your campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <ConversionFunnel />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Messages sent vs clicks by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name"
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
                  <Bar dataKey="sent" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="clicked" fill="hsl(var(--accent))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>How contacts read messages by device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}