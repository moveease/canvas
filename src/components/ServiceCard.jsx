import ServiceIcon from "./ServiceIcon";
import "./ServiceCard.css";

export default function ServiceCard({ name, description, icon, index }) {
  return (
    <article className="service-card">
      <span className="service-card-index">{String(index).padStart(2, "0")}</span>
      <div className="service-card-icon">
        <ServiceIcon name={icon} />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
    </article>
  );
}
