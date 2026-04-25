"use client";

import React, { useState, useEffect } from 'react';
import { X, Upload, Loader2, Save } from 'lucide-react';
import api from '@/lib/api';
import { motion } from 'framer-motion';

interface ProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editingProduct?: any;
}

export const ProductForm = ({ onClose, onSuccess, editingProduct }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    brand: '',
    category: '',
    price: '',
    originalPrice: '',
    badge: '',
    inStock: true,
    isFeatured: false,
    isBestDeal: false,
    isMoreToLove: false,
    description: '',
    image: '',
    details: {
      weight: '',
      dimensions: '',
      voltage: '',
      fittingPosition: '',
      driveType: '',
      opMode: '',
      mpn: '',
      ean: ''
    }
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();

    if (editingProduct) {
      setFormData({
        ...editingProduct,
        price: editingProduct.price?.toString() || '',
        originalPrice: editingProduct.originalPrice?.toString() || '',
        category: editingProduct.category || '',
        details: editingProduct.details || {
          weight: '',
          dimensions: '',
          voltage: '',
          fittingPosition: '',
          driveType: '',
          opMode: '',
          mpn: '',
          ean: ''
        }
      });
      if (editingProduct.image) {
        setPreviewUrl(editingProduct.image);
      }
    }
  }, [editingProduct]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('details.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        details: { ...prev.details, [field]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        // Assuming there's an upload endpoint, if not we might need to handle it differently
        try {
          const uploadRes = await api.post('/upload', uploadData);
          imageUrl = uploadRes.data.url;
        } catch (err) {
          console.error('Upload failed, using preview URL as fallback (not recommended for production)');
        }
      }

      const finalData = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice) || undefined,
        image: imageUrl || undefined
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, finalData);
      } else {
        await api.post('/products', finalData);
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert('Failed to save product: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-dark-blue/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">New Entry</span>
            <h2 className="text-2xl font-black text-dark-blue uppercase italic font-oswald">{editingProduct ? 'Edit' : 'Add'} <span className="text-accent">Product</span></h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-dark-blue uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-8 h-px bg-accent" /> Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest ml-2">Product Name *</label>
                <input name="name" required value={formData.name} onChange={handleChange} className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium" placeholder="e.g. RIDEX Wiper Motor" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest ml-2">SKU *</label>
                <input name="sku" required value={formData.sku} onChange={handleChange} className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium" placeholder="e.g. 295W0003" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest ml-2">Brand *</label>
                <input name="brand" required value={formData.brand} onChange={handleChange} className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium" placeholder="e.g. RIDEX" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest ml-2">Category *</label>
                <select 
                  name="category" 
                  required 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Image Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-dark-blue uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-8 h-px bg-accent" /> Pricing & Stock
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest ml-2">Current Price ($) *</label>
                  <input name="price" type="number" step="0.01" required value={formData.price} onChange={handleChange} className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium" placeholder="55.25" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest ml-2">Original Price ($)</label>
                  <input name="originalPrice" type="number" step="0.01" value={formData.originalPrice} onChange={handleChange} className="w-full h-12 bg-slate-50 rounded-xl px-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium" placeholder="75.59" />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="w-4 h-4 rounded border-slate-200 text-accent focus:ring-accent" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-dark-blue">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" name="isBestDeal" checked={formData.isBestDeal} onChange={handleChange} className="w-4 h-4 rounded border-slate-200 text-accent focus:ring-accent" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-dark-blue">Best Deal</span>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black text-dark-blue uppercase tracking-[0.2em] flex items-center gap-3">
                <span className="w-8 h-px bg-accent" /> Product Image
              </h3>
              <div className="relative h-32 w-full border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center group hover:border-accent transition-all">
                {previewUrl ? (
                  <div className="relative w-full h-full p-2">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    <button type="button" onClick={() => {setImageFile(null); setPreviewUrl(''); setFormData(prev => ({...prev, image: ''}))}} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"><X size={14}/></button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center gap-2 cursor-pointer">
                    <Upload className="text-slate-300 group-hover:text-accent transition-colors" size={24} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-dark-blue">Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-dark-blue uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-8 h-px bg-accent" /> Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Weight (kg)', name: 'details.weight', placeholder: '3 kg' },
                { label: 'Dimensions', name: 'details.dimensions', placeholder: '23.5 x 55 x 32 cm' },
                { label: 'Voltage', name: 'details.voltage', placeholder: '12V' },
                { label: 'Fitting Position', name: 'details.fittingPosition', placeholder: 'Front' },
                { label: 'Drive Type', name: 'details.driveType', placeholder: 'for left-hand drive' },
                { label: 'Op. Mode', name: 'details.opMode', placeholder: 'Electric' },
                { label: 'MPN', name: 'details.mpn', placeholder: '295W0003' },
                { label: 'EAN', name: 'details.ean', placeholder: '4059191242054' },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest ml-2">{field.label}</label>
                  <input 
                    name={field.name} 
                    value={(formData.details as any)[field.name.split('.')[1]]} 
                    onChange={handleChange} 
                    className="w-full h-11 bg-slate-50 rounded-xl px-4 outline-none border border-transparent focus:border-accent transition-all text-xs font-medium" 
                    placeholder={field.placeholder} 
                  />
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight italic">
            Make sure all mandatory fields marked with (*) are filled correctly.
          </p>
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all">Cancel</button>
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="h-12 px-10 bg-dark-blue text-white rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-accent hover:text-dark-blue transition-all shadow-xl shadow-dark-blue/10 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18}/> {editingProduct ? 'Update' : 'Publish'} Product</>}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
