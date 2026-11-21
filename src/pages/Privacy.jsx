import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="info-page">
      <header className="info-hero">
        <span className="eyebrow">YOUR DETAILS ARE YOURS</span>
        <h1>A little note<br /><em>on privacy.</em></h1>
        <p>We believe feeling good should include feeling good about your personal information.</p>
      </header>
      <section className="policy-content">
        <p className="policy-updated">Storefront preview · Last updated November 2026</p>
        <article><h2>What this demo collects</h2><p>Creating an account sends your name, email, and password to the account service. Passwords are stored as one-way hashes. Contact and newsletter forms are previews and do not submit information. Cart and wishlist choices are saved in your browser’s local storage.</p></article>
        <article><h2>Information in a live store</h2><p>A production store may need information such as your name, email, delivery address, and order details to process purchases and respond to requests. The final privacy notice should explain exactly what is collected and why.</p></article>
        <article><h2>Cookies and analytics</h2><p>This preview does not implement analytics or advertising tracking. Any production cookies or analytics should be disclosed here, along with how visitors can manage their choices.</p></article>
        <article><h2>Your choices</h2><p>You can clear this demo’s saved cart and wishlist through your browser storage. For a live store, provide a working contact route for access, correction, and deletion requests.</p></article>
        <p className="policy-disclaimer">This is placeholder privacy information for a demo, not a final legal policy. Have the live policy reviewed and update it to reflect actual data practices.</p>
        <Link className="underlined-link" to="/contact">Questions about privacy? Contact us</Link>
      </section>
    </div>
  );
}
