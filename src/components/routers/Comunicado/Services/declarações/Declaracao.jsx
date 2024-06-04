import { useEffect, useRef, useState } from "react";
import "./declaracao.css";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { Input, Space } from "antd";
import Processing from "../../../hook/process/Processing";
import UseSucess from "../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../hook/massege/Error/UseErro";
import UseWarning from "../../../hook/massege/warning/UseWarning";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

const Declaracao = () => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [fk_curso, setFk_curso] = useState(0);
  const [frequencias, setFrequencias] = useState([]);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm();
  const { register, handleSubmit } = form;
  const [tipo] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    getAno();
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
    if (!response.data) {
      setMessage("Não Es Estudante!");
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
        setFk_curso(data.data.curso?.id);
        setNome(data.data?.nome);
        setFk_estudante(data.data?.id);
        setBi(data.data?.bi);
        setIsProcessing(false);
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
    await api.post("/propina", {}).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
    });
  };

  return (
    <>
      {isProcessing && <Processing message={message} />}
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />
      <form className='container-declaracao'>
        <div
          className='conteudo-declaracao'
          style={{
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}>
          <h3>Declaração {tipo.get("tipos")}</h3>
          <FormControl
            fullWidth
            style={{
              width: "200px",
              margin: "auto",
            }}>
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

          <hr />
          {curso && nome && bi && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: "10px",
              }}>
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

              <button className='btn' type='submit'>
                Fazer Pagamento
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Declaracao;
