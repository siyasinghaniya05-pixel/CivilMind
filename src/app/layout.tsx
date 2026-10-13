import type { Metadata } from "next";
import "./globals.css";
import { CivicProvider } from "@/context/CivicContext";

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
      className="h-full antialiased font-sans"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-[#52606D] antialiased">
        <CivicProvider>
          {children}
        </CivicProvider>
      </body>
    </html>
  );
}
