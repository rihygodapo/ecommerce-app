import { ProductGrid } from "@/components/product-grid";
import { products } from "@/lib/products";

export default function Home() {
  return <main>
    <section className="hero container">
      <div className="hero-copy"><span className="eyebrow">THE EVERYDAY EDIT</span>
        <h1>Good things.<br/><em>Beautifully</em> chosen.</h1>
        <p>Thoughtful essentials for work, home, and everywhere in between. Now with 1,000 products to explore.</p>
        <a className="button button-light" href="#products">Shop the collection <span>→</span></a>
      </div>
      <div className="hero-art"><div className="hero-orb">✦</div><span className="hero-label">NEW / 2026</span></div>
    </section>
    <section id="products" className="section container">
      <div className="section-heading"><div><span className="eyebrow">CURATED FOR YOU</span><h2>Shop the collection</h2></div><span className="muted">{products.length} products</span></div>
      <ProductGrid />
    </section>
    <section className="marquee"><span>QUALITY · SIMPLICITY · EVERYDAY · QUALITY · SIMPLICITY · EVERYDAY ·</span></section>
  </main>;
}
