import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'hakima234') {
      navigate('/admin/dashboard');
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">تسجيل دخول المسؤول</h1>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="أدخل كلمة المرور"
          className="w-full"
        />
        <Button type="submit" className="w-full">تسجيل الدخول</Button>
      </form>
    </div>
  );
};

export default AdminLogin;