"use client";

import React from 'react';
import { motion } from 'framer-motion';

const LEADERS = [
  { name: "Paul Brown", role: "Chief Executive Officer", image: "https://enovathemes.com/mobex/wp-content/uploads/about-team-img-1.webp" },
  { name: "Ryan Harris", role: "Chief Operating Officer", image: "https://enovathemes.com/mobex/wp-content/uploads/about-team-img-2.webp" },
  { name: "Dan Banks", role: "Technical Director", image: "https://enovathemes.com/mobex/wp-content/uploads/about-team-img-3.webp" },
  { name: "Ben Gordon", role: "Project Manager", image: "https://enovathemes.com/mobex/wp-content/uploads/about-team-img-4.webp" },
  { name: "Fred Nash", role: "Sales Director", image: "https://enovathemes.com/mobex/wp-content/uploads/about-team-img-5.webp" },
];

export const LeadershipSection = () => {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Leadership</h2>
          <div className="w-16 h-1 bg-accent rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {LEADERS.map((leader, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col space-y-6 group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-dark-blue uppercase tracking-tighter leading-none italic font-oswald group-hover:text-accent transition-colors">
                  {leader.name}
                </h3>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">
                  {leader.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
