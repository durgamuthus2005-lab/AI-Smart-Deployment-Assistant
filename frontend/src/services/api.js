import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-smart-deployment-assistant.onrender.com/api",
});

export default api;