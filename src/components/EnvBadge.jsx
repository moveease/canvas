import "./EnvBadge.css";

const LABELS = {
  development: "DEV",
  stage: "STAGE",
};

export default function EnvBadge() {
  const mode = import.meta.env.MODE;
  const label = LABELS[mode];

  if (!label) return null; // production shows nothing

  return <div className={`env-badge env-badge-${mode}`}>{label}</div>;
}