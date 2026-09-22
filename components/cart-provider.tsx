"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";

type Item = { product: Product; quantity: number };
type CartContextValue = {
  items: Item[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("northform-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("northform-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => setItems((current) => {
    const found = current.find((item) => item.product.id === product.id);
    return found
      ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { product, quantity: 1 }];
  });

  const removeItem = (id: string) => setItems((current) => current.filter((item) => item.product.id !== id));

  const updateQuantity = (id: string, quantity: number) => setItems((current) =>
    quantity < 1
      ? current.filter((item) => item.product.id !== id)
      : current.map((item) => item.product.id === id ? { ...item, quantity } : item)
  );

  const clearCart = () => setItems([]);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return <CartContext.Provider value={{ items, total, addItem, removeItem, updateQuantity, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
