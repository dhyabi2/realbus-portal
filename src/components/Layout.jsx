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
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold">سكني</Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 pb-16">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">الرئيسية</span>
          </Link>
          <Link to="/real-estate" className={`flex flex-col items-center ${isActive('/real-estate')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21h18M3 7v14M21 7v14M6 21V7M18 21V7M6 11h12M6 15h12M6 19h12M6 7h12M3 7l9-4 9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">السكنات</span>
          </Link>
          <Link to="/buses" className={`flex flex-col items-center ${isActive('/buses')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12V6a2 2 0 012-2h12a2 2 0 012 2v6M4 12h16M4 12v6a2 2 0 002 2h2M20 12v6a2 2 0 01-2 2h-2M8 18v2M16 18v2M8 4v2M16 4v2M8 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs mt-1">الباصات</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;