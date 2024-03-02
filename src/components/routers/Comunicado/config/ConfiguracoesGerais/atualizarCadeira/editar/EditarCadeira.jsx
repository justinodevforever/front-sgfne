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
  const [mes, setMes] = useState("");

  const [fk_mes, setFk_mes] = useState("");
  const [fk_ano, setFk_ano] = useState("");
  const [ano, setAno] = useState("");
  const [rupe, setRupe] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [fk_curso, setFk_curso] = useState(0);
  const [fk_semestre, setFk_semestre] = useState(0);
  const [fk_frequencia, setFk_frequencia] = useState(0);
  const [fk_disciplina, setFk_disciplina] = useState(0);
  const [semestres, setSemestres] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [semestre, setSemestre] = useState("");
  const [valor, setValor] = useState(0);
  const [ativar, setAtivar] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [type, setType] = useState("");
  const [id, setId] = useState(0);

  const navigate = useNavigate();
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);
  const { isVisibleConfirmar } = useSelector(
    (state) => state.ui.ModalConfirmar
  );
  const { isVisibleError } = useSelector((state) => state.ui.ModalError);
  const { isVisibleWarning } = useSelector((state) => state.ui.ModalWarning);
  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    setRupe(cadeiraAtraso?.rupe);
  }, [cadeiraAtraso]);

  useEffect(() => {
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    getAno();
  }, []);
  useEffect(() => {
    buscaSemestre();
  }, [semestre]);
  useEffect(() => {
    if (bi === "") {
      setNome("");
      setCurso("");
    }
  }, [bi]);

  useEffect(() => {
    buscaAnoLeivo();
  }, [ano]);
  useEffect(() => {
    buscaAnoLeivo();
  }, [fk_curso && frequencia]);
  useEffect(() => {
    getDisplina();
  }, [
    cadeiraAtraso?.AnoFrequencia?.ano,
    cadeiraAtraso?.AnoLetivo?.ano,
    cadeiraAtraso?.Semestre?.nome,
    cadeiraAtraso?.Curso?.curso,
  ]);
  useEffect(() => {
    buscaFrequencia();
  }, [frequencia]);
  useEffect(() => {
    buscarDisciplina();
  }, [disciplina]);
  function close(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  const buscarEstudante = async (e) => {
    e.preventDefault();
    await api
      .post("/search/estudante/bi", {
        bi,
        frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setCurso(data.data.Curso.curso);
        setFk_curso(data.data.Curso.id);
        setNome(data.data.nome);
        setFk_estudante(data.data.id);
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
        setSemestre(data.data[0].nome);
        setSemestres(data.data);
      })
      .catch((err) => console.log(err));
  };
  const buscarDisciplina = async () => {
    await api
      .post("/search/disciplina", {
        nome: disciplina,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFk_disciplina(data.data.id);
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
        setAno(data.data[0].ano);
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
        anoLetivo: cadeiraAtraso?.AnoLetivo.ano,
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
  const buscaFrequencia = async () => {
    await api
      .post("/search/frequencia", {
        frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFk_frequencia(data.data?.id);
      })
      .catch((err) => console.log(err));
  };

  const buscaSemestre = async () => {
    await api
      .post("/search/semestre", {
        nome: semestre,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setFk_semestre(data.data?.id);
      })
      .catch((err) => console.log(err));
  };

  const buscaAnoLeivo = async () => {
    await api
      .post("/search/letivo", {
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setFk_ano(data.data.id);
      })
      .catch((err) => console.log(err));
  };

  const hendleExameEspecial = async (e) => {
    e.preventDefault();
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      disciplina === "Escolha" ||
      !ano ||
      !semestre ||
      !frequencia ||
      !disciplina
    ) {
      setMessage("Exite Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    await api
      .put(`/exame/especial/${cadeiraAtraso.id}`, {
        fk_disciplina,
        fk_frequencia,
        fk_semestre,
        fk_ano,
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
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      disciplina === "Escolha" ||
      !ano ||
      !semestre ||
      !frequencia ||
      !disciplina
    ) {
      setMessage("Exite Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    await api
      .put(`/cadeira/atraso/${cadeiraAtraso.id}`, {
        fk_disciplina,
        fk_frequencia,
        fk_semestre,
        fk_ano,
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
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      disciplina === "Escolha" ||
      !ano ||
      !semestre ||
      !frequencia ||
      !disciplina
    ) {
      setMessage("Exite Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    await api
      .put(`/recurso/${cadeiraAtraso.id}`, {
        fk_disciplina,
        fk_frequencia,
        fk_semestre,
        fk_ano,
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
                    <option value={"Escolha"}>Escolha...</option>

                    {anos.map((s) => (
                      <option value={s.ano} key={s.id}>
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
                    <option value={"Escolha"}>Escolha...</option>

                    {frequencias.map((f) => (
                      <option value={f.ano} key={f.id}>
                        {f.ano}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="semestre">
                  Semestre
                  <select onChange={(e) => setSemestre(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>

                    {semestres.map((s) => (
                      <option value={s.nome} key={s.id}>
                        {s.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="cadeira">
                  Cadeira
                  <select onChange={(e) => setDisciplina(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>

                    {disciplinas.map((s) => (
                      <option value={s.nome} key={s.id}>
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
