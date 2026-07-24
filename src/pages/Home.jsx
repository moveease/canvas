import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import ServiceCard from "../components/ServiceCard";
import { fetchServices } from "../api/client";
import "./Home.css";

const FALLBACK_SERVICES = [
  { name: "Packing & Unpacking", description: "Careful, professional packing with quality materials so your belongings arrive exactly as they left.", icon: "box" },
  { name: "Loading & Unloading", description: "Trained crews handle heavy lifting and careful loading so nothing gets damaged in transit.", icon: "truck-loading" },
  { name: "Logistics", description: "End-to-end route planning and coordination for a smooth, on-time move every time.", icon: "route" },
  { name: "Rental Trucks", description: "A range of well-maintained trucks sized to fit any home or office move.", icon: "truck" },
  { name: "Cargo Services", description: "Secure cargo handling for bulk shipments, business relocations, and freight.", icon: "package" },
  { name: "Long Distance Moving", description: "Interstate and long-haul moves handled with the same care as a move next door.", icon: "map" },
  { name: "Residential & Commercial", description: "Home and office relocations of any size, tailored to your timeline and budget.", icon: "building" },
];

const STEPS = [
  { n: "01", title: "Tell us the plan", copy: "Share your move date, locations, and what needs to travel — takes two minutes." },
  { n: "02", title: "We pack & load", copy: "Our crew arrives on time, wraps every item with care, and loads methodically." },
  { n: "03", title: "Safe delivery", copy: "We unload, place, and unpack at your new address — you check the inventory, we handle the rest." },
];

const STATS = [
  { value: "3", label: "Contact numbers, always reachable" },
  { value: "7", label: "Core moving services" },
  { value: "100%", label: "Fragile-item handling care" },
  { value: "24h", label: "Typical quote turnaround" },
];

export default function Home() {
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => {
        // Backend not running yet — keep the fallback list so the page still works.
      });
  }, []);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow" style={{ color: "var(--gold)" }}>Packers &amp; Movers, done properly</span>
            <h1>
              Your move,<br />
              <span className="hero-highlight">handled with ease.</span>
            </h1>
            <p className="hero-sub">
              MoveEase LLP packs, loads, and delivers your home or office —
              locally or long distance — with trained crews and a
              fragile-first approach to every box.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
              <a href="tel:+919844944290" className="btn btn-outline">Call +91 98449 44290</a>
            </div>
          </div>

          <div className="hero-visual">
            <BrandMark variant="light" size={340} />
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our key services</span>
            <h2>Everything your move needs, under one roof.</h2>
            <p>From the first roll of packing tape to the last box unloaded — one crew, one point of contact.</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.id || s.name} name={s.name} description={s.description} icon={s.icon} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="section how-it-works">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps, zero guesswork.</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((step) => (
              <div className="step-card" key={step.n}>
                <span className="step-number">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY US ---------------- */}
      <section className="section why-us">
        <div className="container why-us-inner">
          <div className="why-us-media">
            <img src="/assets/services-poster.jpg" alt="MoveEase mover carrying a fragile-marked box" />
          </div>
          <div className="why-us-copy">
            <span className="eyebrow">Why MoveEase</span>
            <h2>Reliability isn't a slogan here — it's the whole business.</h2>
            <ul className="why-us-list">
              <li><strong>Fragile-first handling.</strong> Every box marked fragile gets padded, labeled, and loaded last-off-first.</li>
              <li><strong>One crew, start to finish.</strong> The team that packs your kitchen is the one that unloads it.</li>
              <li><strong>Transparent pricing.</strong> Your quote covers packing, loading, transport, and unloading — no surprise line items.</li>
              <li><strong>Residential & commercial.</strong> Same standard of care whether it's a studio flat or a full office floor.</li>
            </ul>
            <Link to="/about" className="btn btn-dark">More about us</Link>
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="stat-band">
        <div className="container stat-band-inner">
          {STATS.map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Ready to move without the stress?</h2>
            <p>Tell us your dates and locations — we'll send a clear, no-surprise quote.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Request my free quote</Link>
        </div>
      </section>
    </>
  );
}
