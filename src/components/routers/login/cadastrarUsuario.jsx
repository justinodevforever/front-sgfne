import { ChangeEvent, useEffect, useState } from "react";
import "./CadastroUsuario.css";
import { Navigate, useNavigate } from "react-router-dom";
import { chatflech } from "../../../configs/axios/chatfletch";
import { AiOutlineCheck } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import { api } from "../../../../auth/auth";

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

  return (
    <div className="container-cadastro">
      <form className="form-cadastro" onSubmit={hendleUsuario}>
        <h3>FAZ PARTE DA GRANDE FAMÍLIA ISPM</h3>
        <div className="img">
          <img src="./image/ISP_Moxico/Logo.png" alt="" />
        </div>
        <div className="input">
          <input
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
          />
        </div>
        <div className="input">
          <input
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
          />
        </div>

        <div className="inputEmail input">
          <input
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
          />
          <AiOutlineCheck
            color="green"
            size={"25px"}
            className={email && validEmail ? "checkedValid" : "checked"}
          />
          <BiX
            color="red"
            size={"25"}
            className={email && !validEmail ? "checkedValid" : "checked"}
          />
        </div>
        <p className={email && !validEmail ? "showScreen" : "offScreen"}>
          Digite um email Válido!
        </p>

        <div className="input">
          <input
            type="text"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="Digite Seu Contacto"
            title="Digite o Seu Contacto"
          />
        </div>

        <div className="inputPassword input">
          <input
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
          />
          <AiOutlineCheck
            color="green"
            size={"25px"}
            className={password && validPassword ? "checkedValid" : "checked"}
          />

          <BiX
            color="red"
            size={"25px"}
            className={password && !validPassword ? " checkedValid" : "checked"}
          />
        </div>

        <div
          className={password && !validPassword ? "showScreen" : "offScreen"}>
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
              className={password && digit ? "checkedValidScreen" : "checked"}
            />
            <BiX
              color="red"
              size={"25"}
              className={password && !digit ? "checkedValidScreen" : "checked"}
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
                password && !chaEspecial ? "checkedValidScreen" : "checked"
              }
            />
          </div>
          <div>
            <span>5- Quantidade de carácteres 8 a 24 .</span>
            <AiOutlineCheck
              color="green"
              size={"25px"}
              className={password && length ? "checkedValidLen" : "checked"}
            />
            <BiX
              color="red"
              size={"25"}
              className={password && !length ? "checkedValidScreen" : "checked"}
            />
          </div>
        </div>

        <div className="input">
          <input
            type={check ? "text" : "password"}
            name="confirmarPassword"
            placeholder="Confirme a sua senha"
            required
            value={confPassword}
            onChange={(e) => {
              setConfPassword(e.target.value);
            }}
            title="Confirme a Sua Senha"
          />
        </div>
        <label htmlFor="checkPassword" className="checkPassword">
          <input
            type="checkbox"
            className="inputCheck"
            onChange={() => setCheck(!check)}
          />
          <p>Mostrar a Senha</p>
        </label>
        <p className="errorPasswordConf">{errorPasswordConf}</p>
        <button
          className={
            validEmail &&
            validPassword &&
            nome &&
            bi &&
            contacto &&
            confPassword
              ? "valid"
              : "invalid"
          }>
          Cadastrar-se
        </button>
      </form>
    </div>
  );
}

export default CadastrarUsuario;
