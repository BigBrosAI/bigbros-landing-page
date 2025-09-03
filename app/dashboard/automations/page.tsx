"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  MoreHorizontal,
  GitBranch,
  Users2,
  Send,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const automations = [
  {
    id: 'auto_001',
    name: 'Welcome Onboarding',
    description: 'Send a series of welcome messages to new subscribers',
    status: 'active',
    trigger: 'Contact opted in',
    steps: 4,
    contacts: 1247,
    sentMessages: 4231,
    completionRate: 78
  },
  {
    id: 'auto_002',
    name: 'Abandoned Cart Recovery',
    description: 'Recover lost sales with targeted follow-up messages',
    status: 'active',
    trigger: 'Cart abandoned > 1 hour',
    steps: 3,
    contacts: 892,
    sentMessages: 2156,
    completionRate: 45
  },
  {
    id: 'auto_003',
    name: 'Post-Purchase Follow-up',
    description: 'Follow up with customers after purchase for reviews',
    status: 'paused',
    trigger: 'Order completed',
    steps: 2,
    contacts: 567,
    sentMessages: 1134,
    completionRate: 92
  },
  {
    id: 'auto_004',
    name: 'Re-engagement Campaign',
    description: 'Re-engage inactive contacts with special offers',
    status: 'draft',
    trigger: 'Inactive > 30 days',
    steps: 3,
    contacts: 0,
    sentMessages: 0,
    completionRate: 0
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automations</h1>
          <p className="text-muted-foreground">
            Set up automated message flows to engage contacts
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Active Flows</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users2 className="w-5 h-5 text-accent" />
              <div>
                <div className="text-2xl font-bold">2,706</div>
                <p className="text-xs text-muted-foreground">Enrolled Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">7,521</div>
                <p className="text-xs text-muted-foreground">Messages Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">73%</div>
                <p className="text-xs text-muted-foreground">Avg. Completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automations.map((automation) => (
          <Card key={automation.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <CardDescription>{automation.description}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Flow
                    </DropdownMenuItem>
                    {automation.status === 'active' ? (
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" />
                        Activate
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={statusColors[automation.status as keyof typeof statusColors]}>
                  {automation.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {automation.steps} steps
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <strong>Trigger:</strong> {automation.trigger}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{automation.contacts.toLocaleString()}</div>
                    <div className="text-muted-foreground">Contacts</div>
                  </div>
                  <div>
                    <div className="font-medium">{automation.sentMessages.toLocaleString()}</div>
                    <div className="text-muted-foreground">Messages</div>
                  </div>
                  <div>
                    <div className="font-medium">{automation.completionRate}%</div>
                    <div className="text-muted-foreground">Completion</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}