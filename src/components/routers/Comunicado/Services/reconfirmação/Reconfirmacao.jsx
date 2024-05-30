import { useEffect, useRef, useState } from "react";
import "./reconfirmacao.scss";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import UseWarning from "../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../hook/massege/Error/UseErro";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../store/ui-slice";
import { Form, Input, Space, Alert, Button } from "antd";
import Loader from "../../../hook/load/Loader";
import Processing from "../../../hook/process/Processing";

const Reconfirmacao = () => {
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
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

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
    buscaAnoLeivo();
  }, [ano]);

  useEffect(() => {
    buscaFrequencia();
  }, [frequencia]);

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

    if (data.message === "está com dívida") {
      setCurso("");
      setMessage(`Está com Dívida de ${data.dividas.length} Meses!`);
      setIsProcessing(true);
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

        setCurso(data.data?.curso?.curso);
        setFk_curso(data.data?.curso?.id);
        setNome(data.data?.nome);
        setFk_estudante(data.data?.id);
        setBi(data.data?.bi);
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
        if (!data.data || data.data !== undefined) {
          setSemestre(data.data[0].nome);
          setSemestres(data.data);
        }
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
        if (!data.data || data.data !== undefined) {
          setAnos(data.data);
          setAno(data.data[0].ano);
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
        if (!data.data || data.data !== undefined) {
          setFrequencias(data.data);
          setFrequencia(data.data[0].ano);
        }
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
    setLoading(true);
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
      .then(async (data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        if (data.data?.message === "error") {
          dispatchError(toggleModalError(true));
          setLoading(false);
          return;
        }
        if (data.data?.message === "sucess") {
          const response = await api.post("/solicitacao", {
            fk_estudante,
            tipoServico: "Reconfirmação",
            status: "Pendente",
          });
          console.log();

          if (response.data.message === "error") {
            dispatchError(toggleModalError(true));
            setLoading(false);

            return;
          }
          dispatchConfirmar(toggleModalConfirmar(true));
          setId(data.data.response.id);
          setLoading(false);
          return;
        }
      });
  };

  return (
    <>
      {isProcessing && <Processing message={message} />}
      <UseWarning message={message} />
      <UseSucess />
      <UseErro />

      <div className='container-reconfirmacao'>
        <h3>Pagamento Reconfirmação</h3>
        <Space
          wrap
          style={{
            display: "flex",
            width: "98%",
            margin: "auto",
            flexDirection: "column",
            marginTop: "10",
            justifyContent: "center",
            background: "#b7b6b6",
            paddingBottom: "10px",
          }}
          align='center'>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
            <label htmlFor='valor'>
              Valor:
              <Input
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                type='number'
                placeholder='Digite o Número Valor'
              />
            </label>
            <label htmlFor='rupe'>
              Nº Rupe
              <Input
                value={rupe}
                onChange={(e) => setRupe(e.target.value)}
                type='number'
                placeholder='Digite o Número de Rupe'
                maxLength={24}
              />
            </label>
          </div>
          <div
            className='opcoesReconfirmacao'
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
          <div className='dados-estudanteReconfirmacao'>
            <h3>Dados do Estudante</h3>

            <label htmlFor='nome'>
              Nome:
              <Input
                type='text'
                value={nome}
                readOnly
                className='input'
                onChange={(e) => setNome(e.target.value)}
              />
            </label>

            <label htmlFor='curso'>
              Curso:
              <Input
                type='text'
                value={curso}
                readOnly
                className='input'
                onChange={(e) => setCurso(e.target.value)}
              />
            </label>
            <label htmlFor='bi'>
              Nº B.I:
              <Input
                type='text'
                value={bi}
                readOnly
                className='input'
                onChange={(e) => setBi(e.target.value)}
              />
            </label>

            {!loading && (
              <Button
                onClick={(e) => hendlePagamento(e)}
                className='btn'
                type='primary'>
                Pagar
              </Button>
            )}
            {loading && (
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
      </div>
    </>
  );
};

export default Reconfirmacao;
