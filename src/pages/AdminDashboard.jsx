import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const AdminDashboard = () => {
  const [realEstateListings, setRealEstateListings] = useState([]);
  const [busListings, setBusListings] = useState([]);

  const handleAddRealEstate = (e) => {
    e.preventDefault();
    // TODO: Implement real estate listing addition
    console.log('Add real estate listing');
  };

  const handleAddBus = (e) => {
    e.preventDefault();
    // TODO: Implement bus listing addition
    console.log('Add bus listing');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Tabs defaultValue="real-estate">
        <TabsList>
          <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
          <TabsTrigger value="buses">Buses</TabsTrigger>
        </TabsList>
        <TabsContent value="real-estate">
          <h2 className="text-xl font-semibold mb-2">Add Real Estate Listing</h2>
          <form onSubmit={handleAddRealEstate} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Property Name" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <select id="location" className="w-full p-2 border rounded">
                <option value="مسقط">مسقط</option>
                <option value="بوشر">بوشر</option>
                <option value="السيب">السيب</option>
              </select>
            </div>
            <div>
              <Label>Features</Label>
              <div className="flex space-x-4">
                <Checkbox id="wifi" />
                <Label htmlFor="wifi">WiFi</Label>
                <Checkbox id="parking" />
                <Label htmlFor="parking">Parking</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" accept="image/png" />
            </div>
            <Button type="submit">Add Listing</Button>
          </form>
        </TabsContent>
        <TabsContent value="buses">
          <h2 className="text-xl font-semibold mb-2">Add Bus Listing</h2>
          <form onSubmit={handleAddBus} className="space-y-4">
            <div>
              <Label htmlFor="busName">Name</Label>
              <Input id="busName" placeholder="Bus Name" />
            </div>
            <div>
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="Departure Location" />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="Arrival Location" />
            </div>
            <div>
              <Label htmlFor="busImage">Image</Label>
              <Input id="busImage" type="file" accept="image/png" />
            </div>
            <Button type="submit">Add Bus</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;