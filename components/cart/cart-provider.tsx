"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { slug: string; size: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  isReady: boolean;
  addItem: (slug: string, size: string) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "valr-cart";
const CART_VERSION = 1;
const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<CartItem>;
  return typeof item.slug === "string" && typeof item.size === "string" && Number.isInteger(item.quantity) && Number(item.quantity) > 0;
}

function readStoredCart() {
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    const storedItems = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object" && "items" in parsed
        ? (parsed as { items: unknown }).items
        : [];
    return Array.isArray(storedItems)
      ? storedItems.filter(isCartItem).map((item) => ({ ...item, quantity: Math.min(item.quantity, 10) }))
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: CART_VERSION, items }));
  }, [isReady, items]);

  const addItem = useCallback((slug: string, size: string) => {
    setItems((current) => {
      const match = current.find((item) => item.slug === slug && item.size === size);
      return match
        ? current.map((item) => item === match ? { ...item, quantity: Math.min(item.quantity + 1, 10) } : item)
        : [...current, { slug, size, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug || item.size !== size));
  }, []);

  const updateQuantity = useCallback((slug: string, size: string, quantity: number) => {
    const nextQuantity = Math.max(1, Math.min(10, quantity));
    setItems((current) => current.map((item) =>
      item.slug === slug && item.size === size ? { ...item, quantity: nextQuantity } : item,
    ));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, isReady, addItem, removeItem, updateQuantity, clearCart }), [
    items,
    isReady,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
