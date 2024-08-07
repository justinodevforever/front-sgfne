import "./servico.scss";
import { Button, Input, Space } from "antd";
import UseErro from "../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
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

const SERVICO =
  /^(Propina-Laboral|Propina-Regular|Reconfirmação|Matrícula|Inscrições|Recurso|Exame Especial|D. sem Nota|Cadeira em Atraso|D. com Nota|D. de Licenciatura|Pagamento de Folha)$/;
const Servico = () => {
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const [validSemestre, setValidSemestre] = useState(false);
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState(0);
  const [validTipo, setValidTipo] = useState(false);
  const [clicCadatrar, setClicCadatrar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (tipo) {
      setValidTipo(SERVICO.test(tipo));
    }
  }, [tipo]);

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
    if (!tipo || valor == 0 || !valor) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    setIsLoading(true);
    await api
      .post("/servico", {
        valor: Number(valor),
        tipo,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        console.log(data.data);
        if (data.data.message === "sucess")
          return dispatchSucess(toggleModalConfirmar(true));
        if (data.data.message === "error")
          return dispatchError(toggleModalError(true));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className='servico'>
      <UseWarning message={message} />
      <UseErro />
      <UseSucess />
      <div>
        <form>
          <Space
            wrap
            style={{
              display: "flex",
              marginBottom: "20px",
            }}>
            <label
              htmlFor='tipo'
              style={{ position: "relative", flexDirection: "column" }}>
              <TextField
                label='Tipo de Serviço'
                type='text'
                placeholder='Designação do semestre Ex. 1º ou 2º'
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                name='tipo'
              />
              {tipo && !validTipo && (
                <span
                  style={{
                    color: "red",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    marginTop: "10px",
                    position: "absolute",
                    top: "80px",
                  }}>
                  <p>
                    Tipos de Serviços aceite! <br />
                    Propina-Laboral | Propina-Regular | Reconfirmação |
                    Matrícula | Inscrições | Recurso | Exame Especial | D. sem
                    Nota | Cadeira em Atraso | D. com Nota | D. de Licenciatura
                    | Pagamento de Folha.
                  </p>
                </span>
              )}
            </label>
            <TextField
              type='number'
              label='Valor'
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </Space>

          <Button
            type='primary'
            loading={isLoading}
            onClick={() => hendleSave()}
            disabled={!validTipo}
            style={
              tipo &&
              !validTipo && {
                marginTop: "140px",
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
export default Servico;
