import { Link } from "react-router-dom";
import { api } from "../../../../auth/auth";
import { useEffect, useState } from "react";
import "./contactoUsuario.css";

const ContactoUsuario = ({ userId }) => {
  const [user, setUser] = useState({});
  const [isContact, setIsContact] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [existUser, setExistUSer] = useState(false);

  const id = sessionStorage.getItem("id");

  useEffect(() => {
    getContactoUsuario();
  }, [isContact]);
  const hendleContactoUsuario = async (e) => {
    e.preventDefault();
    await api
      .post("/contact/user", {
        sendId: id,
        receiveId: userId,
        seguir: true,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })
      .catch((err) => console.log(err));
    setIsContact(true);
  };

  const getContactoUsuario = async () => {
    await api
      .post(`/contact/users/specific`, {
        contactId: userId,
        userId: id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setUser(data.data);
        if (data.data !== undefined || data.data !== null) {
          setExistUSer(true);
        }
        if (Number(userId) !== Number(id)) {
          setIsUser(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const hendleRemover = async (e, id) => {
    e.preventDefault();
    await api
      .delete(`/contact/user/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setIsContact(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-contactoUsuario">
      {user === null || user === undefined ? (
        <div>
          {Number(userId) !== Number(id) ? (
            <Link
              onClick={(e) => {
                hendleContactoUsuario(e);
              }}>
              Seguir
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          <Link onClick={(e) => hendleRemover(e, user.id)}>Não Seguir</Link>
        </div>
      )}
    </div>
  );
};

export default ContactoUsuario;
