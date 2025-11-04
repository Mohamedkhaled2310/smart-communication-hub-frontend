import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-communication-hub-backend-production.up.railway.app",
  withCredentials: true,
});

export default api;
