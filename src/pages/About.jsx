import { ArrowRight, Heart, Leaf, Recycle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Leaf,
    title: "Thoughtfully made",
    copy: "We choose ingredients with care and make every formula earn its place in your routine.",
  },
  {
    icon: Heart,
    title: "Here for real life",
    copy: "Beauty should feel like an invitation, never another rule about how you should look.",
  },
  {
    icon: Recycle,
    title: "A lighter touch",
    copy: "We keep looking for ways to make our packaging and everyday choices a little gentler.",
  },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> A NOTE FROM US</span>
          <h1>Beauty that<br />feels like <em>you.</em></h1>
          <p>We started petal & polish with one small thought: taking care of yourself should feel like a kind thing to do, not another thing to get right.</p>
          <a className="underlined-link" href="#our-story">A little more about us <ArrowRight size={14} /></a>
        </div>
        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85"
            alt="A calm, sunlit collection of skincare essentials"
          />
          <span className="about-image-note">A softer kind<br />of everyday.</span>
        </div>
      </section>

      <section className="about-story" id="our-story">
        <span className="eyebrow">HOW IT STARTED</span>
        <h2>Less pressure.<br /><em>More pleasure.</em></h2>
        <p>
          Somewhere between the ten-step routines and the promise of perfect skin,
          we started missing the simple joy of a little time for ourselves.
          So we set out to make thoughtful skincare and easy, feel-good colour
          that could find a place in real life — busy mornings, slow Sundays,
          and every ordinary day in between.
        </p>
        <p>
          No fixing. No fuss. Just considered essentials, a softer ritual, and
          the reminder that you were already enough before you opened the jar.
        </p>
        <span className="about-signoff">With care, the P&amp;P team ♡</span>
      </section>

      <section className="about-values">
        <div className="about-values-heading">
          <span className="eyebrow">OUR LITTLE NORTH STARS</span>
          <h2>Good feels<br /><em>good.</em></h2>
        </div>
        <div className="about-values-grid">
          {values.map(({ icon: Icon, title, copy }, index) => (
            <article className="about-value" key={title}>
              <span className="about-value-icon"><Icon size={20} strokeWidth={1.5} /></span>
              <span className="about-value-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-note">
        <Sparkles size={20} strokeWidth={1.4} />
        <blockquote>“You don't need a new face.<br />You deserve a little care.”</blockquote>
        <Link className="button button-dark" to="/shop">Find your feel <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}
