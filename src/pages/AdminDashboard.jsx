import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';
import RealEstateForm from '../components/RealEstateForm';
import BusForm from '../components/BusForm';

const AdminDashboard = () => {
  const [realEstateListings, setRealEstateListings] = useState([]);
  const [busListings, setBusListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedRealEstateListings = await getFromLocalStorage('realEstateListings') || [];
      const storedBusListings = await getFromLocalStorage('busListings') || [];
      setRealEstateListings(storedRealEstateListings);
      setBusListings(storedBusListings);
    };
    fetchData();
  }, []);

  const handleAddRealEstate = async (newListing) => {
    const addedListing = await saveToLocalStorage('realEstateListings', newListing);
    if (addedListing) {
      setRealEstateListings(prev => [...prev, addedListing]);
      alert('تمت إضافة قائمة السكنات بنجاح!');
    }
  };

  const handleAddBus = async (newBus) => {
    const addedBus = await saveToLocalStorage('busListings', newBus);
    if (addedBus) {
      setBusListings(prev => [...prev, addedBus]);
      alert('تمت إضافة قائمة الباصات بنجاح!');
    }
  };

  return (
    <div className="p-4 rtl">
      <h1 className="text-2xl font-bold mb-4 text-right">لوحة تحكم المسؤول</h1>
      <Tabs defaultValue="real-estate" dir="rtl">
        <TabsList className="mb-4">
          <TabsTrigger value="real-estate">السكنات</TabsTrigger>
          <TabsTrigger value="buses">الباصات</TabsTrigger>
        </TabsList>
        <TabsContent value="real-estate">
          <h2 className="text-xl font-semibold mb-2 text-right">إضافة قائمة سكنات</h2>
          <RealEstateForm onSubmit={handleAddRealEstate} />
        </TabsContent>
        <TabsContent value="buses">
          <h2 className="text-xl font-semibold mb-2 text-right">إضافة قائمة باصات</h2>
          <BusForm onSubmit={handleAddBus} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;