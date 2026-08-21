import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export function FeaturedProducts() {
  return (
    <>
      <section className="drop-transition" aria-label="Drop 01 The Awakening">
        <div className="shell drop-transition-inner" data-reveal="fade"><span>VÄLR / 2026</span><p>Drop 01 <i>·</i> The Awakening</p><span>Forged in the north</span></div>
      </section>
      <section className="shop-section" id="novedades">
        <div className="shell">
          <div className="shop-heading" data-reveal="up">
            <div><p className="eyebrow"><span /> Saga 01 · Recién forjado</p><h2>Camisetas<br/><em>con historia.</em></h2></div>
            <div className="shop-heading-aside"><p>Cinco relatos. Una misma voluntad.<br/>Corte amplio · Gráfica integral · Serie limitada</p><Link href="/coleccion" className="underlined-link">Ver toda la colección →</Link></div>
          </div>
          <div className="product-grid">{products.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
        </div>
      </section>
    </>
  );
}
