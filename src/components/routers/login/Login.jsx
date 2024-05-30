import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { chatflech } from "../../../configs/axios/chatfletch";
import AnimationComponentLogin from "../hook/AnimationComponentLogin";
import { useDispatch } from "react-redux";
import { setId } from "../../../store/ui-slice";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons/lib/icons";
import { PiPassword } from "react-icons/pi";
import { Checkbox, TextField } from "@mui/material";

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
          setSms("Senha ou Email Inválido!");
          setClick(false);
          return;
        }
        localStorage.setItem("refreshToken", data?.data?.refreshToken);
        localStorage.setItem(`token${data.data?.User?.id}`, data.data?.token);
        sessionStorage.setItem("user", data.data?.User?.nome);
        sessionStorage.setItem("id", data.data?.User?.id);
        dispatch(setId(data.data?.User?.id));
        setClick(false);
        navigate(`/main/comunicado?page=${1}`);
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
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <div className='container-login'>
            <div className='img'>
              <img src='./image/ISP_Moxico/Logo.png' alt='Logo do ISPM' />
            </div>

            <form onSubmit={hendleLogar} className='form'>
              <div className='inputEmail'>
                <TextField
                  type='text'
                  name='email'
                  label='E-mail'
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  title='Digite um email Válido'
                  ref={refEmail}
                  prefix={<UserOutlined />}
                  style={{ width: "98%" }}
                />
              </div>

              <div className='inputPassword' style={{ marginTop: 10 }}>
                <TextField
                  type={check ? "text" : "password"}
                  name='password'
                  label='Palavra Passe'
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  title='8 ou 24 character, Maiúscula e Minúscula, número e entre !@#$%*'
                  style={{
                    width: "98%",
                  }}
                />
              </div>

              <p className='sms'>{sms}</p>
              <div>
                <Checkbox onClick={() => setCheck(!check)} /> Mostrar a Senha
              </div>
              <button>Entrar</button>
              <div className='link'>
                <Link
                  style={{
                    fontStyle: "italic",
                    fontSize: "11pt",
                  }}>
                  Esqueceste a Senha?
                </Link>
                <Link to={"/cadastro"}>Es Novo?</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
