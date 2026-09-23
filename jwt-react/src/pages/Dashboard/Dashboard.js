import React, { useState, useEffect } from "react";
import { apiRequest, getToken } from "../../utils/api";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [adminMessage, setAdminMessage] = useState("");
  const [adminError, setAdminError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest("/user/profile", "GET");
      setProfile(data.user);
    } catch (err) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const testAdminAccess = async () => {
    setAdminMessage("");
    setAdminError("");
    try {
      const data = await apiRequest("/user/admin", "GET");
      setAdminMessage(data.message);
    } catch (err) {
      setAdminError(err.message || "Access denied to admin endpoint.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const token = getToken();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 mb-4">
          <div className="p-4 bg-light rounded-4 shadow-sm border">
            <h2 className="fw-bold text-dark mb-1">👋 User Dashboard</h2>
            <p className="text-muted">
              You are authenticated! This page is protected by JWT Middleware.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Fetching protected user profile...</p>
          </div>
        ) : error ? (
          <div className="col-12">
            <div className="alert alert-danger">{error}</div>
          </div>
        ) : profile ? (
          <>
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold text-primary mb-3">👤 Profile Details</h5>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0">
                      <span className="text-secondary font-monospace">User ID:</span>
                      <span className="fw-bold text-dark">{profile._id}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0">
                      <span className="text-secondary">Name:</span>
                      <span className="fw-bold text-dark">{profile.name}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0">
                      <span className="text-secondary">Email:</span>
                      <span className="fw-bold text-dark">{profile.email}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0">
                      <span className="text-secondary">Role:</span>
                      <span className={`badge ${profile.role === 'admin' ? 'bg-danger' : 'bg-success'} px-3 py-2`}>
                        {profile.role}
                      </span>
                    </li>
                  </ul>
                  <button onClick={fetchProfile} className="btn btn-outline-primary btn-sm rounded-pill">
                    🔄 Refresh Profile
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold text-primary mb-3">🛡️ Test Role Authorization</h5>
                  <p className="text-muted small">
                    Click below to test the <code>/api/user/admin</code> endpoint. Only users registered with role <strong>admin</strong> will be granted access.
                  </p>
                  
                  <button onClick={testAdminAccess} className="btn btn-warning text-dark fw-semibold rounded-pill px-4 mb-3">
                    ⚡ Test Admin Endpoint
                  </button>

                  {adminMessage && (
                    <div className="alert alert-success py-2">{adminMessage}</div>
                  )}
                  {adminError && (
                    <div className="alert alert-danger py-2">{adminError}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold text-primary mb-2">🔑 Your Active JWT Token</h5>
                  <p className="text-muted small mb-3">
                    This token is stored in your browser's <code>localStorage</code> and sent in the <code>Authorization: Bearer</code> header with every request.
                  </p>
                  <div className="p-3 bg-dark text-success rounded-3 font-monospace small text-break">
                    {token}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;