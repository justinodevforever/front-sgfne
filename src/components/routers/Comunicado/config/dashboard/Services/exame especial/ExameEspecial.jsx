import { useEffect, useRef, useState } from "react";
import "./exameEspecial.scss";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import RelatorioSobreCadeira from "../relatorios/SobreCadeira/SobreCadeira";
import { useDispatch, useSelector } from "react-redux";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";
import Loader from "../../../../../hook/load/Loader";
import { Button, Form, Input, Space, Alert, message, Popconfirm } from "antd";
import { AlertHeading } from "react-bootstrap";
import Processing from "../../../../../hook/process/Processing";
import { TextField } from "@mui/material";

const ExameEspecialDashboard = () => {
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [message, setMessage] = useState("");

  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

  const [tipos] = useSearchParams();

  useEffect(() => {
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    getAno();
    tiposServicos();
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

    if (data?.message === "está com dívida") {
      setCurso("");
      setMessage(`Está com Dívida de ${data.dividas.length} Meses!`);
      dispatchWarning(toggleModalWarning(true));
      console.log("data");

      return;
    }

    setLoading(true);

    await api
      .post("/search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (!data.data || data.data === null) {
          let c = 0;
          c = setInterval(() => {
            setIsProcessing(false);
          }, 4000);
          setMessage("Estudante com Este Nº de B.I não Existe!");
          setIsProcessing(true);
          return () => clearInterval(c);
        }

        setCurso(data.data.curso.curso);
        setFk_curso(data.data.curso?.id);
        setNome(data.data.nome);
        setFk_estudante(data.data?.id);
        setLoading(false);
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

        setFk_disciplina(data.data?.id);
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

        if (data.data) {
          setAnos(data.data);
          setAno(data.data[0]?.ano);
        }
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
  const tiposServicos = async () => {
    await api
      .post("/tipo/servico/especifico", {
        tipo: tipos.get("tipos  "),
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const hendleExameEspecial = async () => {
    if (
      fk_ano === 0 ||
      fk_semestre === 0 ||
      fk_frequencia === 0 ||
      fk_disciplina === 0 ||
      rupe === 0 ||
      valor === "" ||
      fk_curso === 0
    ) {
      setMessage("Existe Campo vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    setAtivar(true);
    await api
      .post("/exame/especial", {
        valor,
        fk_curso,
        rupe,
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
        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));
          return;
        }
        if (data.data?.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          setId(data.data.response.id);
          setVisivel(true);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />
      {isProcessing && <Processing message={message} />}

      <div className='container-exame'>
        <Form className='formBir' onSubmitCapture={() => buscarEstudante()}>
          <Input.Search
            placeholder='Número de BI do Estudante'
            onChange={(e) => setBi(e.target.value)}
            className='search'
            autoFocus
            maxLength={14}
            onSearch={() => buscarEstudante()}
            style={{ width: "90%" }}
            loading={loading}
          />
        </Form>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            justifyContent: "center",
            marginBottom: "20px",
          }}>
          <TextField
            type='number'
            label='Valor'
            onChange={(e) => setValor(e.target.value)}
          />

          <TextField
            type='number'
            value={rupe}
            onChange={(e) => setRupe(e.target.value)}
            label='Nº de RUPE'
            maxLength={20}
          />
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

        <hr />
        {curso && bi && nome && (
          <div
            className='space'
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              background: "#b7b6b6",
              padding: "10px 0px",
            }}>
            <h3>Dados do Estudante</h3>
            <br />

            <label htmlFor='nome' style={{ width: "70%" }}>
              Nome:
              <Input
                type='text'
                value={nome}
                readOnly
                className='input'
                onChange={(e) => setNome(e.target.value)}
                style={{
                  width: "50%",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              />
            </label>

            <label htmlFor='curso' style={{ width: "70%" }}>
              Curso:
              <Input
                type='text'
                value={curso}
                readOnly
                className='input'
                onChange={(e) => setCurso(e.target.value)}
                style={{
                  width: "50%",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              />
            </label>

            {!ativar && (
              <Button
                onClick={() => hendleExameEspecial()}
                className='btn'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                Pagar
              </Button>
            )}
            {ativar && <Loader />}
          </div>
        )}
      </div>

      <RelatorioSobreCadeira
        setVisivel={setVisivel}
        visivel={visivel}
        tipo={"Exame Especial"}
        id={id}
      />
    </>
  );
};

export default ExameEspecialDashboard;
