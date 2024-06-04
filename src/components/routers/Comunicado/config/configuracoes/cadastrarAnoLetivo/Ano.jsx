import "./ano.scss";
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
import AnoCurso from "../../../scool/ano/AnoCurso";

const ANO = /^([0-9]{4,4})(\/)([0-9]{4}$)/;
const Ano = () => {
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const [validSemestre, setValidSemestre] = useState(false);
  const [ano, setAno] = useState("");
  const [validAno, setValidAno] = useState(false);
  const [clicCadatrar, setClicCadatrar] = useState(true);

  useEffect(() => {
    if (ano) {
      setValidAno(ANO.test(ano));
    }
  }, [ano]);

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
    if (!ano) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    setIsLoading(true);
    await api
      .post("/letivo", {
        ano,
      })
      .then((data) => {
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
                Ano Lectivo
                <Input
                  type='text'
                  placeholder='Designação do semestre Ex. 1º ou 2º'
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  name='semestre'
                  style={
                    ano && validAno
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
                {ano && !validAno && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "11pt",
                      fontStyle: "italic",
                      marginTop: "10px",
                      position: "absolute",
                      top: "80px",
                    }}>
                    Exemplo: 2021/2021
                  </span>
                )}
              </label>
            </Space>

            <Button
              type='primary'
              loading={isLoading}
              onClick={() => hendleSave()}
              disabled={!validAno}
              style={
                ano &&
                !validAno && {
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
export default Ano;
