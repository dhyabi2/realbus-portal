import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RealEstateListing = ({ listing }) => {
  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="bg-gradient-to-r from-pink-200 to-purple-200">
        <CardTitle className="text-2xl font-bold text-pink-700">{listing.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {listing.image && (
          <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover mb-4 rounded-lg shadow-md" />
        )}
        <p className="text-lg text-gray-700 mb-2">📍 {listing.location}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-pink-600">🛏️ Room Types:</h4>
          <ul className="space-y-1">
            {listing.roomTypes.map((room, index) => (
              <li key={index} className="text-sm text-gray-600">
                {room.type}: 💰 ${room.price} per night
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-pink-600">✨ Features:</h4>
          <div className="flex flex-wrap gap-2">
            {listing.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealEstateListing;