"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";

const sizes = ["S", "M", "L", "XL"];

export function ProductPurchase({ slug }: { slug: string }) {
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  return <div className="purchase"><div className="size-row"><p>Talla <span>Guía de tallas</span></p><div>{sizes.map((value) => <button className={size === value ? "active" : ""} onClick={() => setSize(value)} key={value}>{value}</button>)}</div></div><button className="add-button" onClick={() => {addItem(slug, size); setAdded(true); setTimeout(() => setAdded(false), 1800);}}>{added ? "Añadido a la bolsa" : "Añadir a la bolsa"}<span>{added ? "✓" : "→"}</span></button></div>;
}
