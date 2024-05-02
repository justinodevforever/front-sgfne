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
import { Input, Space } from "antd";

const Semestre = () => {
  const [clicCadatrar, setClicCadatrar] = useState(true);
  const [numero, setNumero] = useState(0);
  const [semestre, setSemestre] = useState("");
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();

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

  const hendleSave = async (e) => {
    e.preventDefault();
    if (numero !== 0 || !semestre) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    await api
      .post("/semestre", {
        algarismo: numero,
        semestre,
      })
      .then((data) => {
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
          <form onSubmit={(e) => hendleSave(e)}>
            <Space
              wrap
              style={{
                display: "flex",
                width: "1",
              }}>
              <label htmlFor='semestre'>
                Nome do Semestre
                <Input
                  type='text'
                  placeholder='Designação do semestre Ex. 1º ou 2º'
                  value={semestre}
                  onChange={(e) => setSemestre(e.target.value)}
                  name='semestre'
                />
              </label>
              <label htmlFor='numero'>
                Designação em Algarismo
                <Input
                  type='text'
                  placeholder='Designação em Algarismo Ex. 1 ou 2'
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  name='numero'
                />
              </label>
            </Space>
            {numero !== 0 && semestre && (
              <button type='submit'>
                <BiSave />
                Cadastrar
              </button>
            )}
            <br />
          </form>
        )}

        {clicActualizar && <Actualizar />}
      </div>
    </>
  );
};
export default Semestre;
