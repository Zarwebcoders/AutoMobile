"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Car, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MyGarageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const VEHICLE_DATA = {
  'Audi': {
    models: ['S4', 'S5', 'S6'],
    years: {
      'S4': ['2010', '2011'],
      'S5': ['2012', '2013'],
      'S6': ['2014', '2015']
    },
    trims: {
      '2010': ['Audi 3.0L 6 Cylinder 333 hp 325 ft-lbs S-charged'],
      '2011': ['Audi 3.0L 6 Cylinder 333 hp 325 ft-lbs S-charged'],
    }
  },
  'BMW': {
    models: ['M3', 'M4', 'M5'],
    years: {
      'M3': ['2018', '2019'],
      'M4': ['2020', '2021'],
      'M5': ['2022', '2023']
    },
    trims: {
      '2018': ['M-Performance 3.0L'],
      '2019': ['Competition Package'],
    }
  }
};

export const MyGarageDropdown = ({ isOpen, onClose }: MyGarageDropdownProps) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [trim, setTrim] = useState("");

  // Update logic to reset dependent fields
  useEffect(() => { setModel(""); setYear(""); setTrim(""); }, [make]);
  useEffect(() => { setYear(""); setTrim(""); }, [model]);
  useEffect(() => { setTrim(""); }, [year]);

  const makes = Object.keys(VEHICLE_DATA);
  const models = make ? (VEHICLE_DATA as any)[make].models : [];
  const years = (make && model) ? (VEHICLE_DATA as any)[make].years[model] : [];
  const trims = (make && model && year) ? ((VEHICLE_DATA as any)[make].trims[year] || []) : [];

  const handleReset = () => {
    setMake("");
    setModel("");
    setYear("");
    setTrim("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[120]"
          />

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-4 w-[340px] md:w-[380px] bg-white rounded-3xl shadow-2xl z-[130] overflow-hidden border border-gray-100"
          >
            <div className="bg-dark-blue p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Car className="text-accent w-6 h-6" />
                <h3 className="text-white font-oswald text-xl uppercase tracking-wide italic leading-none">My Garage</h3>
              </div>
              <button onClick={handleReset} className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-colors">Reset</button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                {/* Make */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Make</label>
                  <select 
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full h-12 bg-gray-50 border border-transparent rounded-xl px-4 text-sm font-bold text-dark-blue outline-none appearance-none cursor-pointer focus:border-accent focus:bg-white transition-all shadow-sm"
                  >
                    <option value="">Make</option>
                    {makes.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Model */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Model</label>
                  <select 
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!make}
                    className="w-full h-12 bg-gray-50 disabled:bg-gray-50/50 disabled:text-gray-300 border border-transparent rounded-xl px-4 text-sm font-bold text-dark-blue outline-none appearance-none cursor-pointer focus:border-accent focus:bg-white transition-all shadow-sm"
                  >
                    <option value="">Model</option>
                    {models.map((m: string) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Year */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Year</label>
                  <select 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    disabled={!model}
                    className="w-full h-12 bg-gray-50 disabled:bg-gray-50/50 disabled:text-gray-300 border border-transparent rounded-xl px-4 text-sm font-bold text-dark-blue outline-none appearance-none cursor-pointer focus:border-accent focus:bg-white transition-all shadow-sm"
                  >
                    <option value="">Year</option>
                    {years.map((y: string) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                {/* Trim */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Trim</label>
                  <select 
                    value={trim}
                    onChange={(e) => setTrim(e.target.value)}
                    disabled={!year}
                    className="w-full h-12 bg-gray-50 disabled:bg-gray-50/50 disabled:text-gray-300 border border-transparent rounded-xl px-4 text-[11px] font-bold text-dark-blue outline-none appearance-none cursor-pointer focus:border-accent focus:bg-white transition-all shadow-sm"
                  >
                    <option value="">Trim</option>
                    {trims.map((t: string) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative z-10 bg-white px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest italic font-oswald">OR</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Search by VIN</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search by VIN"
                    className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 pr-12 text-sm font-bold text-dark-blue outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-accent" size={16} />
                </div>
              </div>

              <Button className="w-full h-14 bg-dark-blue text-white hover:bg-black font-black uppercase text-xs rounded-xl shadow-xl flex items-center justify-center gap-3">
                <Plus size={18} /> Add Vehicle
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
