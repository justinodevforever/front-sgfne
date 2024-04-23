import { ReactDOM, useEffect, useState } from "react";
import "./modalLerMais.css";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../store/ui-slice";
import { api } from "../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { Modal as ModalN } from "antd";
const Modal = () => {
  const [check, setCheck] = useState(false);
  const { isVisible } = useSelector((state) => state.ui.Modal);
  const { idPublicacao } = useSelector((state) => state.ui.Publicacao);
  const dispatch = useDispatch();
  const [publicacao, setPublicacao] = useState({});
  const navigate = useNavigate();

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
      <ModalN
        open={isVisible}
        zIndex={3}
        okText='Fechar'
        closable={false}
        onOk={() => dispatch(toggleModal(!isVisible))}>
        {publicacao?.publicacao !== null ? (
          <p>{publicacao?.publicacao}</p>
        ) : (
          <></>
        )}
      </ModalN>
    </>
  );
};

export default Modal;
