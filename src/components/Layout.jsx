import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Logo</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/real-estate">Real Estate</Link></li>
              <li><Link to="/buses">Buses</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <h3 className="font-bold">Contact Information</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
          <div>
            <h3 className="font-bold">Links</h3>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;