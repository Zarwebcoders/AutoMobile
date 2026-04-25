"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';
import { BlogPost } from './blog-data';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const [day, month] = post.date.split(' ');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="flex flex-col group cursor-pointer shadow-sm rounded-[2.5rem] overflow-hidden border border-gray-100 h-full bg-white transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Date Label */}
        <div className="absolute top-6 left-6 bg-[#EA580C] text-white p-3 rounded-2xl flex flex-col items-center justify-center min-w-[65px] shadow-lg z-10">
          <span className="text-lg font-black leading-none">{day}</span>
          <span className="text-[10px] font-black uppercase tracking-tighter">{month}</span>
        </div>

        {/* Video Overlay */}
        {post.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col gap-4 flex-1">
        <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">
          {post.category}
        </span>
        
        <h3 className="text-xl font-black text-dark-blue leading-tight line-clamp-2 uppercase font-oswald group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4">
          <span className="text-xs font-black text-primary uppercase underline underline-offset-4 flex items-center gap-2 group-hover:text-accent transition-colors">
            Read more <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
