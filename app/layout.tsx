import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart/cart-provider";
import { MotionController } from "@/components/motion-controller";
import "./globals.css";

const displayFont = localFont({
  src: "./fonts/Iceland-Regular.ttf",
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://valr-web-fawn.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VÄLR — Forjados para avanzar",
    template: "%s | VÄLR",
  },
  description:
    "Ropa deportiva de alto rendimiento inspirada en la fuerza, los símbolos y los paisajes del norte.",
  openGraph: {
    title: "VÄLR — Forjados para avanzar",
    description:
      "Ropa deportiva técnica inspirada en la mitología nórdica.",
    type: "website",
    locale: "es_ES",
    siteName: "VÄLR",
    images: [{ url: "/images/campaign-hero.webp", width: 1200, height: 630, alt: "VÄLR — Forjados para avanzar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VÄLR — Forjados para avanzar",
    description: "Ropa deportiva técnica inspirada en la mitología nórdica.",
    images: ["/images/campaign-hero.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={displayFont.variable} data-scroll-behavior="smooth">
      <body><MotionController /><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
