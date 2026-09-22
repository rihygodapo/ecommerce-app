"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function Cart() {
  const { items, total, updateQuantity, removeItem } = useCart();
  return (
    <div className="container cart-page">
      <p className="eyebrow">YOUR BAG</p><h1>Shopping cart</h1>
      {!items.length ? <div className="empty"><p>Your cart is empty.</p><Link className="button" href="/#products">Continue shopping</Link></div> :
      <div className="cart-layout">
        <div>{items.map(({product,quantity}) => <div className="row" key={product.id}>
          <img className="small" src={product.image} alt={product.name}/>
          <div className="grow"><b>{product.name}</b><p>{"$"}{product.price.toFixed(2)}</p></div>
          <button onClick={()=>updateQuantity(product.id,quantity-1)}>-</button><span>{quantity}</span><button onClick={()=>updateQuantity(product.id,quantity+1)}>+</button>
          <button onClick={()=>removeItem(product.id)}>Remove</button>
        </div>)}</div>
        <aside className="summary"><b>Order summary</b>
          <div><span>Subtotal</span><strong>{"$"}{total.toFixed(2)}</strong></div>
          <div><span>Shipping</span><strong>{total>=75 ? "Free" : "$8.00"}</strong></div>
          <div className="summary-total"><span>Total</span><strong>{"$"}{(total+(total>=75?0:8)).toFixed(2)}</strong></div>
          <Link className="button full" href="/checkout">Checkout →</Link>
        </aside>
      </div>}
    </div>
  );
}
