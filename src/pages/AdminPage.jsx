import { useEffect, useState } from "react";
import {
  fetchAllInquiries,
  fetchAllUsers,
  updateInquiryStatus,
  updateInquiryQuote,
} from "../api/client";
import "./InnerPage.css";
import "./AdminPage.css";

function QuoteCell({ inquiry, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(inquiry.quote?.quote || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValue(inquiry.quote?.quote || "");
  }, [inquiry.quote?.quote]);

  async function handleSave() {
    const trimmed = value.trim();

    if (trimmed === (inquiry.quote?.quote || "")) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      await onSave(inquiry.id, trimmed);
      setEditing(false);
    } catch (err) {
      alert("Failed to update quote.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setValue(inquiry.quote?.quote || "");
    setEditing(false);
  }

  if (editing) {
    return (
      <td>
        <input
          type="text"
          className="quote-input"
          value={value}
          autoFocus
          disabled={saving}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
            if (e.key === "Escape") handleCancel();
          }}
        />
      </td>
    );
  }

  return (
    <td
      className="quote-cell"
      onClick={() => setEditing(true)}
      title="Click to edit quote"
    >
      {inquiry.quote?.quote || "—"}
    </td>
  );
}

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

  async function handleQuoteSave(id, quoteValue) {
    const updated = await updateInquiryQuote(id, quoteValue);

    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? updated : inq))
    );
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
                      <th>Quote</th>
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

                        <QuoteCell
                          inquiry={inq}
                          onSave={handleQuoteSave}
                        />

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