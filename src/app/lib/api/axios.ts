import axios from "axios";

export const apiUrl = "http://localhost:3000";

export const appURL = "http://localhost:3000";

export const api = axios.create({
  baseURL: apiUrl,
});
