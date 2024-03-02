import { io } from "socket.io-client";
const url = import.meta.env.VITE_API_URL_SOCKET;
export const Socket = () => io(`${url}`);
