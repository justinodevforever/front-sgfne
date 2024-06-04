import "./mes.scss";
import { Button, Input, Space } from "antd";
import UseErro from "../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
import { BiSave } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../store/ui-slice";
import { api } from "../../../../../../../auth/auth";
import Actualizar from "./actualizar/Actualizar";

const MES =
  /^(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro)$/;
const ALGARISMO = /^(1|2|3|4|5|6|7|8|9|10|11|12){1,1}$/;
const Ano = () => {
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const [validSemestre, setValidSemestre] = useState(false);
  const [algarismo, setAlgarismo] = useState("");
  const [mes, setMes] = useState("");
  const [validMes, setValidMes] = useState(false);
  const [validAlgarismo, setValidAlgarismo] = useState(false);
  const [clicCadatrar, setClicCadatrar] = useState(true);

  useEffect(() => {
    if (mes) {
      setValidMes(MES.test(mes));
    }
  }, [mes]);
  useEffect(() => {
    if (algarismo) {
      setValidAlgarismo(ALGARISMO.test(algarismo));
    }
  }, [algarismo]);

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
    if (!mes || !algarismo) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    setIsLoading(true);
    await api
      .post("/mes", {
        mes,
        algarismo: Number(algarismo),
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
    <div className='frequencia'>
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
                Mês
                <Input
                  type='text'
                  placeholder='Designação do semestre Ex. 1º ou 2º'
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  name='semestre'
                  style={
                    mes && validMes
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
                {mes && !validMes && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11pt",
                      fontStyle: "italic",
                      marginTop: "10px",
                      position: "absolute",
                      top: "80px",
                      textAlign: "justify",
                      border: "1px solid red",
                      padding: "2px",
                    }}>
                    Primeira letra Maiúscula <br />
                    Exemplo: Janeiro, Fevereiro ... Dezembro
                  </span>
                )}
              </label>
              <label
                htmlFor='semestre'
                style={{ position: "relative", flexDirection: "column" }}>
                Nº Correspondente
                <Input
                  type='number'
                  placeholder='Designação do semestre Ex. 1º ou 2º'
                  value={algarismo}
                  onChange={(e) => setAlgarismo(e.target.value)}
                  name='semestre'
                  style={
                    algarismo && validAlgarismo
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
                {algarismo && !validAlgarismo && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11pt",
                      fontStyle: "italic",
                      marginTop: "10px",
                      position: "absolute",
                      top: "80px",
                      textAlign: "justify",
                      marginLeft: "20px",
                      border: "1px solid red",
                      padding: "2px",
                    }}>
                    Número que Corresponde o Mês Exemplo: 1, 2...12
                  </span>
                )}
              </label>
            </Space>

            <Button
              type='primary'
              loading={isLoading}
              onClick={() => hendleSave()}
              disabled={!validMes || !validAlgarismo}
              style={
                (algarismo || mes) &&
                (!validAlgarismo || !validMes) && {
                  margin: "90px",
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
    </div>
  );
};
export default Ano;
