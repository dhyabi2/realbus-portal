import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, Bus } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-start space-y-8 p-4">
      <h1 className="text-3xl font-bold text-center text-primary">مرحبًا بك في بوابة السكن والباص</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-secondary">الوصول السريع</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/real-estate">
            <Button className="w-full h-24 text-lg flex flex-col items-center justify-center bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Building2 size={32} className="mb-2" />
              السكنات
            </Button>
          </Link>
          <Link to="/buses">
            <Button className="w-full h-24 text-lg flex flex-col items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground">
              <Bus size={32} className="mb-2" />
              الباصات
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-secondary">النشاط الأخير</h2>
        <ul className="space-y-2 rtl:text-right">
          <li className="text-sm text-gray-600">تمت إضافة قائمة سكنات جديدة</li>
          <li className="text-sm text-gray-600">تم تحديث جدول الباصات</li>
          <li className="text-sm text-gray-600">3 تسجيلات مستخدمين جديدة</li>
        </ul>
      </div>
    </div>
  );
};

export default Index;