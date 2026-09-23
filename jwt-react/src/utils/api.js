const API_BASE_URL = "http://localhost:5000/api";

// Token helpers
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setUserInfo = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserInfo = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// API Fetch wrapper with Authorization Header
export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};
