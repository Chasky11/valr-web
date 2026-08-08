"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice, products } from "@/lib/products";

const FREE_SHIPPING_LIMIT = 90;

export function CartView() {
  const { items, isReady, removeItem, updateQuantity, clearCart } = useCart();
  const lines = useMemo(() => items.flatMap((item) => {
    const product = products.find(({ slug }) => slug === item.slug);
    return product ? [{ ...item, product }] : [];
  }), [items]);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shippingRemaining = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100);

  if (!isReady) {
    return (
      <section className="cart-page cart-loading" aria-label="Cargando bolsa">
        <div className="shell"><span className="cart-loading-line" /><span className="cart-loading-title" /></div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="shell">
        <div className="cart-heading">
          <div>
            <p className="eyebrow"><span /> Selección personal</p>
            <h1>Tu bolsa <em>({itemCount})</em></h1>
          </div>
          {lines.length > 0 ? <button className="cart-clear" onClick={clearCart}>Vaciar bolsa</button> : null}
        </div>

        {lines.length === 0 ? (
          <div className="empty-cart">
            <p className="empty-cart-index">VÄLR / 00</p>
            <h2>Aún no has elegido<br />tu próxima pieza.</h2>
            <p>Explora Drop 01 · The Awakening y encuentra el símbolo que te acompañará.</p>
            <Link className="button button-primary" href="/coleccion">Explorar colección <span>↗</span></Link>
          </div>
        ) : (
          <>
            <div className="shipping-progress" aria-label={`${Math.round(shippingProgress)} % hacia el envío gratuito`}>
              <div>
                <p>{shippingRemaining > 0 ? <>Añade <strong>{formatPrice(shippingRemaining)}</strong> para obtener envío gratuito</> : <><strong>Envío gratuito desbloqueado</strong> para este pedido</>}</p>
                <span>{Math.round(shippingProgress)} %</span>
              </div>
              <i><span style={{ width: `${shippingProgress}%` }} /></i>
            </div>

            <div className="cart-layout">
              <div className="cart-lines">
                <div className="cart-lines-head"><span>Pieza</span><span>Subtotal</span></div>
                {lines.map(({ product, size, quantity }) => (
                  <article key={`${product.slug}-${size}`}>
                    <Link href={`/producto/${product.slug}`} className="cart-thumb" aria-label={`Ver ${product.name}`}>
                      <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 92px, 150px" style={{ objectPosition: product.imagePosition }} />
                    </Link>
                    <div className="cart-line-copy">
                      <p>{product.category}</p>
                      <h2><Link href={`/producto/${product.slug}`}>{product.name}</Link></h2>
                      <span>{product.color} · Talla {size}</span>
                      <div className="cart-line-actions">
                        <div className="quantity-stepper" aria-label={`Cantidad de ${product.name}`}>
                          <button onClick={() => updateQuantity(product.slug, size, quantity - 1)} disabled={quantity === 1} aria-label="Reducir cantidad">−</button>
                          <span aria-live="polite">{quantity}</span>
                          <button onClick={() => updateQuantity(product.slug, size, quantity + 1)} disabled={quantity === 10} aria-label="Aumentar cantidad">+</button>
                        </div>
                        <button className="remove-line" onClick={() => removeItem(product.slug, size)}>Eliminar</button>
                      </div>
                    </div>
                    <strong className="cart-line-price">{formatPrice(product.price * quantity)}</strong>
                  </article>
                ))}
                <Link className="continue-shopping" href="/coleccion">← Continuar explorando</Link>
              </div>

              <aside className="cart-summary">
                <p className="cart-summary-kicker">Pedido / {String(itemCount).padStart(2, "0")}</p>
                <h2>Resumen</h2>
                <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                <div><span>Envío</span><strong>{subtotal >= FREE_SHIPPING_LIMIT ? "Gratuito" : "Calculado después"}</strong></div>
                <div><span>Impuestos</span><strong>Incluidos</strong></div>
                <hr />
                <div className="total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
                <button disabled>Finalizar compra · Próximamente</button>
                <p className="checkout-note">El pago seguro se conectará en la siguiente fase.</p>
                <ul>
                  <li>Devoluciones durante 30 días</li>
                  <li>Envío con seguimiento</li>
                  <li>Pago cifrado en la próxima fase</li>
                </ul>
              </aside>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
