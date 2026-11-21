import { ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link className="wordmark" to="/">petal<span>&</span>polish<i>.</i></Link><p>Good skin days, softer rituals, and a little more room to feel like you.</p><a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={16} /> Come say hi <ArrowUpRight size={13} /></a></div>
      <div className="footer-column"><span className="footer-label">Explore</span><Link to="/shop">Shop all</Link><Link to="/shop?category=Skincare">Skincare</Link><Link to="/shop?category=Makeup">Makeup</Link><Link to="/about">About us</Link></div>
      <div className="footer-column"><span className="footer-label">The good stuff</span><Link to="/contact">Contact us</Link><Link to="/shipping-returns">Shipping & returns</Link><Link to="/faq">FAQs</Link><Link to="/privacy">Privacy policy</Link><Link to="/terms">Terms & conditions</Link></div>
      <div className="newsletter"><span className="footer-label">A little note from us</span><p>New launches, skin notes, and 10% off your first order.</p><form onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); window.alert("You’re on the list — thank you!"); }}><input type="email" placeholder="Your email address" required aria-label="Email address" /><button type="submit" aria-label="Subscribe"><ArrowUpRight size={18} /></button></form></div>
    </div>
    <div className="footer-bottom"><span>© 2026 petal & polish</span><span>Made for your everyday ritual.</span><span>Beauty, made personal.</span></div>
  </footer>;
}
