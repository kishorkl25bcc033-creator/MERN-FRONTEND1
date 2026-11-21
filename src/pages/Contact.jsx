import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="info-page">
      <header className="info-hero">
        <span className="eyebrow">WE’RE HERE FOR YOU</span>
        <h1>Let's have<br /><em>a little chat.</em></h1>
        <p>Questions, kind words, or a hand choosing a new favourite — we’d love to hear from you.</p>
      </header>
      <section className="contact-layout">
        <div className="contact-aside">
          <Mail size={21} strokeWidth={1.5} />
          <h2>Prefer email?</h2>
          <p>Write to us and we’ll get back to you as soon as we can.</p>
          <a href="mailto:hello@petalandpolish.example">hello@petalandpolish.example</a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your name<input name="name" autoComplete="name" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          <label>What’s on your mind?<textarea name="message" rows="5" required /></label>
          <button className="button button-dark" type="submit">Send your note <ArrowRight size={16} /></button>
          <p className="form-note">This demo form doesn’t send or store your message.</p>
          {submitted && <p className="form-success" role="status">Thanks for the note — your message was previewed but not sent.</p>}
        </form>
      </section>
    </div>
  );
}
