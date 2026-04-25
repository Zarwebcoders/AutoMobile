"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const TopPromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 1,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-[#BC3120] text-white relative overflow-hidden h-14 hidden md:block group">
      <div className="container mx-auto h-full px-4 flex items-center justify-center gap-8">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black uppercase tracking-wider italic">
            Pre-Black Friday Sale : <span className="text-accent">Up to 65% Off</span>
          </span>
          <div className="h-6 w-px bg-white/20" />
          <span className="text-xs font-bold opacity-80 uppercase tracking-widest">
            Use code <span className="text-white font-black underline underline-offset-4 decoration-2">"BLACK"</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Offer Expires in:</span>
          <div className="flex items-center gap-1.5">
            {[
              { val: timeLeft.days, label: 'D' },
              { val: timeLeft.hours, label: 'H' },
              { val: timeLeft.minutes, label: 'M' },
              { val: timeLeft.seconds, label: 'S' }
            ].map((unit, idx) => (
              <React.Fragment key={unit.label}>
                <div className="bg-white/10 backdrop-blur-md rounded-md px-2 py-1 min-w-[32px] flex flex-col items-center">
                  <span className="text-[14px] font-black leading-none">{unit.val.toString().padStart(2, '0')}</span>
                  <span className="text-[8px] font-bold opacity-60 leading-tight">{unit.label}</span>
                </div>
                {idx < 3 && <span className="text-accent font-black">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors opacity-40 group-hover:opacity-100"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
