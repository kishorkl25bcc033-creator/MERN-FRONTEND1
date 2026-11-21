import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatPrice } from "../utils/formatPrice.js";

export default function ProductCard({ product, index = 0 }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isSaved = wishlist.includes(product.id);
  return <article className="product-card" style={{ "--card-index": index }}>
    <div className="product-image-wrap" style={{ backgroundColor: product.color }}>
      <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" /></Link>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button className={`save-button ${isSaved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}><Heart size={17} fill={isSaved ? "currentColor" : "none"} /></button>
      <button className="quick-add" onClick={() => addToCart(product.id)}>Add to bag <span>+</span></button>
    </div>
    <div className="product-info"><div><Link to={`/product/${product.id}`} className="product-name">{product.name}</Link><span className="product-detail">{product.detail}</span></div><span className="product-price">{formatPrice(product.price)}</span></div>
    <div className="product-rating"><Star size={12} fill="currentColor" /> {product.rating} <span>({product.reviews})</span></div>
  </article>;
}
