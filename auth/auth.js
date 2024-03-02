import axios from "axios";

const url = import.meta.env.VITE_VERCEL_URL;

export const api = axios.create({
  baseURL: `${url}`,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiFr = axios.create({
  baseURL: `${url}`,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiMultForm = axios.create({
  baseURL: `${url}`,
  headers: {
    "Content-Type": "multipart/form/data",
  },
});

apiMultForm.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.request.use(async (config) => {
  const id = sessionStorage.getItem("id");
  const token = localStorage.getItem(`token${id}`);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function userAuthicate() {
  const id = sessionStorage.getItem("id");
  if (localStorage.getItem(`token${id}`)) {
    return true;
  }
  return false;
}

export function getToken() {
  const id = sessionStorage.getItem("id");
  return localStorage.getItem(`token${id}`);
}
export async function createHeadr() {
  const id = sessionStorage.getItem("id");
  const token = getToken();
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}
