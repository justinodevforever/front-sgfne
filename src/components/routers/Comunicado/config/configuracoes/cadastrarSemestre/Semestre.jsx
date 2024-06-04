import { useEffect, useState } from "react";
import "./semestres.scss";
import { Link } from "react-router-dom";
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

const SEMESTRE = /^([0-9])+º/;

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

  useEffect(() => {
    if (nome) {
      setValidSemestre(SEMESTRE.test(nome));
    }
  }, [nome]);
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
    console.log(numero, nome);
    setIsLoading(true);
    await api
      .post("/semestre", {
        numero: Number(numero),
        nome: nome,
      })
      .then((data) => {
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
      <ul className='menuCadeira'>
        <li>
          <Link
            onClick={(e) => toggleCadastrar(e)}
            className={clicCadatrar ? "ativo" : "link"}>
            Cadastrar
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleActualizar(e)}
            className={clicActualizar ? "ativo" : "link"}>
            Actualizar
          </Link>
        </li>
      </ul>
      <div className='semestre'>
        {clicCadatrar && (
          <form>
            <Space
              wrap
              style={{
                display: "flex",
                width: "1",
              }}>
              <label
                htmlFor='semestre'
                style={{ position: "relative", flexDirection: "column" }}>
                Designação
                <Input
                  type='text'
                  placeholder='Designação do semestre Ex. 1º ou 2º'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  name='semestre'
                  style={
                    nome && validSemestre
                      ? {
                          border: "1px solid green",
                          height: "60px",
                        }
                      : {
                          border: "1px solid red",
                          height: "60px",
                        }
                  }
                />
                {nome && !validSemestre && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11pt",
                      fontStyle: "italic",
                      marginTop: "10px",
                      position: "absolute",
                      top: "80px",
                    }}>
                    é aceite número seguido <br /> de Símbolo " º "
                  </span>
                )}
              </label>

              <label
                htmlFor='numero'
                style={{
                  flexDirection: "column",
                }}>
                Nº Correspondente
                <Input
                  type='text'
                  placeholder='Designação em Algarismo Ex. 1 ou 2'
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  name='numero'
                  style={{
                    height: "60px",
                  }}
                />
              </label>
            </Space>

            <Button
              type='primary'
              loading={isLoading}
              onClick={() => hendleSave()}
              disabled={!validSemestre || !numero}
              style={
                nome &&
                !validSemestre && {
                  margin: "70px",
                }
              }>
              <BiSave style={{ marginRight: "10px" }} />
              Cadastrar
            </Button>

            <br />
          </form>
        )}

        {clicActualizar && <Actualizar />}
      </div>
    </>
  );
};
export default Semestre;
