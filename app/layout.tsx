import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import { ThemeProvider } from "@/components/theme-provider";
import NetworkBackground from "@/components/ui/network-background";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: "Atef Ashab - Portfolio",
  description: "Atef Ashab's portfolio website",
  icons: {
    icon: "/assets/images/pp.png",
    apple: "/assets/images/pp.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="isolate font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(99,102,241,0.14),transparent_70%)]" />
          <div className="ambient-network pointer-events-none fixed inset-0 -z-10 opacity-45">
            <NetworkBackground />
          </div>
          <div className="pointer-events-none fixed inset-0 -z-10 bg-noise opacity-[0.03] mix-blend-overlay" />
          <Header />
          <div className="app-content lg:pl-72">
            {children}
            <Footer />
          </div>
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
