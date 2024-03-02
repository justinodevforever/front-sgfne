import { useEffect, useState } from "react";
import "./anoCurso.css";
import { useParams, Link, Outlet } from "react-router-dom";
import { api } from "../../../../../../auth/auth";

const AnoCurso = () => {
  const { ano } = useParams();
  const { id } = useParams();
  const [disc, setDisc] = useState([]);
  const [curso, setCurso] = useState("");

  const [anos, setAnos] = useState([]);
  useEffect(() => {
    getDisplinas();
  }, [id]);

  const getDisplinas = async () => {
    const { data } = await api.post(`/frequencia/especifico`, {
      fk_curso: id,
    });
    setCurso(data[0].Curso.curso);
    setAnos(data);
  };
  return (
    <div className="ano-curso">
      <h3>Curso: {curso}</h3>
      <div className="ano">
        <ul>
          {anos.map((ano) => (
            <li key={ano.id}>
              <Link to={`/cursos/${id}/disciplina/${ano.id}`}>
                {ano.AnoFrequencia.ano}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default AnoCurso;
