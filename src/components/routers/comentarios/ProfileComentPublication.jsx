import { useEffect, useState } from "react";
import "./profileComentPublication.css";
import { Link } from "react-router-dom";
import { api } from "../../../../auth/auth";

const ProfileComentPublication = ({ idUser }) => {
  const [imageUser, setImageUser] = useState(null);
  const url = import.meta.env.VITE_API_URL_SOCKET;

  useEffect(() => {
    getImageUser();
  }, []);
  const getImageUser = async () => {
    await api
      .post("/images/user", {
        fk_user: idUser,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setImageUser(data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='profileComentPublication'>
      {imageUser == undefined || null || imageUser.length == 0 ? (
        <Link
          className='perfil img'
          to={`/perfil/${sessionStorage.getItem("id")}`}>
          <img src={`../../../image/emptyImage.jpg`} alt={""} />
        </Link>
      ) : (
        <div>
          <Link
            className='perfil'
            to={`/perfil/${sessionStorage.getItem("id")}`}>
            <div className='online'></div>
            <img
              src={`${url}/files/users/${image?.nome}`}
              alt={""}
              className='perfil-image'
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileComentPublication;
