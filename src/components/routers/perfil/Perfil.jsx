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
      })
      .catch((err) => console.log(err));
  }
  async function hendleGetPublicacao() {
    await api
      .post(`/publicacao/perfil`, {
        fk_user: id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setPublicacoes(data.data.publicacao);
        setPaginacao(data.data.pagination);
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
    hendleGetPublicacao();
  }, []);
  return (
    <div className="container-perfil">
      <div className=" conteudo-perfil">
        <h1>Perfil</h1>

        {image == undefined || null || image.length == 0 ? (
          <img src={"../../../image/emptyImage.jpg"} alt={""} className="img" />
        ) : (
          <img
            src={`http://localhost:3001/files/users/${image.nome}`}
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
        {paginacao.prev_page && (
          <Link
            to={`/home?page=${Number(page.get("page") - Number(1))}`}
            className="pagePublicacao anterior">
            Publicacão Anteriores
          </Link>
        )}
        <div className="publicacaoPerfil">
          {publicacoes.map((publ) => (
            <div key={publ.id} className="publicacao-perfil">
              <div className="opcoes1">
                <Link
                  to={`/perfil/${publ.Usuario.id}`}
                  className="usernamePerfil">
                  {publ.Usuario.nome}
                </Link>
                {publ.Usuario.id === Number(sessionStorage.getItem("id")) ? (
                  <>
                    <Link to={`/editar/publicacao/perfil/${publ.id}`}>
                      <CiEdit size={"25px"} cursor={"pointer"} color="#fff" />
                    </Link>

                    <UseBtnRemovePerfil
                      pu={publ}
                      id1={id1}
                      publicacoes={publicacoes}
                      setPublicacoes={setPublicacoes}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <p>{publ.publicacao}</p>
              <ProfilePublication id_publicacao={publ.id} publicacao={publ} />
              <div className="opcoes" id="opcoes">
                <LikePublicacao publ={publ} />

                <Comentario publ={publ} id={publ.id} />
              </div>
            </div>
          ))}
          {paginacao.next_page && (
            <Link
              to={`/home?page=${Number(page.get("page")) + Number(1)}`}
              className="pagepublicacao ">
              Próximas Publicacão
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
