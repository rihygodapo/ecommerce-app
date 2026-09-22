import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { products } from "@/lib/products";
export default async function ProductPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params; const product=products.find(p=>p.id===id); if(!product) notFound();
  return <div className="container product-detail"><div className="product-image large">{product.emoji}</div><div><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="price large-price">${product.price.toFixed(2)}</p><p className="description">{product.description}</p><AddToCart product={product}/></div></div>;
}