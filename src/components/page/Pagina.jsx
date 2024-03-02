import "./pagina.css";
import { useEffect, useState } from "react";
import { api } from "../../../auth/auth";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import UseBtnRemovePage from "./btnDelete/UseBtnDelete";
import CountComentPage from "./coment/CountComentPage";
import { BsArrowLeft } from "react-icons/bs";
import LikePublicacao from "./likes/Like";

let isClicou = false;
let id1;
export const deletePublicationPage = async (id) => {
  isClicou = true;
  id1 = id;

  await api.delete(`/publication/page/${id}`);
};

const Pagina = () => {
  const [titulo, setTitulo] = useState("");
  const [paroquia, setParoquia] = useState("");
  const [user, setUser] = useState("");
  const [publicacoes, setPublicacoes] = useState([]);
  const [image, setImage] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page] = useSearchParams();

  const { id } = useParams();
  const navigate = useNavigate();

  const hendleClic = () => {
    navigate(`/publicar/Page/${id}`);
  };
  const hendleGetPublication = async () => {
    const { data } = await api.post(
      `/publication/page/especific?page=${page.get("page") || 1}`,
      {
        fk_pagina: id,
      }
    );
    setPublicacoes(data.response);
    setPagination(data.pagination);
  };

  const hendleGetPage = async () => {
    const { data } = await api.post(`/page/especific`, {
      id,
    });
    setTitulo(data[0].titulo);
    setUser(data[0].Usuario.nome);
  };
  const getImagePage = async () => {
    const { data } = await api.get("/image/page");
    setImage(data);
  };

  useEffect(() => {
    hendleGetPage();
    hendleGetPublication();
    getImagePage();
  }, [page.get("page")]);

  useEffect(() => {
    setPublicacoes(publicacoes.filter((pub) => pub.id !== id1));
    isClicou = false;
  }, [isClicou]);

  const hendleBack = () => {
    window.history.back();
  };

  return (
    <div className="container-pagina">
      <div className="publicarPagia">
        <textarea
          placeholder="O que estás a Pensar?"
          className="txtPublicar"
          onClick={hendleClic}
        />
      </div>
      <nav>
        <BsArrowLeft
          size={"20px"}
          color="#fff"
          cursor={"pointer"}
          onClick={hendleBack}
        />
        <ul>
          <li>Página: {titulo}</li>
          <li>Admin: {user}</li>
        </ul>
      </nav>
      <div className="container-conteudos">
        {pagination.prev_page && (
          <Link to={`/page/${id}?page=${Number(page.get("page")) - 1}`}>
            Ver Publicações Anterior
          </Link>
        )}
        {publicacoes.map((pu) => (
          <div className="conteudos" key={pu.id}>
            <div className="check">
              <h2>{pu.Pagina.titulo}</h2>

              {pu.Usuario.nome === sessionStorage.getItem("user") ? (
                <div>
                  <Link to={`/edit/publication/page/${pu.id}?id=${id}`}>
                    <BiSolidEditAlt
                      size={"20px"}
                      color="fff"
                      cursor={"pointer"}
                      opacity={1}
                    />
                  </Link>
                  <UseBtnRemovePage
                    pu={pu}
                    id1={id1}
                    publicacoes={publicacoes}
                    setPublicacoes={setPublicacoes}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <ul>
              <li>{pu.publicacao}</li>
            </ul>
            {image.map((img) => (
              <div key={img.id}>
                {img.fk_pagina === pu.id ? (
                  <div>
                    {img.nome !== "" && img.nome !== null ? (
                      <img
                        src={`http://localhost:3001/files/imagePagina/${img.nome}`}
                        alt={pu.publicacao}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ))}

            <div className="footer-pagina">
              <div className="border">
                <LikePublicacao publ={pu} />
              </div>
              <CountComentPage pu={pu} />
            </div>
          </div>
        ))}
      </div>
      {pagination.next_page && (
        <Link to={`/page/${id}?page=${Number(page.get("page")) + Number(1)}`}>
          Ver Próximas Publicações
        </Link>
      )}
    </div>
  );
};

export default Pagina;
