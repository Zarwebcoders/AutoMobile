import type { Metadata } from "next";
import { Oswald, Outfit } from "next/font/google";
import "./globals.css";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { TopPromoBanner } from "@/components/layout/TopPromoBanner";
import { AuthProvider } from "@/context/AuthContext";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MOBEX | Premium Auto Parts & Accessories",
  description: "USA's number 1 supplier! With over 250+ branches nationwide and 130,000 parts available.",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${outfit.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <TopPromoBanner />
          {children}
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
