import { useEffect, useRef, useState } from "react";
import "./sobreCadeira.scss";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import RelatorioSobreCadeira from "../relatorios/SobreCadeira/SobreCadeira";
import { useDispatch, useSelector } from "react-redux";
import UseWarning from "../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../hook/massege/Error/UseErro";
import {
  toggleModalConfirmar,
  toggleModalWarning,
} from "../../../../../store/ui-slice";
import Loader from "../../../hook/load/Loader";
import { Button, Form, Input, Space, Alert, message, Popconfirm } from "antd";
import { AlertHeading } from "react-bootstrap";

const SobreCadeiras = () => {
  const [bi, setBi] = useState("");
  const [rupe, setRupe] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [mes, setMes] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [ano, setAno] = useState("");
  const [fk_mes, setFk_mes] = useState(0);
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [fk_curso, setFk_curso] = useState(0);
  const [fk_ano, setFk_ano] = useState(0);
  const [fk_semestre, setFk_semestre] = useState(0);
  const [fk_frequencia, setFk_frequencia] = useState(0);
  const [fk_disciplina, setFk_disciplina] = useState(0);
  const [meses, setMeses] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [semestre, setSemestre] = useState("");
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const [ativar, setAtivar] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [type, setType] = useState("");
  const [id, setId] = useState(0);
  const [message, setMessage] = useState("");
  const { isClic } = useSelector((state) => state.ui.pagou);
  const { isVisibleConfirmar } = useSelector(
    (state) => state.ui.ModalConfirmar
  );
  const { isVisibleError } = useSelector((state) => state.ui.ModalError);
  const { isVisibleWarning } = useSelector((state) => state.ui.ModalWarning);
  const dispatch = useDispatch();
  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

  const [tipos] = useSearchParams();

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
    buscaMes();
  }, [mes]);
  useEffect(() => {
    buscaAnoLeivo();
  }, [ano]);
  useEffect(() => {
    buscaAnoLeivo();
    getDisplina();
  }, [fk_curso && frequencia]);
  useEffect(() => {
    getDisplina();
  }, [semestre, curso, ano, frequencia]);
  useEffect(() => {
    buscaFrequencia();
  }, [frequencia]);
  useEffect(() => {
    buscarDisciplina();
  }, [disciplina]);

  const buscarEstudante = async () => {
    const { data } = await api.post("/divida", { bi });
    console.log(data);
    if (data?.message === "está com dívida") {
      setCurso("");
      setMessage(`Está com Dívida de ${data.dividas.length} Meses!`);
      dispatchWarning(toggleModalWarning(true));

      return;
    }

    await api
      .post("/search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setCurso(data.data.curso.curso);
        setFk_curso(data.data.curso.id);
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
    if (!disciplina) return;
    await api
      .post("/search/disciplina", {
        nome: disciplina,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
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
        semestre,
        ano: frequencia,
        curso,
      })

      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
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

  const buscaMes = async () => {
    await api
      .post("/search/mes", {
        mes,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFk_mes(data.data?.id);
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

  const hendleCadeiraAtrazo = async (e) => {
    e.preventDefault();
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      disciplina === "" ||
      ano === "" ||
      semestre === "" ||
      frequencia === "" ||
      disciplina === ""
    ) {
      setMessage("Existe Campo vazio!");
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    setAtivar(true);
    await api
      .post("/cadeira/atraso", {
        valor,
        rupe,
        fk_curso,
        fk_disciplina,
        fk_estudante,
        fk_frequencia,
        fk_semestre,
        fk_ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAtivar(false);
        if (data.data.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          setId(data.data.response.id);
          setVisivel(true);
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

      {tipos.get("tipos") === "Cadeira em Atrazo" ||
      tipos.get("tipos") === "Recurso" ||
      tipos.get("tipos") === "Exame Especial" ? (
        <Space
          style={{
            margin: "30px auto",
            marginTop: "30px",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div className='conteudo'>
            <Form className='formBir' onSubmitCapture={() => buscarEstudante()}>
              <Input.Search
                placeholder='Número de BI do Estudante'
                onChange={(e) => setBi(e.target.value)}
                className='search'
                autoFocus
                maxLength={14}
                onSearch={() => buscarEstudante()}
                style={{ width: "90%" }}
              />
            </Form>

            <Space
              wrap
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}>
                <label htmlFor='valor'>
                  Valor
                  <Input
                    onChange={(e) => setValor(e.target.value)}
                    type='number'
                    placeholder='Digite o valor'
                    aria-labelledby='home'
                    style={{
                      border: "1px solid #a31541",
                    }}
                  />
                </label>
                <label htmlFor='rupe'>
                  RUPE:
                  <Input
                    type='number'
                    value={rupe}
                    onChange={(e) => setRupe(e.target.value)}
                    placeholder='Digite o Nº de RUPE'
                    maxLength={20}
                    className='rupe'
                    style={{
                      border: "1px solid #a31541",
                    }}
                  />
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}>
                <label htmlFor='cadeira'>
                  Ano Lectivo:
                  <select
                    style={{ width: "100px" }}
                    className='selecte'
                    onChange={(e) => setAno(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>

                    {anos.map((s) => (
                      <option value={s.ano} key={s.id}>
                        {s.ano}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor='frequencia'>
                  Frequência:
                  <select
                    style={{ width: "100px" }}
                    className='selecte'
                    nome='frequencia'
                    id='frequencia'
                    onChange={(e) => setFrequencia(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>

                    {frequencias.map((f) => (
                      <option value={f.ano} key={f.id}>
                        {f.ano}
                      </option>
                    ))}
                  </select>
                </label>

                <label htmlFor='semestre'>
                  Semestre:
                  <select
                    style={{ width: "100px" }}
                    className='selecte'
                    onChange={(e) => setSemestre(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>

                    {semestres.map((s) => (
                      <option value={s.nome} key={s.id}>
                        {s.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor='cadeira'>
                  Cadeira:
                  <select
                    style={{ width: "100px" }}
                    className='selecte'
                    onChange={(e) => setDisciplina(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>

                    {disciplinas?.map((s) => (
                      <option value={s.nome} key={s.id}>
                        {s.nome}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </Space>

            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}>
              {curso && <h3>Dados do Estudante</h3>}
              <br />
              {curso && (
                <label htmlFor='nome'>
                  Nome:
                  <Input type='text' value={nome} disabled className='input' />
                </label>
              )}
              {curso && (
                <label htmlFor='curso'>
                  Curso:
                  <input type='text' value={curso} disabled className='input' />
                </label>
              )}
            </div>
            {!ativar && (
              <Button
                onClick={(e) => hendleCadeiraAtrazo(e)}
                className='btn'
                type='primary'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                }}>
                Fazer Pagamento
              </Button>
            )}
            {ativar && <Loader />}
          </div>
        </Space>
      ) : (
        <></>
      )}

      <RelatorioSobreCadeira
        setVisivel={setVisivel}
        visivel={visivel}
        tipo={tipos.get("tipos")}
        id={id}
      />
    </>
  );
};

export default SobreCadeiras;
