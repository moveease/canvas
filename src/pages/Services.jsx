import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import { fetchServices } from "../api/client";
import "./InnerPage.css";

const FALLBACK_SERVICES = [
  { name: "Packing & Unpacking", description: "Careful, professional packing with quality materials so your belongings arrive exactly as they left.", icon: "box" },
  { name: "Loading & Unloading", description: "Trained crews handle heavy lifting and careful loading so nothing gets damaged in transit.", icon: "truck-loading" },
  { name: "Logistics", description: "End-to-end route planning and coordination for a smooth, on-time move every time.", icon: "route" },
  { name: "Rental Trucks", description: "A range of well-maintained trucks sized to fit any home or office move.", icon: "truck" },
  { name: "Cargo Services", description: "Secure cargo handling for bulk shipments, business relocations, and freight.", icon: "package" },
  { name: "Long Distance Moving", description: "Interstate and long-haul moves handled with the same care as a move next door.", icon: "map" },
  { name: "Residential & Commercial", description: "Home and office relocations of any size, tailored to your timeline and budget.", icon: "building" },
];

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>What we do</span>
          <h1>Services built around one goal: nothing gets damaged.</h1>
          <p>Pick a single service or bundle everything into one move — our crews handle both the same way: carefully.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.id || s.name} name={s.name} description={s.description} icon={s.icon} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <div>
            <h2>Not sure which service fits your move?</h2>
            <p>Tell us what you're moving and we'll recommend the right combination.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </>
  );
}
