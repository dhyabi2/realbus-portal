import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from 'lucide-react';
import { getFromLocalStorage } from '../utils/localStorage';

const dummyBusListings = [
  {
    id: 1,
    name: "باص سريع مسقط - صلالة",
    from: "مسقط",
    to: "صلالة",
    image: "https://example.com/dummy-bus-1.jpg"
  },
  {
    id: 2,
    name: "رحلة مريحة نزوى - صحار",
    from: "نزوى",
    to: "صحار",
    image: "https://example.com/dummy-bus-2.jpg"
  }
];

const BusListing = ({ bus }) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="bg-secondary">
        <CardTitle className="text-secondary-foreground">{bus.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {bus.image && (
          <img src={bus.image} alt={bus.name} className="w-full h-48 object-cover mb-4 rounded" />
        )}
        <p className="text-sm text-gray-600 mb-2">من: {bus.from}</p>
        <p className="text-sm text-gray-600 mb-2">إلى: {bus.to}</p>
        <a 
          href="https://wa.me/96899195564" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full mt-4 inline-flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <MessageCircle className="mr-2 h-4 w-4" /> تواصل الآن
        </a>
      </CardContent>
    </Card>
  );
};

const Buses = () => {
  const [busListings, setBusListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusListings = async () => {
      try {
        setIsLoading(true);
        const data = await getFromLocalStorage('busListings');
        if (Array.isArray(data) && data.length > 0) {
          setBusListings(data);
        } else {
          setBusListings(dummyBusListings);
        }
      } catch (err) {
        console.error('Error fetching bus listings:', err);
        setError('Failed to load bus listings. Please try again later.');
        setBusListings(dummyBusListings);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusListings();
  }, []);

  if (isLoading) return <p className="text-center">جاري التحميل...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">قوائم الباصات</h1>
      {busListings.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد قوائم باصات متاحة حاليًا.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {busListings.map((bus) => (
            <BusListing key={bus.id} bus={bus} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Buses;
