"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  MessageSquare, 
  TrendingUp,
  Activity,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import api from '@/lib/api';

const StatsCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
    <div className="flex items-start justify-between">
      <div className={cn("p-4 rounded-2xl", color)}>
        <Icon className="text-white" size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-green-500 text-xs font-black italic">
          <TrendingUp size={14} /> {trend}
        </span>
      )}
    </div>
    <div className="mt-6">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</p>
      <h3 className="text-3xl font-black text-dark-blue italic font-oswald">{value}</h3>
    </div>
  </div>
);

import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    inquiries: 0,
    blogs: 0,
    faqs: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, i, b, f] = await Promise.all([
          api.get('/products'),
          api.get('/inquiries'),
          api.get('/blogs'),
          api.get('/faqs')
        ]);
        setStats({
          products: p.data.count,
          inquiries: i.data.count,
          blogs: b.data.count,
          faqs: f.data.count
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Management</span>
        <h1 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Dashboard <span className="text-accent underline decoration-4 underline-offset-8">Overview</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          icon={Package} 
          label="Total Products" 
          value={stats.products} 
          trend="+12%" 
          color="bg-dark-blue" 
        />
        <StatsCard 
          icon={MessageSquare} 
          label="New Inquiries" 
          value={stats.inquiries} 
          trend="+5.4%" 
          color="bg-accent" 
        />
        <StatsCard 
          icon={Activity} 
          label="Active Blogs" 
          value={stats.blogs} 
          trend="+2.1%" 
          color="bg-blue-500" 
        />
        <StatsCard 
          icon={ShieldCheck} 
          label="Total FAQs" 
          value={stats.faqs} 
          color="bg-green-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-dark-blue uppercase italic font-oswald tracking-tight">System Status</h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
              All Systems Operational
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'API Server', status: 'Healthy', time: '12ms' },
              { label: 'Database', status: 'Connected', time: '0.4ms' },
              { label: 'Storage', status: 'Available', time: '98%' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-dark-blue transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-white/50">{s.label}</p>
                <div className="text-lg font-black text-dark-blue italic font-oswald group-hover:text-white">{s.status}</div>
                <div className="text-[10px] font-bold text-accent uppercase mt-2">{s.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-dark-blue rounded-[32px] p-8 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-dark-blue">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase italic font-oswald tracking-tight mb-2">Quick Actions</h3>
              <p className="text-white/50 text-sm font-medium leading-relaxed">Manage your site content efficiently with our unified tools.</p>
            </div>
            <div className="space-y-3">
              <button className="w-full h-12 bg-white/10 hover:bg-accent hover:text-dark-blue rounded-xl text-xs font-black uppercase tracking-widest transition-all">Add Product</button>
              <button className="w-full h-12 bg-white/10 hover:bg-accent hover:text-dark-blue rounded-xl text-xs font-black uppercase tracking-widest transition-all">Write Blog</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] select-none pointer-events-none">
            <TrendingUp size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
