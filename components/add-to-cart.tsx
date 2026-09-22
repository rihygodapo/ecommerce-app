"use client";
import type {Product} from "@/lib/products";
import {useCart} from "./cart-provider";
export function AddToCart({product}:{product:Product}){const {addItem}=useCart();return <button className="button small-button" onClick={()=>addItem(product)}>Add to cart</button>;}