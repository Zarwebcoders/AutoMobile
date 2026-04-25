"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  Phone, 
  Mail,
  Loader2,
  ExternalLink
} from 'lucide-react';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/inquiries');
      setInquiries(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await api.delete(`/inquiries/${id}`);
        setInquiries(inquiries.filter(i => i._id !== id));
      } catch (err) {
        alert('Failed to delete inquiry');
      }
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/inquiries/${id}`, { status });
      setInquiries(inquiries.map(i => i._id === id ? { ...i, status } : i));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Customer Requests</span>
          <h1 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Product <span className="text-accent underline decoration-4 underline-offset-8">Inquiries</span></h1>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by product, name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 bg-slate-50 rounded-xl pl-12 pr-4 outline-none border border-transparent focus:border-accent transition-all text-sm font-medium"
            />
          </div>
          <button className="h-12 px-6 bg-slate-50 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-100 transition-all">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer & Product</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-medium">No inquiries found.</td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-dark-blue uppercase italic font-oswald">{inquiry.productName}</span>
                        <span className="text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                          <User size={12} /> {inquiry.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Phone size={12} className="text-accent" /> {inquiry.mobile}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                          <Mail size={12} /> {inquiry.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-dark-blue">{inquiry.quantity}</span>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-5">
                      <select 
                        value={inquiry.status}
                        onChange={(e) => updateStatus(inquiry._id, e.target.value)}
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest outline-none border-none",
                          inquiry.status === 'Pending' ? "bg-orange-100 text-orange-600" :
                          inquiry.status === 'Contacted' ? "bg-blue-100 text-blue-600" :
                          inquiry.status === 'Resolved' ? "bg-green-100 text-green-600" :
                          "bg-red-100 text-red-600"
                        )}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={`https://wa.me/${inquiry.mobile.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button 
                          onClick={() => handleDelete(inquiry._id)}
                          className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
