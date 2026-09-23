import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken, getUserInfo } from "../../utils/api";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUserInfo();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary brand-title" to={token ? "/dashboard" : "/login"}>
          🔒 Auth<span className="text-dark">Shield</span> JWT
        </Link>
        <div className="navbar-nav ms-auto align-items-center flex-row gap-3">
          {token ? (
            <>
              <Link className="nav-link fw-semibold" to="/dashboard">
                Dashboard
              </Link>
              {user && (
                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'} px-3 py-2 rounded-pill`}>
                  Role: {user.role}
                </span>
              )}
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary btn-sm rounded-pill px-3" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm rounded-pill px-3 text-white" to="/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
