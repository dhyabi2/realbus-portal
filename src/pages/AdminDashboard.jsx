import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminDashboard = () => {
  const [realEstateListings, setRealEstateListings] = useState([]);
  const [busListings, setBusListings] = useState([]);

  const [realEstateForm, setRealEstateForm] = useState({
    name: '',
    location: '',
    roomTypes: [{ type: '', price: '' }],
    features: [],
    image: null
  });

  const locations = ["مسقط", "بوشر", "السيب", "مطرح", "العامرات", "قريات"];
  const roomTypeOptions = ["Single", "Double", "Suite", "Apartment"];
  const featureOptions = ["WiFi", "Parking", "Air Conditioning", "TV", "Kitchen"];

  const handleRealEstateInputChange = (e) => {
    const { name, value } = e.target;
    setRealEstateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value) => {
    setRealEstateForm(prev => ({ ...prev, location: value }));
  };

  const handleRoomTypeChange = (index, field, value) => {
    const newRoomTypes = [...realEstateForm.roomTypes];
    newRoomTypes[index][field] = value;
    setRealEstateForm(prev => ({ ...prev, roomTypes: newRoomTypes }));
  };

  const addRoomType = () => {
    setRealEstateForm(prev => ({
      ...prev,
      roomTypes: [...prev.roomTypes, { type: '', price: '' }]
    }));
  };

  const handleFeatureToggle = (feature) => {
    setRealEstateForm(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRealEstateForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PNG image.");
    }
  };

  const handleAddRealEstate = (e) => {
    e.preventDefault();
    setRealEstateListings(prev => [...prev, realEstateForm]);
    resetRealEstateForm();
  };

  const resetRealEstateForm = () => {
    setRealEstateForm({
      name: '',
      location: '',
      roomTypes: [{ type: '', price: '' }],
      features: [],
      image: null
    });
  };

  const handleAddBus = (e) => {
    e.preventDefault();
    // TODO: Implement bus listing addition
    console.log('Add bus listing');
  };

  return (
    <div className="p-4">
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
              <Input
                id="name"
                name="name"
                value={realEstateForm.name}
                onChange={handleRealEstateInputChange}
                placeholder="Property Name"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Select onValueChange={handleLocationChange} value={realEstateForm.location}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Room Types</Label>
              {realEstateForm.roomTypes.map((room, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Select
                    onValueChange={(value) => handleRoomTypeChange(index, 'type', value)}
                    value={room.type}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypeOptions.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={room.price}
                    onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                  />
                </div>
              ))}
              <Button type="button" onClick={addRoomType}>Add Room Type</Button>
            </div>
            <div>
              <Label>Features</Label>
              <div className="flex flex-wrap gap-4">
                {featureOptions.map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={realEstateForm.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <Label htmlFor={feature}>{feature}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="image">Image (PNG only)</Label>
              <Input
                id="image"
                type="file"
                accept="image/png"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">Add Real Estate</Button>
              <Button type="button" onClick={resetRealEstateForm} variant="outline">Reset Form</Button>
            </div>
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