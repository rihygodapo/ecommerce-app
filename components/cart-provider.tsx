"use client";
import {createContext,useContext,useMemo,useState} from "react";
import type {Product} from "@/lib/products";
type CartItem={product:Product;quantity:number}; type CartContextValue={items:CartItem[];total:number;addItem:(p:Product)=>void;removeItem:(id:string)=>void;updateQuantity:(id:string,q:number)=>void};
const CartContext=createContext<CartContextValue|null>(null);
export function CartProvider({children}:{children:React.ReactNode}) {
 const [items,setItems]=useState<CartItem[]>([]);
 const value=useMemo(()=>({items,total:items.reduce((s,i)=>s+i.product.price*i.quantity,0),
 addItem:(product:Product)=>setItems(c=>{const f=c.find(i=>i.product.id===product.id);return f?c.map(i=>i.product.id===product.id?{...i,quantity:i.quantity+1}:i):[...c,{product,quantity:1}]}),
 removeItem:(id:string)=>setItems(c=>c.filter(i=>i.product.id!==id)),
 updateQuantity:(id:string,q:number)=>setItems(c=>q<=0?c.filter(i=>i.product.id!==id):c.map(i=>i.product.id===id?{...i,quantity:q}:i))}),[items]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart(){const c=useContext(CartContext);if(!c)throw new Error("useCart must be used inside CartProvider");return c;}