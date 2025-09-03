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
  Bot,
  Globe2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const templates = [
  {
    id: 'tpl_001',
    name: 'Welcome Message',
    category: 'marketing',
    status: 'approved',
    language: 'en',
    placeholders: 2,
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    content: 'Hi {{name}}, welcome to {{company}}! 🎉'
  },
  {
    id: 'tpl_002',
    name: 'Order Confirmation',
    category: 'utility',
    status: 'approved',
    language: 'en',
    placeholders: 3,
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    content: 'Your order #{{order_id}} has been confirmed for {{amount}}.'
  },
  {
    id: 'tpl_003',
    name: 'Password Reset',
    category: 'authentication',
    status: 'pending',
    language: 'en',
    placeholders: 1,
    lastModified: new Date(Date.now() - 1 * 60 * 60 * 1000),
    content: 'Reset your password using this code: {{code}}'
  },
  {
    id: 'tpl_004',
    name: 'Flash Sale Alert',
    category: 'marketing',
    status: 'draft',
    language: 'en',
    placeholders: 2,
    lastModified: new Date(Date.now() - 30 * 60 * 1000),
    content: '🔥 Flash Sale! Get {{discount}}% off everything!'
  },
  {
    id: 'tpl_005',
    name: 'Shipping Update',
    category: 'utility',
    status: 'approved',
    language: 'en',
    placeholders: 2,
    lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    content: 'Your order is on the way! Track: {{tracking_url}}'
  }
];

const statusColors = {
  approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  pending: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground">
            Manage your WhatsApp message templates and get them approved
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bot className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
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

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Templates</CardTitle>
          <CardDescription>
            {filteredTemplates.length} templates found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Placeholders</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell className="capitalize">{template.category}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[template.status as keyof typeof statusColors]}>
                      {template.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-4 h-4" />
                      {template.language.toUpperCase()}
                    </div>
                  </TableCell>
                  <TableCell>{template.placeholders}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(template.lastModified, { addSuffix: true })}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {template.content}
                  </TableCell>
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
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
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