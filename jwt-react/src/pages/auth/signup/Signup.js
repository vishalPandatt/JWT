import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../../../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest("/auth/signup", "POST", formData);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <div className="card-body">
              <h3 className="card-title text-center fw-bold text-dark mb-1">Create Account</h3>
              <p className="text-center text-muted small mb-4">
                Signup to get started with JWT Authentication
              </p>

              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && <div className="alert alert-success py-2">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium text-secondary">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-3"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-secondary">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-3"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-secondary">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-3"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium text-secondary">Select Role</label>
                  <select
                    name="role"
                    className="form-select rounded-3"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="customer">Customer (User)</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100 py-2 rounded-3 text-white fw-semibold mb-3"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              <div className="text-center">
                <span className="text-muted small">Already have an account? </span>
                <Link to="/login" className="text-decoration-none fw-semibold">
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
