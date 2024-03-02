import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../../auth/auth";
import "./contactChat.css";

const ContactChat = ({ contact }) => {
  const [image, setImage] = useState([]);
  const [imageReceiver, setImageReceiver] = useState([]);
  const [message, setMessage] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    getMensage();
  }, []);

  useEffect(() => {
    async function getImage() {
      await api
        .post("/images/user", {
          fk_user: contact?.Sender?.id,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setImage(data.data[0]);
        })
        .catch((err) => console.log(err));

      await api
        .post("/images/user", {
          fk_user: contact?.Receiver?.id,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setImageReceiver(data.data[0]);
        })
        .catch((err) => console.log(err));
    }
    getImage();
  }, [contact]);

  const getMensage = async () => {
    await api
      .get(`message/order/${contact.id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setMessage(data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-contactChat">
      <div className="conteudoChat">
        {contact?.Sender?.id !== Number(userId) && (
          <div
            className={
              message?.lida === false &&
              Number(message?.sendId) !== Number(sessionStorage.getItem("id"))
                ? " naoLida"
                : "conteudo"
            }>
            <div>
              {image == undefined || null || image.length == 0 ? (
                <Link className="perfil img" to={`/perfil/${userId}`}>
                  <img src={`../../../image/emptyImage.jpg`} alt={""} />
                </Link>
              ) : (
                <Link
                  className="perfil"
                  to={`/perfil/${sessionStorage.getItem("id")}`}>
                  <div className="online"></div>
                  <img
                    src={`http://localhost:3001/files/users/${image.nome}`}
                    alt={""}
                    className="perfil-image"
                  />
                </Link>
              )}
            </div>

            <Link
              to={`/mensagem/${contact?.Sender?.id}?contact=${contact?.id}`}>
              {contact?.Sender?.nome}
              <br />
              {message?.sms && (
                <span className="sms">
                  Mensagem: {message?.sms?.slice(0, 12) + "..."}
                </span>
              )}
            </Link>
          </div>
        )}
        {contact?.Receiver?.id !== Number(userId) && (
          <div
            className={
              message?.lida === false &&
              Number(message?.sendId) !== Number(sessionStorage.getItem("id"))
                ? " naoLida"
                : "conteudo"
            }>
            <div className="received">
              {imageReceiver == undefined ||
              null ||
              imageReceiver.length == 0 ? (
                <Link
                  className="perfil img"
                  to={`/perfil/${sessionStorage.getItem("id")}`}>
                  <img src={`../../../image/emptyImage.jpg`} alt={""} />
                </Link>
              ) : (
                <Link
                  className="perfil"
                  to={`/perfil/${sessionStorage.getItem("id")}`}>
                  <div className="online"></div>
                  <img
                    src={`http://localhost:3001/files/users/${imageReceiver.nome}`}
                    alt={""}
                    className="perfil-image"
                  />
                </Link>
              )}
            </div>
            <Link
              to={`/mensagem/${contact?.Receiver?.id}?contact=${contact?.id}`}>
              {contact?.Receiver?.nome}
              <br />
              {message?.sms && (
                <span className="sms">
                  Mensagem: {message?.sms?.slice(0, 12) + "..."}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactChat;
