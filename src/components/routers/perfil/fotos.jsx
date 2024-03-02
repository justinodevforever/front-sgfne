import { useEffect, useState } from "react";
import "./fotos.css";
import { useParams } from "react-router-dom";
import { api } from "../../../../auth/auth";

function Fotos() {
  const [image, setImage] = useState([]);
  const params = useParams();
  const { id } = params;

  async function hendleGetImage() {
    await api
      .post("/images/user", {
        fk_user: id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setImage(data.data);
      })
      .catch((err) => console.log(err));
  }

  async function hendleDelete(id) {
    await api
      .delete(`/removeimage/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data) {
          setImage(image.filter((image) => image.id !== id));
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    hendleGetImage();
  }, []);

  return (
    <div className="container-fotos">
      <div className="conteudo-fotos">
        {image.map((image) => (
          <div className="image" key={image.id}>
            {image == undefined || null || image.length == 0 ? (
              <div></div>
            ) : (
              <img
                src={`http://localhost:3001/files/users/${image.nome}`}
                className="foto"
              />
            )}

            {image.Usuario.nome !== sessionStorage.getItem("user") ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  hendleDelete(image.id);
                }}>
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fotos;
