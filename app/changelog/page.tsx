"use client";

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  Plus,
  Bug,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const changelogEntries = [
  {
    version: "2.1.0",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    type: "feature",
    changes: [
      {
        type: "new",
        title: "AI Template Optimization",
        description: "Templates now automatically optimize based on engagement data"
      },
      {
        type: "new", 
        title: "Advanced Segmentation",
        description: "Create complex audience segments with multiple conditions"
      },
      {
        type: "improvement",
        title: "Dashboard Performance",
        description: "50% faster loading times for analytics dashboard"
      },
      {
        type: "fix",
        title: "Template Approval Status",
        description: "Fixed issue where template status wasn't updating correctly"
      }
    ]
  },
  {
    version: "2.0.5",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: "patch",
    changes: [
      {
        type: "fix",
        title: "Message Delivery Tracking",
        description: "Resolved webhook delivery status inconsistencies"
      },
      {
        type: "fix",
        title: "Contact Import",
        description: "Fixed CSV import for contacts with special characters"
      },
      {
        type: "improvement",
        title: "API Rate Limiting",
        description: "Improved rate limiting with better error messages"
      }
    ]
  },
  {
    version: "2.0.0",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    type: "major",
    changes: [
      {
        type: "new",
        title: "Automation Flows",
        description: "Complete automation system with visual flow builder"
      },
      {
        type: "new",
        title: "Team Collaboration",
        description: "Multi-user support with role-based permissions"
      },
      {
        type: "new",
        title: "Advanced Analytics",
        description: "Conversion tracking and attribution modeling"
      },
      {
        type: "improvement",
        title: "New Dashboard Design",
        description: "Completely redesigned dashboard with better UX"
      }
    ]
  },
  {
    version: "1.8.2",
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    type: "patch",
    changes: [
      {
        type: "fix",
        title: "Template Variables",
        description: "Fixed template variable replacement in automation flows"
      },
      {
        type: "improvement",
        title: "Contact Search",
        description: "Improved search performance for large contact lists"
      }
    ]
  }
];

const getChangeIcon = (type: string) => {
  switch (type) {
    case 'new':
      return <Plus className="w-4 h-4" />;
    case 'fix':
      return <Bug className="w-4 h-4" />;
    case 'improvement':
      return <Zap className="w-4 h-4" />;
    case 'security':
      return <Shield className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

const getChangeBadge = (type: string) => {
  switch (type) {
    case 'new':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">New</Badge>;
    case 'fix':
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Fix</Badge>;
    case 'improvement':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Improved</Badge>;
    case 'security':
      return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Security</Badge>;
    default:
      return <Badge variant="secondary">Update</Badge>;
  }
};

const getVersionBadge = (type: string) => {
  switch (type) {
    case 'major':
      return <Badge className="bg-primary text-primary-foreground">Major Release</Badge>;
    case 'feature':
      return <Badge variant="secondary">Feature Release</Badge>;
    case 'patch':
      return <Badge variant="outline">Patch</Badge>;
    default:
      return <Badge variant="secondary">Release</Badge>;
  }
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-24 hero-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Product Updates
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              What's new in{' '}
              <span className="text-primary">BIGBROS AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay up to date with new features, improvements, and bug fixes. 
              We ship updates regularly to make your WhatsApp marketing even better.
            </p>
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {changelogEntries.map((entry, entryIndex) => (
                <Card key={entry.version} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-2xl">v{entry.version}</CardTitle>
                        {getVersionBadge(entry.type)}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDistanceToNow(entry.date, { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {entry.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {getChangeIcon(change.type)}
                            {getChangeBadge(change.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{change.title}</h4>
                            <p className="text-muted-foreground text-sm">{change.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}