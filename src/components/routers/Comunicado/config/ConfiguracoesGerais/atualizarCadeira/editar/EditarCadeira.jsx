import { BiEdit, BiX } from "react-icons/bi";
import "./editarCadeira.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalEdit,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";
import { api } from "../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";
import { useNavigate } from "react-router-dom";

const EditarCadeira = ({ cadeiraAtraso, tipo }) => {
  const [meses, setMeses] = useState([]);
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [rupe, setRupe] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_user, setFk_user] = useState(0);
  const [disciplina, setDisciplina] = useState("");
  const [semestres, setSemestres] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [semestre, setSemestre] = useState("");

  const navigate = useNavigate();
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);

  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    setRupe(cadeiraAtraso?.rupe);
    setFrequencia(
      cadeiraAtraso?.AnoFrequencia?.ano + "," + cadeiraAtraso?.fk_frequencia
    );
    setAno(cadeiraAtraso?.AnoLetivo?.ano + "," + cadeiraAtraso?.fk_ano);
    setSemestre(
      cadeiraAtraso?.Semestre?.nome + "," + cadeiraAtraso?.fk_semestre
    );
    setCurso(cadeiraAtraso?.Curso?.curso + "," + cadeiraAtraso?.fk_curso);
  }, [cadeiraAtraso]);

  useEffect(() => {
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    getAno();
  }, []);

  useEffect(() => {
    if (bi === "") {
      setNome("");
      setCurso("");
    }
  }, [bi]);

  useEffect(() => {
    getDisplina();
  }, [
    cadeiraAtraso?.AnoFrequencia?.ano,
    cadeiraAtraso?.AnoLetivo?.ano,
    cadeiraAtraso?.Semestre?.nome,
    cadeiraAtraso?.Curso?.curso,
  ]);

  function close(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }

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

  const getAnoLetivo = async () => {
    await api
      .get("/letivo")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAnos(data.data);
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

  const getDisplina = async () => {
    await api
      .post("/disciplina/restringido", {
        semestre: cadeiraAtraso?.Semestre?.nome,
        ano: cadeiraAtraso?.AnoFrequencia?.ano,
        curso: cadeiraAtraso?.Curso?.curso,
        anoLetivo: cadeiraAtraso?.AnoLetivo?.ano,
      })

      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data.message === "error") return;
        setDisciplinas(data.data);
      })
      .catch((err) => console.log(err));
  };

  const hendleExameEspecial = async (e) => {
    e.preventDefault();
    const [fkm, newsemestre] = semestre.split(",");
    const [fkf, newfrequencia] = frequencia.split(",");
    const [fka, newano] = ano.split(",");
    const [fkd, newdisciplina] = disciplina.split(",");
    if (!newano || !newsemestre || !newfrequencia || !newdisciplina) {
      setMessage("Exite Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    await api
      .put(`/exame/especial/${cadeiraAtraso.id}`, {
        fk_disciplina: newdisciplina,
        fk_frequencia: newfrequencia,
        fk_semestre: newsemestre,
        fk_ano: newano,
        rupe,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));
          return;
        }
        if (data.data.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hendleCadeiraAtrazo = async (e) => {
    e.preventDefault();
    const [fkm, newsemestre] = semestre.split(",");
    const [fkf, newfrequencia] = frequencia.split(",");
    const [fka, newano] = ano.split(",");
    const [fkd, newdisciplina] = disciplina.split(",");
    if (!newano || !newsemestre || !newfrequencia || !newdisciplina) {
      setMessage("Exite Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    await api
      .put(`/cadeira/atraso/${cadeiraAtraso.id}`, {
        fk_disciplina: newdisciplina,
        fk_frequencia: newfrequencia,
        fk_semestre: newsemestre,
        fk_ano: newano,
        rupe,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));
          return;
        }
        if (data.data.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const hendleRecurso = async (e) => {
    e.preventDefault();
    const [fkm, newsemestre] = semestre.split(",");
    const [fkf, newfrequencia] = frequencia.split(",");
    const [fka, newano] = ano.split(",");
    const [fkd, newdisciplina] = disciplina.split(",");
    console.log(newdisciplina, newsemestre);
    if (!newano || !newsemestre || !newfrequencia || !newdisciplina) {
      setMessage("Exite Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    await api
      .put(`/recurso/${cadeiraAtraso.id}`, {
        fk_disciplina: newdisciplina,
        fk_frequencia: newfrequencia,
        fk_semestre: newsemestre,
        fk_ano: newano,
        rupe,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));
          return;
        }
        if (data.data.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />
      {isVisible && (
        <>
          <div className="editarPropina">
            <div className="opcoesEditar">
              <div>
                <h2>Editar Propina</h2>
              </div>

              <BiX
                color="red"
                size={20}
                onClick={(e) => close(e)}
                className="closed"
              />
            </div>
            <form className="formBi">
              <div className="cc">
                <label htmlFor="cadeira">
                  Ano Lectivo
                  <select onChange={(e) => setAno(e.target.value)}>
                    <option
                      value={
                        cadeiraAtraso.AnoLetivo.ano + "," + cadeiraAtraso.fk_ano
                      }>
                      {cadeiraAtraso.AnoLetivo.ano}
                    </option>

                    {anos.map((s) => (
                      <option value={s.ano + "," + s.id} key={s.id}>
                        {s.ano}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="frequencia">
                  Frequência
                  <select
                    nome="frequencia"
                    id="frequencia"
                    onChange={(e) => setFrequencia(e.target.value)}>
                    <option
                      value={
                        cadeiraAtraso.AnoFrequencia.ano +
                        "," +
                        cadeiraAtraso.fk_frequencia
                      }>
                      {cadeiraAtraso.AnoFrequencia.ano}
                    </option>

                    {frequencias.map((f) => (
                      <option value={f.ano + "," + f.id} key={f.id}>
                        {f.ano}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="semestre">
                  Semestre
                  <select onChange={(e) => setSemestre(e.target.value)}>
                    <option
                      value={
                        cadeiraAtraso.Semestre.nome +
                        "," +
                        cadeiraAtraso.fk_semestre
                      }>
                      {cadeiraAtraso.Semestre.nome}
                    </option>

                    {semestres.map((s) => (
                      <option value={s.nome + "," + s.id} key={s.id}>
                        {s.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="cadeira">
                  Cadeira
                  <select onChange={(e) => setDisciplina(e.target.value)}>
                    <option
                      value={
                        cadeiraAtraso.Disciplina.nome +
                        "," +
                        cadeiraAtraso.fk_disciplina
                      }>
                      {cadeiraAtraso.Disciplina.nome}
                    </option>

                    {disciplinas.map((s) => (
                      <option value={s.nome + "," + s.id} key={s.id}>
                        {s.nome}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                RUPE {""}
                <input
                  type="number"
                  placeholder="Digite o Nº de RUPE"
                  value={rupe}
                  onChange={(e) => setRupe(e.target.value)}
                  maxLength={20}
                />
              </div>
            </form>
            {cadeiraAtraso?.Estudante?.nome && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>B.I</th>
                      <th>Cadeira</th>
                      <th>Ano Fr.</th>
                      <th>Ano Lectivo</th>
                      <th>Curso</th>
                      <th>Semestre</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{cadeiraAtraso?.Estudante?.nome}</td>
                      <td>{cadeiraAtraso?.Estudante?.bi}</td>
                      <td>{cadeiraAtraso?.Disciplina.nome}</td>
                      <td>{cadeiraAtraso?.AnoFrequencia.ano}</td>
                      <td>{cadeiraAtraso?.AnoLetivo?.ano}</td>
                      <td>{cadeiraAtraso?.Curso?.curso}</td>
                      <td>{cadeiraAtraso?.Semestre?.nome}</td>
                    </tr>
                  </tbody>
                </table>

                {tipo === "Cadeira em Atrazo" ? (
                  <button onClick={(e) => hendleCadeiraAtrazo(e)}>
                    <FaSave size={20} color="fff" /> Salvar
                  </button>
                ) : (
                  <></>
                )}
                {tipo === "Exame Especial" ? (
                  <button onClick={(e) => hendleExameEspecial(e)}>
                    <FaSave size={20} color="fff" /> Salvar
                  </button>
                ) : (
                  <></>
                )}
                {tipo === "Recurso" ? (
                  <button onClick={(e) => hendleRecurso(e)}>
                    <FaSave size={20} color="fff" /> Salvar
                  </button>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>

          <div className="ovefloy"></div>
        </>
      )}
    </>
  );
};

export default EditarCadeira;
