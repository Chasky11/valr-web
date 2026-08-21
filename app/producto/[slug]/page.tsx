import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }): Promise<Metadata> { const product = getProduct((await params).slug); return product ? {title: product.name, description: product.description} : {}; }

export default async function ProductPage({ params }: { params: Promise<{slug: string}> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const relatedProducts = products.filter(({ slug }) => slug !== product.slug).slice(0, 3);

  return (
    <main>
      <SiteHeader />
      <section className="product-page">
        <ProductGallery image={product.image} name={product.name} color={product.color} imagePosition={product.imagePosition} />
        <div className="product-detail" data-reveal="up" data-reveal-delay="100">
          <Link href="/coleccion" className="back-link">← Volver a la colección</Link>
          <p className="product-kicker">{product.gender} · {product.category}</p>
          <h1>{product.name}</h1>
          <div className="product-price-row"><p className="product-price">{formatPrice(product.price)}</p><span>Drop 01 / Edición limitada</span></div>
          <p className="product-description">{product.description}</p>
          <ProductPurchase slug={product.slug} color={product.color} swatch={product.swatch} />
          <ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          <p className="shipping-note">Diseñada en España · Producida en series limitadas</p>
        </div>
      </section>
      <section className="related-section">
        <div className="shell">
          <div className="related-heading" data-reveal="up"><div><p className="eyebrow"><span /> Continúa la saga</p><h2>Otras piezas<br/><em>del despertar.</em></h2></div><Link href="/coleccion" className="underlined-link">Ver colección completa →</Link></div>
          <div className="product-grid related-grid">{relatedProducts.map((relatedProduct) => <ProductCard product={relatedProduct} key={relatedProduct.slug} />)}</div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
