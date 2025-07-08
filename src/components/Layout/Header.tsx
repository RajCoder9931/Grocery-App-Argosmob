import React from 'react';
import { MenuIcon, BellIcon, UserIcon, LogOutIcon } from 'lucide-react';
interface HeaderProps {
  toggleSidebar: () => void;
  onLogout: () => void;
}
const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  onLogout
}) => {
  return <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-2 md:ml-0">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="relative">
            <button className="flex items-center text-gray-700 focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-gray-600" />
              </div>
              <span className="ml-2 text-sm font-medium hidden md:block">
                Admin User
              </span>
            </button>
          </div>
          <button onClick={onLogout} className="text-gray-500 hover:text-gray-700 focus:outline-none flex items-center">
            <LogOutIcon className="h-5 w-5" />
            <span className="ml-1 text-sm hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </header>;
};
export default Header;