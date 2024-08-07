import { useEffect, useRef, useState } from "react";
import "./declaracao.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Button, Form, Input } from "antd";
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
import { useDispatch } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
} from "../../../../../../../store/ui-slice";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import Processing from "../../../../../hook/process/Processing";
import Ispm from "../../../../../hook/Ispm";

const DeclaracaoDashboard = () => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [frequencias, setFrequencias] = useState([]);
  const [fk_frequencia, setFk_frequencia] = useState("");
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [valor, setValor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [tipos] = useSearchParams();
  const dispatch = useDispatch();
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
    setLoading(true);
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
        setCurso(data.data?.curso?.curso);
        setNome(data.data?.nome);
        setFk_estudante(data.data?.id);
        setLoading(false);
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
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const hendlePagamento = async () => {
    await api
      .post("/declaracoes", {
        fk_frequencia,
        fk_estudante,
        valor: parseFloat(valor),
        fk_user: sessionStorage.getItem("id"),
        tipoDeclaracao:
          tipos.get("tipos") === "Linceciatura"
            ? "Declaração de " + tipos.get("tipos")
            : "Declaração " + tipos.get("tipos"),
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "sucess") {
          dispatch(toggleModalConfirmar(true));
          let id = null;
          let co = 0;

          id = setInterval(() => {
            navigate(
              `/relatorio_declaracao/${
                data.data?.response?.id
              }?tipo=${tipos.get("tipos")}`
            );
            if (co === 4) return clearInterval(id);
            co++;
          }, 5000);
          return;
        }
        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading && <Ispm />}
      <UseSucess />
      <UseErro />
      {isProcessing && <Processing message={message} />}
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
                onChange={(e) => setFk_frequencia(e.target.value)}
                id='demo-simple-select'>
                {frequencias.map((s) => (
                  <MenuItem value={s.id} key={s.id}>
                    {s.ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label='Valor'
              type='number'
              onChange={(e) => setValor(e.target.value)}
            />
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
                value={curso}
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

              <Button
                className='btnDeclaracao'
                type='primary'
                onClick={() => hendlePagamento()}>
                Pagar
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeclaracaoDashboard;
