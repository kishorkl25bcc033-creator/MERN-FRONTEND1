import { ArrowRight, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Shipping() {
  return (
    <div className="info-page">
      <header className="info-hero">
        <span className="eyebrow">FROM OUR SHELF TO YOURS</span>
        <h1>Shipping &<br /><em>returns.</em></h1>
        <p>A few details to make your order feel easy from the very beginning.</p>
      </header>
      <section className="policy-content">
        <div className="policy-callout"><PackageCheck size={23} strokeWidth={1.5} /><p>Complimentary shipping on orders over ₹60.</p></div>
        <article><span className="eyebrow">01 · DELIVERY</span><h2>On its way to you</h2><p>Orders are prepared with care. Delivery timing and available services depend on your location; we’ll share tracking information when a real order is dispatched.</p></article>
        <article><span className="eyebrow">02 · RETURNS</span><h2>If it’s not quite right</h2><p>For this sample policy, please contact us within 14 days of delivery about an eligible, unopened item. We’ll help explain next steps before you send anything back.</p></article>
        <article><span className="eyebrow">03 · A QUICK NOTE</span><h2>Before sending it back</h2><p>Please keep the item and its original packaging safe, and include your order details when you contact us. Return shipping and eligibility should be confirmed with our team.</p></article>
        <p className="policy-disclaimer">These are sample storefront policies. Confirm delivery areas, fees, timing, and return terms before accepting real orders.</p>
        <Link className="underlined-link" to="/contact">Still have a question? Contact us <ArrowRight size={14} /></Link>
      </section>
    </div>
  );
}
