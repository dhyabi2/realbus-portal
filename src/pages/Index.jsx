import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, Bus } from "lucide-react";
import RealEstateListing from '../components/RealEstateListing';
import { getFromLocalStorage } from '../utils/localStorage';

const Index = () => {
  const [realEstateListings, setRealEstateListings] = useState([]);

  useEffect(() => {
    const storedListings = getFromLocalStorage('realEstateListings');
    if (storedListings) {
      setRealEstateListings(storedListings);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to RealBus Portal</h1>
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
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
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Featured Real Estate Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {realEstateListings.map((listing, index) => (
            <RealEstateListing key={index} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;