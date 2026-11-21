import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products.js";
import { useStore } from "../context/StoreContext.jsx";
import { formatPrice } from "../utils/formatPrice.js";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, setNotice } = useStore();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const items = cart.map((entry) => ({ ...entry, product: products.find((item) => item.id === entry.productId) })).filter((entry) => entry.product);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 60 ? 0 : 6;

  function checkout(event) {
    event.preventDefault();
    if (items.length) {
      clearCart();
      setCheckoutComplete(true);
    }
  }

  if (checkoutComplete) return <section className="checkout-success"><span className="success-flower">✳</span><span className="eyebrow">A LITTLE SOMETHING IS ON ITS WAY</span><h1>Thank you,<br /><em>lovely human.</em></h1><p>Your demo order has been placed. No payment was collected.</p><Link className="button button-dark" to="/shop">Keep exploring <ArrowRight size={16} /></Link></section>;

  return <div className="cart-page">
    <div className="cart-heading"><span className="eyebrow">YOUR LITTLE EDIT</span><h1>Your bag<span className="cart-count">({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h1></div>
    {items.length === 0 ? <div className="empty-cart"><span className="empty-bag-icon"><ShoppingBag size={26} /></span><h2>Your bag is taking a little breather.</h2><p>It's a good time to find something that feels like you.</p><Link className="button button-dark" to="/shop">Meet your new favourites <ArrowRight size={16} /></Link></div> : <div className="cart-layout">
      <div className="cart-items">
        {items.map(({ product, quantity }) => <article className="cart-item" key={product.id}>
          <Link className="cart-item-image" to={`/product/${product.id}`} style={{ backgroundColor: product.color }}><img src={product.image} alt={product.name} /></Link>
          <div className="cart-item-info"><span className="eyebrow">{product.category}</span><Link to={`/product/${product.id}`} className="cart-item-name">{product.name}</Link><span className="product-detail">{product.detail}</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={13} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={13} /></button></div></div>
          <div className="cart-item-end"><strong>{formatPrice(product.price * quantity)}</strong><button className="remove-button" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={15} /> Remove</button></div>
        </article>)}
        <Link className="continue-shopping" to="/shop"><ArrowLeft size={15} /> Keep looking around</Link>
      </div>
      <form className="order-summary" onSubmit={checkout}>
        <span className="eyebrow">THE LITTLE DETAILS</span><h2>Order summary</h2>
        <div className="summary-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="summary-line"><span>Shipping</span><span>{shipping === 0 ? "On us" : formatPrice(shipping)}</span></div>
        {subtotal > 0 && subtotal < 60 && <div className="shipping-note">You're {formatPrice(60 - subtotal)} away from complimentary shipping.</div>}
        <div className="summary-total"><strong>Total</strong><strong>{formatPrice(subtotal + shipping)}</strong></div>
        <p className="demo-checkout-note">Demo checkout only — no payment or shipping details needed.</p>
        <button className="button button-dark checkout-button" type="submit">Place demo order <ArrowRight size={16} /></button>
        <button className="clear-bag" type="button" onClick={() => { clearCart(); setNotice("Your bag is all cleared"); }}>Clear your bag</button>
      </form>
    </div>}
  </div>;
}
