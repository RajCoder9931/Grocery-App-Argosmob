import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} toggleCollapse={toggleSidebarCollapse} />
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <Header onLogout={onLogout} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>;
};
export default Layout;