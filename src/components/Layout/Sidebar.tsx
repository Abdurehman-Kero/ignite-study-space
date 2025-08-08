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

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'My Notes', href: '/notes', icon: FileText },
  { name: 'Upload Files', href: '/upload', icon: Upload },
  { name: 'AI Tools', href: '/ai-tools', icon: Bot },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
];

const subjects = [
  { name: 'Computer Science', color: 'bg-primary', count: 12 },
  { name: 'Mathematics', color: 'bg-success', count: 8 },
  { name: 'Physics', color: 'bg-info', count: 15 },
  { name: 'Chemistry', color: 'bg-danger', count: 6 },
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
    <div 
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      style={{ 
        width: collapsed ? '64px' : '256px',
        height: 'calc(100vh - 76px)',
        transition: 'width 0.3s ease'
      }}
    >
      <div className="h-100 p-3" style={{ overflowY: 'auto' }}>
        {/* Main Navigation */}
        <div className="mb-4">
          {navigationItems.map((item) => {
            const itemIsActive = isActive(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`d-flex align-items-center text-decoration-none p-2 rounded mb-1 ${
                  itemIsActive 
                    ? 'bg-primary text-white' 
                    : 'text-dark hover-bg-light'
                }`}
                style={{ gap: '12px' }}
              >
                <item.icon size={20} />
                {!collapsed && (
                  <span className="fw-medium">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </div>

        {!collapsed && (
          <>
            {/* Quick Add */}
            <div className="mb-4">
              <button className="btn btn-success w-100 d-flex align-items-center justify-content-start">
                <Plus size={16} className="me-2" />
                Quick Note
              </button>
            </div>

            {/* Subjects */}
            <div>
              <button
                className="btn btn-link w-100 d-flex align-items-center justify-content-between p-2 text-decoration-none text-muted"
                onClick={() => setSubjectsExpanded(!subjectsExpanded)}
              >
                <span className="fw-medium">Subjects</span>
                <ChevronDown
                  size={16}
                  style={{
                    transform: subjectsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </button>

              {subjectsExpanded && (
                <div className="ps-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject.name}
                      className="btn btn-link w-100 d-flex align-items-center text-decoration-none p-2 text-start hover-bg-light"
                      style={{ gap: '12px' }}
                    >
                      <div 
                        className={`rounded-circle ${subject.color}`}
                        style={{ width: '12px', height: '12px' }}
                      />
                      <div className="flex-grow-1">
                        <div className="fw-medium text-dark">{subject.name}</div>
                        <small className="text-muted">{subject.count} notes</small>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="mt-4 pt-4 border-top">
              <button className="btn btn-link w-100 d-flex align-items-center text-decoration-none text-muted">
                <Settings size={16} className="me-2" />
                Settings
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}