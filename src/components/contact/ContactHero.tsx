"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const ContactHero = () => {
  return (
    <section className="w-full h-[500px] relative overflow-hidden bg-gray-100">
      {/* Mock Map using iframe for visual similarity */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19864.673856143!2d-0.1245!3d51.5007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c38c8cd1d9%3A0x688d070b4f8d970e!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1649856000000!5m2!1sen!2sin" 
        className="w-full h-full border-0 grayscale opacity-80" 
        allowFullScreen={false} 
        loading="lazy"
      ></iframe>
      
      {/* Map Overlay Decor */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10"></div>
    </section>
  );
};
