import { useEffect, useRef, useState } from "react";
import NavBar from "../../navbar/navbar";
import "./notificacao.css";
import { Socket } from "../../../socketIO";
import { chatflech } from "../../../configs/axios/chatfletch";
import { io } from "socket.io-client";
import { api } from "../../../../auth/auth";

export default function () {
  const [notify, setNotify] = useState([]);
  const socketInstance = useRef();
  useEffect(() => {
    socketInstance.current = io("http://localhost:3001");
  }, []);

  function socketIO() {
    socketInstance.current.on("notify", async (data) => {
      await api
        .post("/notify", {
          nome: data.nome,
          massege: data.massege,
          idpublicacao: data.idPublicacao,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }
        })
        .catch((err) => console.log(err));
    });
  }

  useEffect(() => {
    socketIO();
  }, []);
  useEffect(() => {
    const getNotify = async () => {
      const { data } = await api.get("/notify");
      setNotify(data);
    };
    getNotify();
  }, []);
  return (
    <>
      <NavBar />
      <div className="containar-notify">
        <h2>Notifição</h2>

        {notify.map((no) => (
          <div key={no.id} className="notify">
            <span>{no.massege}</span>
          </div>
        ))}
      </div>
    </>
  );
}
