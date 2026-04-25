"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Wallet, Shield, Clock, PieChart, Percent } from 'lucide-react';

const BENEFITS = [
  { icon: Heart, title: "Health Care Coverage", desc: "Comprehensive health, dental, and vision plans." },
  { icon: Wallet, title: "Monthly Pay", desc: "Competitive salaries with performance bonuses." },
  { icon: Shield, title: "Retirement Plan", desc: "Long-term security with company matching." },
  { icon: Clock, title: "Paid Time Off", desc: "Generous vacation and sick leave policies." },
  { icon: PieChart, title: "401k Program", desc: "Financial planning and investment options." },
  { icon: Percent, title: "Employee Discounts", desc: "Special pricing on all our products." },
];

export const CareerBenefits = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Our <span className="text-accent">benefits</span></h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Mobex offers a competitive collection of benefits, providing employees with great choices in building a healthy career and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[35px] border border-gray-100 bg-[#F8F9FA] hover:bg-white hover:border-accent hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-dark-blue">
                  <b.icon size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-dark-blue uppercase tracking-tight italic font-oswald">
                    {b.title}
                  </h3>
                  <p className="text-[13px] text-gray-400 font-bold uppercase tracking-widest hidden group-hover:block animate-in fade-in slide-in-from-top-1">
                    Benefit included
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
