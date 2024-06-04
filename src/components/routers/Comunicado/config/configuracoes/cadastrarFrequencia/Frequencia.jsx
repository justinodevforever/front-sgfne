import { Button, Input, Space } from "antd";
import UseErro from "../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
import "./frequencia.scss";
import Actualizar from "./atualizar/Actualizar";
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

const FREQUENCIA = /^([0-9])+º/;

const Frequencia = () => {
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const [validSemestre, setValidSemestre] = useState(false);
  const [frequencia, setFrequencia] = useState("");
  const [validFrequencia, setValidFrequencia] = useState(false);
  const [clicCadatrar, setClicCadatrar] = useState(true);

  useEffect(() => {
    if (frequencia) {
      setValidFrequencia(FREQUENCIA.test(frequencia));
    }
  }, [frequencia]);

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
    if (!frequencia) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    setIsLoading(true);
    await api
      .post("/ano", {
        ano: frequencia,
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
                Ano de Frequência
                <Input
                  type='text'
                  placeholder='Designação do semestre Ex. 1º ou 2º'
                  value={frequencia}
                  onChange={(e) => setFrequencia(e.target.value)}
                  name='semestre'
                  style={
                    frequencia && validFrequencia
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
                {frequencia && !validFrequencia && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11pt",
                      fontStyle: "italic",
                      marginTop: "10px",
                      position: "absolute",
                      top: "70px",
                    }}>
                    é aceite número seguido <br /> de Símbolo " º "
                  </span>
                )}
              </label>
            </Space>

            <Button
              type='primary'
              loading={isLoading}
              onClick={() => hendleSave()}
              disabled={!validFrequencia}
              style={
                frequencia &&
                !validFrequencia && {
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
    </div>
  );
};
export default Frequencia;
