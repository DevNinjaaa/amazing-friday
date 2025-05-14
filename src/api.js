import axios from "axios";

const API_URL = "http://localhost:5112";

export const registerUser = async (userData) =>
  axios.post(`${API_URL}/register`, userData);
export const loginUser = async (userData) =>
  axios.post(`${API_URL}/login`, userData);
export const getProfile = async (token) =>
  axios.get(`${API_URL}/profile`, { headers: { Authorization: token } });
