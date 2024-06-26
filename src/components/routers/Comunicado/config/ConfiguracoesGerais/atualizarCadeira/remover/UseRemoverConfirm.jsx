import { useEffect, useState } from "react";
import "./useRemoverConfirm.scss";
import { api } from "../../../../../../../../auth/auth";
import { PiWarning } from "react-icons/pi";

const UseRemoverConfirm = ({ id, setIsClick }) => {
  async function deletePropina(e) {
    e.preventDefault();
    await api
      .delete(`/propina/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data) {
          setIsClick(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
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
