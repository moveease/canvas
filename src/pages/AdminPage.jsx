import { useEffect, useState } from "react";
import {
  fetchAllInquiries,
  fetchAllUsers,
  updateInquiryStatus,
} from "../api/client";
import "./InnerPage.css";
import "./AdminPage.css";

export default function AdminPage() {
  const [tab, setTab] = useState("inquiries");
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [inquiryData, userData] = await Promise.all([
        fetchAllInquiries(),
        fetchAllUsers(),
      ]);

      setInquiries(inquiryData);
      setUsers(userData);
    } catch (err) {
      setError("Couldn't load admin data. Try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await updateInquiryStatus(id, status);

      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === id
            ? {
                ...inq,
                status,
              }
            : inq
        )
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  }

  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <span
            className="eyebrow"
            style={{ color: "var(--gold)" }}
          >
            Admin
          </span>

          <h1>Dashboard</h1>

          <p>
            Quote requests and registered accounts,
            visible to admins only.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="admin-tabs">
            <button
              className={`admin-tab ${
                tab === "inquiries"
                  ? "admin-tab-active"
                  : ""
              }`}
              onClick={() => setTab("inquiries")}
            >
              Inquiries ({inquiries.length})
            </button>

            <button
              className={`admin-tab ${
                tab === "users"
                  ? "admin-tab-active"
                  : ""
              }`}
              onClick={() => setTab("users")}
            >
              Users ({users.length})
            </button>
          </div>

          {loading && (
            <p className="admin-status">
              Loading...
            </p>
          )}

          {error && (
            <p className="admin-status admin-status-error">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            tab === "inquiries" && (
              <div className="admin-table-wrap">
                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Service</th>
                      <th>Route</th>
                      <th>Move Date</th>
                      <th>Status</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>

                  <tbody>

                    {inquiries.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="admin-empty"
                        >
                          No inquiries yet.
                        </td>
                      </tr>
                    )}

                    {inquiries.map((inq) => (

                      <tr key={inq.id}>

                        <td>{inq.fullName}</td>

                        <td>
                          <div>{inq.email}</div>

                          <div className="admin-muted">
                            {inq.phone}
                          </div>
                        </td>

                        <td>
                          {inq.serviceType || "—"}
                        </td>

                        <td>
                          {inq.fromLocation || "—"} →
                          {" "}
                          {inq.toLocation || "—"}
                        </td>

                        <td>
                          {inq.moveDate || "—"}
                        </td>

                        <td>

                          <select
                            className={`status-select status-${inq.status
                              ?.toLowerCase()}`}
                            value={inq.status}
                            onChange={(e) =>
                              handleStatusChange(
                                inq.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="RECEIVED">
                              Received
                            </option>

                            <option value="IN_PROGRESS">
                              In Progress
                            </option>

                            <option value="CONFIRMED">
                              Confirmed
                            </option>

                            <option value="COMPLETED">
                              Completed
                            </option>

                          </select>

                        </td>

                        <td>
                          {inq.createdAt
                            ? new Date(
                                inq.createdAt
                              ).toLocaleString()
                            : "—"}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
              </div>
            )}

          {!loading &&
            !error &&
            tab === "users" && (

              <div className="admin-table-wrap">

                <table className="admin-table">

                  <thead>

                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>

                  </thead>

                  <tbody>

                    {users.length === 0 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="admin-empty"
                        >
                          No users found.
                        </td>
                      </tr>
                    )}

                    {users.map((u) => (

                      <tr key={u.id}>

                        <td>{u.fullName}</td>

                        <td>{u.email}</td>

                        <td>

                          <span
                            className={`role-badge role-${u.role.toLowerCase()}`}
                          >
                            {u.role}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

        </div>
      </section>
    </>
  );
}