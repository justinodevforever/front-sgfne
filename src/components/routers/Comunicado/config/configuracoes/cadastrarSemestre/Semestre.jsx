import { useEffect, useState } from "react";
import "./semestres.scss";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../../../../../auth/auth";
import { BiSave } from "react-icons/bi";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
import UseErro from "../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import { useDispatch } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../store/ui-slice";
import Actualizar from "./atualizar/Actualizar";
import { Button, Input, Space } from "antd";
import { TextField } from "@mui/material";

const SEMESTRE = /^([1-2])+º/;
const NUMERO = /^([1-2])/;

const Semestre = () => {
  const [clicCadatrar, setClicCadatrar] = useState(true);
  const [numero, setNumero] = useState(0);
  const [nome, setNome] = useState("");
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const [validSemestre, setValidSemestre] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (nome) {
      setValidSemestre(SEMESTRE.test(nome));
    }
  }, [nome]);
  useEffect(() => {
    if (numero) {
      setValidNumber(NUMERO.test(numero));
    }
  }, [numero]);

  const toggleCadastrar = (e) => {
    e.preventDefault();
    setClicCadatrar(true);
    setClicActualizar(false);
  };
  const toggleActualizar = (e) => {
    e.preventDefault();

    setClicActualizar(true);
    setClicCadatrar(false);
  };

  const hendleSave = async () => {
    if (numero === 0 || !nome) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    setIsLoading(true);
    await api
      .post("/semestre", {
        numero: Number(numero),
        nome: nome,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        if (data.data.message === "sucess")
          return dispatchSucess(toggleModalConfirmar(true));
        if (data.data.message === "error")
          return dispatchError(toggleModalError(true));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <UseWarning message={message} />
      <UseErro />
      <UseSucess />

      <div className='semsetre'>
        <form>
          <div
            style={{
              display: "flex",
              marginTop: "40px",
              marginBottom: "30px",
              width: "100%",
              justifyContent: "center",
              gap: "20px",
            }}>
            <label
              htmlFor='semestre'
              style={{ position: "relative", flexDirection: "column" }}>
              <TextField
                label='Designação do Semestre'
                type='text'
                placeholder='Designação do semestre Ex. 1º ou 2º'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                name='semestre'
              />
              {!nome && !validSemestre && (
                <span
                  style={{
                    color: "red",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    marginTop: "10px",
                    position: "absolute",
                    top: "80px",
                    bottom: "20px",
                  }}>
                  são aceite números 1 e 2 seguido <br /> de Símbolo " º "
                </span>
              )}
            </label>

            <label
              htmlFor='numero'
              style={{
                position: "relative",
                flexDirection: "column",
              }}>
              <TextField
                label='Nº Correspondente'
                type='number'
                placeholder='Designação em Algarismo Ex. 1 ou 2'
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                name='numero'
                style={{
                  height: "60px",
                }}
              />
              {!numero && !validNumber && (
                <span
                  style={{
                    color: "red",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    marginTop: "10px",
                    position: "absolute",
                    top: "80px",
                    bottom: "20px",
                  }}>
                  são aceite números 1 e 2!
                </span>
              )}
            </label>
          </div>

          <Button
            type='primary'
            loading={isLoading}
            onClick={() => hendleSave()}
            disabled={!validSemestre || !validNumber}
            style={
              !validSemestre && {
                margin: "40px",
              }
            }>
            <BiSave style={{ marginRight: "10px" }} />
            Cadastrar
          </Button>

          <br />
        </form>
      </div>
    </>
  );
};
export default Semestre;
