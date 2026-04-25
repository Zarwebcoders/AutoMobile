import React from 'react';
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQContent } from "@/components/faq/FAQContent";
import { ContactSupport } from "@/components/shared/ContactSupport";
import { SchemaOrg } from "@/components/seo/SchemaOrg";

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Mobex',
  description: 'Find answers to common questions about shopping, support, and product help at Mobex.',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-dark-blue overflow-x-hidden">
      <SchemaOrg />
      <NavBar />
      <FAQHero />
      <FAQContent />
      <ContactSupport />
      <Footer variant="main" />
    </main>
  );
}
