import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: 'dashboard' },
  { name: 'My Notes', href: '/notes', icon: 'notes' },
  { name: 'Upload Files', href: '/upload', icon: 'upload' },
  { name: 'AI Tools', href: '/ai-tools', icon: 'bot' },
  { name: 'AI Chat', href: '/chat', icon: 'chat' },
  { name: 'Calendar', href: '/calendar', icon: 'calendar' },
];

const subjects = [
  { name: 'Computer Science', color: '#3b82f6', count: 12 },
  { name: 'Mathematics', color: '#10b981', count: 8 },
  { name: 'Physics', color: '#8b5cf6', count: 15 },
  { name: 'Chemistry', color: '#ef4444', count: 6 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const getIcon = (iconName: string) => {
  const icons = {
    dashboard: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      </svg>
    ),
    notes: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14,2 14,8 20,8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10,9 9,9 8,9"></polyline>
      </svg>
    ),
    upload: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17,8 12,3 7,8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
    ),
    bot: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>
      </svg>
    ),
    chat: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ),
    calendar: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
  };
  return icons[iconName] || icons.dashboard;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [subjectsExpanded, setSubjectsExpanded] = useState(true);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          {/* Main Navigation */}
          <div className="nav-section">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={`nav-item ${isActive(item.href) ? 'nav-item-active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">{getIcon(item.icon)}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Quick Add */}
          <div className="quick-add-section">
            <button className="quick-add-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Quick Note
            </button>
          </div>

          {/* Subjects */}
          <div className="subjects-section">
            <button
              className="subjects-header"
              onClick={() => setSubjectsExpanded(!subjectsExpanded)}
            >
              <span>Subjects</span>
              <svg 
                className={`chevron ${subjectsExpanded ? 'chevron-down' : 'chevron-right'}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>

            {subjectsExpanded && (
              <div className="subjects-list">
                {subjects.map((subject) => (
                  <button key={subject.name} className="subject-item">
                    <div 
                      className="subject-color" 
                      style={{ backgroundColor: subject.color }}
                    />
                    <div className="subject-info">
                      <p className="subject-name">{subject.name}</p>
                      <p className="subject-count">{subject.count} notes</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="settings-section">
            <button className="settings-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m6-12h-6m-6 0h6"></path>
              </svg>
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;