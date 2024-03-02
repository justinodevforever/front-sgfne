import { useEffect, useState } from "react";
import { api } from "../../../../auth/auth";
import "./profilePublicacao.css";
import LerMais from "./LerMais";
import { Link } from "react-router-dom";
import { setIdPublicacao, toggleModal } from "../../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

export const ProfilePublication = ({
  id_publicacao,
  setIsImage,
  isImage,
  publicacao,
}) => {
  const [image, setImage] = useState([]);
  const dispetch = useDispatch();
  const { isVisible } = useSelector((state) => state.ui.Modal);

  useEffect(() => {
    getImagePublicacao();
  }, []);
  const toggle = (e) => {
    e.preventDefault();
    dispetch(toggleModal(!isVisible));
    dispetch(setIdPublicacao(publicacao.id));
  };
  const getImagePublicacao = async () => {
    await api
      .get("/image/publication")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setImage(data.data);

        data.data.map((m) => {
          if (m.fk_publicacao === id_publicacao) {
            if (m.nome !== "") {
              setIsImage(true);
            } else {
              setIsImage(false);
            }
          }
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {image.map((img) => (
        <div key={img.id}>
          {Number(id_publicacao) === img.fk_publicacao ? (
            <div className="container-imagePublicacao">
              {img.nome !== undefined && img.nome !== "" ? (
                <>
                  <LerMais
                    publ={publicacao}
                    id={id_publicacao}
                    isImage={isImage}
                  />

                  <img
                    src={`http://localhost:3001/files/imagePublication/${img.nome}`}
                    alt=""
                  />
                </>
              ) : (
                <div className="publicacoes">
                  {publicacao.publicacao.length > 300 ? (
                    <>
                      <p>{publicacao.publicacao.slice(0, 300)}...</p>
                      <Link onClick={(e) => toggle(e)}>Ler Mais</Link>
                    </>
                  ) : (
                    <>{publicacao.publicacao}</>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </>
  );
};
