import { useEffect, useState } from "react";
import "./atualizarCadeira.scss";
import { api } from "../../../../../../../auth/auth";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from "../../../../../../store/ui-slice";
import EditarCadeira from "./editar/EditarCadeira";
import PegarPermissoes from "../../../../../../configs/permissoes/PegarPermissoes";
import { Input } from "antd";

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
  const buscaCadeira = async () => {
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
  const buscaExameEspecial = async () => {
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
  const buscaRecurso = async () => {
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

  function deleteCadeira(e) {
    e.preventDefault();
    setIsClick(true);
  }
  function editarCadeira(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  return (
    <>
      {isClick && <UseRemoverConfirm id={id} setIsClick={setIsClick} />}
      <EditarCadeira cadeiraAtraso={cadeiraAtraso} tipo={tipo} />
      <div className='atualizarCadeira'>
        <div className='opcoes'>
          <form className='formBi' style={{ color: "#fff" }}>
            <div
              className='ccCadeira'
              style={{
                display: "flex",
                flexWrap: "wrap",
                color: "#fff",
              }}>
              <label
                htmlFor='tipo'
                style={{
                  color: "#fff",
                }}>
                <select
                  onChange={(e) => setTipo(e.target.value)}
                  style={{
                    width: "225px",
                    borderRadius: "5px",
                    height: "60px",
                    fontWeight: "200",
                    fontSize: "20px",
                    border: "1px solid #ddd",
                  }}>
                  <option defaultValue={"Escolha"}>Tipo de Serviço</option>

                  <option value={"Recurso"}>Recurso</option>
                  <option value={"Exame Especial"}>Exame Especial</option>
                  <option value={"Cadeira em Atrazo"}>Cadeira em Atrazo</option>
                </select>
              </label>
              <label
                htmlFor='frequencia'
                style={{
                  color: "#fff",
                }}>
                <select
                  onChange={(e) => setFrequencia(e.target.value)}
                  style={{
                    width: "225px",
                    borderRadius: "5px",
                    height: "60px",
                    fontWeight: "200",
                    fontSize: "20px",
                    border: "1px solid #ddd",
                  }}>
                  <option defaultValue={"Escolha"}>Ano Frequência</option>
                  {frequencias.map((f) => (
                    <option value={f.ano} key={f.id}>
                      {f.ano}
                    </option>
                  ))}
                </select>
              </label>
              <label
                htmlFor='ano'
                style={{
                  color: "#fff",
                }}>
                <select
                  onChange={(e) => setAno(e.target.value)}
                  style={{
                    width: "225px",
                    borderRadius: "5px",
                    height: "60px",
                    fontWeight: "200",
                    fontSize: "20px",
                    border: "1px solid #ddd",
                  }}>
                  <option defaultValue={"Escolha"}>Ano Lectivo</option>
                  {anos.map((ano) => (
                    <option value={ano.ano} key={ano.id}>
                      {ano.ano}
                    </option>
                  ))}
                </select>
              </label>
              <label
                htmlFor='semestre'
                style={{
                  color: "#fff",
                }}>
                <select
                  onChange={(e) => setSemestre(e.target.value)}
                  style={{
                    width: "225px",
                    borderRadius: "5px",
                    height: "60px",
                    fontWeight: "200",
                    fontSize: "20px",
                    border: "1px solid #ddd",
                  }}>
                  <option defaultValue={"Escolha"}>Semestre</option>
                  {semestres.map((s) => (
                    <option value={s.nome} key={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label
                htmlFor='curso'
                style={{
                  color: "#fff",
                }}>
                <select
                  onChange={(e) => setCurso(e.target.value)}
                  style={{
                    width: "225px",
                    borderRadius: "5px",
                    height: "60px",
                    fontWeight: "200",
                    fontSize: "20px",
                    border: "1px solid #ddd",
                  }}>
                  <option defaultValue={"Escolha"}>Curso</option>
                  {cursos.map((c) => (
                    <option value={c.curso} key={c.id}>
                      {c.curso}
                    </option>
                  ))}
                </select>
              </label>
              <label
                htmlFor='disciplina'
                style={{
                  color: "#fff",
                }}>
                <select
                  onChange={(e) => setDisciplina(e.target.value)}
                  style={{
                    width: "225px",
                    borderRadius: "5px",
                    height: "60px",
                    fontWeight: "200",
                    fontSize: "20px",
                    border: "1px solid #ddd",
                  }}>
                  <option defaultValue={"Escolha"}>Disciplina</option>
                  {disciplinas.map((d) => (
                    <option value={d.nome} key={d.id}>
                      {d.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </form>
          <div className='form'>
            <div>
              {tipo === "Exame Especial" ? (
                <Input.Search
                  placeholder='Número de BI do Estudante'
                  onChange={(e) => setBi(e.target.value)}
                  value={bi}
                  autoFocus
                  maxLength={14}
                  onSearch={() => buscaExameEspecial()}
                  style={{ marginTop: "10px", width: "50%" }}
                />
              ) : (
                <></>
              )}
              {tipo === "Cadeira em Atrazo" ? (
                <Input.Search
                  placeholder='Número de BI do Estudante'
                  onChange={(e) => setBi(e.target.value)}
                  value={bi}
                  autoFocus
                  maxLength={14}
                  onSearch={() => buscaCadeira()}
                  style={{ marginTop: "10px", width: "50%" }}
                />
              ) : (
                <></>
              )}
              {tipo === "Recurso" ? (
                <Input.Search
                  placeholder='Número de BI do Estudante'
                  onChange={(e) => setBi(e.target.value)}
                  value={bi}
                  autoFocus
                  maxLength={14}
                  onSearch={() => buscaRecurso()}
                  style={{ marginTop: "10px", width: "50%" }}
                />
              ) : (
                <></>
              )}
            </div>
            <hr
              style={{
                marginTop: "30px",
              }}
            />

            {cadeiraAtraso?.estudante?.nome && (
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
                    <PegarPermissoes
                      permissoes={["admin", "remover", "edição"]}>
                      <th colSpan={2}>Opções</th>
                    </PegarPermissoes>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{cadeiraAtraso?.estudante?.nome}</td>
                    <td>{cadeiraAtraso?.estudante?.bi}</td>
                    <td>{cadeiraAtraso?.disciplina?.nome}</td>
                    <td>{cadeiraAtraso?.AnoFrequncia?.ano}</td>
                    <td>{cadeiraAtraso?.anoLectivo?.ano}</td>
                    <td>{cadeiraAtraso?.Curso?.curso}</td>
                    <td>{cadeiraAtraso?.semestre?.nome}</td>
                    <PegarPermissoes
                      permissoes={["admin", "remover", "edição"]}>
                      <td>
                        <BiEdit
                          title='Editar'
                          cursor={"pointer"}
                          color='blue'
                          onClick={(e) => editarCadeira(e)}
                        />
                      </td>
                    </PegarPermissoes>
                    <PegarPermissoes
                      permissoes={["admin", "remover", "edição"]}>
                      <td>
                        <BiX
                          title='Eliminar'
                          color='red'
                          cursor={"pointer"}
                          size={20}
                          onClick={(e) => deleteCadeira(e)}
                        />
                      </td>
                    </PegarPermissoes>
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
