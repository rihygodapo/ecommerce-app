import {notFound} from "next/navigation";
import {AddToCart} from "@/components/add-to-cart";
import {products} from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function Page({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const product=products.find(p=>p.id===id);
  if(!product) notFound();
  return <div className="container detail"><div className={"product-image detail-image image-"+product.id}><span>{product.emoji}</span></div><div className="detail-copy"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><div className="price">{'$'}{product.price.toFixed(2)}</div><p>{product.description}</p><div className="detail-note">Free shipping on orders over $75</div><AddToCart product={product}/></div></div>;
}