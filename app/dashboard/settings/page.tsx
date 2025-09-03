"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  KeyRound, 
  Webhook, 
  Users2, 
  Bell,
  Shield,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, API keys, and team settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Business Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Business Profile
              </CardTitle>
              <CardDescription>
                Update your business information for WhatsApp Business API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="BIGBROS AI Demo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue="AI-powered WhatsApp marketing platform"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://bigbros.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Support Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 000-0000" />
                </div>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="w-5 h-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage your API keys for integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Production API Key</div>
                    <div className="text-sm text-muted-foreground">
                      {showApiKey ? 'sk_live_1234567890abcdef...' : '••••••••••••••••••••••••••••••••'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Test API Key</div>
                    <div className="text-sm text-muted-foreground">
                      sk_test_1234567890abcdef...
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </CardContent>
          </Card>

          {/* Webhooks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="w-5 h-5" />
                Webhooks
              </CardTitle>
              <CardDescription>
                Configure webhook endpoints for real-time events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Message Status Updates</div>
                    <div className="text-sm text-muted-foreground">
                      https://api.yourapp.com/webhooks/whatsapp
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Active</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Webhook
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users2 className="w-5 h-5" />
                Team Members
              </CardTitle>
              <CardDescription>
                Manage who has access to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">John Doe</div>
                      <div className="text-xs text-muted-foreground">Owner</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Owner</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-medium">SM</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Sarah Miller</div>
                      <div className="text-xs text-muted-foreground">Admin</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Campaign Updates</div>
                    <div className="text-xs text-muted-foreground">Get notified when campaigns are sent</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Delivery Reports</div>
                    <div className="text-xs text-muted-foreground">Daily delivery rate summaries</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Template Status</div>
                    <div className="text-xs text-muted-foreground">Template approval notifications</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Two-factor Auth</div>
                    <div className="text-xs text-muted-foreground">Add extra security to your account</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <div className="font-medium text-sm mb-2">Recent Sessions</div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Current session - San Francisco, CA</div>
                    <div>2 hours ago - New York, NY</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}