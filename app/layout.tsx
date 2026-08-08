import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/cart/cart-provider";
import "./globals.css";

export const metadata: Metadata = {
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
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
