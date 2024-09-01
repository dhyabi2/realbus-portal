import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, Bus } from "lucide-react";
import RealEstateListing from '../components/RealEstateListing';

const Index = () => {
  // Mock data for real estate listings
  const mockListings = [
    {
      id: 1,
      name: 'Luxury Villa',
      location: 'مسقط',
      roomTypes: [
        { type: '1 in a room', price: 50 },
        { type: '2 in a room', price: 80 },
        { type: '3 in a room', price: 120 }
      ],
      features: ['WiFi', 'Parking', 'Air Conditioning'],
      image: 'https://example.com/luxury-villa.png'
    },
    {
      id: 2,
      name: 'Cozy Apartment',
      location: 'بوشر',
      roomTypes: [
        { type: '1 in a room', price: 40 },
        { type: '2 in a room', price: 70 }
      ],
      features: ['WiFi', 'TV'],
      image: 'https://example.com/cozy-apartment.png'
    }
  ];

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
          {mockListings.map(listing => (
            <RealEstateListing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;