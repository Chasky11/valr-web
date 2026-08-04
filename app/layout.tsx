import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VÄLR — Forja tu legado",
    template: "%s | VÄLR",
  },
  description:
    "Una experiencia digital nacida del norte: estrategia, diseño y tecnología forjados para dejar huella.",
  openGraph: {
    title: "VÄLR — Forja tu legado",
    description:
      "Estrategia, diseño y tecnología forjados con la precisión del norte.",
    type: "website",
    locale: "es_ES",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07100e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
