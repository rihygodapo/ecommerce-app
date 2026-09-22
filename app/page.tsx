import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
export default function Home() {
  return <div className="container">
    <section className="hero"><div><p className="eyebrow">NEW COLLECTION</p><h1>Simple shopping.<br/>Beautiful products.</h1><p className="hero-copy">A clean ecommerce starter built with Next.js, TypeScript, and React.</p><a className="button" href="#products">Shop products</a></div></section>
    <section id="products" className="section"><div className="section-heading"><div><p className="eyebrow">OUR PICKS</p><h2>Featured products</h2></div><span>{products.length} products</span></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>
  </div>;
}