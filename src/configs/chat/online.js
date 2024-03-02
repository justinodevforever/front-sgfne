import { api } from "../../../auth/auth";
import { Socket } from "../../socketIO";
import { chatflech } from "../axios/chatfletch";
const socketInstance = Socket();

export function emitSocket() {
  socketInstance.emit("conectar", sessionStorage.getItem("user"));
}

export function getUser(user) {
  console.log(user);
  return user;
}

export async function getUserImage(user) {
  const response = await api.post("/searchuser", {
    nome: user === undefined ? localStorage.getItem("user") : user,
  });

  return response.data[0];
}
