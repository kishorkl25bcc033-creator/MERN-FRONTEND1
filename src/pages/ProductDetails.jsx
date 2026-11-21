import { ArrowLeft, ArrowRight, Heart, Minus, Plus, Star } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { formatPrice } from "../utils/formatPrice.js";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === productId);
  const { cart, wishlist, addToCart, toggleWishlist, updateQuantity } = useStore();
  if (!product) return <div className="empty-results"><h2>We couldn't find that one.</h2><Link className="button button-dark" to="/shop">Back to the good stuff</Link></div>;
  const quantity = cart.find((item) => item.productId === product.id)?.quantity || 0;
  const saved = wishlist.includes(product.id);
  const similar = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return <>
    <div className="breadcrumbs"><Link to="/shop"><ArrowLeft size={14} /> Back to shop</Link><span>/</span><span>{product.category}</span><span>/</span><span>{product.name}</span></div>
    <section className="product-detail-page">
      <div className="detail-image" style={{ backgroundColor: product.color }}><img src={product.image} alt={product.name} /></div>
      <div className="detail-copy">
        <span className="eyebrow">{product.category.toUpperCase()} · A LITTLE EVERYDAY LUXURY</span>
        <h1>{product.name}</h1><p className="detail-subtitle">{product.detail}</p>
        <div className="detail-rating"><span><Star size={14} fill="currentColor" /> {product.rating}</span><a href="#reviews">{product.reviews} kind words</a></div>
        <p className="detail-description">{product.description}</p>
        <div className="detail-price-row"><span>{formatPrice(product.price)}</span><span>Free shipping over ₹60</span></div>
        {quantity === 0 ? <button className="button button-dark detail-add" onClick={() => addToCart(product.id)}>Add to your bag <span>{formatPrice(product.price)}</span><ArrowRight size={16} /></button> : <div className="detail-quantity"><span>In your bag</span><div><button aria-label="Remove one" onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={14} /></button><strong>{quantity}</strong><button aria-label="Add one" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={14} /></button><Link to="/cart">View bag</Link></div></div>}
        <button className={`save-detail ${saved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product.id)}><Heart size={17} fill={saved ? "currentColor" : "none"} />{saved ? "Saved to your wishlist" : "Save for later"}</button>
        <div className="product-notes"><div><span>01</span><p>Made with care, for all skin types.</p></div><div><span>02</span><p>Thoughtful ingredients, no unnecessary fuss.</p></div><div><span>03</span><p>A little ritual, just for you.</p></div></div>
      </div>
    </section>
    <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">A LITTLE MORE TO LOVE</span><h2>Goes well with.</h2></div><button className="underlined-link" onClick={() => navigate("/shop")}>See the whole collection <ArrowRight size={14} /></button></div><div className="product-grid">{similar.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}</div></section>
    <div id="reviews" className="reviews-anchor" />
  </>;
}
