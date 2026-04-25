"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CountUp = ({ to, duration = 2 }: { to: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const num = parseInt(to.replace(/\D/g, ''));
  const suffix = to.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = num;
      if (start === end) return;
      let totalMiliseconds = duration * 1000;
      let incrementTime = totalMiliseconds / end;
      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, num, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const Infographics = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section ref={containerRef} className="relative py-16 bg-accent overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 grayscale brightness-0 invert pointer-events-none"
        style={{
          backgroundImage: 'url("https://enovathemes.com/mobex/wp-content/plugins/enovathemes-addons/assets/img/map.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="container mx-auto px-4 relative z-10 space-y-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h3 className="text-3xl font-black font-oswald text-white uppercase tracking-tighter italic">Infographics</h3>
          <p className="text-dark-blue font-bold uppercase tracking-widest text-[9px] max-w-xl mx-auto opacity-70 leading-relaxed">
            Making Cars Better To Get Up, Get Out, And Enjoy Road&apos;s Adventures and Life
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center max-w-5xl mx-auto">
          {[
            { val: '16', lbl: 'Branches' },
            { val: '100+', lbl: 'New employees' },
            { val: '15k', lbl: 'Happy clients' },
            { val: '200k', lbl: 'Items sold' },
            { val: '500+', lbl: 'Brands' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 group hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl font-black font-oswald text-white italic tracking-tighter leading-none">
                <CountUp to={stat.val} />
              </div>
              <p className="text-dark-blue/80 font-black uppercase text-[8px] tracking-[0.15em] mt-2 whitespace-nowrap">{stat.lbl}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts & Progress Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Progress Bars */}
          <div className="space-y-6 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 h-full">
            {[
              { label: 'Market share', val: 80 },
              { label: 'Income increase', val: 43 },
              { label: 'Satisfied clients', val: 89 },
            ].map((bar, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <span className="text-base font-black font-oswald text-dark-blue uppercase tracking-tight italic">{bar.label}</span>
                  <span className="text-white text-[10px] font-black">{bar.val}%</span>
                </div>
                <div className="h-2 w-full bg-dark-blue/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${bar.val}%` } : {}}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                    className="h-full bg-dark-blue rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Circle Charts */}
          <div className="flex justify-center md:justify-around gap-6 bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
            {[
              { label: 'Income increase', val: 43 },
              { label: 'Satisfied clients', val: 98 },
            ].map((circle, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + (i * 0.2) }}
                className="relative flex flex-col items-center"
              >
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-dark-blue/10" />
                    <motion.circle
                      cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent"
                      strokeDasharray={314}
                      initial={{ strokeDashoffset: 314 }}
                      animate={isInView ? { strokeDashoffset: 314 - (314 * circle.val) / 100 } : {}}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      className="text-dark-blue"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-2xl font-black font-oswald text-white italic leading-none">
                      <CountUp to={circle.val.toString()} />%
                    </div>
                  </div>
                </div>
                <div className="text-[8px] font-black text-dark-blue mt-3 uppercase max-w-[70px] leading-tight text-center tracking-widest">{circle.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
