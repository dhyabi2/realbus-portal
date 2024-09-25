import React, { useEffect, useState } from 'react';
import RealEstateListing from '../components/RealEstateListing';
import { getFromLocalStorage } from '../utils/localStorage';

const dummyRealEstateListings = [
  {
    id: 1,
    name: "شقة فاخرة في مسقط",
    location: "مسقط",
    image: "https://example.com/dummy-real-estate-1.jpg",
    roomTypes: [
      { type: "غرفة لشخصين", price: 50 },
      { type: "غرفة لثلاثة أشخاص", price: 70 }
    ],
    features: ["واي فاي", "تكييف", "موقف سيارات"]
  },
  {
    id: 2,
    name: "فيلا مع إطلالة على البحر",
    location: "صلالة",
    image: "https://example.com/dummy-real-estate-2.jpg",
    roomTypes: [
      { type: "غرفة لشخص واحد", price: 40 },
      { type: "غرفة لشخصين", price: 60 }
    ],
    features: ["مسبح", "حديقة", "مطبخ"]
  }
];

const RealEstate = () => {
  const [realEstateListings, setRealEstateListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const storedListings = await getFromLocalStorage('realEstateListings') || [];
      if (storedListings.length === 0) {
        setRealEstateListings(dummyRealEstateListings);
      } else {
        setRealEstateListings(storedListings);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">قوائم السكنات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realEstateListings.map((listing) => (
          <RealEstateListing key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default RealEstate;
