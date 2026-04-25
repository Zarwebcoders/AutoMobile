"use client";

import React, { useState } from 'react';
import { Search, RotateCcw, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VerticalVehicleFilter = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'vin'>('standard');

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-full">
      <div className="bg-dark-blue p-6 flex items-center gap-3">
        <Car className="text-accent w-6 h-6" />
        <h3 className="text-white font-oswald text-xl uppercase tracking-wide">Vehicle Filter</h3>
      </div>
      
      <div className="p-6">
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button 
            onClick={() => setActiveTab('standard')}
            className={cn(
              "flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-md transition-all",
              activeTab === 'standard' ? "bg-white text-dark-blue shadow-sm" : "text-gray-500 hover:text-dark-blue"
            )}
          >
            Standard
          </button>
          <button 
            onClick={() => setActiveTab('vin')}
            className={cn(
              "flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-md transition-all",
              activeTab === 'vin' ? "bg-white text-dark-blue shadow-sm" : "text-gray-500 hover:text-dark-blue"
            )}
          >
            Search by VIN
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'standard' ? (
            <>
              {['Make', 'Model', 'Year', 'Engine'].map((label) => (
                <div key={label} className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>
                  <select className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 text-sm font-bold text-dark-blue focus:ring-2 focus:ring-accent outline-none appearance-none cursor-pointer">
                    <option value="">Select {label}</option>
                  </select>
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">VIN Number</label>
              <input 
                type="text" 
                placeholder="Enter 17-digit VIN"
                className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg px-4 text-sm font-bold text-dark-blue focus:ring-2 focus:ring-accent outline-none"
              />
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <button className="flex-2 bg-accent hover:bg-dark-blue hover:text-white text-dark-blue font-black uppercase text-xs h-12 rounded-lg transition-all flex items-center justify-center gap-2">
              <Search size={16} />
              Find Parts
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-black h-12 rounded-lg transition-all flex items-center justify-center">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Over <span className="text-dark-blue">130,000</span> parts available
        </p>
      </div>
    </div>
  );
};
