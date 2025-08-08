import { useState } from 'react';
import { Brain, Search, Bell, Settings, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
}

export default function Header({ onMenuClick, showMobileMenu = false }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container-fluid">
        {/* Mobile Menu Button */}
        {showMobileMenu && (
          <button
            className="btn btn-outline-secondary d-lg-none me-2"
            type="button"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>
        )}

        {/* Logo */}
        <div className="d-flex align-items-center">
          <div className="bg-primary text-white p-2 rounded-3 me-3">
            <Brain size={24} />
          </div>
          <div className="d-none d-sm-block">
            <h5 className="mb-0 fw-bold text-primary">StudyCompanion</h5>
            <small className="text-muted">AI-Powered Learning</small>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-fill mx-4" style={{ maxWidth: '400px' }}>
          <div className="position-relative">
            <Search 
              className="position-absolute top-50 translate-middle-y text-muted" 
              style={{ left: '12px', pointerEvents: 'none' }}
              size={16}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search notes, subjects, or ask AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="d-flex align-items-center gap-2">
          {/* Notifications */}
          <button className="btn btn-outline-secondary position-relative">
            <Bell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="btn btn-outline-secondary">
            <Settings size={20} />
          </button>

          {/* User Profile */}
          <div className="dropdown">
            <button 
              className="btn btn-outline-secondary rounded-circle" 
              type="button" 
              data-bs-toggle="dropdown"
              style={{ width: '40px', height: '40px' }}
            >
              <User size={20} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <div className="dropdown-header">
                  <div className="fw-medium">John Student</div>
                  <small className="text-muted">john@example.com</small>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Billing</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Log out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}