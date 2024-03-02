import { useEffect, useState } from "react";
import "./atualizarCadeira.scss";
import { api } from "../../../../../../../auth/auth";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from "../../../../../../store/ui-slice";
import EditarCadeira from "./editar/EditarCadeira";

const AtualizarCadeira = () => {
  const [isClick, setIsClick] = useState(false);
  const [semestre, setSemestre] = useState("");
  const [curso, setCurso] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [bi, setBi] = useState("");
  const [ano, setAno] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [semestres, setSemestres] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [anos, setAnos] = useState([]);
  const [id, setId] = useState("");
  const [tipo, setTipo] = useState("");
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);
  const dispatch = useDispatch();
  const [cadeiraAtraso, setCadeiraAtraso] = useState({});
  const [exameEspecial, setExameEspecial] = useState({});
  const [recurso, setRecurso] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getCurso();
    getFrequencia();
    getSemestre();
    getAnoLetivo();
  }, []);
  useEffect(() => {
    getDisciplina();
  }, [curso, semestre]);
  useEffect(() => {
    getDisciplina();
  }, [ano, frequencia]);

  const getDisciplina = async () => {
    if (
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      ano === "Escolha" ||
      curso === "Escolha" ||
      !curso ||
      !semestre ||
      !frequencia ||
      !ano
    ) {
      return;
    }
    await api
      .post("/disciplina/restringido", {
        semestre,
        ano: frequencia,
        curso,
        anoLetivo: ano,
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
  const getFrequencia = async () => {
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
  const buscaCadeira = async (e) => {
    e.preventDefault();

    if (
      !frequencia ||
      !ano ||
      !bi ||
      !semestre ||
      !disciplina ||
      !curso ||
      !tipo ||
      tipo === "Escolha" ||
      frequencia === "Escolha" ||
      ano === "Escolha" ||
      curso === "Escolha" ||
      semestre === "Escolha" ||
      disciplina === "Escolha"
    ) {
      alert("Existe um Campo Vazio!");
      return;
    }
    await api
      .post("/cadeira/atraso/busca", {
        frequencia,
        disciplina,
        curso,
        semestre,
        bi,
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data) {
          setCadeiraAtraso(data.data);
          setId(data.data?.id);
        }
        if (!data.data) {
          alert(
            `Não Existe ${tipo} No Registro com a Cadeira de ${disciplina}!`
          );
          setCadeiraAtraso([]);
        }
      })
      .catch((err) => console.log(err));
  };
  const buscaExameEspecial = async (e) => {
    e.preventDefault();

    if (
      !frequencia ||
      !ano ||
      !bi ||
      !semestre ||
      !disciplina ||
      !curso ||
      !tipo ||
      tipo === "Escolha" ||
      frequencia === "Escolha" ||
      ano === "Escolha" ||
      curso === "Escolha" ||
      semestre === "Escolha" ||
      disciplina === "Escolha"
    ) {
      alert("Existe um Campo Vazio!");
      return;
    }
    await api
      .post("/exame/especial/busca", {
        frequencia,
        disciplina,
        curso,
        semestre,
        bi,
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data) {
          setCadeiraAtraso(data.data);
          setId(data.data?.id);
        }
        if (!data.data) {
          alert(
            `Não Existe ${tipo} No Registro com a Cadeira de ${disciplina}!`
          );
          setCadeiraAtraso([]);
        }
      })
      .catch((err) => console.log(err));
  };
  const buscaRecurso = async (e) => {
    e.preventDefault();

    if (
      !frequencia ||
      !ano ||
      !bi ||
      !semestre ||
      !disciplina ||
      !curso ||
      !tipo ||
      tipo === "Escolha" ||
      frequencia === "Escolha" ||
      ano === "Escolha" ||
      curso === "Escolha" ||
      semestre === "Escolha" ||
      disciplina === "Escolha"
    ) {
      alert("Existe um Campo Vazio!");
      return;
    }
    await api
      .post("/recurso/busca", {
        frequencia,
        disciplina,
        curso,
        semestre,
        bi,
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        if (data.data) {
          setCadeiraAtraso(data.data);
          setId(data.data?.id);
        }
        if (!data.data) {
          alert(
            `Não Existe ${tipo} No Registro com a Cadeira de ${disciplina}!`
          );
          setCadeiraAtraso([]);
        }
      })
      .catch((err) => console.log(err));
  };

  function deletePropina(e) {
    e.preventDefault();
    setIsClick(true);
  }
  function editarPropina(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  return (
    <>
      {isClick && <UseRemoverConfirm id={id} setIsClick={setIsClick} />}
      <EditarCadeira cadeiraAtraso={cadeiraAtraso} tipo={tipo} />
      <div className="atualizarPropina">
        <div className="opcoes">
          <form className="formBi">
            <div className="cc">
              <label htmlFor="tipo">
                Tipo{" "}
                <select onChange={(e) => setTipo(e.target.value)}>
                  <option defaultValue={"Escolha"}>Escolha o Tipo...</option>

                  <option value={"Recurso"}>Recurso</option>
                  <option value={"Exame Especial"}>Exame Especial</option>
                  <option value={"Cadeira em Atrazo"}>Cadeira em Atrazo</option>
                </select>
              </label>
              <label htmlFor="frequencia">
                Frequência{" "}
                <select onChange={(e) => setFrequencia(e.target.value)}>
                  <option defaultValue={"Escolha"}>
                    Escolha a Frequência...
                  </option>
                  {frequencias.map((f) => (
                    <option value={f.ano} key={f.id}>
                      {f.ano}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="ano">
                Ano Lectivo{" "}
                <select onChange={(e) => setAno(e.target.value)}>
                  <option defaultValue={"Escolha"}>Escolha o Ano...</option>
                  {anos.map((ano) => (
                    <option value={ano.ano} key={ano.id}>
                      {ano.ano}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="semestre">
                Semestre{" "}
                <select onChange={(e) => setSemestre(e.target.value)}>
                  <option defaultValue={"Escolha"}>Escolha o Ano...</option>
                  {semestres.map((s) => (
                    <option value={s.nome} key={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="curso">
                Curso{" "}
                <select onChange={(e) => setCurso(e.target.value)}>
                  <option defaultValue={"Escolha"}>Escolha o Curso...</option>
                  {cursos.map((c) => (
                    <option value={c.curso} key={c.id}>
                      {c.curso}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="disciplina">
                Disciplina{" "}
                <select onChange={(e) => setDisciplina(e.target.value)}>
                  <option defaultValue={"Escolha"}>
                    Escolha a Disciplina...
                  </option>
                  {disciplinas.map((d) => (
                    <option value={d.nome} key={d.id}>
                      {d.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </form>
          <div className="form">
            <div className="pagamento-propina">
              <input
                type="search"
                placeholder="Número de BI do Estudante"
                onChange={(e) => setBi(e.target.value)}
                className="search"
                value={bi}
                autoFocus
                maxLength={14}
              />
              {tipo === "Exame Especial" ? (
                <BiSearch
                  size={30}
                  color="a31543"
                  cursor={"pointer"}
                  onClick={(e) => buscaExameEspecial(e)}
                />
              ) : (
                <></>
              )}
              {tipo === "Cadeira em Atrazo" ? (
                <BiSearch
                  size={30}
                  color="a31543"
                  cursor={"pointer"}
                  onClick={(e) => buscaCadeira(e)}
                />
              ) : (
                <></>
              )}
              {tipo === "Recurso" ? (
                <BiSearch
                  size={30}
                  color="a31543"
                  cursor={"pointer"}
                  onClick={(e) => buscaRecurso(e)}
                />
              ) : (
                <></>
              )}
            </div>
            <hr />

            {cadeiraAtraso?.Estudante?.nome && (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>B.I</th>
                    <th>Cadeira</th>
                    <th>Ano Fr.</th>
                    <th>Ano Letivo</th>
                    <th>Curso</th>
                    <th>Semestre</th>
                    <th colSpan={2}>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{cadeiraAtraso?.Estudante?.nome}</td>
                    <td>{cadeiraAtraso?.Estudante?.bi}</td>
                    <td>{cadeiraAtraso?.Disciplina?.nome}</td>
                    <td>{cadeiraAtraso?.AnoFrequencia?.ano}</td>
                    <td>{cadeiraAtraso?.AnoLetivo?.ano}</td>
                    <td>{cadeiraAtraso?.Curso?.curso}</td>
                    <td>{cadeiraAtraso?.Semestre?.nome}</td>
                    <td>
                      <BiEdit
                        title="Editar"
                        cursor={"pointer"}
                        color="blue"
                        onClick={(e) => editarPropina(e)}
                      />
                    </td>
                    <td>
                      <BiX
                        title="Eliminar"
                        color="red"
                        cursor={"pointer"}
                        size={20}
                        onClick={(e) => deletePropina(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AtualizarCadeira;
