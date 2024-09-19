import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BusForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    from: '',
    to: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
    onSubmit(form);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: '',
      from: '',
      to: '',
      image: null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-right">
        <Label htmlFor="busName" className="block mb-1">الاسم</Label>
        <Input
          id="busName"
          name="name"
          value={form.name}
          onChange={handleInputChange}
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
          value={form.from}
          onChange={handleInputChange}
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
          value={form.to}
          onChange={handleInputChange}
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
          onChange={handleImageUpload}
          required
          className="w-full"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">إضافة باص</Button>
      </div>
    </form>
  );
};

export default BusForm;