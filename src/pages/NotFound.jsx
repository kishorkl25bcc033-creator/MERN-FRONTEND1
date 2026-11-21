import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">A LITTLE OFF THE PATH</span><h1>Well, this is<br /><em>awkward.</em></h1><p>That page doesn't seem to be here. Let's get you back to the good stuff.</p><Link className="button button-dark" to="/"><ArrowLeft size={16} /> Back home</Link></main>;
}
