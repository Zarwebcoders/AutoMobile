"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav className={cn("flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400", className)}>
      <Link 
        href="/" 
        className="flex items-center gap-1.5 hover:text-accent transition-colors group"
      >
        <Home size={12} className="group-hover:scale-110 transition-transform" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={10} className="text-gray-300" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-accent">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
