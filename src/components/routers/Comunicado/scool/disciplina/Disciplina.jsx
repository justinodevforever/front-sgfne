import { useEffect, useState } from "react";
import "./disciplina.css";
import { useParams, Link, Outlet } from "react-router-dom";
import { api } from "../../../../../../auth/auth";
import Modal from "./modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalDisciplina } from "../../../../../store/ui-slice";

const Disciplina = () => {
  const { ano } = useParams();
  const { idano } = useParams();
  const [disc, setDisc] = useState([]);
  const dispatch = useDispatch();
  const [dis, setDis] = useState("");
  const [prof, setProf] = useState("");
  const { isVisible } = useSelector((state) => state.ui.ModalDisciplina);

  const [anos, setAnos] = useState([]);
  useEffect(() => {
    getDisplinas();
  }, [idano]);

  const getDisplinas = async () => {
    const { data } = await api.post(`/disciplina/especifico`, {
      fk_ano: idano,
    });
    console.log(data);

    setDisc(data);
  };

  function ToggleModal(e, disciplina, prof) {
    e.preventDefault();
    dispatch(toggleModalDisciplina(!isVisible));
    setDis(disciplina);
    setProf(prof);
  }

  return (
    <>
      <div className="container-disciplina">
        <div className="disciplina">
          {disc.map((disc) => (
            <div key={disc.id} className="conteudo">
              {disc.semestre === "Primeiro Semestre" ? (
                <div className="primeiro-semestre">
                  <h3 className="s">{disc.semestre}</h3>
                  <ul>
                    <li key={disc.id}>
                      <Link
                        onClick={(e) =>
                          ToggleModal(e, disc.nome, disc.Professor.nome)
                        }>
                        {disc.nome}
                      </Link>
                    </li>
                  </ul>
                  <Modal disciplina={dis} prof={prof} />
                </div>
              ) : (
                <div className="segundo-semestre">
                  <h3 className="s">Segundo Semestre</h3>

                  <ul>
                    <li key={disc.id}>
                      <Link
                        onClick={(e) =>
                          ToggleModal(e, disc.nome, disc.Professor.nome)
                        }>
                        {disc.nome}
                      </Link>
                    </li>
                  </ul>
                  <Modal disciplina={dis} prof={prof} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Disciplina;
