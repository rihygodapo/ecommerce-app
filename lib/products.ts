export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
};

const imageSets = {
  Apparel: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
  ],
  Home: [
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  ],
  Footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
  ],
  Tech: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
  ],
} as const;

const templates: [string, string, number, string][] = [
  ["Linen Shirt", "Apparel", 48, "A lightweight everyday shirt with a relaxed fit."],
  ["Canvas Tote", "Accessories", 28, "A durable tote for daily errands."],
  ["Ceramic Mug", "Home", 22, "A simple mug for your morning coffee."],
  ["Desk Lamp", "Home", 64, "A compact modern lamp for focused work."],
  ["Everyday Sneakers", "Footwear", 86, "Comfortable low-profile everyday sneakers."],
  ["Studio Headphones", "Tech", 129, "Comfortable over-ear headphones with balanced sound."],
  ["Cotton Overshirt", "Apparel", 72, "A versatile layer designed for everyday wear."],
  ["Leather Card Holder", "Accessories", 34, "A slim card holder with a clean profile."],
  ["Stone Vase", "Home", 42, "A sculptural vase for shelves and side tables."],
  ["Travel Sneakers", "Footwear", 94, "Lightweight sneakers made for long days."],
  ["Wireless Speaker", "Tech", 118, "Compact room-filling sound with a simple finish."],
  ["Merino Sweater", "Apparel", 96, "Soft merino knit with an understated silhouette."],
  ["Everyday Backpack", "Accessories", 78, "A practical backpack for work and weekends."],
  ["Lounge Throw", "Home", 58, "A soft textured throw for relaxed evenings."],
  ["Canvas Trainers", "Footwear", 74, "Minimal trainers with all-day comfort."],
  ["Desk Keyboard", "Tech", 109, "A quiet keyboard for focused work."],
  ["Relaxed Trousers", "Apparel", 82, "Easy trousers with a tailored everyday fit."],
  ["Travel Pouch", "Accessories", 26, "A compact pouch for cables and small essentials."],
  ["Table Clock", "Home", 39, "A quiet desktop clock with a modern face."],
  ["Daily Runners", "Footwear", 88, "Cushioned running-inspired shoes for daily use."],
];

const adjectives = ["Essential","Classic","Modern","Studio","Daily","Select","Soft","Utility","Minimal","Premium"];
const colors = ["Natural","Black","Stone","Olive","Sand","Navy","Clay","Cream","Graphite","Blue"];

export const products: Product[] = Array.from({ length: 1000 }, (_, index) => {
  const template = templates[index % templates.length];
  const adjective = adjectives[Math.floor(index / templates.length) % adjectives.length];
  const color = colors[Math.floor(index / (templates.length * adjectives.length)) % colors.length];
  const number = String(index + 1).padStart(4, "0");
  const [baseName, category, basePrice, description] = template;
  const imagePool = imageSets[category as keyof typeof imageSets];
  return {
    id: `${baseName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${number}`,
    name: `${adjective} ${color} ${baseName}`,
    category,
    price: Math.round((Number(basePrice) + ((index * 7) % 41)) * 100) / 100,
    image: imagePool[index % imagePool.length],
    description: `${description} ${color} finish from the ${adjective.toLowerCase()} collection.`,
  };
});
