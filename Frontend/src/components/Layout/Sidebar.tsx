import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, PackageIcon, TagIcon, RulerIcon, UsersIcon, ShoppingCartIcon, BarChartIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, PercentIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  toggleSidebar,
  toggleCollapse
}) => {
  const location = useLocation();
  const menuItems = [{
    path: '/dashboard',
    name: 'Dashboard',
    icon: <HomeIcon className="h-5 w-5" />
  }, {
    path: '/products',
    name: 'Products',
    icon: <PackageIcon className="h-5 w-5" />
  }, {
    path: '/categories',
    name: 'Categories',
    icon: <TagIcon className="h-5 w-5" />
  }, {
    path: '/units',
    name: 'Units',
    icon: <RulerIcon className="h-5 w-5" />,
  }, {
    path: '/offers',
    name: 'Offers',
    icon: <PercentIcon className="h-5 w-5" />
  }, {
    path: '/users',
    name: 'Users',
    icon: <UsersIcon className="h-5 w-5" />
  }, {
    path: '/orders',
    name: 'Orders',
    icon: <ShoppingCartIcon className="h-5 w-5" />
  }, {
    path: '/reports',
    name: 'Reports',
    icon: <BarChartIcon className="h-5 w-5" />
  }];
  return <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar}></div>}
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 ${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800 text-white transform transition-all duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          {!isCollapsed && <div className="text-xl font-bold">Admin Panel</div>}
          <div className="flex items-center">
            {/* Mobile close button */}
            <button onClick={toggleSidebar} className={`text-gray-300 hover:text-white md:hidden ${isCollapsed ? 'mx-auto' : ''}`}>
              <XIcon className="h-6 w-6" />
            </button>
            {/* Desktop collapse toggle button */}
            <button onClick={toggleCollapse} className="hidden md:block text-gray-300 hover:text-white ml-auto">
              {isCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <nav className="mt-5 px-2">
          {menuItems.map(item => <div key={item.path} className="mb-2">
              {/* Main menu item */}
              <Link to={item.path} className={`flex items-center px-4 py-3 rounded-md transition-colors ${location.pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} onClick={() => {
            if (isOpen) toggleSidebar();
          }}>
                <div className={isCollapsed ? 'mx-auto' : ''}>{item.icon}</div>
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
              {/* Sub menu items */}
              {!isCollapsed && item.subItems && <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map(subItem => <Link key={subItem.path} to={subItem.path} className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${location.pathname === subItem.path ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`} onClick={() => {
              if (isOpen) toggleSidebar();
            }}>
                      {subItem.icon}
                      <span className="ml-2">{subItem.name}</span>
                    </Link>)}
                </div>}
            </div>)}
        </nav>
      </aside>
    </>;
};
export default Sidebar;