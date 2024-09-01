import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, Bus } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-start space-y-8 pt-8">
      <h1 className="text-3xl font-bold text-center app-title text-pink-600">Welcome to RealBus Portal 💖</h1>
      <p className="text-center text-lg text-gray-600">Find your dream home or plan your next journey!</p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/real-estate">
          <Button className="w-64 h-32 text-xl flex flex-col items-center justify-center bg-pink-500 hover:bg-pink-600 transition-all duration-300 shadow-lg rounded-2xl">
            <Building2 size={48} className="mb-2" />
            Real Estate 🏠
          </Button>
        </Link>
        <Link to="/buses">
          <Button className="w-64 h-32 text-xl flex flex-col items-center justify-center bg-purple-500 hover:bg-purple-600 transition-all duration-300 shadow-lg rounded-2xl">
            <Bus size={48} className="mb-2" />
            Buses 🚌
          </Button>
        </Link>
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-600">Discover comfort and convenience all in one place! 🌟</p>
      </div>
    </div>
  );
};

export default Index;