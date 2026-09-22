import axios from "axios";

// In local dev, Vite reads VITE_API_URL from canvas/.env
// In production, set VITE_API_URL at build time to your hosted backend URL.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("moveease_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function submitInquiry(payload) {
  const { data } = await api.post("/inquiries", payload);
  return data;
}
//--user--
export async function fetchInquiriesByEmail(email) {
  const { data } = await api.get(`/users/${encodeURIComponent(email)}`);
  return data;
}
export async function getInquiry(payload) {
  const { data } = await api.get("/inquiries", payload);
  return data;
}

export async function fetchServices() {
  const { data } = await api.get("/services");
  return data;
}

// ---- Auth ----
export async function registerUser(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}

// ---- Admin ----
export async function fetchAllInquiries() {
  const { data } = await api.get("/admin/inquiries");
  return data;
}

export async function fetchAllUsers() {
  const { data } = await api.get("/admin/users");
  return data;
}

export async function updateInquiryStatus(id, status) {
  const { data } = await api.patch(
    `/admin/inquiries/${id}/status`,
    { status }
  );

  return data;
}
export async function updateInquiryQuote(id, quoteValue) {
  const { data } = await api.post(`/admin/inquiries/${id}/quote`, {
    quote: { quote: quoteValue },
  });

  return data;
}