import "./chat.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../respossividade.css";
import { Socket } from "../../../socketIO";
import { api } from "../../../../auth/auth";
import ContactChat from "./contactChat";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import PegarPermissoes from "../../../configs/permissoes/PegarPermissoes";

const users = [];

function Chat() {
  const [users, setUsers] = useState([]);
  const [socketInstance] = useState(Socket());
  const { userId } = useParams();
  const [use, setUse] = useState(null);
  const [secretario, setSecretario] = useState({});
  const [admin, setAdmin] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSec, setIsSec] = useState(false);
  const [id, setId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [secId, setSecId] = useState("");

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

  async function hendleGetUsers() {
    await api
      .get(`/contact/user/${userId}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setUsers(data.data);
        setId(data.data?.id);
      })
      .catch((err) => console.log(err));
  }
  async function hendleGetPermissionUserChat() {
    await api
      .get(`/permissaousuariochat`)
      .then(async (data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        const admini = data.data?.filter(
          (user) => user?.permission?.permissao == "admin"
        );

        setAdmin(admini);
        const secre = data.data?.filter(
          (user) => user?.permission?.permissao == "secretário"
        );
        setSecretario(secre);

        const userSec = await api.post("/contact/usersec/", {
          adminId: secre[0].user.id,
          userId,
        });
        if (userSec.data) {
          setSecId(userSec.data?.id);
          setIsSec(true);
        }

        const user = await api.post("/contact/useradmin/", {
          adminId: admini[0].user.id,
          userId,
        });
        if (user.data) {
          setAdminId(user.data?.id);
          setIsAdmin(true);
        }

        setIsLoad(false);
      })
      .catch((err) => console.log(err));
  }

  async function hendleCreateContactUSerSecretario(e) {
    e.preventDefault();
    if (isSec)
      return navigate(
        `/main/mensagem/${secretario[0]?.fk_user}?contact=${secId}`
      );

    await api
      .post(`/contact/user`, {
        receiveId: secretario[0]?.user?.id,
        sendId: userId,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        navigate(
          `/main/mensagem/${secretario[0]?.user?.id}?contact=${data.data?.response?.id}`
        );
      })
      .catch((err) => console.log(err));
  }
  async function hendleCreateContactUSerAdmin(e) {
    e.preventDefault();

    if (isAdmin)
      return navigate(`/main/mensagem/${admin[0].fk_user}?contact=${adminId}`);

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
        navigate(
          `/main/mensagem/${admin[0].user.id}?contact=${data.data?.response?.id}`
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className='container-chat'>
        {secretario[0]?.fk_user !== sessionStorage.getItem("id") && (
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
        )}
        {admin[0]?.fk_user !== sessionStorage.getItem("id") && (
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
        )}

        <PegarPermissoes permissoes={["admin", "secretário"]}>
          {users.length > 0 &&
            users?.map((u) => <ContactChat contact={u} key={u?.id} />)}
        </PegarPermissoes>
      </div>
    </>
  );
}
export default Chat;
