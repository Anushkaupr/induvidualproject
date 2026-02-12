import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/api/users", // Your backend URL
});

// Attach token automatically (if you are using JWT auth)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ================== Auth Endpoints ==================
export const loginApi = (data) => API.post("/login", data);
export const registerApi = (data) => API.post("/register", data);

// ================== User Endpoints ==================
// Get logged-in user
export const getMe = () => API.get("/getMe");

// Get all users
export const getAllUserApi = () => API.get("/getAllUser");

// Get a user by ID
export const getUserById = (id) => API.get(`/${id}`);

// Update a user by ID
export const updateUserById = (id, data) => API.put(`/update/${id}`, data);

// ================== Income Endpoints ==================


// Delete a user by ID
export const deleteUserById = (id) => API.delete(`/delete/${id}`);

export const createSavingApi = (data) => API.post("/savings", data);
export const getSavingsApi = () => API.get("/savings");
export const updateSavingApi = (id, data) => API.put(`/savings/${id}`, data);
export const deleteSavingApi = (id) => API.delete(`/savings/${id}`);




