import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/product-purchase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }): Promise<Metadata> { const product = getProduct((await params).slug); return product ? {title: product.name, description: product.description} : {}; }

export default async function ProductPage({ params }: { params: Promise<{slug: string}> }) {
  const product = getProduct((await params).slug); if (!product) notFound();
  return <main><SiteHeader/><section className="product-page"><div className="product-gallery"><Image src={product.image} alt={`${product.name}, ${product.color}`} fill priority sizes="(max-width: 800px) 100vw, 58vw" style={{objectPosition:product.imagePosition}}/></div><div className="product-detail"><Link href="/coleccion" className="back-link">← Volver a la colección</Link><p className="product-kicker">{product.gender} · {product.category}</p><h1>{product.name}</h1><p className="product-price">{formatPrice(product.price)}</p><p className="product-description">{product.description}</p><p className="color-label">Color <span>{product.color}</span></p><ProductPurchase slug={product.slug}/><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><p className="shipping-note">Envío gratuito desde 90 € · Devoluciones en 30 días</p></div></section><SiteFooter/></main>;
}
