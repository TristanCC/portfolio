import { Syne, Bebas_Neue, Inter } from "next/font/google";

export const syne = Syne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-syne",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
  display: "swap",
});

export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});