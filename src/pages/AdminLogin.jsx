import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement actual authentication logic
    if (password === 'admin') {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full"
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default AdminLogin;