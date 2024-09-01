import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RealEstateListing = ({ listing }) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pastel-bg-3">
        <CardTitle>{listing.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {listing.image && (
          <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover mb-4 rounded" />
        )}
        <p className="text-sm text-gray-600 mb-2">Location: {listing.location}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Room Types:</h4>
          <ul className="space-y-1">
            {listing.roomTypes.map((room, index) => (
              <li key={index} className="text-sm flex justify-between">
                <span>{room.type}</span>
                <span className="font-medium">${room.price} per night</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {listing.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="pastel-bg-4">{feature}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealEstateListing;