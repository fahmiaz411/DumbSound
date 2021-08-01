import axios from "axios";

export const API = axios.create({
  baseURL:
    "http://192.168.43.199:5002/api/v1/" || "http://localhost:5002/api/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const baseURL = "http://192.168.43.199:5002/data";
