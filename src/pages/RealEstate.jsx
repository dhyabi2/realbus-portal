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
      <div className="section-bar pastel-bg-2"></div>
      <h2 className="text-xl font-semibold mb-4">Real Estate Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realEstateListings.map((listing) => (
          <RealEstateListing key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default RealEstate;