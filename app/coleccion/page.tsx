import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Colección", description: "Descubre la primera colección editorial de VÄLR." };

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ genero?: string }> }) {
  const gender = (await searchParams).genero;
  const visibleProducts = gender === "hombre" || gender === "mujer" ? products.filter((product) => product.gender === "Unisex" || product.gender.toLowerCase() === gender) : products;
  return (
    <main>
      <SiteHeader />
      <section className="collection-hero">
        <div className="collection-hero-art" aria-hidden="true" />
        <div className="shell collection-hero-content">
          <p className="eyebrow"><span /> Colección 01 · The Awakening</p>
          <h1>El despertar.</h1>
          <p>Una edición limitada construida sobre símbolos del norte, siluetas amplias y una oscuridad contemporánea.</p>
        </div>
      </section>
      <section className="drop-transition collection-transition" aria-label="Drop 01 The Awakening">
        <div className="shell drop-transition-inner"><span>VÄLR / 2026</span><p>Drop 01 <i>·</i> The Awakening</p><span>Five pieces</span></div>
      </section>
      <section className="collection-body">
        <div className="shell">
          <div className="collection-toolbar">
            <p>{visibleProducts.length} {visibleProducts.length === 1 ? "pieza" : "piezas"}</p>
            <nav aria-label="Filtrar colección">
              <Link className={!gender ? "active" : ""} href="/coleccion">Todos</Link>
              <Link className={gender === "hombre" ? "active" : ""} href="/coleccion?genero=hombre">Hombre</Link>
              <Link className={gender === "mujer" ? "active" : ""} href="/coleccion?genero=mujer">Mujer</Link>
            </nav>
          </div>
          <div className="product-grid">{visibleProducts.map((product) => <ProductCard product={product} key={product.slug} />)}</div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
