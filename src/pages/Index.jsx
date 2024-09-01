import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, Bus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
];

const Index = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Real Estate Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Bus Services</h3>
          <p className="text-gray-600">Quick overview of bus services will be displayed here.</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/real-estate" className="flex-1">
          <Button className="w-full py-6 text-lg flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors">
            <Building2 size={24} className="mr-2" />
            Real Estate
          </Button>
        </Link>
        <Link to="/buses" className="flex-1">
          <Button className="w-full py-6 text-lg flex items-center justify-center bg-green-500 hover:bg-green-600 transition-colors">
            <Bus size={24} className="mr-2" />
            Buses
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;