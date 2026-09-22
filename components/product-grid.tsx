"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./product-card";

const PAGE_SIZE = 24;

export function ProductGrid() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : products;
  }, [query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage-1)*PAGE_SIZE, safePage*PAGE_SIZE);

  return <div>
    <div className="catalog-tools">
      <input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Search 1,000 products..." aria-label="Search products"/>
      <span className="muted">{filtered.length} products</span>
    </div>
    <div className="grid">{visible.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    <div className="pagination">
      <button className="button" disabled={safePage===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>← Previous</button>
      <span>Page {safePage} of {totalPages}</span>
      <button className="button" disabled={safePage===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next →</button>
    </div>
  </div>;
}
