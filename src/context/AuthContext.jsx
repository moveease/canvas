import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, fetchCurrentUser } from "../api/client";

const AuthContext = createContext(null);
const TOKEN_KEY = "moveease_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a token is already saved, verify it and restore the session.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    fetchCurrentUser()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await loginUser({ email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(fullName, email, password) {
    const data = await registerUser({ fullName, email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
}
