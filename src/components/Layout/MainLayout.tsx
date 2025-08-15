import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const closeSidebar = () => {
    setSidebarActive(false);
  };

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarActive} onClose={closeSidebar} />
      
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${sidebarActive ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      <div className="main-content">
        <Header onMenuToggle={toggleSidebar} />
        <main className="content-area">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;