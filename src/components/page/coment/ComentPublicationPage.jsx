import { useEffect, useRef, useState } from "react";
import "./ComentPubicationPage.css";
import { api } from "../../../../auth/auth";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { BiSolidEditAlt, BiSolidSend, BiWinkSmile } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import UseBtnRemove from "../../routers/hook/UseBtnDelete";
import MenuBack from "./Menu-Back/MenuBack";
import { io } from "socket.io-client";
import LikeComentarioPagina from "./likes/Like";

let isClicou = false;
let id1;
export const deleteComentPage = async (id) => {
  isClicou = true;
  id1 = id;

  await api.delete(`/coment/publication/${id}`);
};

const ComentPublicationPage = () => {
  const [publication, setPublication] = useState("");
  const [coment, setComent] = useState("");
  const [allComent, setAllComent] = useState([]);
  const { id } = useParams();
  const [isPick, setIsPick] = useState(false);
  const [clicou, setClicou] = useState(false);
  const [page] = useSearchParams();
  const [pagination, setPagination] = useState({});
  const socketInstance = useRef();

  useEffect(() => {
    socketInstance.current = io("http://localhost:3001");
    socketInstance.current.emit("connectedPage", id);
  }, []);

  useEffect(() => {
    socketInstance.current.on("receiveComentPage", (coments) => {
      setAllComent([...allComent, coments]);
      console.log(coments);
    });
  }, [allComent]);

  useEffect(() => {
    setAllComent(allComent.filter((coment) => coment.id !== id1));
    isClicou = false;
  }, [isClicou]);
  const hendleGetPublication = async () => {
    const { data } = await api.get(`/publication/page/${id}`);
    setPublication(data);
  };

  const hendleGetComent = async () => {
    const { data } = await api.get(
      `/coment/publication/especific/${id}?page=${page.get("page") || 1}`
    );

    setAllComent(data.response);
    setPagination(data.pagination);
  };
  const hendleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("coment/publication", {
      comentario: coment,
      fk_publicacao: id,
      fk_user: sessionStorage.getItem("id"),
    });
    console.log(data);
    const newComent = {
      data: data[0],
      puId: id,
      comentId: data.id,
    };

    socketInstance.current.emit("comentPage", newComent);
    setAllComent([...allComent, data[0]]);
    setComent("");
  };

  useEffect(() => {
    hendleGetComent();
    hendleGetPublication();
  }, [page.get("page")]);

  useEffect(() => {
    const sendComent = document.getElementById("sendComent");
    if (!coment) {
      sendComent.classList.add("fechar");
    } else {
      sendComent.classList.remove("fechar");
    }
  }, [coment]);
  return (
    <div className="container-ComentPublicationPage">
      <MenuBack />
      <div className="allContent">
        <div className="publicationPage">
          <span>{publication.publicacao}</span>
        </div>

        <section>
          {pagination.prev_page && (
            <Link
              to={`/coment/publication/page/${id}?page=${
                Number(page.get("page")) - Number(1)
              }`}>
              Cometários Anterior
            </Link>
          )}
          {allComent.map((aC) => (
            <div className="allComent" key={aC.id}>
              {aC && (
                <div>
                  <div className="barra-coment">
                    <Link to={`/perfil/${aC.Usuario.id}`}>
                      {aC.Usuario.nome.slice(0, 13) + "..."}
                    </Link>
                    {Number(aC.Usuario.id) ===
                    Number(sessionStorage.getItem("id")) ? (
                      <>
                        <Link to={`/edit/coment/${aC.id}?id=${id}`}>
                          <BiSolidEditAlt
                            size={"20px"}
                            color="00f"
                            cursor={"pointer"}
                            opacity={1}
                          />
                        </Link>
                        <UseBtnRemove
                          aC={aC}
                          id1={id1}
                          allComent={allComent}
                          setClicou={setClicou}
                          setAllComent={setAllComent}
                        />
                      </>
                    ) : (
                      <>
                        {aC.Usuario.id ===
                        Number(sessionStorage.getItem("id")) ? (
                          <UseBtnRemove
                            aC={aC}
                            id1={id1}
                            allComent={allComent}
                            setClicou={setClicou}
                            setAllComent={setAllComent}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>

                  <ul>
                    <li>{aC.comentario}</li>
                  </ul>
                </div>
              )}
              <div className="border">
                <LikeComentarioPagina coment={aC} />
              </div>
            </div>
          ))}
          {pagination.next_page && (
            <Link
              to={`/coment/publication/page/${id}?page=${
                Number(page.get("page")) + Number(1)
              }`}>
              Próximos Cometários
            </Link>
          )}
        </section>
      </div>
      <div className="div-comentPublicationPage">
        <textarea
          placeholder="Comenta Aqui!"
          value={coment}
          onChange={(e) => {
            setComent(e.target.value);
          }}
        />
        <div className={"container-emoji"}>
          <BiWinkSmile
            cursor={"pointer"}
            size={"30px"}
            color="#4b4747"
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
                setComent(coment + e.native);
              }}
              className="emoji"
            />
          </div>
        </div>
        <BiSolidSend
          size={"40px"}
          color="#00f"
          cursor={"pointer"}
          className="sendComent"
          id="sendComent"
          onClick={(e) => {
            hendleSubmit(e);
          }}
        />
      </div>
    </div>
  );
};
export default ComentPublicationPage;
