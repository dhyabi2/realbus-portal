import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

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

  const [busForm, setBusForm] = useState({
    name: '',
    from: '',
    to: '',
    image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      const storedRealEstateListings = await getFromLocalStorage('realEstateListings') || [];
      const storedBusListings = await getFromLocalStorage('busListings') || [];
      setRealEstateListings(storedRealEstateListings);
      setBusListings(storedBusListings);
    };
    fetchData();
  }, []);

  const locations = ["مسقط", "بوشر", "السيب", "مطرح", "العامرات", "قريات"];
  const roomTypeOptions = ["غرفة لشخص واحد", "غرفة لشخصين", "غرفة لثلاثة أشخاص", "غرفة لأربعة أشخاص"];
  const featureOptions = ["واي فاي", "موقف سيارات", "تكييف", "تلفزيون", "مطبخ"];

  const handleRealEstateInputChange = (e) => {
    const { name, value } = e.target;
    setRealEstateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBusInputChange = (e) => {
    const { name, value } = e.target;
    setBusForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value) => {
    setRealEstateForm(prev => ({ ...prev, location: value }));
  };

  const handleRoomTypeChange = (index, field, value) => {
    const newRoomTypes = [...realEstateForm.roomTypes];
    newRoomTypes[index][field] = field === 'price' ? Number(value) : value;
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

  const handleImageUpload = (e, formType) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (formType === 'realEstate') {
          setRealEstateForm(prev => ({ ...prev, image: reader.result }));
        } else {
          setBusForm(prev => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("الرجاء تحميل صورة بصيغة PNG.");
    }
  };

  const handleAddRealEstate = async (e) => {
    e.preventDefault();
    // Filter out empty room types
    const filteredRoomTypes = realEstateForm.roomTypes.filter(room => room.type !== '' && room.price !== '');
    const newListing = { ...realEstateForm, roomTypes: filteredRoomTypes };
    const addedListing = await saveToLocalStorage('realEstateListings', newListing);
    if (addedListing) {
      setRealEstateListings(prev => [...prev, addedListing]);
      resetRealEstateForm();
      alert('تمت إضافة قائمة السكنات بنجاح!');
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    const addedBus = await saveToLocalStorage('busListings', busForm);
    if (addedBus) {
      setBusListings(prev => [...prev, addedBus]);
      resetBusForm();
      alert('تمت إضافة قائمة الباصات بنجاح!');
    }
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

  const resetBusForm = () => {
    setBusForm({
      name: '',
      from: '',
      to: '',
      image: null
    });
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
          <form onSubmit={handleAddRealEstate} className="space-y-4">
            <div className="text-right">
              <Label htmlFor="name" className="block mb-1">الاسم</Label>
              <Input
                id="name"
                name="name"
                value={realEstateForm.name}
                onChange={handleRealEstateInputChange}
                placeholder="اسم السكن"
                required
                className="w-full"
              />
            </div>
            <div className="text-right">
              <Label htmlFor="location" className="block mb-1">الموقع</Label>
              <Select onValueChange={handleLocationChange} value={realEstateForm.location} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="اختر الموقع" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <Label className="block mb-1">أنواع الغرف</Label>
              {realEstateForm.roomTypes.map((room, index) => (
                <div key={index} className="flex space-x-2 mb-2 rtl:space-x-reverse">
                  <Select
                    onValueChange={(value) => handleRoomTypeChange(index, 'type', value)}
                    value={room.type}
                    required={index === 0} // Only the first room type is required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="نوع الغرفة" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypeOptions.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="السعر"
                    value={room.price}
                    onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                    required={index === 0} // Only the first room type is required
                    className="w-1/3"
                  />
                </div>
              ))}
              <Button type="button" onClick={addRoomType} className="mt-2">إضافة نوع غرفة</Button>
            </div>
            <div className="text-right">
              <Label className="block mb-1">المميزات</Label>
              <div className="flex flex-wrap gap-4">
                {featureOptions.map(feature => (
                  <div key={feature} className="flex items-center space-x-2 rtl:space-x-reverse">
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
            <div className="text-right">
              <Label htmlFor="realEstateImage" className="block mb-1">الصورة (PNG فقط)</Label>
              <Input
                id="realEstateImage"
                type="file"
                accept="image/png"
                onChange={(e) => handleImageUpload(e, 'realEstate')}
                required
                className="w-full"
              />
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse justify-end">
              <Button type="submit">إضافة سكن</Button>
              <Button type="button" onClick={resetRealEstateForm} variant="outline">إعادة تعيين النموذج</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="buses">
          <h2 className="text-xl font-semibold mb-2 text-right">إضافة قائمة باصات</h2>
          <form onSubmit={handleAddBus} className="space-y-4">
            <div className="text-right">
              <Label htmlFor="busName" className="block mb-1">الاسم</Label>
              <Input
                id="busName"
                name="name"
                value={busForm.name}
                onChange={handleBusInputChange}
                placeholder="اسم الباص"
                required
                className="w-full"
              />
            </div>
            <div className="text-right">
              <Label htmlFor="from" className="block mb-1">من</Label>
              <Input
                id="from"
                name="from"
                value={busForm.from}
                onChange={handleBusInputChange}
                placeholder="موقع المغادرة"
                required
                className="w-full"
              />
            </div>
            <div className="text-right">
              <Label htmlFor="to" className="block mb-1">إلى</Label>
              <Input
                id="to"
                name="to"
                value={busForm.to}
                onChange={handleBusInputChange}
                placeholder="موقع الوصول"
                required
                className="w-full"
              />
            </div>
            <div className="text-right">
              <Label htmlFor="busImage" className="block mb-1">الصورة (PNG فقط)</Label>
              <Input
                id="busImage"
                type="file"
                accept="image/png"
                onChange={(e) => handleImageUpload(e, 'bus')}
                required
                className="w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">إضافة باص</Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;