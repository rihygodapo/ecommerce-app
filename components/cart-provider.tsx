"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";

type Item = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: Item[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (product: Product) => {
    setItems((current) => {
      const found = current.find((item) => item.product.id === product.id);
      if (found) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.product.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      quantity < 1
        ? current.filter((item) => item.product.id !== id)
        : current.map((item) =>
            item.product.id === id ? { ...item, quantity } : item
          )
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, total, addItem, removeItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
