"use client";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
export default function CartPage() {
 const {items,total,updateQuantity,removeItem}=useCart();
 return <div className="container section"><p className="eyebrow">YOUR BAG</p><h1>Shopping cart</h1>
 {items.length===0?<div className="empty"><p>Your cart is empty.</p><Link className="button" href="/">Continue shopping</Link></div>:
 <div className="cart-layout"><div className="cart-items">{items.map(({product,quantity})=><div className="cart-row" key={product.id}><div className="product-image small">{product.emoji}</div><div className="cart-info"><h3>{product.name}</h3><p>${product.price.toFixed(2)}</p></div><div className="quantity"><button onClick={()=>updateQuantity(product.id,quantity-1)}>-</button><span>{quantity}</span><button onClick={()=>updateQuantity(product.id,quantity+1)}>+</button></div><button className="remove" onClick={()=>removeItem(product.id)}>Remove</button></div>)}</div><aside className="summary"><h2>Summary</h2><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><div><span>Shipping</span><span>Free</span></div><hr/><div><span>Total</span><strong>${total.toFixed(2)}</strong></div><button className="button full">Checkout</button></aside></div>}
 </div>;
}