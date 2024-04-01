import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { chatflech } from "../../../configs/axios/chatfletch";
import AnimationComponentLogin from "../hook/AnimationComponentLogin";
import { useDispatch } from "react-redux";
import { setId } from "../../../store/ui-slice";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sms, setSms] = useState("");
  const [clik, setClick] = useState(false);
  const [check, setCheck] = useState(false);
  const refEmail = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  async function hendleLogar(e) {
    e.preventDefault();

    setClick(true);
    await chatflech
      .post("/logar", {
        email,
        password,
      })
      .then((data) => {
        if (data.data?.mensage === "email ou senha Errada") {
          setCheck(false);
          setSms("Senha ou Email Inválido!");

          return;
        }
        localStorage.setItem("refreshToken", data?.data?.refreshToken);
        localStorage.setItem(`token${data.data?.User?.id}`, data.data?.token);
        sessionStorage.setItem("user", data.data?.User?.nome);
        sessionStorage.setItem("id", data.data?.User?.id);
        dispatch(setId(data.data?.User?.id));
        setClick(false);
        navigate("/comunicado");
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    setPassword("");
    setEmail("");
    refEmail.current.focus();
  }, []);

  function toggleCheck(e) {
    e.preventDefault();
    setCheck(!check);
  }

  return (
    <>
      {clik && <AnimationComponentLogin setClick={setClick} click={clik} />}
      {!clik && (
        <div className="container-login">
          <div className="img">
            <img src="./image/ISP_Moxico/Logo.png" alt="Logo do ISPM" />
          </div>

          <form onSubmit={hendleLogar} className="form">
            <div className="inputEmail">
              <input
                type="text"
                name="email"
                placeholder="Digite o seu email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                title="Digite um email Válido"
                ref={refEmail}
              />
            </div>

            <div className="inputPassword">
              <input
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
            </div>

            <p className="sms">{sms}</p>
            <button>Entrar</button>
            <div className="link">
              <label htmlFor="verSenha" className="mostrarSenha">
                <input
                  type="checkbox"
                  className="inputCheck"
                  value={check}
                  onChange={() => setCheck(!check)}
                />
                <p>Mostrar a Senha</p>
              </label>
              <Link>Esqueceste a Senha?</Link>
              <Link to={"/cadastro"}>Es Novo?</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
