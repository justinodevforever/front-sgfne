import { useEffect, useRef, useState } from "react";
import "./publicacao.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../respossividade.css";
import Comentario from "../comentarios/Comentario";
import BtnMenu from "./menu/BtnMenu";
import { api, apiFr } from "../../../../auth/auth";
import { io } from "socket.io-client";
import LikePublicacao from "./likes/Like";
import { ProfilePublication } from "./ProfilePublication";
import Modal from "./modal/Modal";
import PegarRoles from "../../../configs/roles/Roles";

let clicou = false;
let id1;
export const deletePublicacao = async (id) => {
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
const Publicacao = ({ mostrar }) => {
  const navigate = useNavigate();

  const [publicacao, setPublicacao] = useState([]);
  const [roles, setRoles] = useState([]);
  const [nome, setNome] = useState("");
  const [verComentarios, setVerComentario] = useState(false);
  const [isImage, setIsImage] = useState(false);
  let btn = document.querySelector("#btnpublicacao");
  const [page] = useSearchParams();
  const socketInstance = useRef();
  const [paginacao, setPaginacao] = useState({});
  const [token, setToken] = useState({});
  const { id } = useParams();
  const idPublicacao = id;
  const idUser = sessionStorage.getItem("id");
  const url = import.meta.env.VITE_API_URL_SOCKET;

  useEffect(() => {
    socketInstance.current = io(`${url}`);
    socketInstance.current.emit("connectedPublication", idPublicacao);
  }, []);

  useEffect(() => {
    if (clicou) {
      setPublicacao(publicacao.filter((publ) => publ?.id != id1));
      clicou = false;
    }
  }, [clicou === true]);

  async function getPublicacao() {
    await api
      .get(`/publicacao?page=${page.get("page") || 1}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setPaginacao(data.data?.pagination);
        setPublicacao(data.data?.publicacao);
      })
      .catch((err) => console.log(err));
  }
  async function getUser() {
    await api
      .get(`/user/${idUser}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setRoles(data.data.UsuarioRoles);
      })
      .catch((err) => console.log(err));
    // data.UsuarioRoles.map((role) => {
    //   setRoles(role);
    // });
  }

  useEffect(() => {
    getPublicacao();
    setNome(sessionStorage.getItem("user"));
    getUser();
  }, [page.get("page") || token, isImage]);

  return (
    <>
      <Modal />

      <div className="container-publicacao1">
        <PegarRoles roles={"admin"}>
          <div>
            {!mostrar && (
              <div className="div-publicar">
                <Link
                  className="publicar"
                  name="publicacao"
                  id="publicacao"
                  to={"/publicar"}>
                  Comunicar
                </Link>
              </div>
            )}
          </div>
        </PegarRoles>

        {/* */}

        {paginacao?.prev_page && (
          <Link
            to={`/home?page=${Number(page.get("page") - Number(1))}`}
            className="pagePublicacao anterior">
            Publicacão Anteriores
          </Link>
        )}
        <div className="container-publicacao">
          {publicacao.map((publ) => (
            <div className="container-conteudo" key={publ?.id}>
              <div className="publicacao" id="publicacao">
                <div className="opcoesBarra">
                  <Link to={`/perfil/${publ?.Usuario.id}`} className="username">
                    {publ?.Usuario.nome}
                  </Link>
                  {publ?.Usuario.nome === sessionStorage.getItem("user") ? (
                    <BtnMenu id={publ?.id} nameUser={publ?.Usuario.nome} />
                  ) : (
                    <section></section>
                  )}
                </div>

                <ProfilePublication
                  id_publicacao={publ?.id}
                  setIsImage={setIsImage}
                  isImage={isImage}
                  publicacao={publ}
                />

                <div className="opcoes" id="opcoes">
                  <LikePublicacao publ={publ} />

                  <Comentario publ={publ} id={publ?.id} verC={verComentarios} />
                </div>
              </div>
            </div>
          ))}
          {paginacao?.next_page && (
            <Link
              to={`/home?page=${Number(page.get("page")) + Number(1)}`}
              className="pagepublicacao ">
              Próximas Publicacão
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Publicacao;
