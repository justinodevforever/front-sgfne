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
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Reconfirmacao = () => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_estudante, setFk_estudante] = useState("");
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
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

  const form = useForm();
  const { register, handleSubmit } = form;

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
    if (bi === "") {
      setNome("");
      setCurso("");
    }
  }, [bi]);

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

  const handlePagamento = async (data) => {
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
        fk_semestre: data.fk_semestre,
        fk_user,
        fk_ano: data.fk_ano,
        valor: Number(data.valor),
        rupe: Number(data.rupe),
        fk_frequencia: data.fk_frequencia,
      })
      .then(async (data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data?.message === "error") {
          dispatchError(toggleModalWarning(true));
          setLoading(false);
          return;
        }
        if (data.data?.message === "sucess") {
          // const response = await api.post("/solicitacao", {
          //   fk_estudante,
          //   tipoServico: "Reconfirmação",
          //   status: "Pendente",
          // });

          // if (response.data.message === "error") {
          //   dispatchError(toggleModalError(true));
          //   setLoading(false);

          //   return;
          // }
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

      <form
        className='container-reconfirmacao'
        onSubmit={handleSubmit(handlePagamento)}>
        <h3>Pagamento Reconfirmação</h3>
        <Space
          wrap
          style={{
            display: "flex",
            width: "98%",
            margin: "auto",
            flexDirection: "column",
            marginTop: "10px",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
          align='center'>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
            <TextField label='Valor' type='number' {...register("valor")} />

            <TextField
              type='number'
              label='Rupe'
              maxLength={24}
              {...register("rupe")}
            />
          </div>
          <Space
            wrap
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
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
                {...register("fk_ano")}
                label='Ano Lectivo'
                id='demo-simple-select'>
                {anos.map((s) => (
                  <MenuItem value={s.id} key={s.id}>
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
                {...register("fk_frequencia")}
                label='Frequência'
                id='demo-simple-select'>
                {frequencias.map((s) => (
                  <MenuItem value={s.id} key={s.id}>
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
                label='semestre'
                id='demo-simple-select'
                {...register("fk_semestre")}>
                {semestres.map((s) => (
                  <MenuItem value={s.id} key={s.id}>
                    {s.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Space>
        </Space>
        <hr />
        {curso && bi && nome && (
          <div className='dados-estudanteReconfirmacao'>
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
              {...register("nome")}
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

            {!loading && (
              <button className='btn' type='submit'>
                Pagar
              </button>
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
      </form>
    </>
  );
};

export default Reconfirmacao;
