import { Syne, Geist, Geist_Mono, Bebas_Neue } from "next/font/google";

export const syne = Syne({
  variable: "--font-syne",
  weight: ["400"],
  subsets: ["latin"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
  subsets: ["latin"],
});
