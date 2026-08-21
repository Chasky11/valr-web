import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  return (
    <article className="product-card" data-reveal="up" data-reveal-delay={index !== undefined ? (index % 3) * 90 : 0}>
      <Link href={`/producto/${product.slug}`} className="product-image">
        <Image src={product.image} alt={`${product.name}, ${product.color}`} fill sizes="(max-width: 700px) calc(100vw - 28px), (max-width: 980px) 50vw, 33vw" style={{ objectPosition: product.imagePosition }} />
        {index !== undefined ? <small>{String(index + 1).padStart(2, "0")} / {String(5).padStart(2, "0")}</small> : null}
        <span>Ver pieza <b>↗</b></span>
      </Link>
      <div className="product-info">
        <div><p>{product.category}</p><h3><Link href={`/producto/${product.slug}`}>{product.name}</Link></h3></div>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <p className="product-color">{product.color}</p>
    </article>
  );
}
