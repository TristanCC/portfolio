import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

import { spaceGrotesk, inter, plexMono } from "./fonts";

const title = "Tristan Johnston — Software Engineer";
const description =
  "Portfolio of Tristan Johnston, a full-stack software engineer building web applications with React, Next.js, TypeScript, and PostgreSQL.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} max-w-screen`}
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
