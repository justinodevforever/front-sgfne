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
  const [image, setImage] = useState({});
  const dispetch = useDispatch();
  const { isVisible } = useSelector((state) => state.ui.Modal);
  const url = import.meta.env.VITE_API_URL_SOCKET;
  useEffect(() => {
    getImagePublicacao();
  }, []);
  const toggle = (e) => {
    e.preventDefault();
    dispetch(toggleModal(!isVisible));
    dispetch(setIdPublicacao(publicacao?.id));
  };
  const getImagePublicacao = async () => {
    await api
      .post("/image/publication/specific", { fk_publicacao: id_publicacao })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setImage(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className='container-imagePublicacao'>
        {image?.nome !== undefined &&
        image?.nome !== "" &&
        id_publicacao === image?.fk_publicacao &&
        image ? (
          <>
            <LerMais publ={publicacao} id={id_publicacao} isImage={isImage} />

            <img
              src={image?.nome}
              alt=''
              style={{
                height: "270px",
              }}
            />
          </>
        ) : (
          <div className='publicacoes'>
            {publicacao?.publicacao.length > 300 ? (
              <>
                <p>{publicacao?.publicacao.slice(0, 300)}...</p>
                <Link onClick={(e) => toggle(e)}>Ler Mais</Link>
              </>
            ) : (
              <>
                <p>{publicacao?.publicacao}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
