import { useEffect, useRef, useState } from "react";
import "./reconfirmacao.css";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import RelatorioReconfirmacao from "../relatorios/reconfirmação/Reconfirmacao";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";
import { Form, Input, Space, Alert, Button } from "antd";
import Processing from "../../../../../hook/process/Processing";
import { TextField } from "@mui/material";

const ReconfirmacaoDashboard = () => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_estudante, setFk_estudante] = useState("");
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const [fk_ano, setFk_ano] = useState("");
  const [fk_semestre, setFk_semestre] = useState("");
  const [valor, setValor] = useState(0);
  const [rupe, setRupe] = useState(0);
  const [fk_frequencia, setFk_frequencia] = useState("");
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [ano, setAno] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [semestre, setSemestre] = useState("");
  const navigate = useNavigate();
  const [visivel, setVisivel] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

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
    buscaFrequencia();
  }, [frequencia]);

  const buscarEstudante = async () => {
    const { data } = await api.post("/divida", { bi });

    if (data.message === "está com dívida") {
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
        setFrequencia(data.data[0].ano);
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

  const hendlePagamento = async () => {
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      ano === "" ||
      semestre == "" ||
      frequencia == ""
    ) {
      setMessage("Existe Campo vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .post("/reconfirmacao", {
        fk_curso,
        fk_estudante,
        fk_semestre,
        fk_user,
        fk_ano,
        valor: Number(valor),
        rupe,
        fk_frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data?.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          setId(data.data.response.id);
          let id;

          id = setInterval(() => {
            setVisivel(true);
          }, 4000);
          return () => clearInterval(id);
        }
        if (data.data?.message === "error") {
          dispatchError(toggleModalError(true));
          return;
        }
      });
  };

  return (
    <>
      <RelatorioReconfirmacao
        setVisivel={setVisivel}
        visivel={visivel}
        id={id}
      />
      <UseWarning message={message} />
      <UseSucess />
      <UseErro />
      {isProcessing && <Processing message={message} />}

      <div className='container-reconfirmacao'>
        <Form className='formBir'>
          <Input.Search
            placeholder='Número de BI do Estudante'
            value={bi}
            onChange={(e) => setBi(e.target.value)}
            autoFocus
            maxLength={14}
            style={{ width: "80%" }}
            onSearch={() => buscarEstudante()}
          />
        </Form>

        <Space
          wrap
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            background: "red",
          }}
          align='center'>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px",
              justifyContent: "center",
            }}>
            <label htmlFor='rupe'>
              <TextField
                onChange={(e) => setRupe(e.target.value)}
                type='number'
                label='Nº Rupe'
                maxLength={24}
                style={{
                  background: "#fff",
                }}
              />
            </label>
            <label htmlFor='valor'>
              <TextField
                onChange={(e) => setValor(e.target.value)}
                type='number'
                label='Valor'
              />
            </label>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              marginTop: "40px",
              justifyContent: "center",
            }}>
            <label htmlFor='frequencia'>
              Frequência:
              <select onChange={(e) => setFk_frequencia(e.target.value)}>
                <option value={"Escolhe"}>Escolha...</option>

                {frequencias.map((f) => (
                  <option value={f.id} key={f.id}>
                    {f.ano}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor='semestre'>
              Semestre:
              <select onChange={(e) => setSemestre(e.target.value)}>
                <option value={"Escolhe"}>Escolha...</option>

                {semestres.map((s) => (
                  <option value={s.nome} key={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor='cadeira'>
              Ano Lectivo:
              <select onChange={(e) => setAno(e.target.value)}>
                <option value={"Escolhe"}>Escolha...</option>

                {anos.map((s) => (
                  <option value={s.ano} key={s.id}>
                    {s.ano}
                  </option>
                ))}
              </select>
            </label>
          </div>
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

            <Button
              onClick={(e) => hendlePagamento(e)}
              className='btn'
              type='primary'>
              Pagar
            </Button>
          </div>
        )}
        <input
          type='text'
          value={fk_frequencia}
          onChange={(e) => setFk_frequencia(e.target.value)}
          hidden
        />
        <input
          type='text'
          value={fk_ano}
          onChange={(e) => setFk_ano(e.target.value)}
          hidden
        />
        <input
          type='text'
          value={fk_semestre}
          onChange={(e) => setFk_semestre(e.target.value)}
          hidden
        />
        {/* <div className="imprimir" onClick={() => setVisivel(true)}>
            <PiPrinter color="#fff" size={20} cursor={"pointer"} />
            <span>Relatório</span>
          </div> */}
      </div>
    </>
  );
};

export default ReconfirmacaoDashboard;
