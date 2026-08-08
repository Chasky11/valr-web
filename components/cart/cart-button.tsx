"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export function CartButton() {
  const { items } = useCart();
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return <Link href="/carrito" className="cart-link" aria-label={`Bolsa, ${count} piezas`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><span>{count}</span></Link>;
}
