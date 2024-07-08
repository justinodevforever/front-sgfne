import { useEffect, useState } from "react";
import "./editarPerfil.scss";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../../../auth/auth";
import { TextField } from "@mui/material";
import { Button, Input } from "antd";
import { Edit, Save } from "@mui/icons-material";

const EditarPerfil = () => {
  const [dados, setDados] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [contacto, setContacto] = useState("");
  const [bi, setBi] = useState("");
  const [isName, setIsName] = useState(false);
  const [isBi, setIsBi] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [click, setClick] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUseres();
  }, [click]);

  const getUseres = async () => {
    await api
      .get(`/user/perfil/${sessionStorage.getItem("id")}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          return navigate("/login");
        }
        setDados(data.data);
        setEmail(data.data.email);
        setContacto(data.data.contacto);
        setNome(data.data.nome);
        setBi(data.data.bi);
      });
  };
  const getUpDate = async () => {
    setClick(true);
    await api
      .put(`/user/${sessionStorage.getItem("id")}`, {
        bi,
        nome,
        contacto,
        email,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          return navigate("/login");
        }
      });
  };

  return (
    <div
      className='editarPerfil'
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h3>Edite o seu perfil</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          margin: "auto",
          gap: "10px",
          justifyContent: "start",
          alignItems: "start",
          paddingLeft: "30px",
          marginBottom: "30px",
          marginTop: "30px",
        }}>
        <span>
          Nome: {dados?.nome}{" "}
          <Edit
            style={{ fontSize: "14pt", marginLeft: "20px", cursor: "pointer" }}
            onClick={() => {
              setIsName(true);
              setIsEmail(false);
              setIsContact(false);
              setIsBi(false);
              setNome(dados?.nome);
            }}
          />
        </span>
        <span>
          E-mail: {dados?.email}{" "}
          <Edit
            style={{ fontSize: "14pt", marginLeft: "20px", cursor: "pointer" }}
            onClick={() => {
              setIsName(false);
              setIsEmail(true);
              setIsContact(false);
              setIsBi(false);
              setEmail(dados?.email);
            }}
          />
        </span>
        <span>
          B.I.: {dados?.bi}{" "}
          <Edit
            style={{ fontSize: "14pt", marginLeft: "20px", cursor: "pointer" }}
            onClick={() => {
              setIsName(false);
              setIsEmail(false);
              setIsContact(false);
              setIsBi(true);
              setBi(dados.bi);
            }}
          />
        </span>
        <span>
          Contacto: {dados?.contacto}{" "}
          <Edit
            style={{ fontSize: "14pt", marginLeft: "20px", cursor: "pointer" }}
            onClick={() => {
              setIsName(false);
              setIsEmail(false);
              setIsContact(true);
              setIsBi(false);
              setContacto(dados?.contacto);
            }}
          />
        </span>
      </div>
      {/* <span>Nome: {dados?.nome}</span> */}
      <div
        style={{
          display: "flex",
          width: "40%",
          margin: "auto",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
        }}>
        {isName && (
          <TextField
            label='Nome'
            defaultValue={dados?.nome}
            onChange={(e) => setNome(e.target.value)}
          />
        )}
        {isEmail && (
          <TextField
            label='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {isBi && (
          <TextField
            label='B.I'
            value={bi}
            onChange={(e) => setBi(e.target.value)}
          />
        )}
        {isContact && (
          <TextField
            label='Contacto'
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
          />
        )}

        <Button
          type='primary'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#a31543",
            gap: "10px",
          }}
          onClick={() => getUpDate()}>
          <Save /> Salvar
        </Button>
      </div>
    </div>
  );
};
export default EditarPerfil;
