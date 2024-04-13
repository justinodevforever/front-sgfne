import { useEffect, useState } from "react";
import "./perfil.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../auth/auth";
import ContactoUsuario from "../contactoUsuario/ContactoUsuario";
import BtnMenu from "../anuncios/menu/BtnMenu";
import LikePublicacao from "../anuncios/likes/Like";
import Comentario from "../comentarios/Comentario";
import { ProfilePublication } from "../anuncios/ProfilePublication";
import UseBtnRemovePerfil from "./btnDelete/UseBtnDelete";
import { CiEdit } from "react-icons/ci";

let clicou = false;
let id1;

export const deletePublicacaoPerfil = async (id) => {
  const navigate = useNavigate();
  clicou = true;
  id1 = id;
  await api
    .delete(`/publicacao/${id}`)
    .then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
    })
    .catch((err) => console.log(err));
};

function Perfil() {
  const navigate = useNavigate();
  const [nome, setNome] = useState();
  const [image, setImage] = useState([]);
  const [user, setUser] = useState([]);
  const [publicacoes, setPublicacoes] = useState([]);
  const [email, setEmail] = useState("");
  const [paginacao, setPaginacao] = useState({});
  const params = useParams();
  const { id } = params;
  const url = import.meta.env.VITE_API_URL_SOCKET;

  async function hendleGetUser() {
    await api
      .get(`/user/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setUser(data.data);
        setEmail(data.data.email);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }

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

        setImage(data.data[0]);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setPublicacoes(publicacoes.filter((pub) => pub.id !== id1));
    clicou = false;
  }, [clicou]);

  useEffect(() => {
    hendleGetUser();
    hendleGetImage();
  }, []);
  return (
    <div className="container-perfil">
      <div className=" conteudo-perfil">
        <h1>Perfil</h1>

        {image == undefined || null || image.length == 0 ? (
          <img src={"../../../image/emptyImage.jpg"} alt={""} className="img" />
        ) : (
          <img
            src={`${url}/files/users/${image.nome}`}
            alt={""}
            className="img"
          />
        )}
        <ContactoUsuario userId={id} />
        {user.id == Number(sessionStorage.getItem("id")) ? (
          <Link to={"/fotoperfil"} className="linkes">
            Trocar foto do perfil
          </Link>
        ) : (
          <div></div>
        )}
        <Link to={`/fotos/${id}`} className="linkes">
          Fotos
        </Link>
        <Link to={`/chat/${sessionStorage.getItem("id")}`} className="linkes">
          Seguidores
        </Link>

        <div className="dados-perfil">
          <span>Nome: {user.nome}</span>
          <br />
          <span>curso: {user.curso}</span>
          <br />
          <span>email: {user.email}</span>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Perfil;
