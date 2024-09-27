import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RealEstateForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    roomTypes: [{ type: '', price: '' }],
    features: [],
    image: null
  });

  const locations = [
    "مسقط", "صلالة", "نزوى", "صحار", "صور", "البريمي", "عبري", "الرستاق", "نخل", "بهلاء",
    "السويق", "الخابورة", "صحم", "شناص", "لوى", "السيب", "بوشر", "مطرح", "العامرات", "قريات",
    "بركاء", "المصنعة", "الخوض", "بدية", "المضيبي", "إبراء", "سمائل", "بدبد", "الحمراء", "منح",
    "إزكي", "أدم", "الكامل والوافي", "جعلان بني بو حسن", "جعلان بني بو علي", "صور", "الدقم",
    "محوت", "هيماء", "ثمريت", "طاقة", "مرباط", "رخيوت", "ضلكوت", "مقشن", "شليم وجزر الحلانيات",
    "ينقل", "ضنك", "الجازر", "البريمي", "محضة", "السنينة", "مسندم", "خصب", "دبا البيعة", "مدحاء",
    "بخاء"
  ];

  const roomTypeOptions = ["غرفة لشخص واحد", "غرفة لشخصين", "غرفة لثلاثة أشخاص", "غرفة لأربعة أشخاص"];
  const featureOptions = ["واي فاي", "موقف سيارات", "تكييف", "تلفزيون", "مطبخ"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value) => {
    setForm(prev => ({ ...prev, location: value }));
  };

  const handleRoomTypeChange = (index, field, value) => {
    const newRoomTypes = [...form.roomTypes];
    newRoomTypes[index][field] = field === 'price' ? Number(value) : value;
    setForm(prev => ({ ...prev, roomTypes: newRoomTypes }));
  };

  const addRoomType = () => {
    setForm(prev => ({
      ...prev,
      roomTypes: [...prev.roomTypes, { type: '', price: '' }]
    }));
  };

  const handleFeatureToggle = (feature) => {
    setForm(prev => ({
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
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("الرجاء تحميل صورة بصيغة PNG.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredRoomTypes = form.roomTypes.filter(room => room.type !== '' && room.price !== '');
    onSubmit({ ...form, roomTypes: filteredRoomTypes });
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: '',
      location: '',
      roomTypes: [{ type: '', price: '' }],
      features: [],
      image: null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-right">
        <Label htmlFor="name" className="block mb-1">الاسم</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="اسم السكن"
          required
          className="w-full"
        />
      </div>
      <div className="text-right">
        <Label htmlFor="location" className="block mb-1">الموقع</Label>
        <Select onValueChange={handleLocationChange} value={form.location} required>
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
        {form.roomTypes.map((room, index) => (
          <div key={index} className="flex space-x-2 mb-2 rtl:space-x-reverse">
            <Select
              onValueChange={(value) => handleRoomTypeChange(index, 'type', value)}
              value={room.type}
              required={index === 0}
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
              required={index === 0}
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
                checked={form.features.includes(feature)}
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
          onChange={handleImageUpload}
          required
          className="w-full"
        />
      </div>
      <div className="flex space-x-2 rtl:space-x-reverse justify-end">
        <Button type="submit">إضافة سكن</Button>
        <Button type="button" onClick={resetForm} variant="outline">إعادة تعيين النموذج</Button>
      </div>
    </form>
  );
};

export default RealEstateForm;