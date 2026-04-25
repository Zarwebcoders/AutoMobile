"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const brands = [
  { name: "Audi", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/audi.webp" },
  { name: "Bentley", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/bentley.webp" },
  { name: "Chevrolet", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/chevrolet.webp" },
  { name: "Ford", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/ford.webp" },
  { name: "Infiniti", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/infiniti.webp" },
  { name: "KIA", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/kia.webp" },
  { name: "Lexus", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/lexus.webp" },
  { name: "Mazda", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/mazda.webp" },
  { name: "Mitsubishi", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/mitsubishi.webp" },
  { name: "Porsche", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/porche.webp" },
  { name: "Toyota", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/toyota.webp" },
  { name: "Volvo", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/volvo.webp" },
  { name: "BMW", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/bmw.webp" },
  { name: "Cadillac", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/cadillac.webp" },
  { name: "Dodge", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/dodge.webp" },
  { name: "Honda", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/honda.webp" },
  { name: "Hyundai", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/hyundai.webp" },
  { name: "Lamborghini", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/lamborghini.webp" },
  { name: "Lincoln", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/lincoln.webp" },
  { name: "Mercedes", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/mercedes-benz.webp" },
  { name: "Nissan", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/nissan.webp" },
  { name: "Rolls-Royce", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/rolls-royce.webp" },
  { name: "Volkswagen", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/volkswagen.webp" },
  { name: "Maybach", logo: "https://enovathemes.com/mobex/wp-content/themes/mobex/images//vehicle-logos/maybach.webp" }
];

export const FeaturedManufacturers = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-50">
      <div className="container mx-auto px-4">
        <h4 className="text-xl md:text-3xl font-bold text-black mb-10">
          Featured manufacturers
        </h4>

        {/* Scrollable Container with 2 Rows for Mobile, Grid for Desktop */}
        <div className="w-full overflow-x-auto no-scrollbar pb-6 md:pb-0">
          <div className="grid grid-rows-2 grid-flow-col md:grid-cols-6 lg:grid-cols-12 gap-y-6 gap-x-4 min-w-max md:min-w-0 px-2 h-[240px] md:h-auto">
            {brands.map((brand, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group shrink-0 w-[85px] md:w-auto snap-start"
              >
                <Link 
                  href={`/shop?query=${encodeURIComponent(brand.name)}`}
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="w-full aspect-square rounded-full bg-[#f9f9f9] flex items-center justify-center p-3.5 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg border border-gray-100 group-hover:border-transparent relative">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="w-full h-full object-contain filter transition-all duration-300 transform group-hover:scale-110"
                    />
                    {/* Tooltip on hover */}
                    <span className="absolute -bottom-2 bg-dark-blue text-white text-[9px] font-black px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter z-20">
                      {brand.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
