"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const activities = [
  {
    id: 1,
    type: 'campaign_sent',
    user: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    action: 'sent campaign',
    target: 'Welcome Series',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    status: 'success'
  },
  {
    id: 2,
    type: 'template_approved',
    user: 'System',
    avatar: null,
    action: 'approved template',
    target: 'Order Confirmation',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: 'success'
  },
  {
    id: 3,
    type: 'automation_triggered',
    user: 'Mike Johnson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    action: 'triggered automation',
    target: 'Abandoned Cart Flow',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: 'success'
  },
  {
    id: 4,
    type: 'contact_imported',
    user: 'Lisa Wong',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    action: 'imported contacts',
    target: '1,247 new contacts',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'success'
  },
  {
    id: 5,
    type: 'campaign_failed',
    user: 'System',
    avatar: null,
    action: 'failed to send',
    target: 'Product Launch',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: 'error'
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar || undefined} />
            <AvatarFallback>
              {activity.user === 'System' ? 'SY' : activity.user.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>
              {' '}
              <span className="text-muted-foreground">{activity.action}</span>
              {' '}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
            </p>
          </div>
          
          <Badge 
            variant={activity.status === 'success' ? 'secondary' : 'destructive'}
            className="text-xs"
          >
            {activity.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}