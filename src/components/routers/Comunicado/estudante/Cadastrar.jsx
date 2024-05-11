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
import { Button, Form, Input, Alert, Modal, ConfigProvider } from "antd";
import {
  UserOutlined,
  SaveOutlined,
  ContactsOutlined,
  ContactsFilled,
} from "@ant-design/icons/lib/icons";
import { PiIdentificationBadge, PiStudent } from "react-icons/pi";

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
                width: "90%",
                marginTop: "10px",
                fontSize: "14pt",
              }}
            />
          </Form>
        </div>
        <Form className='form-cad'>
          <h2>Cadastro do Estudante</h2>
          <div className='novos'>
            <label htmlFor='curso'>
              Curso:
              <select onChange={(e) => setCurso(e.target.value)} id='curso'>
                <option value='Escolha'>Escolha Curso...</option>
                {cursos.map((curso) => (
                  <option value={curso.curso} key={curso.id}>
                    {curso.curso}
                  </option>
                ))}
              </select>
            </label>
            <div className='periodo'>
              <div>
                <input
                  type='radio'
                  id='diurno'
                  name='periodo'
                  value={"Diúrno"}
                  onChange={(e) => setPeriodo(e.target.value)}
                />
                <label htmlFor='diurno'>Diúrno</label>
              </div>
              <div>
                <input
                  type='radio'
                  id='posLaboral'
                  name='periodo'
                  value={"Pós-Laboral"}
                  onChange={(e) => setPeriodo(e.target.value)}
                />
                <label htmlFor='posLaboral'>Pós-Laboral</label>
              </div>
            </div>
          </div>
          <Input
            type='text'
            id='nome'
            placeholder='Nome do Estudante'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            prefix={<PiStudent />}
            color='black'
            allowClear
            style={{
              border: "1px solid #a31543",
              width: "90%",
              marginTop: "10px",
              fontSize: "14pt",
            }}
          />
          <Input
            type='text'
            id='bi'
            placeholder='Nº de BI do Estudante'
            required
            disabled
            value={userBi}
            onChange={(e) => setUserBi(e.target.value)}
            style={{
              border: "1px solid #a31543",
              width: "90%",
              marginTop: "10px",
              fontSize: "14pt",
            }}
            prefix={<PiIdentificationBadge />}
          />
          <Input
            type='number'
            id='contacto'
            placeholder='Contacto do Estudante'
            required
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            prefix={<ContactsFilled />}
            allowClear
            maxLength={9}
            showCount={true}
            style={{
              border: "1px solid #a31543",
              width: "90%",
              marginTop: "10px",
              fontSize: "14pt",
            }}
          />
          {nome && bi && contato && fk_curso && fk_user && (
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
