import { FacebookPixel } from "@cofounder/ui";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import WhatsAppWidget from "./components/WhatsAppWidget";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoFounderBD | Digital Growth & Technology Agency",
  description: "We build digital systems that grow businesses. Strategy, Branding, Development, and Performance Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <FacebookPixel pixelId="3919035388228710" />
        <Toaster position="top-center" expand visibleToasts={3} richColors />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
