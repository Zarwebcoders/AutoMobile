"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      if (data.user.role === 'Admin' || data.user.role === 'Super Admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-white rounded-[40px] p-10 lg:p-16 shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-accent transition-colors">
              <ArrowLeft size={14} /> Back to website
            </Link>
            <div className="flex flex-col gap-4">
              <Link href="/">
                <img src="/logo.png" alt="Baladex Global" className="h-12 w-auto object-contain" />
              </Link>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Authentication</span>
                <h1 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Sign <span className="text-accent underline decoration-4 underline-offset-8">In</span></h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-3 italic">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-14 bg-slate-50 rounded-2xl pl-14 pr-6 outline-none border border-transparent focus:border-accent transition-all text-dark-blue font-medium" 
                  placeholder="admin@baladexglobal.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-14 bg-slate-50 rounded-2xl pl-14 pr-6 outline-none border border-transparent focus:border-accent transition-all text-dark-blue font-medium" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-accent focus:ring-accent" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-dark-blue transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">Forgot?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-dark-blue text-white rounded-2xl font-black uppercase text-sm flex items-center justify-center gap-4 hover:bg-accent hover:text-dark-blue transition-all shadow-xl shadow-dark-blue/10 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Sign in to dashboard <LogIn size={20} /></>
              )}
            </button>
          </form>

          <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-tight">
            Protected by Baladex Global Secure Access <br /> Authorized personnel only
          </p>
        </div>

        {/* Background branding */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
          <img src="/logo.png" alt="" className="w-[400px] h-auto object-contain grayscale" />
        </div>
      </motion.div>
    </div>
  );
}
