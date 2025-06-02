import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400','500','600','700','800','900'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Gupta",
  description: "My personal website that not only shows my work and design but also serves as a playground for my experiments with Next.js, React, and other technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-neutral-100 dark:bg-neutral-800` } suppressHydrationWarning={true} >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
