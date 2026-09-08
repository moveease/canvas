import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./InnerPage.css";
import "./AuthForm.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      const redirectTo = location.state?.from || (user.role === "ADMIN" ? "/admin" : "/account");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't log in. Check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Welcome back</span>
          <h1>Log in to your account</h1>
          <p>Track your quote requests and manage your details.</p>
        </div>
      </section>

      <section className="section auth-section">
        <div className="container auth-wrap">
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label className="auth-field">
              <span>Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? "Logging in…" : "Log in"}
            </button>

            <p className="auth-switch">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
