import { useEffect, useRef, useState } from "react";
import "./propinas.scss";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import { PiPrinter } from "react-icons/pi";
import RelatorioPropina from "../relatorios/propina/Propina";
import { BiSearch } from "react-icons/bi";
import { TextField } from "@mui/material";
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

const PropinaDashboard = ({ tipo }) => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_mes, setFk_mes] = useState("");
  const [fk_estudante, setFk_estudante] = useState("");
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const [fk_ano, setFk_ano] = useState("");
  const [valor, setValor] = useState("");
  const [rupe, setRupe] = useState(0);
  const [fk_semestre, setFk_semestre] = useState("");
  const [mes, setMes] = useState("");
  const [meses, setMeses] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [visivel, setVisivel] = useState(false);
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    getMes();
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    // tiposServicos();
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

        setCurso(data.data.curso.curso);
        setFk_curso(data.data.curso.id);
        setNome(data.data.nome);
        setFk_estudante(data.data.id);
        setPeriodo(data?.data?.periodo);
        if (data.data?.periodo === "Diúrno") setValor(1900);
        else if (data.data?.periodo === "Pós-Laboral") setValor(15000);
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
        setFk_semestre(data.data.id);
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

  const hendlePagamento = async (e) => {
    e.preventDefault();
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      mes === "Escolha" ||
      rupe === 0 ||
      !rupe
    ) {
      dispatchError(toggleModalError(true));
      return;
    }

    await api
      .post("/propina", {
        fk_curso,
        fk_estudante,
        fk_mes,
        fk_semestre,
        fk_user,
        fk_ano,
        valor,
        rupe,
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
          const response = await api.post("/solicitacao", {
            fk_estudante,
            tipoServico: "Propina",
          });
          console.log(response.data);
          if (response.data.message === "error") {
            dispatchError(toggleModalError(true));

            return;
          }
          if (response.data.message === "sucess") {
            dispatch(setIsClic(true));
            setId(data.data?.response?.id);
            dispatchConfirmar(toggleModalConfirmar(true));
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
          <Form className='formBiPropina'>
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
            </Space>
          </Form>
          <form className='form' onSubmit={(e) => hendlePagamento(e)}>
            <Space
              wrap
              style={{
                display: "flex",
                justifyContent: "center",
                background: "#b7b6b6",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}>
              <label htmlFor='mes'>
                Mês:
                <select onChange={(e) => setMes(e.target.value)}>
                  <option value={"Escolha"}>Escolha...</option>
                  {meses.map((m) => (
                    <option value={m.mes} key={m.id}>
                      {m.mes}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor='semestre'>
                Semestre:
                <select onChange={(e) => setSemestre(e.target.value)}>
                  <option value={"Escolha"}>Escolha...</option>
                  {semestres.map((s) => (
                    <option value={s.nome} key={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor='anoLetivo'>
                Ano Lectivo
                <select onChange={(e) => setAno(e.target.value)}>
                  <option value={"Escolha"}>Escolha...</option>
                  {anos.map((ano) => (
                    <option value={ano.ano} key={ano.id}>
                      {ano.ano}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor='rupe'>
                Nº RUPE:
                <Input
                  type='number'
                  placeholder='Digite o Nº de RUPE'
                  value={rupe}
                  onChange={(e) => setRupe(e.target.value)}
                  maxLength={20}
                  style={{ width: "100%", border: "1px solid #a31543" }}
                />
              </label>
              <input
                type='text'
                value={fk_mes}
                onChange={(e) => setFk_mes(e.target.value)}
                hidden
              />
              <input
                type='text'
                value={fk_semestre}
                onChange={(e) => setFk_semestre(e.target.value)}
                hidden
              />
              <input
                type='text'
                value={fk_ano}
                onChange={(e) => setFk_ano(e.target.value)}
                hidden
              />
            </Space>
            <hr />
            {bi !== "" && nome !== "" && curso !== "" ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#b7b6b6",
                }}>
                <h2>Dados do Estudante</h2>
                <Space wrap align='center'>
                  <br />
                  <label htmlFor='nome'>
                    {" "}
                    Nome:
                    <Input
                      type='text'
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      readOnly
                      className='input'
                      style={{
                        fontSize: "12pt",
                        width: "auto",
                      }}
                    />
                  </label>
                  <label htmlFor='curso'>
                    Curso:
                    <Input
                      type='text'
                      value={curso}
                      onChange={(e) => setCurso(e.target.value)}
                      readOnly
                      name='curso'
                      className='input'
                      style={{
                        fontSize: "12pt",
                        width: "auto",
                      }}
                    />
                  </label>
                </Space>
                <button className='btn'>Fazer Pagamento</button>
              </div>
            ) : (
              <></>
            )}
          </form>
          <div className='imprimirPropina' onClick={() => setVisivel(true)}>
            <PiPrinter color='#fff' size={20} cursor={"pointer"} />
            <span>Relatório</span>
          </div>
        </div>
      </div>

      <RelatorioPropina
        setVisivel={setVisivel}
        visivel={visivel}
        tipo={tipo}
        id={id}
      />
    </>
  );
};

export default PropinaDashboard;
