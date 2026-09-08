import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap a route element with this to require login (and optionally
 * the ADMIN role). Usage in App.jsx:
 *
 *   <Route path="/account" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
 *   <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="route-loading">Loading…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/account" replace />;
  }

  return children;
}
