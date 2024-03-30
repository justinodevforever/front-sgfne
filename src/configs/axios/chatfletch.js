import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const chatflech = axios.create({
  baseURL: `${url}`,
  headers: {
    "Content-Type": "application/json",
  },
});
