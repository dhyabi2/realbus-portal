import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, Bus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to RealBus Portal</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/real-estate">
          <Button className="w-64 h-32 text-xl flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700">
            <Building2 size={48} className="mb-2" />
            Real Estate
          </Button>
        </Link>
        <Link to="/buses">
          <Button className="w-64 h-32 text-xl flex flex-col items-center justify-center bg-green-600 hover:bg-green-700">
            <Bus size={48} className="mb-2" />
            Buses
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;