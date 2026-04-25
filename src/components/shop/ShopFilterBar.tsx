"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { useVehicleStore } from '@/store/useVehicleStore';

const MAKES = ['Audi', 'BMW', 'Bentley', 'Cadillac', 'Chevrolet', 'Dodge', 'Ford', 'Honda', 'Hyundai', 'Infiniti', 'KIA', 'Lamborghini', 'Lexus', 'Lincoln', 'Maybach', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Porsche', 'Rolls-Royce', 'Toyota', 'Volkswagen', 'Volvo'];

export const ShopFilterBar = () => {
    const { 
        make, setMake, 
        model, setModel, 
        year, setYear, 
        engine, setEngine, 
        reset
    } = useVehicleStore();

    return (
        <section className="bg-accent rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-stretch lg:items-end gap-4 shadow-xl shadow-accent/10 mb-12">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Year</label>
                    <select 
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all"
                    >
                        <option value="">Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2010">2010</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Make</label>
                    <select 
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all"
                    >
                        <option value="">Make</option>
                        {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Model</label>
                    <select 
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all"
                    >
                        <option value="">Model</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Engine</label>
                    <select 
                        value={engine}
                        onChange={(e) => setEngine(e.target.value)}
                        className="w-full h-12 px-4 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all"
                    >
                        <option value="">Engine</option>
                    </select>
                </div>
            </div>
            
            <div className="flex-1 lg:max-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest leading-none">Serial Number</label>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Serial Number"
                        className="w-full h-12 pl-4 pr-10 bg-white rounded-xl border-none text-[13px] font-bold text-gray-500 focus:ring-2 focus:ring-dark-blue outline-none transition-all"
                    />
                </div>
            </div>

            <button className="h-12 px-10 bg-dark-blue text-white rounded-xl font-black uppercase text-xs hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2">
                <Search size={18} />
                Search
            </button>
        </section>
    );
};
