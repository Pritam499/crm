// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  withCredentials: true,
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const auth = {
  sendOtp: data => API.post("/auth/send-otp", data),
  verifyOtp: data => API.post("/auth/verify-otp", data),
  resendOtp: data => API.post("/auth/resend-otp", data),
  logout: () => API.post("/auth/logout"),
  me: () => API.get("/auth/me"),
};

export const leads = {
  fetchAll:  ()            => API.get("/leads"),
  fetchById: id            => API.get(`/leads/${id}`),
  create:    data          => API.post("/leads", data),
  update:    (id, data)    => API.put(`/leads/${id}`, data),
  delete:    id            => API.delete(`/leads/${id}`),
};

export const contacts = {
  fetchAll:  ()            => API.get("/contacts"),
  fetchById: id            => API.get(`/contacts/${id}`),
  create:    data          => API.post("/contacts", data),
  update:    (id, data)    => API.put(`/contacts/${id}`, data),
  delete:    id            => API.delete(`/contacts/${id}`),
};

export const accounts = {
  fetchAll:  ()            => API.get("/accounts"),
  fetchById: id            => API.get(`/accounts/${id}`),
  create:    data          => API.post("/accounts", data),
  update:    (id, data)    => API.put(`/accounts/${id}`, data),
  delete:    id            => API.delete(`/accounts/${id}`),
};

export const opportunities = {
  fetchAll:  ()            => API.get("/opportunities"),
  fetchById: id            => API.get(`/opportunities/${id}`),
  create:    data          => API.post("/opportunities", data),
  update:    (id, data)    => API.put(`/opportunities/${id}`, data),
  delete:    id            => API.delete(`/opportunities/${id}`),
};


export const tasks = {
  fetchAll:  ()            => API.get("/tasks"),
  fetchById: id            => API.get(`/tasks/${id}`),
  create:    data          => API.post("/tasks", data),
  update:    (id, data)    => API.put(`/tasks/${id}`, data),
  delete:    id            => API.delete(`/tasks/${id}`),
};

export const notes = {
  fetchAll:  ()            => API.get("/notes"),
  fetchById: id            => API.get(`/notes/${id}`),
  create:    data          => API.post("/notes", data),
  update:    (id, data)    => API.put(`/notes/${id}`, data),
  delete:    id            => API.delete(`/notes/${id}`),
};

export const activities = {
  fetchAll:  ()            => API.get("/activities"),
  fetchById: id            => API.get(`/activities/${id}`),
  create:    data          => API.post("/activities", data),
  update:    (id, data)    => API.put(`/activities/${id}`, data),
  delete:    id            => API.delete(`/activities/${id}`),
};

export const reports = {
  fetchAll:  ()            => API.get("/reports"),
  fetchById: id            => API.get(`/reports/${id}`),
  create:    data          => API.post("/reports", data),
  update:    (id, data)    => API.put(`/reports/${id}`, data),
  delete:    id            => API.delete(`/reports/${id}`),
};

export default API;
