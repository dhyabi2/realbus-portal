import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';
import { getFromLocalStorage } from '../utils/localStorage';

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
        <Button 
          as="a" 
          href="https://wa.me/96899195564" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
        >
          <MessageCircle className="mr-2 h-4 w-4" /> تواصل الآن
        </Button>
      </CardContent>
    </Card>
  );
};

const Buses = () => {
  const [busListings, setBusListings] = useState([]);

  useEffect(() => {
    const storedBusListings = getFromLocalStorage('busListings') || [];
    setBusListings(storedBusListings);
  }, []);

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