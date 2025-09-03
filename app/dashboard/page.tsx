"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  TrendingUp, 
  Users2, 
  Activity, 
  Plus
} from 'lucide-react';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { CampaignChart } from '@/components/dashboard/campaign-chart';
import { ConversionFunnel } from '@/components/dashboard/conversion-funnel';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
        <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-6">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Messages Sent"
          value="12,847"
          change="+12.3%"
          trend="up"
          icon={Send}
          description="This month"
        />
        <KpiCard
          title="Delivery Rate"
          value="98.4%"
          change="+2.1%"
          trend="up"
          icon={TrendingUp}
          description="Last 30 days"
        />
        <KpiCard
          title="Click Rate"
          value="24.8%"
          change="-1.2%"
          trend="down"
          icon={Activity}
          description="This month"
        />
        <KpiCard
          title="Active Contacts"
          value="3,421"
          change="+5.7%"
          trend="up"
          icon={Users2}
          description="Opted in"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="whatsapp-card">
          <CardHeader>
            <CardTitle>Messages by Day</CardTitle>
            <CardDescription>Last 14 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <CampaignChart />
          </CardContent>
        </Card>

        <Card className="whatsapp-card">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Campaign performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ConversionFunnel />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="whatsapp-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
}