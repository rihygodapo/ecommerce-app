import Link from "next/link";
import type {Product} from "@/lib/products";
import {AddToCart} from "./add-to-cart";
export function ProductCard({product}:{product:Product}){return <article className="card"><Link href={`/products/${product.id}`} className="product-image">{product.emoji}</Link><div className="card-body"><p className="category">{product.category}</p><Link href={`/products/${product.id}`}><h3>{product.name}</h3></Link><div className="card-footer"><strong>${product.price.toFixed(2)}</strong><AddToCart product={product}/></div></div></article>;}