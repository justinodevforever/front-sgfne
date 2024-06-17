import { useEffect, useRef, useState } from "react";
import "./sobreCadeira.scss";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const SobreCadeirasDashboard = () => {
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
  const [loading, setLoading] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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
    if (!bi) {
      alert("O Campo B.I é Obrigatório");
      return;
    }

    setLoading(true);

    const { data } = await api.post("/divida", { bi });

    if (data?.message === "está com dívida") {
      setCurso("");
      setMessage(`Está com Dívida de ${data.dividas.length} Meses!`);
      dispatchWarning(toggleModalWarning(true));
      setLoading(false);

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
        if (!data.data || data.data === null) {
          let c = 0;
          c = setInterval(() => {
            setIsProcessing(false);
          }, 4000);
          setMessage("Estudante com Este Nº de B.I não Existe!");
          setIsProcessing(true);
          setLoading(false);
          return () => clearInterval(c);
        }

        setCurso(data.data.curso.curso);
        setFk_curso(data.data.curso.id);
        setNome(data.data.nome);
        setFk_estudante(data.data.id);
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

  const handleCadeiraAtrazo = async () => {
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      disciplina === "" ||
      ano === "" ||
      semestre === "" ||
      frequencia === "" ||
      disciplina === "" ||
      rupe === 0 ||
      valor === 0 ||
      !rupe ||
      !valor
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
        fk_user: sessionStorage.getItem("id"),
        dataSolicitacao: formatDateNumber(Date.now()),
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
        if (data.data.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          setId(data.data.response.id);
          let id = null;
          let co = 0;

          id = setInterval(() => {
            setVisivel(true);
            if (co === 4) return clearInterval(id);
            co++;
          }, 4000);
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
      {isProcessing && <Processing message={message} />}

      <div className='container-atroso'>
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

        <Space
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}>
          <TextField
            type='number'
            label='Valor'
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            style={{
              width: "200px",
            }}
          />
          <TextField
            type='number'
            value={rupe}
            onChange={(e) => setRupe(e.target.value)}
            label='Nº de RUPE'
            maxLength={20}
            style={{
              width: "200px",
            }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor='demo-simple-select-label'>
              Ano Lectivo
            </InputLabel>
            <Select
              style={{
                width: "200px",
              }}
              labelId='demo-simple-select-label'
              label='Ano Lectivo'
              onChange={(e) => setAno(e.target.value)}
              id='demo-simple-select'>
              {anos.map((s) => (
                <MenuItem value={s.ano} key={s.id}>
                  {s.ano}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='demo-simple-select-label'>
              Frequência
            </InputLabel>
            <Select
              style={{
                width: "200px",
              }}
              labelId='demo-simple-select-label'
              label='Frequência'
              onChange={(e) => setFrequencia(e.target.value)}
              id='demo-simple-select'>
              {frequencias.map((s) => (
                <MenuItem value={s.ano} key={s.id}>
                  {s.ano}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='demo-simple-select-label'>Semestre</InputLabel>
            <Select
              style={{
                width: "200px",
              }}
              labelId='demo-simple-select-label'
              label='Semestre'
              onChange={(e) => setSemestre(e.target.value)}
              id='demo-simple-select'>
              {semestres.map((s) => (
                <MenuItem value={s.nome} key={s.id}>
                  {s.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='demo-simple-select-label'>
              Disciplina
            </InputLabel>
            <Select
              style={{
                width: "200px",
              }}
              labelId='demo-simple-select-label'
              label='Disciplina'
              onChange={(e) => setDisciplina(e.target.value)}
              id='demo-simple-select'>
              {disciplinas.map((s) => (
                <MenuItem value={s.nome} key={s.id}>
                  {s.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Space>

        <hr />
        {curso && bi && nome && (
          <div
            className='space'
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "10px 0px",
            }}>
            <h3>Dados do Estudante</h3>

            <TextField
              type='text'
              value={nome}
              label='Nome'
              name='nome'
              variant='outlined'
              readOnly
              style={{
                width: "60%",
              }}
            />

            <TextField
              type='text'
              value={curso}
              label='Curso'
              name='Curso'
              variant='outlined'
              readOnly
              style={{
                width: "60%",
              }}
            />
            <TextField
              type='text'
              value={bi}
              label='Curso'
              name='Curso'
              variant='outlined'
              readOnly
              style={{
                width: "60%",
              }}
            />

            {!ativar && (
              <button
                onClick={() => handleCadeiraAtrazo()}
                className='btnadeira'>
                Pagar
              </button>
            )}
            {ativar && <Loader />}
          </div>
        )}
      </div>

      <RelatorioSobreCadeira
        setVisivel={setVisivel}
        visivel={visivel}
        tipo='Cadeira em Atraso'
        id={id}
      />
    </>
  );
};

export default SobreCadeirasDashboard;
