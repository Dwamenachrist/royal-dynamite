import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import "./globals.css";

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
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950`}
      >
        <PublicLayoutWrapper>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
