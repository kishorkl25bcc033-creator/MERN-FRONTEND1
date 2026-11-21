import { useState } from "react";
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Navbar() {
  const { cart, wishlist } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const bagCount = cart.reduce((total, item) => total + item.quantity, 0);

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
    setSearchOpen(false);
    setMobileOpen(false);
  }

  return <>
    <div className="announcement">A little glow, on us — complimentary shipping over ₹60 <ArrowUpRight size={13} /></div>
    <header className="site-header">
      <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      <Link className="wordmark" to="/" aria-label="petal and polish home">petal<span>&</span>polish<i>.</i></Link>
      <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`}>
        <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop all</Link>
        <Link to="/shop?category=Skincare" onClick={() => setMobileOpen(false)}>Skincare</Link>
        <Link to="/shop?category=Makeup" onClick={() => setMobileOpen(false)}>Makeup</Link>
        <Link to="/shop?category=Fragrance" onClick={() => setMobileOpen(false)}>Little luxuries</Link>
        <Link to="/about" onClick={() => setMobileOpen(false)}>Our story</Link>
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}><Search /></button>
        <Link className="icon-button account-link" to="/login" aria-label="Sign in"><UserRound /></Link>
        <Link className="icon-button wishlist-link" to="/shop?wishlist=true" aria-label={`Wishlist, ${wishlist.length} items`}><Heart />{wishlist.length > 0 && <span className="icon-count">{wishlist.length}</span>}</Link>
        <Link className="icon-button bag-link" to="/cart" aria-label={`Shopping bag, ${bagCount} items`}><ShoppingBag />{bagCount > 0 && <span className="icon-count">{bagCount}</span>}</Link>
      </div>
      {searchOpen && <form className="search-panel" onSubmit={submitSearch}>
        <Search size={18} />
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your next favourite..." aria-label="Search products" />
        <button className="text-button" type="submit">Search</button>
        <button className="icon-button" type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={18} /></button>
      </form>}
    </header>
  </>;
}
