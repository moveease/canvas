import QuoteForm from "../components/QuoteForm";
import "./InnerPage.css";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Get in touch</span>
          <h1>Let's plan your move.</h1>
          <p>Fill in the details below or reach us directly — we typically reply within 24 hours.</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container contact-inner">
          <div className="contact-details">
            <h2>Contact details</h2>
            <ul className="contact-list">
              <li>
                <span className="contact-label">Email</span>
                <a href="mailto:moveeasellp@gmail.com">moveeasellp@gmail.com</a>
              </li>
              <li>
                <span className="contact-label">Instagram</span>
                <a href="https://instagram.com/moveease.in" target="_blank" rel="noreferrer">@moveease.in</a>
              </li>
              <li>
                <span className="contact-label">Phone / WhatsApp</span>
                <a href="tel:+919620221007">+91 96202 21007</a>
                <a href="tel:+919844944290">+91 98449 44290</a>
                <a href="tel:+918660270116">+91 86602 70116</a>
              </li>
            </ul>
            <div className="contact-note">
              <strong>Residential or commercial?</strong>
              <p>Let us know in the message field — it changes crew size and truck allocation.</p>
            </div>
          </div>

          <div className="contact-form-wrap">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
