import { useParams, Link } from "react-router-dom";
import "./professor.css";
import { useEffect, useState } from "react";
import { api } from "../../../../../auth/auth";
import { BiHome } from "react-icons/bi";
import Modal from "./modal/Modal";
import { useDispatch } from "react-redux";
import { toggleOpenModla } from "../../../../store/ui-slice";

const Professor = () => {
  const { id } = useParams();
  const [prof, setProf] = useState({});
  const [disc, setDisc] = useState([]);
  const dispatch = useDispatch();

  const toggleModla = (e) => {
    e.preventDefault();
    dispatch(toggleOpenModla(true));
  };

  useEffect(() => {
    getProfessor();
  }, []);

  const getProfessor = async () => {
    const { data } = await api.get(`/professor/${id}`);
    console.log("plano", data);

    setProf(data);
    setDisc(data.Disciplinas);
  };

  return (
    <>
      <Modal />
      <div className="container-professor">
        <span>Nome do Prof.: {prof.nome}</span>

        <div>
          <Link to={"/comunicado"}>
            <BiHome size={"25"} cursor={"pointer"} />
          </Link>
        </div>
      </div>

      <br />
      <div className="disciplina">
        {disc.map((disc) => (
          <div className="dd" key={disc.id}>
            <div>
              {" "}
              <Link onClick={(e) => toggleModla(e)}>{disc.nome}</Link>
            </div>
            <div>
              <span>{disc.Curso.curso}</span>
            </div>
            <div>
              <span>{disc.semestre}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Professor;
