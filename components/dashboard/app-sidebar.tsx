"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  Send,
  Users2,
  FileCode,
  Inbox,
  GitBranch,
  Settings,
  LayoutDashboard
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Send },
  { name: 'Templates', href: '/dashboard/templates', icon: FileCode },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users2 },
  { name: 'Inbox', href: '/dashboard/inbox', icon: Inbox },
  { name: 'Automations', href: '/dashboard/automations', icon: GitBranch },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card/95 backdrop-blur border-r border-[#25D366]/20 h-screen sticky top-0">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-[#25D366]/20">
          <Logo />
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200",
                      isActive 
                        ? "bg-[#25D366] text-white shadow-lg" 
                        : "text-muted-foreground hover:text-[#25D366] hover:bg-[#25D366]/10"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "")} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}