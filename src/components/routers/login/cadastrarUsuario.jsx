import { ChangeEvent, useEffect, useState } from "react";
import "./CadastroUsuario.css";
import { Navigate, useNavigate } from "react-router-dom";
import { chatflech } from "../../../configs/axios/chatfletch";
import { AiOutlineCheck } from "react-icons/ai";
import { BiSolidContact, BiX } from "react-icons/bi";
import { api } from "../../../../auth/auth";
import { Button, Card, Form, Input } from "antd";
import {
  CheckCircleFilled,
  ContactsFilled,
  UserOutlined,
} from "@ant-design/icons/lib/icons";
import {
  PiAddressBookFill,
  PiIdentificationCard,
  PiPassword,
  PiPasswordFill,
} from "react-icons/pi";

const EMAIL_REGEX = /^([a-zA-Z])+([0-9])*@gmail([\.])com$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;
const UPPER_CASE = /[A-Z]/;
const LOWER_CASE = /[a-z]/;
const DIGIT = /[0-9]/;
const CHA_SPECIAL = /[!@#$%*]/;
const LENGTH = / .{8,24}$/;

function CadastrarUsuario() {
  const navigate = useNavigate();

  const btn = document.getElementsByClassName("btn");
  const formArray = [1, 2];
  const [form, setForm] = useState(formArray[0]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [contacto, setContacto] = useState("");
  const [cursos, setCursos] = useState([]);
  const [bi, setBi] = useState("");
  const [errorPasswordConf, setErrorPasswordConf] = useState("");
  const [validEmail, setvalidEmail] = useState(false);
  const [validPassword, setvalidPassword] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [digit, setDigit] = useState(false);
  const [chaEspecial, setChaSpecial] = useState(false);
  const [length, setLength] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (password) {
      setvalidPassword(PASSWORD_REGEX.test(password));
      setChaSpecial(CHA_SPECIAL.test(password));
      setDigit(DIGIT.test(password));
      setUpperCase(UPPER_CASE.test(password));
      setLowerCase(LOWER_CASE.test(password));
      console.log(LENGTH.test(password));

      if (password.length >= 8) {
        setLength(true);
      } else {
        setLength(false);
      }
    }
  }, [password]);
  useEffect(() => {
    setvalidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  async function hendleUsuario(e) {
    e.preventDefault();

    if (password !== confPassword) {
      setErrorPasswordConf("Senha diferente tenta novamente");
    } else {
      const response = await chatflech.post("/user", {
        nome,
        email,
        password,
        contacto,
        bi,
      });
      console.log(response.data);
      sessionStorage.setItem("id", response.data.response?.id);
      sessionStorage.setItem("user", response.data.response?.nome);
      navigate("/login");
    }
  }
  useEffect(() => {
    setConfPassword("");
    setNome("");
    setPassword("");
    setEmail("");
    setContacto("");
    setErrorPasswordConf("");
  }, []);
  const avancar = (e) => {
    e.preventDefault();
    setForm(form + 1);
  };
  const voltar = (e) => {
    e.preventDefault();
    setForm(form - 1);
  };

  return (
    <div className="container-cadastro">
      <Form className="form-cadastro" onSubmitCapture={hendleUsuario}>
        <div className="img">
          <img src="./image/ISP_Moxico/Logo.png" alt="" />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {formArray.map((v, i) => (
            <>
              <div
                style={
                  form - 1 === i || form - 1 === i + 1
                    ? {
                        display: "flex",
                        width: "30px",
                        height: "30px",
                        alignItems: "center",
                        borderRadius: "50%",
                        background: "#a31543",
                        color: "#fff",
                        justifyContent: "center",
                      }
                    : {
                        display: "flex",
                        width: "30px",
                        height: "30px",
                        alignItems: "center",
                        borderRadius: "50%",
                        background: "#999",
                        color: "#fff",
                        justifyContent: "center",
                      }
                }>
                {v}
              </div>
              {i !== formArray.length - 1 && (
                <div
                  style={
                    form === i + 2
                      ? {
                          width: "35px",
                          height: "2px",
                          background: "#a31543",
                        }
                      : {
                          width: "35px",
                          height: "2px",
                          background: "#999",
                        }
                  }></div>
              )}
            </>
          ))}
        </div>
        {form === 1 && (
          <>
            <div className="input">
              <Input
                type="text"
                name="nome"
                placeholder="Digite o seu Nome"
                required
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                autoComplete="false"
                autoFocus
                title="Digite o Seu Nome"
                prefix={<UserOutlined />}
                style={{
                  border: "1px solid #000",
                  marginTop: "10px",
                  padding: "10px",
                }}
                allowClear
              />
            </div>
            <div>
              <div className="input">
                <Input
                  type="text"
                  name="bi"
                  placeholder="Digite o seu Número do BI"
                  required
                  value={bi}
                  onChange={(e) => {
                    setBi(e.target.value);
                  }}
                  autoComplete="false"
                  title="Digite o Seu Nº de BI"
                  maxLength={14}
                  showCount
                  prefix={<PiIdentificationCard />}
                  style={
                    bi && bi.length === 14
                      ? {
                          marginTop: "10px",
                          border: "1px solid green",
                          padding: "10px",
                        }
                      : {
                          marginTop: "10px",
                          border: "1px solid red",
                          padding: "10px",
                        }
                  }
                  allowClear
                />
              </div>

              <div className="inputEmail input">
                <Input
                  type="text"
                  name="email"
                  placeholder="Digite o seu número de email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="false"
                  title="Digite um email Válido"
                  className={email && validEmail ? "valido" : "invalido"}
                  style={
                    email && validEmail
                      ? {
                          marginTop: "10px",
                          border: "1px solid green",
                          padding: "10px",
                        }
                      : {
                          marginTop: "10px",
                          border: "1px solid red",
                          padding: "10px",
                        }
                  }
                  allowClear
                />
              </div>
              <p className={email && !validEmail ? "showScreen" : "offScreen"}>
                Digite um email Válido!
              </p>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "end",
              }}>
              <Button
                type="primary"
                style={{ padding: "10px" }}
                onClick={(e) => avancar(e)}
                disabled={
                  email && validEmail && bi && nome && bi.length === 14
                    ? false
                    : true
                }>
                Avançar
              </Button>
            </div>
          </>
        )}

        {form === 2 && (
          <>
            <div>
              <div className="input">
                <Input
                  type="number"
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                  placeholder="Digite Seu Contacto"
                  title="Digite o Seu Contacto"
                  showCount
                  maxLength={9}
                  prefix={<ContactsFilled />}
                  style={
                    contacto.length === 9
                      ? {
                          marginTop: "10px",
                          border: "1px solid green",
                          padding: "10px",
                        }
                      : {
                          marginTop: "10px",
                          border: "1px solid red",
                          padding: "10px",
                        }
                  }
                  allowClear
                />
              </div>
              <div className="inputPassword input">
                <Input.Password
                  className={password && validPassword ? "valido" : "invalido"}
                  type={check ? "text" : "password"}
                  name="password"
                  placeholder="Digite a sua senha"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="of"
                  title="8 ou 24 character, Maiúscula e Minúscula, número e entre !@#$%*"
                  showCount
                  minLength={8}
                  prefix={<PiPassword />}
                  style={
                    password && validPassword
                      ? {
                          marginTop: "10px",
                          border: "1px solid green",
                          padding: "10px",
                        }
                      : {
                          marginTop: "10px",
                          border: "1px solid red",
                          padding: "10px",
                        }
                  }
                  allowClear
                />
              </div>

              <div
                className={
                  password && !validPassword ? "showScreen" : "offScreen"
                }>
                <div>
                  <span>1- Deve ter letras maiusculas</span>
                  <AiOutlineCheck
                    color="green"
                    size={"25px"}
                    className={
                      password && upperCase ? "checkedValidScreen" : "checked"
                    }
                  />
                  <BiX
                    color="red"
                    size={"25"}
                    className={
                      password && !upperCase ? "checkedValidScreen" : "checked"
                    }
                  />
                </div>
                <div>
                  <span>2- Deve ter letras minusculas</span>
                  <AiOutlineCheck
                    color="green"
                    size={"25px"}
                    className={
                      password && lowerCase ? "checkedValidScreen" : "checked"
                    }
                  />
                  <BiX
                    color="red"
                    size={"25"}
                    className={
                      password && !lowerCase ? "checkedValidScreen" : "checked"
                    }
                  />
                </div>
                <div>
                  {" "}
                  <span>3- Deve ter números </span>
                  <AiOutlineCheck
                    color="green"
                    size={"25px"}
                    className={
                      password && digit ? "checkedValidScreen" : "checked"
                    }
                  />
                  <BiX
                    color="red"
                    size={"25"}
                    className={
                      password && !digit ? "checkedValidScreen" : "checked"
                    }
                  />
                </div>
                <div>
                  <span>4- Carácteres permitidos: !@#$%* {}</span>
                  <AiOutlineCheck
                    color="green"
                    size={"25px"}
                    className={
                      password && chaEspecial ? "checkedValidScreen" : "checked"
                    }
                  />
                  <BiX
                    color="red"
                    size={"25"}
                    className={
                      password && !chaEspecial
                        ? "checkedValidScreen"
                        : "checked"
                    }
                  />
                </div>
                <div>
                  <span>5- Quantidade de carácteres 8 a 24 .</span>
                  <AiOutlineCheck
                    color="green"
                    size={"25px"}
                    className={
                      password && length ? "checkedValidLen" : "checked"
                    }
                  />
                  <BiX
                    color="red"
                    size={"25"}
                    className={
                      password && !length ? "checkedValidScreen" : "checked"
                    }
                  />
                </div>
              </div>

              <div className="input">
                <Input.Password
                  type={check ? "text" : "password"}
                  name="confirmarPassword"
                  placeholder="Confirme a sua senha"
                  required
                  value={confPassword}
                  onChange={(e) => {
                    setConfPassword(e.target.value);
                  }}
                  title="Confirme a Sua Senha"
                  showCount
                  minLength={9}
                  prefix={<PiPassword />}
                  style={{
                    marginTop: "10px",
                    border: "1px solid #000",
                    padding: "10px",
                  }}
                  allowClear
                />
              </div>
            </div>

            <p className="errorPasswordConf">{errorPasswordConf}</p>
            <div
              style={{
                display: "flex",
                marginTop: "40px",
                justifyContent: "space-between",
              }}>
              <Button
                style={{ padding: "10px" }}
                type="default"
                onClick={(e) => voltar(e)}>
                Voltar
              </Button>
              <Button
                style={{
                  padding: "10px",
                }}
                type="primary"
                disabled={
                  validEmail &&
                  validPassword &&
                  nome &&
                  bi &&
                  contacto.length === 9 &&
                  confPassword
                    ? false
                    : true
                }>
                Cadastrar-se
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export default CadastrarUsuario;
