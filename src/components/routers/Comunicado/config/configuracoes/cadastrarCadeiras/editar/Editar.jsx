import { BiSave, BiX } from "react-icons/bi";
import "./editar.scss";
import { api } from "../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";
import { useDispatch } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";

const Editar = ({ isVisible, setIsVisible, id }) => {
  const [nome, setNome] = useState("");
  const [disciplina, setDisciplina] = useState({});
  const [frequencias, setFrequencias] = useState([]);
  const [Fk_frequencia, setFk_frequencia] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [fk_semestre, setFk_semestre] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    hendleBuscar();
  }, [id]);
  useEffect(() => {
    getCurso();
    getAno();
    getSemestre();
  }, []);
  const getCurso = async () => {
    await api
      .get("/curso")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setCursos(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getAno = async () => {
    await api
      .get("/ano")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFrequencias(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getSemestre = async () => {
    await api
      .get("/semestre")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setSemestres(data.data);
      })
      .catch((err) => console.log(err));
  };

  const hendleBuscar = async () => {
    await api
      .get(`/disciplina/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setDisciplina(data.data);
        setNome(data.data.nome);
        setFk_curso(data.data.Curso?.id);
        setFk_frequencia(data.data?.AnoFrequencia?.id);
        setFk_semestre(data.data?.Semestre?.id);
      })
      .catch((err) => console.log(err));
  };
  const hendleUpdate = async (e) => {
    e.preventDefault();
    if (!nome || !fk_curso || !fk_semestre || !Fk_frequencia) {
      setMessage("Existe um Campo Vazio!");
      return dispatch(toggleModalWarning(true));
    }
    await api
      .put(`/disciplina/${id}`, {
        nome,
        fk_curso,
        fk_semestre,
        fk_ano: Fk_frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        if (data.data.message === "sucess")
          return dispatch(toggleModalConfirmar(true));

        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((err) => console.log(err));
  };
  const toggleVisible = (e) => {
    e.preventDefault();
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <>
          <UseSucess />
          <UseErro />
          <UseWarning message={message} />
          <div className="editar">
            <div className="opcoes">
              <div></div>
              <BiX
                color="red"
                cursor={"pointer"}
                size={20}
                onClick={(e) => toggleVisible(e)}
              />
            </div>
            <form onSubmit={(e) => hendleUpdate(e)}>
              <div>
                <label htmlFor="nome">
                  Disciplina
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </label>
                <label htmlFor="curso">
                  Curso
                  <select
                    onChange={(e) => setFk_curso(e.target.value)}
                    name="curso">
                    <option value={disciplina?.Curso?.id}>
                      {disciplina?.Curso?.curso}
                    </option>
                    {cursos.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.curso}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="fre">
                  Frequência
                  <select
                    onChange={(e) => setFk_frequencia(e.target.value)}
                    name="fre">
                    <option value={disciplina?.AnoFrequencia?.id}>
                      {disciplina?.AnoFrequencia?.ano}
                    </option>
                    {frequencias.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.ano}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="seme">
                  Semestre
                  <select
                    onChange={(e) => setFk_semestre(e.target.value)}
                    name="seme">
                    <option value={disciplina?.Semestre?.nome}>
                      {" "}
                      {disciplina?.Semestre?.nome}
                    </option>
                    {semestres.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Ano de Frquência</th>
                    <th>Curso</th>
                    <th>Semestre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{disciplina?.nome}</td>
                    <td>{disciplina?.AnoFrequencia?.ano}</td>
                    <td>{disciplina?.Curso?.curso}</td>
                    <td>{disciplina?.Semestre?.nome}</td>
                  </tr>
                </tbody>
              </table>

              <br />
              <button type="submit">
                <BiSave /> Salvar
              </button>
            </form>
          </div>

          <div className="overflay"></div>
        </>
      )}
    </>
  );
};

export default Editar;
