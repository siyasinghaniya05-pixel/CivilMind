import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { CivicProvider } from "@/context/CivicContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CivicMind AI | National Development Intelligence Platform",
  description: "AI-Powered Development Intelligence Platform for Local Government Bodies, Nagar Parishads, Nagar Panchayats, and District Administrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-[#52606D] antialiased">
        <CivicProvider>
          {children}
        </CivicProvider>
      </body>
    </html>
  );
}
