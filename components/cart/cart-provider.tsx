"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { slug: string; size: string; quantity: number };
type CartContextValue = { items: CartItem[]; addItem: (slug: string, size: string) => void; removeItem: (slug: string, size: string) => void };

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => { const saved = window.localStorage.getItem("valr-cart"); if (saved) setItems(JSON.parse(saved) as CartItem[]); }, []);
  useEffect(() => { window.localStorage.setItem("valr-cart", JSON.stringify(items)); }, [items]);
  const value = useMemo(() => ({ items, addItem: (slug: string, size: string) => setItems((current) => { const match = current.find((item) => item.slug === slug && item.size === size); return match ? current.map((item) => item === match ? {...item, quantity: item.quantity + 1} : item) : [...current, {slug, size, quantity: 1}]; }), removeItem: (slug: string, size: string) => setItems((current) => current.filter((item) => item.slug !== slug || item.size !== size)) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
