"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, LogIn, Package, MessageSquare, Clock, User, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { cn } from '@/lib/utils';

export default function MyAccountPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserInquiries();
    }
  }, [user]);

  const fetchUserInquiries = async () => {
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gray-50/50 border-b border-gray-100 py-4">
          <div className="container mx-auto px-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-accent">Home</Link>
            <ChevronRight size={10} />
            <span className="text-dark-blue">My account</span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          <div className="max-w-md w-full">
            <h1 className="text-3xl font-black text-dark-blue uppercase tracking-tighter mb-8 text-center">Login</h1>
            <div className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-sm">
               <p className="text-sm font-medium text-gray-500 mb-8 text-center">Please log in to your account to see your inquiry history and manage your profile.</p>
               <Link 
                href="/login" 
                className="w-full h-14 bg-dark-blue text-white rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3"
               >
                 <LogIn size={20} />
                 Go to Login
               </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={10} />
          <span className="text-dark-blue">Dashboard</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-4">
            <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-dark-blue italic font-oswald uppercase leading-none">{user.name}</h3>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">{user.role}</p>
                </div>
              </div>
              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 text-accent font-black uppercase text-[11px] tracking-widest">
                   <MessageSquare size={16} /> My Inquiries
                </button>
                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 font-black uppercase text-[11px] tracking-widest transition-all">
                   <LogOut size={16} /> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Activity History</span>
              <h1 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">My <span className="text-accent underline decoration-4 underline-offset-8">Inquiries</span></h1>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-20 flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading History...</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="p-20 flex flex-col items-center gap-4 text-gray-300">
                  <MessageSquare size={48} strokeWidth={1} />
                  <p className="font-bold uppercase text-[10px] tracking-widest">No inquiry history found</p>
                  <Link href="/shop" className="text-accent font-black text-[11px] uppercase tracking-widest hover:underline mt-2">Start Shopping</Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center p-1 border border-gray-100">
                                <Package size={20} className="text-slate-300" />
                              </div>
                              <span className="text-sm font-black text-dark-blue uppercase italic font-oswald">{inquiry.productName}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm font-black text-dark-blue">{inquiry.quantity}</td>
                          <td className="px-8 py-6 text-xs font-bold text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                              inquiry.status === 'Pending' ? "bg-orange-50 text-orange-500" :
                              inquiry.status === 'Contacted' ? "bg-blue-50 text-blue-500" :
                              inquiry.status === 'Resolved' ? "bg-green-50 text-green-500" :
                              "bg-red-50 text-red-500"
                            )}>
                              {inquiry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
