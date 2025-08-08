import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="min-vh-100">
      <Header 
        onMenuClick={() => setShowMobileSidebar(true)}
        showMobileMenu
      />
      
      <div className="d-flex">
        {/* Desktop Sidebar */}
        <div className="d-none d-lg-block">
          <Sidebar 
            collapsed={sidebarCollapsed}
            onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {showMobileSidebar && (
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 1040 }}>
            <div 
              className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
              onClick={() => setShowMobileSidebar(false)}
            />
            <div 
              className="position-fixed bg-white border-end h-100"
              style={{ 
                left: 0, 
                top: '76px', 
                width: '256px',
                zIndex: 1050 
              }}
            >
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow-1 p-4">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}