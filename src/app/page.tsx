import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/home/Hero";
import { HomeSlider } from "@/components/home/HomeSlider";
import { FeaturedManufacturers } from "@/components/home/FeaturedManufacturers";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AirFilterBanner } from "@/components/home/AirFilterBanner";
import { BestDeals } from "@/components/home/BestDeals";
import { Promotions } from "@/components/home/Promotions";
import { SpecialBuys } from "@/components/home/SpecialBuys";
import { MoreToLove } from "@/components/home/MoreToLove";
import { ContentHub } from "@/components/home/ContentHub";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/layout/Footer";

import { SchemaOrg } from "@/components/seo/SchemaOrg";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-dark-blue overflow-x-hidden bg-white">
      <SchemaOrg />
      <NavBar />
      <Hero />
      <HomeSlider />
      <FeaturedProducts />
      
      {/* Desktop Only: Combined Top Banners (Lamps + Air Filters) */}
      <div className="hidden lg:block bg-white">
        <Promotions showGrid={false} />
      </div>

      <AirFilterBanner />
      <BestDeals />
      <SpecialBuys />
      <MoreToLove />

      {/* 
         On Desktop: This only shows the Grid and USP section.
         On Mobile: This shows the whole Promotions section (Banners + Grid) 
         as per the original design.
      */}
      <div className="hidden lg:block bg-white">
        <Promotions showBanners={false} />
      </div>

      <div className="lg:hidden">
        <Promotions />
      </div>
      <ContentHub />
      <Newsletter />
      <Footer variant="main" />

    </main>
  );
}
