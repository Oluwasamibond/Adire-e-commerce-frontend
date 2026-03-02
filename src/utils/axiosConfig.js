import axios from "axios";

const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: "http://localhost:8000/api", // your backend
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default API;