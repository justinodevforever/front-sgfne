import { useNavigate } from "react-router-dom";
import { api } from "../../../../../auth/auth";
import "./cadastrar.scss";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import UseErro from "../../hook/massege/Error/UseErro";
import UseSucess from "../../hook/massege/sucess/UseSucess";
import UseWarning from "../../hook/massege/warning/UseWarning";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../store/ui-slice";
import { Button, Form, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons/lib/icons";
import { PiIdentificationBadge, PiStudent } from "react-icons/pi";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const Cadastrar = () => {
  const [bi, setBi] = useState("");
  const [userBi, setUserBi] = useState("");
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [ativar, setAtivar] = useState(false);
  const [message, setMessage] = useState("");
  const [curso, setCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [fk_frequencia, setFk_frequencia] = useState(0);
  const [rupe, setRupe] = useState(0);
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const [sexo, setSexo] = useState("");
  const [valor, setValor] = useState("");
  let options = [];

  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getCursos();
    getFrequencia();
  }, []);

  const getCursos = async () => {
    await api
      .get("/curso")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }

        setCursos(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getFrequencia = async () => {
    await api
      .get("/ano")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }

        setFrequencias(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    options.push();
    const pegarCurso = async () => {
      await api
        .post("/curso/especifico", { curso })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigete("/login");
            return;
          }

          setFk_curso(data.data?.id);
        })
        .catch((err) => console.log(err));
    };
    pegarCurso();
  }, [curso]);

  const hendleEstudante = async () => {
    if (
      !fk_curso ||
      !nome ||
      !bi ||
      !contato ||
      curso === "Escolha" ||
      !sexo ||
      periodo === "" ||
      valor === 0
    ) {
      setMessage("Existe Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .post("/matricula", {
        fk_curso,
        nome,
        bi,
        contato,
        regime: periodo,
        sexo,
        fk_frequencia,
        valor: parseFloat(valor),
        fk_user: sessionStorage.getItem("id"),
        rupe,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data.message === "exist") {
          setMessage("Este Estudante já Existe");
          dispatchWarning(toggleModalWarning(true));

          return;
        }
        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));

          return;
        }
        if (data.data.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          setBi("");
          setNome("");
          setContato("");
          setUserBi("");
          let id = null;
          let co = 0;

          id = setInterval(() => {
            navigate(`/recibo_matricula/${data.data?.response?.id}`);
            if (co === 4) return clearInterval(id);
            co++;
          }, 5000);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <UseErro />
      <UseSucess />
      <UseWarning message={message} />

      <div className='container-cadastrar'>
        <Form className='form-cad'>
          <div className='novos'>
            <FormControl fullWidth>
              <InputLabel htmlFor='demo-simple-select-label'>Curso</InputLabel>
              <Select
                style={{
                  width: "200px",
                }}
                labelId='demo-simple-select-label'
                onChange={(e) => setCurso(e.target.value)}
                label='Curso'
                id='demo-simple-select'>
                {cursos.map((s) => (
                  <MenuItem value={s.curso} key={s.id}>
                    {s.curso}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type='number'
              id='valor'
              label='Valor'
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
              style={{
                width: "60%",
              }}
            />
            <div className='periodo'>
              <RadioGroup
                name='use-radio-group'
                style={{
                  width: "100%",
                  fontSize: "10px",
                }}
                onChange={(e) => setPeriodo(e.target.value)}>
                <FormControlLabel
                  value='Regular'
                  label='Regular'
                  control={<Radio />}
                  defaultChecked={true}
                />
                <FormControlLabel
                  value='Pós-Laboral'
                  label='Pós-L.'
                  control={<Radio />}
                />
              </RadioGroup>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "20px",
              marginTop: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}>
              Género
              <RadioGroup
                tabIndex={1}
                name='genero'
                style={{
                  display: "flex",
                  fontSize: "10px",
                }}
                onChange={(e) => setSexo(e.target.value)}>
                <FormControlLabel
                  value='M'
                  label='Masculino'
                  control={<Radio />}
                  defaultChecked={true}
                />
                <FormControlLabel
                  value='F'
                  label='Feminino'
                  control={<Radio />}
                />
              </RadioGroup>
              <TextField
                type='number'
                id='rupe'
                label='Rupe'
                value={rupe}
                onChange={(e) => setRupe(e.target.value)}
                required
                style={{
                  width: "100%",
                }}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>
                  Frequência
                </InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  labelId='demo-simple-select-label'
                  onChange={(e) => setFk_frequencia(e.target.value)}
                  label='Frequência'
                  id='demo-simple-select'>
                  {frequencias.map((s) => (
                    <MenuItem value={s.id} key={s.id}>
                      {s.ano}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              type='text'
              id='nome'
              label='Nome do Estudante'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{
                width: "60%",
              }}
            />
            <TextField
              type='text'
              id='bi'
              label='Nº de BI do Estudante'
              required
              value={bi}
              onChange={(e) => setBi(e.target.value)}
              style={{
                width: "60%",
              }}
            />
            <TextField
              type='number'
              id='contacto'
              label='Contacto do Estudante'
              required
              value={contato}
              onChange={(e) => setContato(e.target.value)}
              style={{
                width: "60%",
              }}
            />
          </div>
          {nome && bi && contato && periodo && (
            <Button
              onClick={() => hendleEstudante()}
              prefix={<SaveOutlined />}
              icon={<SaveOutlined />}
              style={{ marginTop: "30px" }}
              type='primary'>
              Cadastrar
            </Button>
          )}
        </Form>
      </div>
    </>
  );
};

export default Cadastrar;
