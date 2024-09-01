import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
              <path d="M10 25h20v5H10z" fill="#FFA5A5"/>
              <path d="M15 15h10v10H15z" fill="#FF7A7A"/>
              <circle cx="15" cy="30" r="3" fill="#FF7A7A"/>
              <circle cx="25" cy="30" r="3" fill="#FF7A7A"/>
            </svg>
            <span className="text-2xl font-bold">سكني</span>
          </Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 pb-16">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="#FF9F43" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" fill="#4ECDC4" stroke="#45B7D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">الرئيسية</span>
          </Link>
          <Link to="/real-estate" className={`flex flex-col items-center ${isActive('/real-estate')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21h18M3 7v14M21 7v14M6 21V7M18 21V7M6 11h12M6 15h12M6 19h12M6 7h12M3 7l9-4 9 4" fill="#54A0FF" stroke="#5E60CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">السكنات</span>
          </Link>
          <Link to="/buses" className={`flex flex-col items-center ${isActive('/buses')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12V6a2 2 0 012-2h12a2 2 0 012 2v6M4 12h16M4 12v6a2 2 0 002 2h2M20 12v6a2 2 0 01-2 2h-2M8 18v2M16 18v2M8 4v2M16 4v2" fill="#FF6B6B" stroke="#FF9F43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10h8" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">الباصات</span>
          </Link>
          <Link to="/admin" className={`flex flex-col items-center ${isActive('/admin')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill="#54A0FF" stroke="#5E60CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" fill="#FF9F43" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">الإدارة</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;