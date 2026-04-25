import React from 'react';
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { CareerHero } from "@/components/career/CareerHero";
import { CareerBenefits } from "@/components/career/CareerBenefits";
import { Opportunities } from "@/components/career/Opportunities";
import { ContactSupport } from "@/components/shared/ContactSupport";
import { SchemaOrg } from "@/components/seo/SchemaOrg";

export const metadata = {
  title: 'Careers - Join the Mobex Team',
  description: 'Explore career opportunities at Mobex and join our passionate team of automotive professionals.',
};

export default function CareerPage() {
  return (
    <main className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-dark-blue overflow-x-hidden">
      <SchemaOrg />
      <NavBar />
      <CareerHero />
      <CareerBenefits />
      <Opportunities />
      <ContactSupport />
      <Footer variant="main" />
    </main>
  );
}
