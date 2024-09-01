import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building, Bus, User } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary' : 'text-gray-500';
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-tajawal">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
              <rect width="40" height="40" rx="8" fill="#FFF5F5"/>
              <path d="M20 10L30 30H10L20 10Z" fill="#FFA5A5"/>
              <circle cx="20" cy="25" r="5" fill="#FF7A7A"/>
            </svg>
            <span className="text-2xl font-bold">بوابة ريل باص</span>
          </Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 pb-16">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
            <Home size={24} />
            <span className="text-xs mt-1">الرئيسية</span>
          </Link>
          <Link to="/real-estate" className={`flex flex-col items-center ${isActive('/real-estate')}`}>
            <Building size={24} />
            <span className="text-xs mt-1">العقارات</span>
          </Link>
          <Link to="/buses" className={`flex flex-col items-center ${isActive('/buses')}`}>
            <Bus size={24} />
            <span className="text-xs mt-1">الحافلات</span>
          </Link>
          <Link to="/admin" className={`flex flex-col items-center ${isActive('/admin')}`}>
            <User size={24} />
            <span className="text-xs mt-1">الإدارة</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;