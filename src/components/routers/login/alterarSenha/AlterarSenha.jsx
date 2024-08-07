import { Button, Input } from "antd";
import "./alterarSenha.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { Check, Error, X } from "@mui/icons-material";
import { TextField } from "@mui/material";
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;

const AlterarSenha = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (password) {
      setValidPassword(PASSWORD_REGEX.test(password));
    }
  }, [password]);

  const buscarEstudante = async () => {
    setLoading(true);
    await api
      .post("/search/user/email", {
        email,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        // console.log(data.data);
        setNome(data.data?.nome);
        setId(data.data?.id);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const alterarSenha = async () => {
    await api
      .post("/alterar/senha", {
        id,
        password,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='alterarSenha'>
      <h1>Alterar Senha</h1>
      <Input.Search
        placeholder='Número de BI do Estudante'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        style={{ width: "30%", marginTop: "20px" }}
        loading={loading}
        onSearch={() => buscarEstudante()}
      />
      {nome && (
        <>
          <span
            style={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "space-between",
              color: "green",
              marginBottom: "10px",
              marginTop: "30px",
              width: "200px",
            }}>
            Email Confirmado <Check color='green' />
          </span>
          <div
            style={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "10px",
              marginTop: "30px",
            }}>
            <TextField
              label='Nova Senha'
              onChange={(e) => setPassword(e.target.value)}
            />
            {!validPassword && (
              <>
                <span
                  style={{
                    display: "flex",
                    margin: "auto",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "red",
                    marginTop: "30px",
                    width: "400px",
                    fontSize: "9pt",
                    textAlign: "left",
                  }}>
                  Tipo de Senha Inválida <br />
                  Tem de ter Letras Maiúscula e Minúscula <br />
                  Tem de ter número e Caracter Especial {"(!@#$%*)"} <br />
                  <Error color='red' />
                </span>
              </>
            )}
            {validPassword && password && (
              <Button
                type='primary'
                style={{
                  background: "#a31543",
                }}
                onClick={() => alterarSenha()}>
                Confirmar
              </Button>
            )}
          </div>
        </>
      )}
      {!nome && (
        <div>
          <span
            style={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "space-between",
              color: "red",
              marginTop: "30px",
              width: "200px",
            }}>
            Email Errado <Error color='red' />
          </span>
        </div>
      )}
    </div>
  );
};

export default AlterarSenha;
