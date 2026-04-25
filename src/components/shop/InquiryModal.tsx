"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Phone, Mail, FileText, Hash, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    sku?: string;
  };
}

export const InquiryModal = ({ isOpen, onClose, product }: InquiryModalProps) => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    notes: '',
    quantity: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save to Database
      await api.post('/inquiries', {
        product: product.id,
        productName: product.name,
        user: currentUser?.id || currentUser?._id, // Add user ID if logged in
        ...formData
      });

      // 2. Prepare WhatsApp Message
      const whatsappNumber = "919016140507"; // Replace with actual business number
      const message = `*New Product Inquiry*%0A%0A` +
        `*Product:* ${product.name}%0A` +
        `*SKU:* ${product.sku || 'N/A'}%0A` +
        `*Quantity:* ${formData.quantity}%0A%0A` +
        `*Customer Details:*%0A` +
        `- Name: ${formData.name}%0A` +
        `- Mobile: ${formData.mobile}%0A` +
        `- Email: ${formData.email}%0A` +
        `- Notes: ${formData.notes || 'No notes provided'}`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      // 3. Open WhatsApp
      window.open(whatsappUrl, '_blank');

      alert('Inquiry submitted successfully!');
      onClose();
    } catch (err: any) {
      console.error(err);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-dark-blue/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden relative"
          >
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Product Inquiry</span>
                <h2 className="text-2xl font-black text-dark-blue uppercase italic font-oswald tracking-tight">Send <span className="text-accent">Request</span></h2>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-all border border-slate-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Product Info Summary */}
              <div className="p-4 bg-dark-blue rounded-2xl text-white">
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Inquiring for:</p>
                <p className="font-black italic uppercase font-oswald text-sm line-clamp-1">{product.name}</p>
                {product.sku && <p className="text-[10px] text-white/50 font-mono mt-1">SKU: {product.sku}</p>}
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="w-full h-14 bg-slate-50 rounded-2xl pl-12 pr-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="w-full h-14 bg-slate-50 rounded-2xl pl-12 pr-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Quantity"
                      className="w-full h-14 bg-slate-50 rounded-2xl pl-12 pr-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full h-14 bg-slate-50 rounded-2xl pl-12 pr-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium"
                  />
                </div>

                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific requirements or questions?"
                    className="w-full h-32 bg-slate-50 rounded-2xl pl-12 pr-4 pt-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-dark-blue text-white rounded-2xl font-black uppercase text-sm flex items-center justify-center gap-4 hover:bg-accent hover:text-dark-blue transition-all shadow-xl shadow-dark-blue/10 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Send Inquiry via WhatsApp <Send size={20} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
