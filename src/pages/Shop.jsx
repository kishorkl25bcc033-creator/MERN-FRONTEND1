import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";

const categories = ["Everything", "Skincare", "Makeup", "Fragrance"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const { wishlist } = useStore();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "Everything";
  const wishlistOnly = searchParams.get("wishlist") === "true";

  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = category === "Everything" || product.category === category;
      const matchesQuery = `${product.name} ${product.detail} ${product.category}`.toLowerCase().includes(query.toLowerCase());
      const matchesWishlist = !wishlistOnly || wishlist.includes(product.id);
      return matchesCategory && matchesQuery && matchesWishlist;
    });
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "top-rated") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, query, sort, wishlist, wishlistOnly]);

  function selectCategory(value) {
    const next = new URLSearchParams(searchParams);
    next.delete("wishlist");
    if (value === "Everything") next.delete("category");
    else next.set("category", value);
    setSearchParams(next);
  }

  return <div className="shop-page">
    <div className="shop-intro"><span className="eyebrow">THE WHOLE LITTLE WORLD</span><h1>Good things,<br /><em>for your skin.</em></h1><p>Considered essentials for whatever your everyday looks like.</p></div>
    <div className="shop-toolbar">
      <div className="category-tabs" role="tablist" aria-label="Product categories">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? "active" : ""} onClick={() => selectCategory(item)}>{item}</button>)}</div>
      <label className="sort-control"><SlidersHorizontal size={15} /><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="top-rated">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
    </div>
    {(query || wishlistOnly) && <p className="results-note">{wishlistOnly ? `Your saved favourites · ${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}` : <>Results for <strong>“{query}”</strong> · {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</>}</p>}
    {filtered.length ? <div className="product-grid shop-grid">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="empty-results"><span>♡</span><h2>No little treasures here just yet.</h2><p>{wishlistOnly ? "Save a favourite with the heart on any product." : "Try another search or category."}</p><button className="button button-dark" onClick={() => setSearchParams({})}>See everything</button></div>}
  </div>;
}
