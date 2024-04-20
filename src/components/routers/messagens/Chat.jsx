import "./chat.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../respossividade.css";
import { Socket } from "../../../socketIO";
import { api } from "../../../../auth/auth";
import ContactChat from "./contactChat";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";

const users = [];

function Chat() {
  const [users, setUsers] = useState([]);
  const [socketInstance] = useState(Socket());
  const { userId } = useParams();
  const [use, setUse] = useState(null);
  const [secretario, setSecretario] = useState({});
  const [admin, setAdmin] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    socketInstance.on("getMessage", (message) => {});
    setUse({ use: "dd" });
    return () => {
      socketInstance.off("getMessage");
    };
  }, []);

  useEffect(() => {
    setIsLoad(true);
    hendleGetUsers();
    hendlefindContact();
    hendleGetPermissionUserChat();
  }, []);
  async function hendlefindContact() {
    await api
      .get(`/contact/user/${userId}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }
  async function hendleGetUsers() {
    await api
      .get(`/contact/user/${userId}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setUsers(data.data);
        setId(data.data.id);
      })
      .catch((err) => console.log(err));
  }
  async function hendleGetPermissionUserChat() {
    await api
      .get(`/permissaousuariochat`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        const admini = data.data.filter(
          (user) => user.permission.permissao == "admin"
        );

        setAdmin(admini);
        const secre = data.data.filter(
          (user) => user.permission.permissao == "secretário"
        );
        setSecretario(secre);
        setIsLoad(false);
      })
      .catch((err) => console.log(err));
  }
  async function hendleCreateContactUSerSecretario(e) {
    e.preventDefault();
    await api
      .post(`/contact/user`, {
        receiveId: secretario[0].user.id,
        sendId: userId,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        navigate(`/dashboard/mensage/${data.data.response.id}`);
      })
      .catch((err) => console.log(err));
  }
  async function hendleCreateContactUSerAdmin(e) {
    e.preventDefault();
    await api
      .post(`/contact/user`, {
        receiveId: admin[0].user.id,
        sendId: userId,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        navigate(`/mensage/${data.data?.id}`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className='container-chat'>
        {users?.length === 0 && (
          <div
            className='admincon'
            style={{
              display: "flex",
              width: "100%",
              margin: "auto",
              marginTop: "20px",
              gap: "20px",
              height: "40px",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div className='secretario'>
              <Skeleton active loading={isLoad}>
                <Button
                  onClick={(e) => hendleCreateContactUSerSecretario(e)}
                  style={{
                    display: "flex",
                    background: "#a31543",
                    borderRadius: "10px",
                    color: "#fff",
                    padding: "10px",
                    alignItems: "center",
                  }}
                  title='Contactar a Secretária'
                  icon={<MessageOutlined />}>
                  Secretaria
                </Button>
              </Skeleton>
            </div>
            <div className='admin'>
              <Skeleton loading={isLoad} active>
                <Button
                  onClick={(e) => hendleCreateContactUSerAdmin(e)}
                  style={{
                    display: "flex",
                    background: "#a31543",
                    borderRadius: "10px",
                    color: "#fff",
                    padding: "10px",
                    alignItems: "center",
                  }}
                  title='Contactar a Finança'
                  icon={<MessageOutlined />}>
                  Finança
                </Button>
              </Skeleton>
            </div>
          </div>
        )}
        {users?.map((u) => (
          <ContactChat contact={u} key={u?.id} />
        ))}
      </div>
    </>
  );
}
export default Chat;
