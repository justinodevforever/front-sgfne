import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./lerMais.css";
import { useDispatch, useSelector } from "react-redux";
import { setIdPublicacao, toggleModal } from "../../../store/ui-slice";

const LerMais = ({ publ, id }) => {
  const [noId, setNoId] = useState(0);
  const clikRef = useRef();
  const dispetch = useDispatch();
  const { isVisible } = useSelector((state) => state.ui.Modal);
  const { idPublicacao } = useSelector((state) => state.ui.Publicacao);

  useEffect(() => {
    setNoId(id);
  }, []);
  const toggle = (e) => {
    e.preventDefault();
    dispetch(toggleModal(!isVisible));
    dispetch(setIdPublicacao(id));
  };
  useEffect(() => {
    function clic(e) {
      try {
        if (!clikRef.current.contains(e.target)) return;
        setNoId(id);
      } catch (error) {}
    }
    document.addEventListener("mousedown", clic);
    return () => {
      document.addEventListener("mousedown", clic);
    };
  }, []);

  return (
    <>
      <div className="lerMais">
        <div>
          {publ?.publicacao.length > 30 ? (
            <div>
              {noId === id ? (
                <div>
                  <div className="publicacoes">
                    <p> {publ?.publicacao.slice(0, 30) + "..."}</p>
                  </div>
                  <Link onClick={(e) => toggle(e)}>Ler mais</Link>
                </div>
              ) : (
                <div className="publicacoes">
                  <p ref={clikRef}>{publ?.publicacao}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="publicacoes">
              <p>{publ?.publicacao}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LerMais;
