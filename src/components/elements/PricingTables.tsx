"use client";

import React from 'react';
import { Check } from 'lucide-react';

export const PricingTables = () => {
  const plans = [
    { title: 'Basic Package', price: '199.99', features: ['Regular Maintenance Included', 'Oil Changes 2 per year', 'Brake Inspection Included', 'Tire Rotation 1 per year', 'No Roadside Assistance', 'No Diagnostic Services'] },
    { title: 'Standard Package', price: '299.99', features: ['Regular Maintenance Included', 'Oil Changes 3 per year', 'Brake Inspection Included', 'Tire Rotation 2 per year', '24/7 Roadside Assistance', 'No Diagnostic Services'] },
    { title: 'Premium Package', price: '499.99', isPopular: true, features: ['Regular Maintenance Included', 'Oil Changes 4 per year', 'Brake Inspection Included', 'Tire Rotation 3 per year', '24/7 Roadside Assistance', 'Diagnostic Services Included'] },
    { title: 'Platinum Package', price: '699.99', isDiscount: true, features: ['Regular Maintenance Included', 'Oil Changes 5 per year', 'Brake Inspection Included', 'Tire Rotation 4 per year', '24/7 Roadside Assistance', 'Diagnostic Services Included'] },
  ];

  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black font-oswald text-dark-blue uppercase">Pricing tables</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Subscribe to our annual vehicle repair and maintenance service</p>
          <div className="h-1 w-20 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-white rounded-3xl p-10 shadow-xl border-2 transition-all duration-300 hover:-translate-y-4 ${plan.isPopular ? 'border-accent ring-8 ring-accent/5' : 'border-transparent'}`}>
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Popular</span>
              )}
              {plan.isDiscount && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Discounts on Parts</span>
              )}

              <div className="text-center space-y-6">
                <div className="space-y-1">
                  <div className="text-5xl font-black font-oswald text-dark-blue tracking-tighter italic">
                    ${plan.price}<span className="text-sm text-gray-400 normal-case italic font-medium ml-1">/ per year</span>
                  </div>
                  <h4 className="text-xl font-black text-dark-blue uppercase font-oswald">{plan.title}</h4>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-50">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={`py-3 px-4 rounded-xl text-xs font-bold leading-tight ${feature.startsWith('No ') ? 'bg-gray-50 text-gray-300 italic' : 'bg-gray-100/50 text-dark-blue'}`}>
                      {feature}
                    </div>
                  ))}
                </div>

                <button className={`w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest transition-all mt-8 ${plan.isPopular ? 'bg-accent text-dark-blue hover:bg-dark-blue hover:text-white' : 'bg-dark-blue text-white hover:bg-accent hover:text-dark-blue'}`}>
                  Discover more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
