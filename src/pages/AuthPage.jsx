import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthPage({ mode }) {
  const isSignup = mode === "signup";
  const isForgotPassword = mode === "forgot-password";
  const [resetRequested, setResetRequested] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (isForgotPassword) {
      setResetRequested(true);
      return;
    }

    setErrorMessage("");
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(`/api/auth/${isSignup ? "signup" : "signin"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseText = await response.text();
      let result = null;
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error("The account service returned an invalid response. Please try again.");
        }
      }
      if (!response.ok) {
        throw new Error(result?.message || "We couldn't complete your request. Please try again.");
      }
      if (!result || typeof result !== "object") {
        throw new Error("The account service returned an empty response. Please try again.");
      }
      navigate("/shop");
    } catch (error) {
      setErrorMessage(error.message || "Could not reach the account service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return <div className="auth-page">
    <Link to="/" className="auth-back"><ArrowLeft size={15} /> Back to the good stuff</Link>
    <Link className="wordmark auth-wordmark" to="/">petal<span>&</span>polish<i>.</i></Link>
    <div className="auth-card">
      <span className="auth-flower">✳</span>
      <span className="eyebrow">{isSignup ? "COME ON IN" : isForgotPassword ? "LET'S GET YOU BACK IN" : "SO GOOD TO SEE YOU"}</span>
      <h1>{isSignup ? <>A little space<br /><em>for you.</em></> : isForgotPassword ? <>Forgot your<br /><em>password?</em></> : <>Welcome<br /><em>back.</em></>}</h1>
      <p>{isSignup ? "Join us for skin notes, soft rituals, and the occasional very good surprise." : isForgotPassword ? "Enter the email linked to your account and we'll send you reset instructions." : "Your favourites and feel-good finds are right where you left them."}</p>
      {resetRequested ? (
        <div className="auth-reset-success" role="status">
          <span><Check size={16} /></span>
          <strong>Check your inbox</strong>
          <p>If an account exists for that email, password reset instructions are on the way.</p>
          <Link className="button button-dark auth-submit" to="/login">Back to sign in <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && <label>Your name<input name="name" type="text" placeholder="What should we call you?" autoComplete="name" maxLength={80} required /></label>}
          <label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
          {!isForgotPassword && <div className="auth-password-label"><label>Password<input name="password" type="password" placeholder="At least 8 characters" minLength={8} maxLength={128} autoComplete={isSignup ? "new-password" : "current-password"} required /></label>{!isSignup && <Link to="/forgot-password">Forgot password?</Link>}</div>}
          {errorMessage && <p className="auth-error" role="alert">{errorMessage}</p>}
          <button className="button button-dark auth-submit" type="submit" disabled={submitting}>{submitting ? "Please wait..." : isSignup ? "Create your account" : isForgotPassword ? "Send reset instructions" : "Sign in"} <ArrowRight size={16} /></button>
        </form>
      )}
      <div className="auth-assurance"><span><Check size={13} /> Thoughtful notes, never noise</span><span><Check size={13} /> Your details stay yours</span></div>
      <div className="auth-switch">{isForgotPassword ? "Remembered it?" : isSignup ? "Already have a little space here?" : "New around here?"} <Link to={isSignup || isForgotPassword ? "/login" : "/signup"}>{isSignup || isForgotPassword ? "Sign in" : "Create an account"}</Link></div>
      <span className="auth-demo">{isForgotPassword ? "Password reset email delivery is not set up yet." : "Your password is securely stored as a one-way hash."}</span>
    </div>
    <span className="auth-bottom-note">Beauty, made personal. ♡</span>
  </div>;
}
