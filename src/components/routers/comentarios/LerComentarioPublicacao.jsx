import { useEffect, useRef, useState } from "react";
import "./lerComentarioPublicacao.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { api } from "../../../../auth/auth";
import { AiOutlineLike } from "react-icons/ai";
import {
  BiSolidEditAlt,
  BiSolidSend,
  BiTrash,
  BiWinkSmile,
} from "react-icons/bi";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import MenuBack from "../../page/coment/Menu-Back/MenuBack";
import { io } from "socket.io-client";
import { chatflech } from "../../../configs/axios/chatfletch";
import ProfileComentPublication from "./ProfileComentPublication";
import LikeComentarioPublicacao from "./likes/Like";
import LerMais from "./LerMais";

export default function LerComentarioPublicacao() {
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const [publicacoes, setPublicacoes] = useState("");
  const [isPick, setIsPick] = useState(false);
  const [page] = useSearchParams();
  const [pagination, setPagination] = useState({});
  const [images, setImages] = useState([]);
  const [lerMais, setLerMais] = useState(false);
  const [user, setUSer] = useState({});
  const clikRef = useRef();

  const params = useParams();
  const { id } = params;
  const socketInstance = useRef();
  const url = import.meta.env.VITE_VERCEL_URL_SOCKET;

  useEffect(() => {
    socketInstance.current = io(`${url}`);
    socketInstance.current.emit("connectedPublication", id);
  }, []);

  useEffect(() => {
    const receiverCom = (coments) => {
      setComentarios([...comentarios, coments]);
    };

    socketInstance.current.on("receiveComentPublication", receiverCom);

    return () => {
      socketInstance.current.off("receiveComentPublication", receiverCom);
    };
  }, [comentarios]);
  useEffect(() => {
    getPublicacao();
    getImagePublicacao();
    getComent();
  }, [page.get("page")]);

  async function getPublicacao() {
    await api
      .get(`/publicacao/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setPublicacoes(data.data.publicacao);
        setUSer(data.data.Usuario);
      })
      .catch((err) => console.log(err));
  }

  const getImagePublicacao = async () => {
    await api
      .get("/image/publication")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setImages(data.data);
      })
      .catch((err) => console.log(err));
  };

  const removerComentarioPublicacao = async (e, id) => {
    e.preventDefault();
    await api
      .delete(`/comntario/publicacao/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setComentarios(comentarios.filter((c) => c.id !== id));
      })
      .catch((err) => console.log(err));
  };

  async function hendleComentar() {
    try {
      await api
        .post("/comentario/publicacao", {
          comentario,
          fk_user: sessionStorage.getItem("id"),
          fk_publicacao: id,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }
          console.log(data.data);
          const newComent = {
            data: data.data.response[0],
            idPublicacao: id,
            comentId: data.data.id,
          };

          socketInstance.current.emit("comentpublication", newComent);

          setComentario("");
          setComentarios([...comentarios, data.data.response[0]]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  async function getComent() {
    await api
      .post(`/comentario/publicacao/specific?page=${page.get("page") || 1}`, {
        fk_publicacao: id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setComentarios(data.data.response);
        setPagination(data.data.pagination);
      })
      .catch((err) => console.log(err));
  }
  const toggleLerMais = () => {
    setLerMais(!lerMais);
  };
  useEffect(() => {
    function clic(e) {
      try {
        if (!clikRef.current.contains(e.target)) return;
        setLerMais(false);
      } catch (error) {}
    }
    document.addEventListener("mousedown", clic);
    return () => {
      document.addEventListener("mousedown", clic);
    };
  }, []);

  return (
    <>
      <MenuBack />
      <div className="container-lerComentario">
        <div className="publicacao-comentarios">
          <div className="publicacao_user">
            {publicacoes?.length < 100 ? (
              <p>{publicacoes}</p>
            ) : (
              <>
                {!lerMais && (
                  <div>
                    {publicacoes.slice(0, 100) + "..."}
                    <LerMais toggleLerMais={toggleLerMais} />
                  </div>
                )}
                {lerMais && <p ref={clikRef}>{publicacoes}</p>}
              </>
            )}
          </div>

          {pagination?.prev_page && (
            <Link to={`/coment/publication/${id}?page=${page.get("page") - 1}`}>
              {" "}
              Comentários Anteriores
            </Link>
          )}
          {comentarios.map((comentario) => (
            <div className="conteudos-comentarios" key={comentario.id}>
              <div className="barra">
                <ProfileComentPublication idUser={comentario.Usuario.id} />
                <Link to={`/perfil/${comentario.Usuario.id}`}>
                  {" "}
                  {comentario.Usuario.nome.length > 12 ? (
                    <span>{comentario.Usuario.nome.slice(0, 12) + "..."}</span>
                  ) : (
                    <span>{comentario.Usuario.nome}</span>
                  )}
                </Link>

                {comentario.Usuario.id ===
                Number(sessionStorage.getItem("id")) ? (
                  <div>
                    <Link to={`/edit/coment/publication/${comentario.id}`}>
                      <BiSolidEditAlt
                        size={"20px"}
                        color="00f"
                        cursor={"pointer"}
                      />
                    </Link>

                    <BiTrash
                      size={"20px"}
                      color="#f74044"
                      cursor={"pointer"}
                      onClick={(e) => {
                        removerComentarioPublicacao(e, comentario.id);
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    {user.id === Number(sessionStorage.getItem("id")) ? (
                      <BiTrash
                        size={"20px"}
                        color="#f74044"
                        cursor={"pointer"}
                        onClick={(e) => {
                          removerComentarioPublicacao(e, comentario.id);
                        }}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </div>
              <div className="profile"></div>
              <p>{comentario.comentario}</p>
              <LikeComentarioPublicacao coment={comentario} />
            </div>
          ))}
          {pagination.next_page && (
            <Link
              to={`/coment/publication/${id}?page=${
                Number(page.get("page")) + Number(1)
              }`}>
              Comentários Posteriores
            </Link>
          )}
        </div>
        <footer className="footer-comentarA">
          <textarea
            name="comentario"
            id="comentario"
            placeholder="Comenta Aqui!"
            value={comentario}
            onChange={(e) => {
              setComentario(e.target.value);
            }}
            required
            className="comentarA"
          />
          <div className={"container-emoji"}>
            <BiWinkSmile
              cursor={"pointer"}
              size={"30px"}
              color="#fff"
              onClick={() => {
                setIsPick(!isPick);
              }}
            />

            <div className={isPick ? "abrirEmoji" : "feicharEmoji"}>
              <Picker
                width="40px"
                size="20px"
                data={data}
                previewPosition="fixed"
                onEmojiSelect={(e) => {
                  setComentario(comentario + e.native);
                }}
                className="emoji"
              />
            </div>
          </div>
          <div className="div-icon">
            {comentario && (
              <BiSolidSend
                onClick={() => hendleComentar()}
                size={"20px"}
                color="#00f"
                cursor={"pointer"}
              />
            )}
          </div>
        </footer>
      </div>
    </>
  );
}
