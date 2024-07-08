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
  Skeleton,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

const DeclaracaoDashboard = () => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState("");
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [tipos] = useSearchParams();
  const form = useForm();
  const { register, handleSubmit } = form;

  useEffect(() => {
    setFk_user(sessionStorage.getItem("id"));
    getAno();
  }, []);

  useEffect(() => {
    if (bi === "") {
      setNome("");
    }
  }, [bi]);

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
        setCurso(data.data.curso.curso);
        setNome(data.data.nome);
        setFk_estudante(data.data.id);
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

  const hendlePagamento = async (e) => {
    e.preventDefault();
    const daF = formatDateNumber(Date.now());
    let dateI = daF.replace(/-/g, "/");
    const partes = dateI.split("/");
    const di = `${partes[1]}/${partes[0]}/${partes[2]}`;
    await api
      .post("/propina", {
        frequencia,
        fk_estudante,
        fk_user,
        dataSolicitacao: di,
        desc:
          tipos.get("tipos") === "Linceciatura"
            ? "Declaração de " + tipos.get("tipos")
            : "Declaração  " + tipos.get("tipos"),
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
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
              gap: "20px",
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
                  <MenuItem value={s.ano} key={s.id}>
                    {s.ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <hr />
          {bi && nome && (
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
