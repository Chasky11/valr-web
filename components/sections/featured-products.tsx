import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export function FeaturedProducts() {
  return (
    <section className="shop-section" id="novedades">
      <div className="shell">
        <div className="shop-heading"><div><p className="eyebrow dark"><span /> Saga 01 · Recién forjado</p><h2>Camisetas<br/><em>con historia.</em></h2></div><Link href="/coleccion" className="underlined-link">Ver toda la colección →</Link></div>
        <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.slug} />)}</div>
      </div>
    </section>
  );
}
