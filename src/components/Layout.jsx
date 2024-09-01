import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building, Bus, User } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-500';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <Link to="/" className="text-2xl font-bold">RealBus Portal</Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 pb-16">
        {children}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center ${isActive('/')}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/real-estate" className={`flex flex-col items-center ${isActive('/real-estate')}`}>
            <Building size={24} />
            <span className="text-xs mt-1">Real Estate</span>
          </Link>
          <Link to="/buses" className={`flex flex-col items-center ${isActive('/buses')}`}>
            <Bus size={24} />
            <span className="text-xs mt-1">Buses</span>
          </Link>
          <Link to="/admin" className={`flex flex-col items-center ${isActive('/admin')}`}>
            <User size={24} />
            <span className="text-xs mt-1">Admin</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;