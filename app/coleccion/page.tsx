import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Colección", description: "Descubre la primera colección de ropa deportiva técnica VÄLR." };

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ genero?: string }> }) {
  const gender = (await searchParams).genero;
  const visibleProducts = gender === "hombre" || gender === "mujer" ? products.filter((product) => product.gender === "Unisex" || product.gender.toLowerCase() === gender) : products;
  return <main><SiteHeader/><section className="collection-hero"><div className="shell"><p className="eyebrow"><span/> Colección 01</p><h1>El despertar.</h1><p>Equipamiento creado para elevar cada repetición, cada kilómetro y cada decisión.</p></div></section><section className="collection-body"><div className="shell"><div className="collection-toolbar"><p>{visibleProducts.length} {visibleProducts.length === 1 ? "producto" : "productos"}</p><div><Link className={!gender ? "active" : ""} href="/coleccion">Todos</Link><Link className={gender === "hombre" ? "active" : ""} href="/coleccion?genero=hombre">Hombre</Link><Link className={gender === "mujer" ? "active" : ""} href="/coleccion?genero=mujer">Mujer</Link></div></div><div className="product-grid">{visibleProducts.map((product) => <ProductCard product={product} key={product.slug}/>)}</div></div></section><SiteFooter/></main>;
}
