import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Authentication APIs
export const loginUserAPI = (userData) => api.post("/auth/login", userData);
export const registerUserAPI = (userData) => api.post("/auth/register", userData);

// Product APIs
export const fetchProductsAPI = () => api.get("/products");

// Cart APIs
export const fetchCartAPI = (token) =>
  api.get("/cart", { headers: { Authorization: `Bearer ${token}` } });

export const addToCartAPI = (productId, token) =>
  api.post("/cart/add", { productId }, { headers: { Authorization: `Bearer ${token}` } });

// Order APIs
export const fetchOrdersAPI = (token) =>
  api.get("/order", { headers: { Authorization: `Bearer ${token}` } });

export const placeOrderAPI = (token) =>
  api.post("/order/place", {}, { headers: { Authorization: `Bearer ${token}` } });
