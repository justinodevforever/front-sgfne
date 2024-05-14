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
import PegarPermissoes from "../../../configs/permissoes/PegarPermissoes";
import Ispm from "../hook/Ispm";
import { Skeleton } from "antd";

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
const Publicacao = () => {
  const navigate = useNavigate();

  const [publicacao, setPublicacao] = useState([]);
  const [roles, setRoles] = useState([]);
  const [nome, setNome] = useState("");
  const [verComentarios, setVerComentario] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isClic, setIsClic] = useState(false);
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
    setIsClic(true);
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
      .get("/publicacao")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setIsClic(false);
        setPublicacao(data.data);
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

        setRoles(data.data?.usuarioRoles);
      })
      .catch((err) => console.log(err));
    // data.usuarioRoles?.map((role) => {
    //   setRoles(role);
    // });
  }

  useEffect(() => {
    setNome(sessionStorage.getItem("user"));
    getUser();
  }, []);
  useEffect(() => {
    getPublicacao();
  }, []);

  return (
    <>
      <Modal />
      <div className='container-publicacao1'>
        <PegarPermissoes permissoes={["admin"]}>
          <div>
            <div className='div-publicar'>
              <Link
                className='publicar'
                name='publicacao'
                id='publicacao'
                to={"/publicar"}>
                Comunicar
              </Link>
            </div>
          </div>
        </PegarPermissoes>

        <div className='container-publicacao'>
          {publicacao.map((publ) => (
            <Skeleton
              loading={isClic}
              key={publ?.id}
              active
              avatar={{ shape: "circle" }}>
              <div className='publicacao' id='publicacao'>
                <div className='opcoesBarra'>
                  <Link
                    to={`/perfil/${publ?.usuario?.id}`}
                    className='username'>
                    {publ?.usuario?.nome}
                  </Link>
                  {publ?.usuario?.nome === sessionStorage.getItem("user") && (
                    <BtnMenu id={publ?.id} nameUser={publ?.usuario?.nome} />
                  )}
                </div>

                <ProfilePublication
                  id_publicacao={publ?.id}
                  setIsImage={setIsImage}
                  isImage={isImage}
                  publicacao={publ}
                />

                <div className='opcoes' id='opcoes'>
                  <LikePublicacao publ={publ} />

                  <Comentario publ={publ} id={publ?.id} verC={verComentarios} />
                </div>
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </>
  );
};
export default Publicacao;
