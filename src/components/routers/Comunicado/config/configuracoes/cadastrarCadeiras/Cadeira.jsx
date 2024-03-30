import { useEffect, useState } from "react";
import "./cadeira.scss";
import { Link } from "react-router-dom";
import { api } from "../../../../../../../auth/auth";
import { BiSave } from "react-icons/bi";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
import UseErro from "../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import { useDispatch } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../store/ui-slice";
import Actualizar from "./atualizar/Actualizar";

const Cadeira = () => {
  const [clicCadatrar, setClicCadatrar] = useState(true);
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState("");
  const [curso, setCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [semestre, setSemestre] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();

  const toggleCadastrar = (e) => {
    e.preventDefault();
    setClicCadatrar(true);
    setClicActualizar(false);
  };
  const toggleActualizar = (e) => {
    e.preventDefault();

    setClicActualizar(true);
    setClicCadatrar(false);
  };
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

  const hendleSave = async (e) => {
    e.preventDefault();
    if (!semestre || !curso || !frequencia || !disciplina) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    await api
      .post("/disciplina", {
        nome: disciplina,
        fk_ano: frequencia,
        fk_curso: curso,
        fk_semestre: semestre,
      })
      .then((data) => {
        if (data.data.message === "sucess")
          return dispatchSucess(toggleModalConfirmar(true));
        if (data.data.message === "error")
          return dispatchError(toggleModalError(true));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <UseWarning message={message} />
      <UseErro />
      <UseSucess />
      <ul className="menuCadeira">
        <li>
          <Link
            onClick={(e) => toggleCadastrar(e)}
            className={clicCadatrar ? "ativo" : "link"}>
            Cadastrar
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleActualizar(e)}
            className={clicActualizar ? "ativo" : "link"}>
            Actualizar
          </Link>
        </li>
      </ul>
      <div className="cadeira">
        {clicCadatrar && (
          <div className="opcoes">
            <form onSubmit={(e) => hendleSave(e)}>
              <div>
                <label htmlFor="disciplina">
                  Disciplina
                  <input
                    type="text"
                    placeholder="Designação da Disciplina"
                    value={disciplina}
                    onChange={(e) => setDisciplina(e.target.value)}
                    name="disciplina"
                  />
                </label>
                <label htmlFor="curso">
                  Curso
                  <select
                    onChange={(e) => setCurso(e.target.value)}
                    name="curso">
                    <option value="">Escolha...</option>
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
                    onChange={(e) => setFrequencia(e.target.value)}
                    name="fre">
                    <option value="">Escolha...</option>
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
                    onChange={(e) => setSemestre(e.target.value)}
                    name="seme">
                    <option value="">Escolha...</option>
                    {semestres.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {semestre && frequencia && curso && disciplina && (
                <button type="submit">
                  <BiSave />
                  Cadastrar
                </button>
              )}
              <br />
            </form>
          </div>
        )}

        {clicActualizar && <Actualizar />}
      </div>
    </>
  );
};
export default Cadeira;
