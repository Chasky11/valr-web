import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/producto/${product.slug}`} className="product-image">
        <Image src={product.image} alt={`${product.name}, ${product.color}`} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectPosition: product.imagePosition }} />
        <span>Ver producto</span>
      </Link>
      <div className="product-info">
        <div><p>{product.category}</p><h3><Link href={`/producto/${product.slug}`}>{product.name}</Link></h3></div>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <p className="product-color">{product.color}</p>
    </article>
  );
}
