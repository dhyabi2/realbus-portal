import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RealEstateListing = ({ listing }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{listing.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover mb-4 rounded" />
        <p className="text-sm text-gray-600 mb-2">Location: {listing.location}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Room Types:</h4>
          <ul>
            {listing.roomTypes.map((room, index) => (
              <li key={index} className="text-sm">
                {room.type}: ${room.price} per night
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {listing.features.map((feature, index) => (
              <Badge key={index} variant="secondary">{feature}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealEstateListing;