import axios from "axios";

const api = axios.create({
  baseURL: "https://paradigmas-back.herokuapp.com",
});

export default api;