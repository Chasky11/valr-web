"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatPrice, products } from "@/lib/products";

export default function CartPage() {
  const { items, removeItem } = useCart();
  const lines = items.flatMap((item) => { const product = products.find(({slug}) => slug === item.slug); return product ? [{...item, product}] : []; });
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  return <main><SiteHeader/><section className="cart-page"><div className="shell"><p className="eyebrow"><span/> Tu equipamiento</p><h1>Bolsa <em>({items.reduce((sum,item) => sum + item.quantity, 0)})</em></h1>{lines.length === 0 ? <div className="empty-cart"><p>Tu bolsa está esperando su primera conquista.</p><Link className="button button-primary" href="/coleccion">Explorar colección →</Link></div> : <div className="cart-layout"><div className="cart-lines">{lines.map(({product,size,quantity}) => <article key={`${product.slug}-${size}`}><div className="cart-thumb"><Image src={product.image} alt={product.name} fill sizes="120px" style={{objectPosition:product.imagePosition}}/></div><div><p>{product.category}</p><h2>{product.name}</h2><span>Talla {size} · Cantidad {quantity}</span><button onClick={() => removeItem(product.slug,size)}>Eliminar</button></div><strong>{formatPrice(product.price * quantity)}</strong></article>)}</div><aside><p>Resumen</p><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Envío</span><strong>{subtotal >= 90 ? "Gratis" : "Calculado después"}</strong></div><hr/><div className="total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div><button disabled>Finalizar compra · Próximamente</button><small>El pago seguro se conectará en la siguiente fase.</small></aside></div>}</div></section><SiteFooter/></main>;
}
