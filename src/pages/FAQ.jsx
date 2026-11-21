import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const questions = [
  {
    question: "How do I choose the right product for me?",
    answer: "Start with what feels most useful to you. Browse by skincare, makeup, or fragrance, and visit a product page for details about each item.",
  },
  {
    question: "Are your products tested on animals?",
    answer: "Our brand promise is to create thoughtful beauty with care for people, animals, and the world around us. Confirm supplier and certification details before launch.",
  },
  {
    question: "How much is shipping?",
    answer: "This storefront preview offers complimentary shipping on orders over ₹60. Shipping options and final costs should be confirmed at checkout.",
  },
  {
    question: "Can I return an item?",
    answer: "Please see our Shipping & Returns page for the sample return guidance, or contact us before sending anything back.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "Get in touch as soon as possible with your order details. We’ll do our best to help if your order has not yet been prepared for dispatch.",
  },
  {
    question: "Is checkout live?",
    answer: "No. This is a storefront demo. The checkout confirmation is a preview and does not collect payment or create a real order.",
  },
];

export default function FAQ() {
  return (
    <div className="info-page">
      <header className="info-hero">
        <span className="eyebrow">A FEW HELPFUL THINGS</span>
        <h1>Good questions,<br /><em>good answers.</em></h1>
        <p>Need a hand? Start here, or <Link to="/contact">send us a note</Link>.</p>
      </header>
      <section className="faq-list" aria-label="Frequently asked questions">
        {questions.map(({ question, answer }) => (
          <details className="faq-item" key={question}>
            <summary>{question}<ChevronDown size={17} /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
