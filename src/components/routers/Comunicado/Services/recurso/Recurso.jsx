import { useEffect, useRef, useState } from "react";
import "./recurso.scss";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RelatorioSobreCadeira from "../relatorios/SobreCadeira/SobreCadeira";
import { useDispatch, useSelector } from "react-redux";
import UseWarning from "../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../hook/massege/Error/UseErro";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../store/ui-slice";
import Loader from "../../../hook/load/Loader";
import { Button, Form, Input, Space, Alert, message, Popconfirm } from "antd";
import Processing from "../../../hook/process/Processing";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Recurso = () => {
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
  const [isProcessing, setIsProcessing] = useState(true);
  const [id, setId] = useState(0);
  const [message, setMessage] = useState("");

  const { isVisibleError } = useSelector((state) => state.ui.ModalError);

  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

  const [tipos] = useSearchParams();

  useEffect(() => {
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    getAno();
    buscarEstudante();
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
    const response = await api.post("/estudante/user", {
      fk_user: sessionStorage.getItem("id"),
    });
    if (!response.data) {
      setMessage("Não Es Estudante!");
      return;
    }
    const { data } = await api.post("/divida", {
      fk_estudante: response.data.id,
    });

    if (data?.message === "está com dívida") {
      setMessage(`Está com Dívida de ${data.dividas.length} Meses!`);
      return;
    }

    await api
      .post("/estudante/user", {
        fk_user: sessionStorage.getItem("id"),
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
        setBi(data.data.bi);
        setIsProcessing(false);
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
        setSemestre(data.data[0]?.nome);
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

        setAnos(data.data);
        setAno(data.data[0]?.ano);
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
        setFk_ano(data.data?.id);
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

  const hendleRecurso = async () => {
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
      .post("/recurso", {
        valor,
        fk_curso,
        rupe,
        fk_disciplina,
        fk_estudante,
        fk_frequencia,
        fk_semestre,
        fk_ano,
      })
      .then(async (data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setAtivar(false);
        if (data.data?.message === "error") {
          return dispatchError(toggleModalError(isVisibleError));
        }
        if (data.data?.message === "sucess") {
          const response = await api.post("/solicitacao", {
            fk_estudante,
            tipoServico: "Recurso",
            status: "Pendente",
          });

          if (response.data.message === "error") {
            dispatchError(toggleModalError(true));
            setAtivar(false);

            return;
          }
          if (response.data.message === "sucess") {
            dispatchConfirmar(toggleModalConfirmar(true));
            setId(data.data.response.id);
            setAtivar(false);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />
      {isProcessing && <Processing message={message} />}

      <Space
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div className='conteudo-recurso'>
          <h3>Pagamento de Recurso</h3>
          <Space
            wrap
            align='center'
            style={{
              width: "98%",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0px",
              margin: "auto",
            }}>
            <Space
              wrap
              align='center'
              style={{
                display: "flex",
                width: "100%",
                gap: "3px",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <TextField
                type='number'
                style={{
                  width: "200px",
                }}
                value={valor}
                label='Valor'
                name='Valor'
                variant='outlined'
                readOnly
                onChange={(e) => setValor(e.target.value)}
              />

              <TextField
                type='number'
                style={{
                  width: "200px",
                }}
                value={rupe}
                label='Rupe'
                name='Rupe'
                variant='outlined'
                readOnly
                onChange={(e) => setRupe(e.target.value)}
              />
            </Space>
            <Space
              wrap
              align='center'
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}>
              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>
                  Ano Lectivo
                </InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  labelId='demo-simple-select-label'
                  onChange={(e) => setAno(e.target.value)}
                  label='Ano Lectivo'
                  id='demo-simple-select'
                  value={ano}>
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
                  onChange={(e) => setFrequencia(e.target.value)}
                  label='Frequência'
                  id='demo-simple-select'
                  value={frequencia}>
                  {frequencias.map((s) => (
                    <MenuItem value={s.ano} key={s.id}>
                      {s.ano}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>
                  Semestre
                </InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  labelId='demo-simple-select-label'
                  onChange={(e) => setSemestre(e.target.value)}
                  label='Frequência'
                  id='demo-simple-select'
                  value={semestre}>
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
                  onChange={(e) => setDisciplina(e.target.value)}
                  label='disciplina'
                  id='demo-simple-select'
                  value={disciplina}>
                  {disciplinas.map((s) => (
                    <MenuItem value={s.nome} key={s.id}>
                      {s.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Space>
          </Space>

          <hr />
          {curso && nome && bi && (
            <div
              className='dados-estudante'
              style={{
                display: "flex",
                flexDirection: "column",
                width: "98%",
                alignItems: "center",
                padding: "10px 0px",
                margin: "auto",
                gap: "10px",
              }}>
              <h3>Dados do Estudante</h3>
              <br />

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
                value={nome}
                label='B.I'
                name='B.I'
                variant='outlined'
                readOnly
                style={{
                  width: "60%",
                }}
                onChange={(e) => setBi(e.target.value)}
              />

              {!ativar && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Button
                    type='primary'
                    onClick={() => hendleRecurso()}
                    className='btn'
                    style={{
                      display: "flex",
                      width: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    Pagar
                  </Button>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                {ativar && <Loader />}
              </div>
            </div>
          )}
        </div>
      </Space>
    </>
  );
};

export default Recurso;
