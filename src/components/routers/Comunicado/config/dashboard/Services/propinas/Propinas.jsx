import { useEffect, useRef, useState } from "react";
import "./propinas.scss";
import { api } from "../../../../../../../../auth/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiPrinter } from "react-icons/pi";
import RelatorioPropina from "../relatorios/propina/Propina";
import { BiSearch } from "react-icons/bi";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsClic,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";
import { toggleModalError } from "../../../../../../../store/ui-slice";
import { toggleModalConfirmar } from "../../../../../../../store/ui-slice";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import { Form, Input, Space } from "antd";
import Processing from "../../../../../hook/process/Processing";
import { useForm } from "react-hook-form";
import { formatDate, formatDateNumber } from "../../../../../hook/timeout";
import Ispm from "../../../../../hook/Ispm";
const RUPE = / .{8,21}$/;

const PropinaDashboard = () => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_estudante, setFk_estudante] = useState("");
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const [valor, setValor] = useState("");
  const [rupe, setRupe] = useState(0);
  const [frequencia, setFrequencia] = useState("");
  const [mes, setMes] = useState("");
  const [meses, setMeses] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const form = useForm();
  const { register, handleSubmit } = form;

  const dispatch = useDispatch();
  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    getMes();
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    setIsLoading(false);
    // tiposServicos();
  }, []);

  useEffect(() => {
    if (rupe) {
      setValid(RUPE.test(rupe));
      console.log(RUPE.test(rupe));
    }
  }, [rupe]);

  useEffect(() => {
    if (bi === "") {
      setNome("");
      setCurso("");
    }
  }, [bi]);

  const buscarEstudante = async () => {
    setLoading(true);
    await api
      .post("search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (!data.data || data.data === null) {
          setLoading(false);
          let c = 0;
          c = setInterval(() => {
            setIsProcessing(false);
          }, 4000);
          setMessage("Estudante com Este Nº de B.I não Existe!");
          setIsProcessing(true);
          return () => clearInterval(c);
        }

        setFrequencia(data.data?.frequencia?.ano);
        setCurso(data.data?.curso?.curso);
        setFk_curso(data.data?.curso?.id);
        setNome(data.data?.nome);
        setFk_estudante(data.data?.id);
        setPeriodo(data?.data?.regime);
        if (data.data?.regime === "Regular") setValor(1900);
        else if (data.data?.regime === "Pós-Laboral") setValor(15000);
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

  const getMes = async () => {
    await api
      .get("/mes")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setMes(data.data[0].mes);
        setMeses(data.data);
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

  const handlePagamento = async (data) => {
    if (
      data.fk_mes === undefined ||
      data.fk_ano === undefined ||
      data.fk_semestre === undefined ||
      data.rupe === 0 ||
      !frequencia ||
      !data.rupe
    ) {
      dispatchError(toggleModalError(true));
      return;
    }
    const daF = formatDateNumber(Date.now());
    let dateI = daF.replace(/-/g, "/");
    const partes = dateI.split("/");
    const di = `${partes[1]}/${partes[0]}/${partes[2]}`;

    await api
      .post("/propina", {
        fk_curso,
        fk_estudante,
        fk_mes: data.fk_mes,
        fk_semestre: data.fk_semestre,
        fk_user,
        fk_ano: data.fk_ano,
        valor,
        rupe: Number(data.rupe),
        dataSolicitacao: di,
        frequencia,
      })
      .then(async (data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));

          return;
        }
        if (data.data.message === "exist") {
          setMessage("O Mês Já Foi Pago! ");
          dispatchWarning(toggleModalWarning(true));

          return;
        }
        if (data.data.message === "sucess") {
          dispatch(setIsClic(true));
          setId(data.data?.response?.id);
          dispatchConfirmar(toggleModalConfirmar(true));
          setRupe(0);

          return;
        }
      });
  };

  return (
    <>
      {isLoading && <Ispm />}
      <UseWarning message={message} />
      <UseSucess />
      <UseErro />
      {isProcessing && <Processing message={message} />}
      <div className='propina'>
        <div className='conteudoProp'>
          <Form className='formBiPropinae'>
            <Space
              wrap
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}>
              <Input.Search
                type='search'
                placeholder='Número de BI do Estudante'
                onChange={(e) => setBi(e.target.value)}
                value={bi}
                autoFocus
                maxLength={14}
                onSearch={() => buscarEstudante()}
                style={{ width: "100%", padding: "10px" }}
                loading={loading}
              />
              {valor && periodo && (
                <div className='inputDesabled'>
                  <label htmlFor='valor' style={{ color: "#fff" }}>
                    Valor:{""}
                    <Input
                      type='number'
                      className='inpform valor'
                      readOnly
                      value={valor}
                      onChange={(e) => setValor(e.target.value)}
                      style={{ color: "#000" }}
                    />
                  </label>
                  <label htmlFor='period' style={{ color: "#fff" }}>
                    Período:{""}
                    <Input
                      type='text'
                      readOnly
                      value={periodo}
                      onChange={(e) => setPeriodo(e.target.value)}
                      className='inpform'
                      style={{ color: "#000" }}
                    />
                  </label>
                </div>
              )}
            </Space>
          </Form>
          <form className='form' onSubmit={handleSubmit(handlePagamento)}>
            <Space
              wrap
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
                }}>
                <TextField
                  type='number'
                  label='Rupe'
                  id='rupe'
                  onChange={(e) => setRupe(e.target.value)}
                  placeholder='Digite o Número de Rupe'
                  maxLength={24}
                  {...register("rupe")}
                  style={{
                    width: "100%",
                    marginTop: "14px",
                  }}
                />

                {valid && (
                  <p
                    style={{
                      marginTop: "8",
                      color: "red",
                    }}>
                    O Rupe é Inválido
                  </p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
                }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='demo-simple-select-label'>
                    Mês
                  </InputLabel>
                  <Select
                    style={{
                      width: "200px",
                    }}
                    labelId='demo-simple-select-label'
                    label='Mês'
                    {...register("fk_mes")}
                    id='demo-simple-select'>
                    {meses.map((s) => (
                      <MenuItem value={s.id} key={s.id}>
                        {s.mes}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
                }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='demo-simple-select-label'>
                    Semestre
                  </InputLabel>
                  <Select
                    style={{
                      width: "200px",
                    }}
                    labelId='demo-simple-select-label'
                    label='Semestre'
                    {...register("fk_semestre")}
                    id='demo-simple-select'>
                    {semestres.map((s) => (
                      <MenuItem value={s.id} key={s.id}>
                        {s.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "200px",
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
                    label='Ano Lectivo'
                    {...register("fk_ano")}
                    id='demo-simple-select'>
                    {anos.map((s) => (
                      <MenuItem value={s.id} key={s.id}>
                        {s.ano}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Space>
            <hr />
            {bi !== "" && nome !== "" && curso !== "" ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}>
                <h2>Dados do Estudante</h2>

                <TextField
                  type='text'
                  value={nome}
                  label='Nome'
                  name='nome'
                  variant='outlined'
                  readOnly
                  {...register("nome")}
                  style={{
                    width: "60%",
                  }}
                />

                <TextField
                  type='text'
                  value={curso}
                  label='Curso'
                  readOnly
                  variant='outlined'
                  style={{
                    width: "60%",
                  }}
                  {...register("curso")}
                />

                <TextField
                  type='text'
                  value={bi}
                  id='bi n'
                  label='B.I'
                  readOnly
                  variant='outlined'
                  style={{
                    width: "60%",
                  }}
                  {...register("bi")}
                />

                <button className='btn'>Fazer Pagamento</button>
              </div>
            ) : (
              <></>
            )}
          </form>
          <Link className='imprimirPropina' to={`/relatorio_propina/${4}`}>
            <PiPrinter color='#fff' size={20} cursor={"pointer"} />
            <span>Relatório</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PropinaDashboard;
