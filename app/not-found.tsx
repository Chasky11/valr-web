import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="collection-hero not-found-hero">
        <div className="collection-hero-art" aria-hidden="true" />
        <div className="shell collection-hero-content">
          <p className="eyebrow"><span /> Error 404</p>
          <h1>Sendero perdido.</h1>
          <p>Esta página no existe o se ha movido. Vuelve a la colección para seguir explorando el Drop 01.</p>
          <Link href="/coleccion" className="underlined-link">Ver colección completa →</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
