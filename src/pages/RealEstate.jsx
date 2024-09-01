import React, { useEffect, useState } from 'react';
import RealEstateListing from '../components/RealEstateListing';
import { getFromLocalStorage } from '../utils/localStorage';

const RealEstate = () => {
  const [realEstateListings, setRealEstateListings] = useState([]);

  useEffect(() => {
    const storedListings = getFromLocalStorage('realEstateListings') || [];
    setRealEstateListings(storedListings);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-center app-title text-pink-600">Real Estate Listings 🏡</h1>
      <p className="text-center text-lg text-gray-600 mb-6">Find your perfect home sweet home! 💕</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realEstateListings.map((listing) => (
          <RealEstateListing key={listing.id} listing={listing} />
        ))}
      </div>
      {realEstateListings.length === 0 && (
        <p className="text-center text-lg text-gray-600 mt-8">No listings available yet. Check back soon! 🌸</p>
      )}
    </div>
  );
};

export default RealEstate;