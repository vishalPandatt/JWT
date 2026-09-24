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

// API Fetch wrapper with Authorization Header & clear error handling
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

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError" && (error.message.includes("fetch") || error.message.includes("NetworkError"))) {
      throw new Error("Cannot connect to Backend server! Please make sure 'npm start' is running in the main project folder on port 5000.");
    }
    throw error;
  }
};
