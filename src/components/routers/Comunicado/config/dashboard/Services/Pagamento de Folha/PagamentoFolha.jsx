import { Button, Form, Input } from "antd";
import "./pagamentoFolha.scss";
import { useState } from "react";
import { TextField } from "@mui/material";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import { useDispatch } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
} from "../../../../../../../store/ui-slice";

const PagamentoFolha = () => {
  const [valor, setValor] = useState(0.0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hendlePagamento = async () => {
    const v = parseFloat(valor);
    try {
      await api
        .post("/folha", {
          valor: v,
          fk_user: sessionStorage.getItem("id"),
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }
          if (data.data.message === "error")
            return dispatch(toggleModalError(true));

          if (data.data.message === "sucess")
            return dispatch(toggleModalConfirmar(true));
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <UseSucess />
      <UseErro />
      <div className='pagamentoFolha'>
        <TextField
          label='Valor'
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <Button type='primary' onClick={() => hendlePagamento()}>
          Fazer Pagamento
        </Button>
      </div>
    </>
  );
};

export default PagamentoFolha;
