import { ReactDOM, useEffect, useState } from "react";
import "./modalLerMais.css";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../store/ui-slice";
import { api } from "../../../../../auth/auth";
const Modal = () => {
  const [check, setCheck] = useState(false);
  const { isVisible } = useSelector((state) => state.ui.Modal);
  const { idPublicacao } = useSelector((state) => state.ui.Publicacao);
  const dispatch = useDispatch();
  const [publicacao, setPublicacao] = useState({});

  function Toggle(e) {
    e.preventDefault();
    dispatch(toggleModal(!isVisible));
  }
  useEffect(() => {
    async function getPublicacao() {
      await api
        .get(`/publicacao/${idPublicacao}`)
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setPublicacao(data.data);
        })
        .catch((err) => console.log(err));
    }
    getPublicacao();
  }, [idPublicacao]);
  return (
    <>
      {isVisible && (
        <>
          <div className="modalLerMaisA">
            <div className="barra">
              <div></div>
              <BiX
                color="red"
                size={"20px"}
                cursor={"pointer"}
                className="close"
                onClick={(e) => Toggle(e)}
              />
            </div>
            <div className="publi">
              {publicacao?.publicacao !== null ? (
                <p>{publicacao?.publicacao}</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="overlayLer"></div>
        </>
      )}
    </>
  );
};

export default Modal;
