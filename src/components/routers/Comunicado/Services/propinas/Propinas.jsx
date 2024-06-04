import { useEffect, useRef, useState } from "react";
import "./propinas.scss";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import { PiPrinter } from "react-icons/pi";
import RelatorioPropina from "../relatorios/propina/Propina";
import { BiSearch } from "react-icons/bi";
import Alert from "../../../hook/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setIsClic, toggleModalWarning } from "../../../../../store/ui-slice";
import { toggleModalError } from "../../../../../store/ui-slice";
import { toggleModalConfirmar } from "../../../../../store/ui-slice";
import UseWarning from "../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../hook/massege/Error/UseErro";
import { Form, Input, Space } from "antd";
import Loader from "../../../hook/load/Loader";
import Processing from "../../../hook/process/Processing";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

const Propina = ({ tipo }) => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_estudante, setFk_estudante] = useState("");
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const [valor, setValor] = useState("");
  const [rupe, setRupe] = useState(0);
  const [mes, setMes] = useState("");
  const [meses, setMeses] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
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
    buscarEstudante();
  }, []);

  useEffect(() => {
    if (bi === "") {
      setNome("");
      setCurso("");
    }
  }, [bi]);

  const buscarEstudante = async () => {
    const response = await api.post("/estudante/user", {
      fk_user: sessionStorage.getItem("id"),
    });

    if (!response.data || response.data === null) {
      setMessage("Não Es Estudante!");
      return;
    }

    await api
      .post("estudante/user", {
        fk_user: sessionStorage.getItem("id"),
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setCurso(data.data.curso.curso);
        setBi(data.data.bi);
        setFk_curso(data.data.curso.id);
        setNome(data.data.nome);
        setFk_estudante(data.data.id);
        setPeriodo(data?.data?.periodo);
        if (data.data.periodo === "Diúrno") setValor(1900);
        else if (data.data.periodo === "Pós-Laboral") setValor(15000);
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

        if (!data.data || data.data !== null) {
          setAnos(data.data);
          setAno(data.data[0].ano);
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePagamento = async (data) => {
    if (
      data?.fk_ano === undefined ||
      data?.fk_semestre === undefined ||
      data?.fk_mes === undefined ||
      data?.rupe === 0 ||
      !data?.rupe
    ) {
      alert("Todos os Campos são Obrigatóro");
      return;
    }
    setIsLoad(true);

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
      })
      .then(async (data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));
          setIsLoad(false);
          return;
        }
        if (data.data.message === "exist") {
          setMessage("O Mês Já Foi Pago! ");
          dispatchWarning(toggleModalWarning(true));
          setIsLoad(false);
          return;
        }

        if (data.data.message === "sucess") {
          const response = await api.post("/solicitacao", {
            fk_estudante,
            tipoServico: "Propina",
            status: "Pendente",
          });

          if (response.data.message === "error") {
            dispatchError(toggleModalError(true));
            setIsLoad(false);

            return;
          }
          if (response.data.message === "sucess") {
            dispatch(setIsClic(true));
            setId(data.data?.response?.id);
            dispatchConfirmar(toggleModalConfirmar(true));
            setIsLoad(false);
          }
          return;
        }
      });
  };

  return (
    <>
      <UseWarning message={message} />
      <UseSucess />
      <UseErro />
      {isProcessing && <Processing message={message} />}

      <div className='propina'>
        <div className='conteudoProp'>
          <h3>Pagamento de Propina</h3>
          <Form className='formBiPropina'>
            <Space
              wrap
              style={{
                display: "flex",
                width: "100%",
                padding: "10px 0px",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                gap: "9px",
              }}>
              <label
                htmlFor='valor'
                style={{
                  color: "#fff",
                  alignItems: "center",
                }}>
                Valor:{""}
                <div
                  style={{
                    color: "#fff",
                  }}>
                  <Input
                    type='number'
                    className='inpform1'
                    readOnly
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                  />{" "}
                  Kz
                </div>
              </label>
              <label
                htmlFor='period'
                style={{
                  color: "#fff",
                  alignItems: "center",
                }}>
                Período:{""}
                <Input
                  type='text'
                  className='inpform1'
                  readOnly
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                />
              </label>
            </Space>
          </Form>
          <form className='form' onSubmit={handleSubmit(handlePagamento)}>
            <Space
              wrap
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}>
              <label
                htmlFor='rupe'
                style={{
                  alignItems: "center",
                }}>
                <TextField
                  type='number'
                  label='Rupe'
                  id='rupe'
                  placeholder='Digite o Número de Rupe'
                  maxLength={24}
                  {...register("rupe")}
                />
              </label>

              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>Mês</InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  labelId='demo-simple-select-label'
                  {...register("fk_mes")}
                  label='Frequência'
                  id='demo-simple-select'>
                  {meses.map((s) => (
                    <MenuItem value={s.id} key={s.id}>
                      {s.mes}
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
                  {...register("fk_semestre")}
                  label='Frequência'
                  id='demo-simple-select'>
                  {semestres.map((s) => (
                    <MenuItem value={s.id} key={s.id}>
                      {s.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  id='demo-simple-select'
                  {...register("fk_ano")}>
                  {anos.map((s) => (
                    <MenuItem value={s.id} key={s.id}>
                      {s.ano}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Space>
            <hr />
            {nome !== "" && curso !== "" && bi && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
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

                {!isLoad && (
                  <button className='btn' type='submit'>
                    Fazer Pagamento
                  </button>
                )}
                {isLoad && (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}>
                    <Loader />
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Propina;
