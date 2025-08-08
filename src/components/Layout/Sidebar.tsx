import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Upload,
  Bot,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'My Notes', href: '/notes', icon: FileText },
  { name: 'Upload Files', href: '/upload', icon: Upload },
  { name: 'AI Tools', href: '/ai-tools', icon: Bot },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
];

const subjects = [
  { name: 'Computer Science', color: 'bg-blue-500', count: 12 },
  { name: 'Mathematics', color: 'bg-green-500', count: 8 },
  { name: 'Physics', color: 'bg-purple-500', count: 15 },
  { name: 'Chemistry', color: 'bg-red-500', count: 6 },
];

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: () => void;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const [subjectsExpanded, setSubjectsExpanded] = useState(true);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <div className={cn(
      'bg-card border-r border-border h-[calc(100vh-4rem)] transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <ScrollArea className="h-full px-3 py-4">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive: navIsActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  navIsActive || isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium truncate">{item.name}</span>
              )}
            </NavLink>
          ))}
        </div>

        {!collapsed && (
          <>
            {/* Quick Add */}
            <div className="mb-6">
              <Button 
                className="w-full justify-start bg-accent hover:bg-accent/80 text-accent-foreground"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Quick Note
              </Button>
            </div>

            {/* Subjects */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between p-2 h-8"
                onClick={() => setSubjectsExpanded(!subjectsExpanded)}
              >
                <span className="text-sm font-medium text-muted-foreground">
                  Subjects
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    subjectsExpanded ? 'rotate-0' : '-rotate-90'
                  )}
                />
              </Button>

              {subjectsExpanded && (
                <div className="space-y-1 pl-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.name}
                      className="flex items-center gap-3 w-full px-2 py-2 rounded-md text-left hover:bg-muted transition-colors group"
                    >
                      <div className={cn('h-3 w-3 rounded-full', subject.color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {subject.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {subject.count} notes
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {!collapsed && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}