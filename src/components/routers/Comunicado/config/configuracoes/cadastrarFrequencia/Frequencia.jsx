import { Button, Input, Space } from "antd";
import UseErro from "../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
import "./frequencia.scss";
import { BiSave } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../store/ui-slice";
import { api } from "../../../../../../../auth/auth";
import { TextField } from "@mui/material";
import { Save } from "@mui/icons-material";

const FREQUENCIA = /^([0-9])+º/;

const Frequencia = () => {
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [validSemestre, setValidSemestre] = useState(false);
  const [frequencia, setFrequencia] = useState("");
  const [validFrequencia, setValidFrequencia] = useState(false);
  const [clicCadatrar, setClicCadatrar] = useState(true);
  const navigate = useNavigate();

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
    <div className='frequencia'>
      <UseWarning message={message} />
      <UseErro />
      <UseSucess />

      <div>
        <form>
          <Space
            wrap
            style={{
              marginBottom: "20px",
            }}>
            <label htmlFor='semestre' style={{ position: "relative" }}>
              <TextField
                label='Ano de Frequência'
                type='text'
                placeholder='Designação do semestre Ex. 1º ou 2º'
                value={frequencia}
                onChange={(e) => setFrequencia(e.target.value)}
                name='semestre'
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
            <Save />
            Cadastrar
          </Button>

          <br />
        </form>
      </div>
    </div>
  );
};
export default Frequencia;
