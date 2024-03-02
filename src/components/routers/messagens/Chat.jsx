import "./chat.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../respossividade.css";
import { Socket } from "../../../socketIO";
import { api } from "../../../../auth/auth";
import ContactChat from "./contactChat";

const users = [];

function Chat() {
  const [users, setUsers] = useState([]);
  const [socketInstance] = useState(Socket());
  const { userId } = useParams();
  const [use, setUse] = useState(null);

  useEffect(() => {
    socketInstance.on("getMessage", (message) => {});
    setUse({ use: "dd" });
    return () => {
      socketInstance.off("getMessage");
    };
  }, []);

  useEffect(() => {
    hendleGetUsers();
  }, []);
  async function hendleGetUsers() {
    await api
      .get(`/contact/user/${userId}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="container-chat">
        {users.map((u) => (
          <ContactChat contact={u} key={u.id} />
        ))}
      </div>
    </>
  );
}
export default Chat;
