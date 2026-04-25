"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm transition-all duration-300 ${
            currentPage === i + 1
              ? 'bg-dark-blue text-white shadow-lg'
              : 'bg-white text-dark-blue hover:bg-gray-100 border border-gray-100'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button className="w-10 h-10 rounded-lg bg-white text-dark-blue hover:bg-gray-100 border border-gray-100 flex items-center justify-center transition-all duration-300">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
