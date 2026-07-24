const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const icons = {
  box: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
      <path d="M3 8.5v7L12 20l9-4.5v-7" />
      <path d="M12 13v7" />
    </svg>
  ),
  "truck-loading": (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M2 17V7a1 1 0 0 1 1-1h9v11H2Z" />
      <path d="M12 10h5l4 4v3h-2" />
      <circle cx="7" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
      <path d="M4 10h5" />
    </svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M5 8v3a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3v1" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M2 7h11v10H2Z" />
      <path d="M13 10h4l4 3.2V17h-2" />
      <circle cx="6.5" cy="19" r="1.6" />
      <circle cx="16.5" cy="19" r="1.6" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v9l9 5 9-5V8" />
      <path d="M12 13v9" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" {...strokeProps}>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M4 21h16" />
      <path d="M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" />
    </svg>
  ),
};

export default function ServiceIcon({ name, size = 26 }) {
  return (
    <span style={{ width: size, height: size, display: "inline-flex" }}>
      {icons[name] || icons.box}
    </span>
  );
}
