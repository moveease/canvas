import axios from "axios";

// In local dev, Vite reads VITE_API_URL from frontend/.env
// In production, set VITE_API_URL at build time to your hosted backend URL.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function submitInquiry(payload) {
  const { data } = await api.post("/inquiries", payload);
  return data;
}

export async function fetchServices() {
  const { data } = await api.get("/services");
  return data;
}
