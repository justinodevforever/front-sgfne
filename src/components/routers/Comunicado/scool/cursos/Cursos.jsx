import { useEffect, useState } from "react";
import "./cursos.css";
import { Link, Outlet } from "react-router-dom";
import { api } from "../../../../../../auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenAno } from "../../../../../store/ui-slice";
import AnoCurso from "../ano/AnoCurso";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => state.ui.openAno);

  useEffect(() => {
    getCursos();
  }, []);

  const getCursos = async () => {
    const { data } = await api.get("/curso");

    setCursos(data);
  };
  const toggle = async (e) => {
    e.preventDefault();
    dispatch(toggleOpenAno(true));
  };

  return (
    <div className="container-cursos">
      <div className="cursos">
        {cursos.map((curso) => (
          <ul key={curso.id}>
            <li>
              <Link to={`/cursos/${curso.CursoFrequencia[0].fk_curso}`}>
                {curso.curso}
              </Link>
            </li>
          </ul>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Cursos;
