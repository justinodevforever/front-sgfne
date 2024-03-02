import { react, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import "./EditarPublicacaoPerfil.css";
import { api } from "../../../../auth/auth";
import { BiWinkSmile } from "react-icons/bi";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import MenuBack from "../../page/coment/Menu-Back/MenuBack";

const EditarPublicacaoPerfil = () => {
  const [publicacao, setPublicacao] = useState("");
  const [like, setLike] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [isPick, setIsPick] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getPublicacao() {
    await api
      .get(`publicacao/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setPublicacao(data.data.publicacao);
        setLike(data.data.like);
        setFk_user(data.data.fk_user);
      })
      .catch((err) => console.log(err));
  }
  async function hendleSbmit(e) {
    e.preventDefault();

    await api
      .put(`/publicacao/${id}`, {
        publicacao,
        like,
        fk_user,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        navigate(`/perfil/${sessionStorage.getItem("id")}?page=${1}`);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getPublicacao();
  }, []);

  return (
    <>
      <MenuBack />
      <div className="container-EditarPublicacao">
        <div className="conteudo">
          <form onSubmit={(e) => hendleSbmit(e)}>
            <textarea
              defaultValue={publicacao}
              onChange={(e) => {
                setPublicacao(e.target.value);
              }}
            />

            <button type="submit">Confirmar Edição</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPublicacaoPerfil;
