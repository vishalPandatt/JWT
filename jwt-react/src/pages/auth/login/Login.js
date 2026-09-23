import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, setToken, setUserInfo } from "../../../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", "POST", formData);
      // Store token and user information in local storage
      setToken(data.token);
      setUserInfo(data.user);
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials.");
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
              <h3 className="card-title text-center fw-bold text-dark mb-1">Welcome Back</h3>
              <p className="text-center text-muted small mb-4">
                Login with your email and password
              </p>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleSubmit}>
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

                <div className="mb-4">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100 py-2 rounded-3 text-white fw-semibold mb-3"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="text-center">
                <span className="text-muted small">Don't have an account? </span>
                <Link to="/register" className="text-decoration-none fw-semibold">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;