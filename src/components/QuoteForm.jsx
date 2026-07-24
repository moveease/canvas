import { useState } from "react";
import { submitInquiry } from "../api/client";
import "./QuoteForm.css";
import validateForm from "../Validation/FormValidation";

const SERVICE_OPTIONS = [
  "Packing & Unpacking",
  "Loading & Unloading",
  "Logistics",
  "Rental Trucks",
  "Cargo Services",
  "Long Distance Moving",
  "Residential & Commercial",
];

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  serviceType: SERVICE_OPTIONS[0],
  fromLocation: "",
  toLocation: "",
  moveDate: "",
  message: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  function handleChange(e) {
  const { name, value } = e.target;

  setForm((f) => ({
    ...f,
    [name]: value,
  }));
  const fieldErrors = validateForm(name, value);
  setErrors((prev) => ({
    ...prev,
    ...fieldErrors,
    ...(Object.keys(fieldErrors).length === 0 && {
      [name]: "",
    }),
  }));
}
async function handleSubmit(e) {
  e.preventDefault();

  setStatus("loading");
  setErrors({});

  try {
    await submitInquiry(form);
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      if (err.response?.data?.fieldErrors) {
        setErrors(err.response.data.fieldErrors);
      }
    }
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <div className="quote-form-grid">
        <label className="quote-field">
          <span>Full name</span>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
          {errors.fullName && <em className="quote-field-error">{errors.fullName}</em>}
        </label>

        <label className="quote-field">
          <span>Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 00000 00000"
            required
          />
          {errors.phone && <em className="quote-field-error">{errors.phone}</em>}
        </label>

        <label className="quote-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          {errors.email && <em className="quote-field-error">{errors.email}</em>}
        </label>

        <label className="quote-field">
          <span>Service needed</span>
          <select name="serviceType" value={form.serviceType} onChange={handleChange}>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="quote-field">
          <span>Moving from</span>
          <input
            name="fromLocation"
            value={form.fromLocation}
            onChange={handleChange}
            placeholder="City / area"
          />
        </label>

        <label className="quote-field">
          <span>Moving to</span>
          <input
            name="toLocation"
            value={form.toLocation}
            onChange={handleChange}
            placeholder="City / area"
          />
        </label>

        <label className="quote-field">
          <span>Preferred move date</span>
          <input
            type="date"
            name="moveDate"
            value={form.moveDate}
            onChange={handleChange}
          />
        </label>

        <label className="quote-field quote-field-wide">
          <span>Anything else we should know?</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Rough inventory size, floor / lift access, special items, etc."
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary quote-submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request my free quote"}
      </button>

      {status === "success" && (
        <p className="quote-status quote-status-success">
          Thanks! Your request has been received — our team will reach out shortly.
        </p>
      )}
      {status === "error" && (
        <p className="quote-status quote-status-error">
          Something didn't go through. Please check the form or reach us directly on WhatsApp.
        </p>
      )}
    </form>
  );
}
