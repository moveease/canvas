import { Link } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import "./InnerPage.css";
import "./About.css";

const VALUES = [
  { title: "Reliability first", copy: "It's on the logo for a reason — every quote, every timeline, every promise gets kept." },
  { title: "Fragile-first handling", copy: "Breakable items get padded, labeled, and loaded and unloaded with extra care, every time." },
  { title: "Straight talk on pricing", copy: "Your quote covers the whole job. No last-minute add-ons at the door." },
  { title: "One crew, full accountability", copy: "The same team that packs your first box unloads your last one." },
];

export default function About() {
  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>About MoveEase LLP</span>
          <h1>Moving is stressful. Working with us shouldn't be.</h1>
          <p>MoveEase LLP is a packers-and-movers team built around a simple idea: treat every customer's belongings like they're our own.</p>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story-inner">
          <div className="about-story-copy">
            <span className="eyebrow">Our approach</span>
            <h2>From the first box to the last mile.</h2>
            <p>
              Whether it's a single-room apartment or a full commercial office,
              MoveEase LLP runs every move the same way — a dedicated crew,
              a clear plan, and fragile-first packing that treats your
              belongings the way you would.
            </p>
            <p>
              We handle packing and unpacking, loading and unloading, local
              logistics, rental trucks, cargo services, long-distance moves,
              and both residential and commercial relocations — all under
              one point of contact, so nothing falls through the cracks.
            </p>
            <Link to="/contact" className="btn btn-dark">Talk to our team</Link>
          </div>
          <div className="about-story-mark">
            <BrandMark variant="light" animate={false} size={280} />
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we stand for</span>
            <h2>The standards behind every move.</h2>
          </div>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
