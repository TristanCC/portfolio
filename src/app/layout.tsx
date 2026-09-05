import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

import { syne, bebasNeue, inter } from "./fonts";

export const metadata: Metadata = {
  title: "Tristan Johnston — Software Engineer",
  description:
    "Portfolio of Tristan Johnston, a full-stack software engineer building web applications with React, Next.js, TypeScript, and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${syne.variable} ${inter.variable} max-w-screen`}
      >
        <div
          id="portal-root"
          className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none [&>*]:pointer-events-auto"
          aria-hidden
          style={{ zIndex: 9998 }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
