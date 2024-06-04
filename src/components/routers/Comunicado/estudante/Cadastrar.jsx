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
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  let options = [];

  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  const navigete = useNavigate();

  useEffect(() => {
    getCursos();
  }, []);

  const getBi = async () => {
    await api
      .post("/user/bi", { bi })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }
        setUserBi(data.data.bi);
        setFk_user(data.data.id);
      })
      .catch((err) => console.log(err));
  };
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
      !fk_user ||
      curso === "Escolha" ||
      periodo === ""
    ) {
      setMessage("Existe Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .post("/estudante", {
        fk_curso,
        nome,
        bi: userBi,
        contato,
        fk_user,
        periodo,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
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
        dispatchConfirmar(toggleModalConfirmar(true));
        setBi("");
        setNome("");
        setContato("");
        setUserBi("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <UseErro />
      <UseSucess />
      <UseWarning message={message} />

      <div className='container-cadastrar'>
        <div className='pesquisa'>
          <Form className='Form' onSubmitCapture={() => getBi()}>
            <Input.Search
              type='search'
              placeholder='Nº de BI do Estudante'
              required
              value={bi}
              onChange={(e) => setBi(e.target.value)}
              autoFocus
              maxLength={14}
              allowClear
              onSearch={() => getBi()}
              showCount={true}
              style={{
                border: "1px solid #a31543",
                width: "50%",
                marginTop: "10px",
                fontSize: "14pt",
              }}
            />
          </Form>
        </div>
        <Form className='form-cad'>
          <h2>Cadastro do Estudante</h2>
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

            <div className='periodo'>
              <div>
                <RadioGroup
                  name='use-radio-group'
                  onChange={(e) => setPeriodo(e.target.value)}>
                  <FormControlLabel
                    value='Diúrno'
                    label='Diúrno'
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value='Pós-Laboral'
                    label='Pós-Laboral'
                    control={<Radio />}
                  />
                </RadioGroup>
              </div>
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
              disabled
              value={userBi}
              onChange={(e) => setUserBi(e.target.value)}
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
          {nome && bi && contato && fk_curso && fk_user && periodo && (
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
