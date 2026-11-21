import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="info-page">
      <header className="info-hero">
        <span className="eyebrow">THE SMALL PRINT</span>
        <h1>Terms, kept<br /><em>simple.</em></h1>
        <p>A clear starting point for using the petal & polish storefront.</p>
      </header>
      <section className="policy-content">
        <p className="policy-updated">Storefront preview · Last updated November 2026</p>
        <article><h2>Using this storefront</h2><p>Please use the site lawfully and respectfully. Product descriptions and prices in this preview are sample content and may change before a real store launch.</p></article>
        <article><h2>Orders and payment</h2><p>This demo does not accept payment or create real orders. The checkout confirmation is for preview purposes only. A live store should publish its accepted payment methods, order process, and cancellation terms here.</p></article>
        <article><h2>Product information</h2><p>We aim to describe products clearly. For real cosmetics, always review the final ingredient list and product directions, and stop use if irritation occurs. Product information is not medical advice.</p></article>
        <article><h2>Updates</h2><p>Terms for a live store may be updated as services or applicable requirements change. The latest version should be available on this page.</p></article>
        <p className="policy-disclaimer">These are sample terms for a demo storefront, not legal advice. Replace them with terms reviewed for your business before launch.</p>
        <Link className="underlined-link" to="/contact">Need to ask us something? Contact us</Link>
      </section>
    </div>
  );
}
