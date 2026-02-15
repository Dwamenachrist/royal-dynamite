import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Manrope } from "next/font/google"; // Added Manrope
import { Toaster } from "@/components/ui/sonner";
import { Navbar, Footer } from "@/components/layout";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display", // Using this for the Stitch design
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F223D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://royaldynamite.com"),
  title: {
    default: "Royal Dynamite | Premium Vehicle Sales, Rentals & Logistics",
    template: "%s | Royal Dynamite Limited",
  },
  description: "Ghana's premier destination for luxury vehicle sales, rentals, corporate transport, and freight forwarding services. Excellence in motion since 2015.",
  keywords: ["luxury cars ghana", "vehicle rentals accra", "car dealership ghana", "freight forwarding", "corporate transport", "royal dynamite"],
  authors: [{ name: "Royal Dynamite Limited" }],
  creator: "Royal Dynamite Limited",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://royaldynamite.com",
    title: "Royal Dynamite | Premium Automotive Solutions",
    description: "Experience excellence in motion. Luxury vehicle sales, rentals, and logistics services in Ghana.",
    siteName: "Royal Dynamite Limited",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Dynamite Limited - Excellence in Motion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Dynamite | Premium Automotive Solutions",
    description: "Ghana's premier destination for luxury vehicle sales, rentals, and logistics.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${manrope.variable} font-sans antialiased min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster />
      </body>
    </html>
  );
}
