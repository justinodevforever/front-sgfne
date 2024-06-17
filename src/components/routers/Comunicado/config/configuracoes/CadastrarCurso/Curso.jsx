import "./curso.scss";
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

const Curso = () => {
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const [curso, setCurso] = useState("");
  const [clicCadatrar, setClicCadatrar] = useState(true);
  const navigate = useNavigate();

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
    if (!curso) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    setIsLoading(true);
    await api
      .post("/curso", {
        curso,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        setCurso("");
        if (data.data.message === "sucess")
          return dispatchSucess(toggleModalConfirmar(true));
        if (data.data.message === "error")
          return dispatchError(toggleModalError(true));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className='curso'>
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
              htmlFor='semestre'
              style={{ position: "relative", flexDirection: "column" }}>
              <TextField
                label='Designação do Curso'
                type='text'
                placeholder='Nome do Curso'
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                name='semestre'
                style={{ width: "300px", height: "60px" }}
              />
            </label>
          </Space>

          <Button
            type='primary'
            loading={isLoading}
            onClick={() => hendleSave()}
            disabled={!curso}>
            <BiSave style={{ marginRight: "10px" }} />
            Cadastrar
          </Button>

          <br />
        </form>
      </div>
    </div>
  );
};
export default Curso;
