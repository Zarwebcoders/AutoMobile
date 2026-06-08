"use client";

import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVehicleStore } from '@/store/useVehicleStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const MAKES = [
  'Charn Chain Cover',
  'Goetz Piston',
  'Hero Rockman',
  'Jushin',
  'MK Clutch',
  'Nappino',
  'OE-Pro Gasket',
  'Power Coil',
  'RMP Bearing',
  'Sandhar',
  'Solance Battery',
  'Spaco Carburator',
  'Suprajit',
  'Swiss Wiring',
  'Ucal Carburator',
  'Usha Piston',
  'Varroc',
  'Yango Light'
];
const MODELS = {
  'Audi': ['A3', 'A4', 'A6', 'Q5', 'Q7'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5'],
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Tacoma'],
};

import { useRouter } from 'next/navigation';

export const VehicleSelector = () => {
  const router = useRouter();
  const { make, model, year, engine, vin, setMake, setModel, setYear, setEngine, setVin } = useVehicleStore();
  const [activeTab, setActiveTab] = useState<'standard' | 'vin'>('standard');

  const handleSearch = () => {
    let query = '';
    if (vin) {
      query = vin;
    } else if (make || model) {
      query = `${make} ${model} ${year} ${engine}`.trim();
    }

    if (query) {
      router.push(`/shop?query=${encodeURIComponent(query)}`);
    } else {
      router.push('/shop');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-[#ea1d22] rounded-4xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col lg:flex-row items-center gap-4 p-2">
          
          {/* Cascading Dropdowns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full lg:w-auto">
            <div className="relative group">
              <select 
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full h-14 pl-5 pr-10 rounded-xl bg-white border-none appearance-none cursor-pointer focus:ring-2 focus:ring-dark-blue transition-all text-[13px] font-bold text-gray-700"
              >
                <option value="">Brand</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-dark-blue transition-colors" />
            </div>

            <div className="relative group">
              <select 
                disabled={!make}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full h-14 pl-5 pr-10 rounded-xl bg-white border-none appearance-none cursor-pointer focus:ring-2 focus:ring-dark-blue transition-all text-[13px] font-bold text-gray-700 disabled:opacity-50"
              >
                <option value="">Model</option>
                {make && MODELS[make as keyof typeof MODELS]?.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-dark-blue transition-colors" />
            </div>

            <div className="relative group">
              <select 
                disabled={!model}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-14 pl-5 pr-10 rounded-xl bg-white border-none appearance-none cursor-pointer focus:ring-2 focus:ring-dark-blue transition-all text-[13px] font-bold text-gray-700 disabled:opacity-50"
              >
                <option value="">Year</option>
                {[2024, 2023, 2022, 2021, 2020].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-dark-blue transition-colors" />
            </div>

            <div className="relative group">
              <select 
                disabled={!year}
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full h-14 pl-5 pr-10 rounded-xl bg-white border-none appearance-none cursor-pointer focus:ring-2 focus:ring-dark-blue transition-all text-[13px] font-bold text-gray-700 disabled:opacity-50"
              >
                <option value="">Engine</option>
                <option value="2.0L">2.0L Turbo</option>
                <option value="3.0L">3.0L V6</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-dark-blue transition-colors" />
            </div>
          </div>

          <div className="flex items-center text-dark-blue font-black px-2 text-sm">OR</div>

          {/* VIN Search */}
          <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative flex-1 group">
              <input 
                type="text"
                placeholder="Search by VIN"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="w-full h-14 pl-6 pr-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-dark-blue transition-all text-[13px] font-bold text-gray-700 placeholder:text-gray-400 shadow-inner"
              />
            </div>
            <Button 
              onClick={handleSearch}
              size="lg" 
              className="h-14 px-10 min-w-[160px] bg-dark-blue hover:bg-black text-white font-black uppercase text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Search
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
