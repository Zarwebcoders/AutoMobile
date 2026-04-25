"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: Layers, label: 'Categories', href: '/admin/categories' },
  { icon: FileText, label: 'Blogs', href: '/admin/blogs' },
  { icon: HelpCircle, label: 'FAQs', href: '/admin/faq' },
  { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <div className="w-72 bg-dark-blue h-screen sticky top-0 flex flex-col text-white">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="MOBEX" className="h-10 w-auto object-contain" />
          <h1 className="text-2xl font-black italic tracking-tighter uppercase font-oswald">Admin <span className="text-accent">Panel</span></h1>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group",
                isActive 
                  ? "bg-accent text-dark-blue font-bold" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="uppercase text-xs tracking-widest font-black italic">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate italic">{user?.name}</p>
              <p className="text-[10px] text-gray-400 truncate uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-400/10 transition-all group"
        >
          <LogOut size={20} />
          <span className="uppercase text-xs tracking-widest font-black italic">Logout</span>
        </button>
      </div>
    </div>
  );
};
