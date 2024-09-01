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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">قوائم العقارات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realEstateListings.map((listing) => (
          <RealEstateListing key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default RealEstate;