"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const campaigns = [
  {
    id: 'camp_001',
    name: 'Welcome Series',
    status: 'active',
    type: 'automation',
    scheduled: new Date(Date.now() - 2 * 60 * 60 * 1000),
    sent: 1247,
    delivered: 1235,
    read: 892,
    clicked: 267,
    conversions: 45
  },
  {
    id: 'camp_002',
    name: 'Product Launch',
    status: 'sent',
    type: 'broadcast',
    scheduled: new Date(Date.now() - 24 * 60 * 60 * 1000),
    sent: 3421,
    delivered: 3398,
    read: 2156,
    clicked: 542,
    conversions: 89
  },
  {
    id: 'camp_003',
    name: 'Cart Abandonment',
    status: 'draft',
    type: 'automation',
    scheduled: null,
    sent: 0,
    delivered: 0,
    read: 0,
    clicked: 0,
    conversions: 0
  },
  {
    id: 'camp_004',
    name: 'Black Friday Sale',
    status: 'scheduled',
    type: 'broadcast',
    scheduled: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    sent: 0,
    delivered: 0,
    read: 0,
    clicked: 0,
    conversions: 0
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  scheduled: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
};

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage your WhatsApp marketing campaigns
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            {filteredCampaigns.length} campaigns found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead className="text-right">Sent</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">Read</TableHead>
                <TableHead className="text-right">Clicked</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[campaign.status as keyof typeof statusColors]}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{campaign.type}</TableCell>
                  <TableCell>
                    {campaign.scheduled ? formatDistanceToNow(campaign.scheduled, { addSuffix: true }) : '-'}
                    {campaign.status === 'scheduled' && (
                      <Clock className="w-3 h-3 inline ml-1 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">{campaign.sent.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.delivered.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.read.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.clicked.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{campaign.conversions.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        {campaign.status === 'active' ? (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </DropdownMenuItem>
                        ) : campaign.status === 'paused' ? (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Resume
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}