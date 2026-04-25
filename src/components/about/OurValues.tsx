"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, ShieldCheck, Lightbulb } from 'lucide-react';

const VALUES = [
  {
    icon: Users,
    title: "Open Working Community",
    description: "The company values the individuals within our community."
  },
  {
    icon: Heart,
    title: "Customer Comes First",
    description: "We are committed to delivering the best value for our customers."
  },
  {
    icon: ShieldCheck,
    title: "We Do What We Say",
    description: "Honesty and integrity guide every decision and action."
  },
  {
    icon: Lightbulb,
    title: "Pursuit of Innovation",
    description: "We are committed to finding better ways to serve you."
  }
];

export const OurValues = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-dark-blue uppercase tracking-tight italic font-oswald">Our <span className="text-accent">Values</span></h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {VALUES.map((v, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-6 group"
            >
              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-dark-blue transition-all duration-500 transform group-hover:rotate-6 shadow-sm group-hover:shadow-xl group-hover:shadow-accent/20">
                <v.icon size={36} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-dark-blue uppercase tracking-tight leading-tight">
                  {v.title}
                </h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
