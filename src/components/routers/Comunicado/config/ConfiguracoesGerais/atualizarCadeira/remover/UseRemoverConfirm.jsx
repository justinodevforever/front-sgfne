import { useEffect, useState } from "react";
import "./useRemoverConfirm.scss";
import { api } from "../../../../../../../../auth/auth";
import { PiWarning } from "react-icons/pi";
import {
  toggleModalConfirmar,
  toggleModalError,
} from "../../../../../../../store/ui-slice";
import { useDispatch } from "react-redux";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";

const UseRemoverConfirm = ({ id, setIsClick }) => {
  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  async function deletePropina(e) {
    e.preventDefault();
    await api
      .delete(`/propina/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
          setIsClick(false);
          return;
        }
        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));
          setIsClick(false);
          return;
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <UseSucess />
      <UseErro />
      <div className='container-RemoverCadeira'>
        <h2>Pretendes Eliminar Este Mês?</h2>
        <p>Caso Eliminar Deixará deixará de Existe, Queres Continuar?</p>
        <div className='div-removerCadeira'>
          <button
            className='btnCancelar'
            onClick={() => {
              setIsClick(false);
            }}>
            NÃO
          </button>
          <button
            className='btnRemover'
            onClick={(e) => {
              deletePropina(e), setIsClick(false);
            }}>
            SIM
          </button>
        </div>
      </div>

      <div className='ovefloy'></div>
    </>
  );
};
export default UseRemoverConfirm;
