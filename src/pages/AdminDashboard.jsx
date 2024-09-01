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

  useEffect(() => {
    const storedRealEstateListings = getFromLocalStorage('realEstateListings') || [];
    const storedBusListings = getFromLocalStorage('busListings') || [];
    setRealEstateListings(storedRealEstateListings);
    setBusListings(storedBusListings);
  }, []);

  const locations = ["مسقط", "بوشر", "السيب", "مطرح", "العامرات", "قريات"];
  const roomTypeOptions = ["غرفة لشخص واحد", "غرفة لشخصين", "غرفة لثلاثة أشخاص", "غرفة لأربعة أشخاص"];
  const featureOptions = ["واي فاي", "موقف سيارات", "تكييف", "تلفزيون", "مطبخ"];

  const handleRealEstateInputChange = (e) => {
    const { name, value } = e.target;
    setRealEstateForm(prev => ({ ...prev, [name]: value }));
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRealEstateForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("الرجاء تحميل صورة بصيغة PNG.");
    }
  };

  const handleAddRealEstate = (e) => {
    e.preventDefault();
    const newListing = { ...realEstateForm, id: Date.now() };
    const updatedListings = [...realEstateListings, newListing];
    setRealEstateListings(updatedListings);
    saveToLocalStorage('realEstateListings', updatedListings);
    resetRealEstateForm();
    alert('تمت إضافة قائمة العقارات بنجاح!');
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
    console.log('إضافة قائمة الحافلات');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم المسؤول</h1>
      <Tabs defaultValue="real-estate">
        <TabsList>
          <TabsTrigger value="real-estate">العقارات</TabsTrigger>
          <TabsTrigger value="buses">الحافلات</TabsTrigger>
        </TabsList>
        <TabsContent value="real-estate">
          <h2 className="text-xl font-semibold mb-2">إضافة قائمة عقارات</h2>
          <form onSubmit={handleAddRealEstate} className="space-y-4">
            <div>
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                name="name"
                value={realEstateForm.name}
                onChange={handleRealEstateInputChange}
                placeholder="اسم العقار"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">الموقع</Label>
              <Select onValueChange={handleLocationChange} value={realEstateForm.location} required>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الموقع" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>أنواع الغرف</Label>
              {realEstateForm.roomTypes.map((room, index) => (
                <div key={index} className="flex space-x-2 mb-2 rtl:space-x-reverse">
                  <Select
                    onValueChange={(value) => handleRoomTypeChange(index, 'type', value)}
                    value={room.type}
                    required
                  >
                    <SelectTrigger>
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
                    required
                  />
                </div>
              ))}
              <Button type="button" onClick={addRoomType}>إضافة نوع غرفة</Button>
            </div>
            <div>
              <Label>المميزات</Label>
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
            <div>
              <Label htmlFor="image">الصورة (PNG فقط)</Label>
              <Input
                id="image"
                type="file"
                accept="image/png"
                onChange={handleImageUpload}
                required
              />
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button type="submit">إضافة عقار</Button>
              <Button type="button" onClick={resetRealEstateForm} variant="outline">إعادة تعيين النموذج</Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="buses">
          <h2 className="text-xl font-semibold mb-2">إضافة قائمة حافلات</h2>
          <form onSubmit={handleAddBus} className="space-y-4">
            <div>
              <Label htmlFor="busName">الاسم</Label>
              <Input id="busName" placeholder="اسم الحافلة" />
            </div>
            <div>
              <Label htmlFor="from">من</Label>
              <Input id="from" placeholder="موقع المغادرة" />
            </div>
            <div>
              <Label htmlFor="to">إلى</Label>
              <Input id="to" placeholder="موقع الوصول" />
            </div>
            <div>
              <Label htmlFor="busImage">الصورة</Label>
              <Input id="busImage" type="file" accept="image/png" />
            </div>
            <Button type="submit">إضافة حافلة</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;