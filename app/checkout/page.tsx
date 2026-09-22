"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [order, setOrder] = useState("");
  const shipping = total >= 75 || total === 0 ? 0 : 8;
  const grandTotal = total + shipping;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (["name","email","address","city","country"].some(k => !String(data.get(k) || "").trim())) return;
    setOrder("NF-" + Math.random().toString(36).slice(2,8).toUpperCase());
    setPlaced(true);
    clearCart();
  }

  if (placed) return <div className="container checkout-page"><div className="confirmation">
    <p className="eyebrow">ORDER CONFIRMED</p><h1>Thank you.</h1>
    <p>Your demo order <strong>{order}</strong> has been received.</p>
    <p className="muted">This GitHub Pages demo does not charge a card or send an order to a server.</p>
    <Link className="button" href="/#products">Continue shopping</Link>
  </div></div>;

  if (!items.length) return <div className="container checkout-page"><div className="empty"><h1>No items to checkout</h1><Link className="button" href="/#products">Shop products</Link></div></div>;

  return <div className="container checkout-page">
    <p className="eyebrow">CHECKOUT</p><h1>Complete your order</h1>
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={submit}>
        <label>Full name<input name="name" required /></label>
        <label>Email<input type="email" name="email" required /></label>
        <label>Address<input name="address" required /></label>
        <div className="form-grid"><label>City<input name="city" required /></label><label>Country<input name="country" required /></label></div>
        <button className="button full" type="submit">Place demo order · {"$"}{grandTotal.toFixed(2)}</button>
      </form>
      <aside className="summary"><b>Order summary</b>
        {items.slice(0,8).map(({product,quantity}) => <div key={product.id}><span>{product.name} × {quantity}</span><strong>{"$"}{(product.price*quantity).toFixed(2)}</strong></div>)}
        <div className="summary-total"><span>Total</span><strong>{"$"}{grandTotal.toFixed(2)}</strong></div>
      </aside>
    </div>
  </div>;
}
