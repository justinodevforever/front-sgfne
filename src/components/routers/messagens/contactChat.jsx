import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../../auth/auth";
import "./contactChat.css";
import { Skeleton } from "antd";

const ContactChat = ({ contact }) => {
  const [image, setImage] = useState([]);
  const [imageReceiver, setImageReceiver] = useState([]);
  const [message, setMessage] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const { userId } = useParams();
  const url = import.meta.env.VITE_API_URL_SOCKET;

  useEffect(() => {
    if (contact) {
      setIsLoad(true);
      getMensage();
    }
  }, []);

  useEffect(() => {
    async function getImage() {
      await api
        .post("/images/user", {
          fk_user: contact?.sender?.id,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setImage(data.data[0]);
          setIsLoad(false);
        })
        .catch((err) => console.log(err));

      await api
        .post("/images/user", {
          fk_user: contact?.receiver?.id,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setImageReceiver(data.data[0]);
          setIsLoad(false);
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
    <Skeleton
      active
      loading={isLoad}
      avatar={{ shape: "circle" }}
      paragraph={{ rows: 4 }}>
      <div className='container-contactChat'>
        <div className='conteudoChat'>
          {message?.conactUSaer?.sender?.id !== userId && (
            <div
              className={
                message?.lida === false &&
                message?.sendId !== sessionStorage.getItem("id")
                  ? " naoLida"
                  : "conteudo"
              }>
              <div>
                {image == undefined || null || image.length == 0 ? (
                  <Link className='perfil img' to={`/perfil/${userId}`}>
                    <img src={`../../../image/emptyImage.jpg`} alt={""} />
                  </Link>
                ) : (
                  <Link
                    className='perfil'
                    to={`/perfil/${sessionStorage.getItem("id")}`}>
                    <div className='online'></div>
                    <img
                      src={`${url}/files/users/${image.nome}`}
                      alt={""}
                      className='perfil-image'
                    />
                  </Link>
                )}
              </div>

              <Link
                to={`/main/mensagem/${message?.conactUSaer?.sender?.id}?contact=${message?.conactUSaer?.id}&sms=${message?.id}`}>
                {message?.conactUSaer?.sender?.nome}
                <br />
                {message?.sms && (
                  <span className='sms'>
                    Mensagem: {message?.sms?.slice(0, 12) + "..."}
                  </span>
                )}
              </Link>
            </div>
          )}
          {message?.conactUSaer?.receiver?.id !== userId && (
            <div
              className={
                message?.lida === false &&
                message?.sendId !== sessionStorage.getItem("id")
                  ? " naoLida"
                  : "conteudo"
              }>
              <div className='received'>
                {imageReceiver == undefined ||
                null ||
                imageReceiver.length == 0 ? (
                  <Link
                    className='perfil img'
                    to={`/perfil/${sessionStorage.getItem("id")}`}>
                    <img src={`../../../image/emptyImage.jpg`} alt={""} />
                  </Link>
                ) : (
                  <Link
                    className='perfil'
                    to={`/perfil/${sessionStorage.getItem("id")}`}>
                    <div className='online'></div>
                    <img
                      src={`${url}/files/users/${imageReceiver?.nome}`}
                      alt={""}
                      className='perfil-image'
                    />
                  </Link>
                )}
              </div>
              <Link
                to={`/main/mensagem/${message?.conactUSaer?.receiver?.id}?contact=${message?.conactUSaer?.id}&sms=${message?.id}`}>
                {message?.conactUSaer?.receiver?.nome}
                <br />
                {message?.sms && (
                  <span className='sms'>
                    Mensagem: {message?.sms?.slice(0, 12) + "..."}
                  </span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </Skeleton>
  );
};

export default ContactChat;
