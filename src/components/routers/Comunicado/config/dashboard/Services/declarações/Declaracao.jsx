import { useEffect, useRef, useState } from "react";
import "./declaracao.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Form, Input } from "antd";
import { api } from "../../../../../../../../auth/auth";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

const DeclaracaoDashboard = () => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_mes, setFk_mes] = useState(0);
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [fk_curso, setFk_curso] = useState(0);
  const [fk_ano, setFk_ano] = useState(0);
  const [fk_semestre, setFk_semestre] = useState(0);
  const [mes, setMes] = useState("");
  const [meses, setMeses] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState([]);
  const [disciplina, setDisciplina] = useState([]);
  const [semestre, setSemestre] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [tipos] = useSearchParams();
  const form = useForm();
  const { register, handleSubmit } = form;

  useEffect(() => {
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    getAno();
  }, []);

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
    buscaAnoLeivo();
  }, [fk_curso && frequencia]);

  const buscarEstudante = async () => {
    await api
      .post("/search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
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
  const getMes = async () => {
    await api
      .get("/mes")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setMes(data.data[0].mes);
        console.log(data.data[0].mes);
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
    await api
      .post("/propina", {
        fk_curso,
        fk_estudante,
        fk_mes,
        fk_semestre,
        fk_user,
        fk_ano,
        valor,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      });
  };

  return (
    <>
      <div
        className='container-declaracao'
        style={{
          paddingTop: "20px",
        }}>
        <div className='conteudo'>
          <Form className='formBiD' onSubmitCapture={() => buscarEstudante()}>
            <Input.Search
              placeholder='Número de BI do Estudante'
              value={bi}
              onChange={(e) => setBi(e.target.value)}
              autoFocus
              maxLength={14}
              style={{ width: "80%" }}
              loading={loading}
              onSearch={() => buscarEstudante()}
            />
          </Form>

          <div
            style={{
              display: "flex",
              margin: "auto",
              width: "70%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}>
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
                  <MenuItem value={s.id} key={s.id}>
                    {s.ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                padding: "10px 0px",
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

              <button className='btnDeclaracao' type='submit'>
                Pagar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeclaracaoDashboard;
