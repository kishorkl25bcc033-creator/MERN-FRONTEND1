import { ArrowDown, ArrowRight, ArrowUpRight, Leaf, PackageCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";

const benefits = [
  { icon: Leaf, title: "Kind to your skin", copy: "Thoughtful ingredients. Nothing you don't need." },
  { icon: Sparkles, title: "Easy, everyday rituals", copy: "Good skin days shouldn't need a 12-step routine." },
  { icon: PackageCheck, title: "A softer footprint", copy: "Considered packaging, made to be kept and reused." },
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> SMALL RITUALS, SOFT GLOW</span>
        <h1>Feel good<br />in your <em>own</em><br />skin.</h1>
        <p>Thoughtful skincare and feel-like-you makeup for the days you want to glow — and the days you just want to be.</p>
        <div className="hero-actions"><Link className="button button-dark" to="/shop">Find your feel <ArrowRight size={16} /></Link><a className="underlined-link" href="#bestsellers">Meet the favourites</a></div>
        <span className="hero-footnote"><span>01</span> Made for real life, and all the skin in it.</span>
      </div>
      <div className="hero-image">
        <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1400&q=90" alt="Skincare and beauty products arranged in warm natural light" />
        <div className="hero-image-tag"><span>YOUR ROUTINE,</span><strong>but softer.</strong><i>01 / 03</i></div>
        <span className="hero-sticker">A little<br />goes a<br /><em>long way</em></span>
      </div>
      <a className="hero-scroll" href="#bestsellers"><ArrowDown size={14} /> SCROLL A LITTLE</a>
    </section>

    <section className="benefit-strip">
      {benefits.map(({ icon: Icon, title, copy }, index) => <div className="benefit" key={title}><span className="benefit-icon"><Icon size={20} strokeWidth={1.4} /></span><div><strong>{title}</strong><p>{copy}</p></div>{index < benefits.length - 1 && <span className="benefit-divider" />}</div>)}
    </section>

    <section className="section bestsellers" id="bestsellers">
      <div className="section-heading"><div><span className="eyebrow">THE ONES YOU COME BACK TO</span><h2>Your shelf called.</h2></div><Link className="underlined-link" to="/shop">Shop all the good stuff <ArrowUpRight size={14} /></Link></div>
      <div className="product-grid">{products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
    </section>

    <section className="ritual-banner">
      <div className="ritual-image"><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85" alt="A quiet, sunlit skincare ritual" loading="lazy" /></div>
      <div className="ritual-copy"><span className="eyebrow">A GENTLER KIND OF GLOW</span><h2>Less routine.<br /><em>More ritual.</em></h2><p>Skincare is not a project to perfect. It's a small moment that belongs to you. Start with what feels good.</p><Link className="button button-outline" to="/shop">Find your ritual <ArrowRight size={16} /></Link><span className="ritual-scribble">take your<br />sweet time ♡</span></div>
    </section>

    <section className="quote-section"><span className="eyebrow">A NOTE FROM THE BATHROOM MIRROR</span><blockquote>“You don't need to fix a thing.<br />But if a little glow feels good,<br /><em>we've got you.</em>”</blockquote><span className="quote-signature">A little love, P&amp;P</span></section>
  </>;
}
