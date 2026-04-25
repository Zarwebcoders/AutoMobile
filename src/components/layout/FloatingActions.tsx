"use client";

import React from 'react';
import { Settings, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingActions = () => {
  return (
    <>
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <motion.button
          whileHover={{ x: 5 }}
          className="bg-dark-blue text-white p-3 rounded-r-xl shadow-2xl border-y border-r border-white/10"
        >
          <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
        </motion.button>
      </div>

      <div className="fixed left-6 bottom-6 z-50">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#00d285] text-white flex items-center gap-3 px-6 py-3.5 rounded-full shadow-[0_10px_40px_-10px_rgba(0,210,133,0.5)] font-bold text-sm"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#00d285]" />
          </div>
          Presale Chat
        </motion.button>
      </div>
    </>
  );
};
