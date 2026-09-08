import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./InnerPage.css";
import "./UserPage.css";
import { fetchInquiriesByEmail } from "../api/client";

const STATUS_LABELS = {
  RECEIVED: "Received",
  IN_PROGRESS: "In Progress",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
};

function formatStatus(status) {
  return STATUS_LABELS[status] || status || "—";
}

export default function UserPage() {
  const { user, logout } = useAuth();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInquiries() {
      try {
        const data = await fetchInquiriesByEmail(user.email);

        // API returns user object with inquiries
        setInquiries(data.inquiries || []);
      } catch (error) {
        console.error("Unable to load inquiries", error);
      } finally {
        setLoading(false);
      }
    }

    if (user?.email) {
      loadInquiries();
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            Your account
          </span>

          <h1>Hi, {user.fullName.split(" ")[0]}.</h1>

          <p>Manage your MoveEase account details below.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Existing User Profile Card */}
          <div className="profile-card">
            <h2>Profile Details</h2>

            <div className="profile-row">
              <span className="profile-label">Full name</span>

              <span className="profile-value">{user.fullName}</span>
            </div>

            <div className="profile-row">
              <span className="profile-label">Email</span>

              <span className="profile-value">{user.email}</span>
            </div>

            <div className="profile-row">
              <span className="profile-label">Account type</span>

              <span className="profile-value">
                <span className={`role-badge role-${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </span>
            </div>

            <button className="btn btn-dark profile-logout" onClick={logout}>
              Log out
            </button>
          </div>

          {/* New Inquiry Section */}
          <div className="inquiry-wrapper">
            <h2>Your Moving Requests</h2>

            {loading ? (
              <p>Loading requests...</p>
            ) : inquiries.length === 0 ? (
              <div className="empty-card">No moving requests found.</div>
            ) : (
              <div className="inquiry-grid">
                {inquiries.map((item) => (
                  <div className="inquiry-card" key={item.id}>
                    <div className="inquiry-card-head">
                      <h3>{item.serviceType}</h3>
                      <span className={`status-badge status-${item.status?.toLowerCase()}`}>
                        {formatStatus(item.status)}
                      </span>
                    </div>

                    <p>
                      <strong>From:</strong> {item.fromLocation}
                    </p>

                    <p>
                      <strong>To:</strong> {item.toLocation}
                    </p>

                    <p>
                      <strong>Move date:</strong> {item.moveDate}
                    </p>

                    <p>
                      <strong>Message:</strong> {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
