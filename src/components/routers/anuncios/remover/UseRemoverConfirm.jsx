import { useEffect, useState } from "react";
import "./useRemoverConfirm.css";
import { deleteComentPage } from "../../page/coment/ComentPublicationPage";

const UseRemoverConfirm = ({
  aC,
  id1,
  setIsClick,
  setAllComent,
  allComent,
}) => {
  function deleteCom() {
    deleteComentPage(aC.id);
    setAllComent(allComent.filter((co) => co.id !== id1));
  }

  return (
    <div className="container">
      <div className="container-RemoverConfirm">
        <h4>Pretendes colocar no Lixo?</h4>
        <p>Caso meter no Lixo deixará de ser Visualizado!</p>
        <div className="div-removerConfirm">
          <button
            className="btnCancelar"
            onClick={() => {
              setIsClick(false);
            }}>
            Cancelar
          </button>
          <button
            className="btnRemover"
            onClick={() => {
              deleteCom(), setIsClick(false);
            }}>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
export default UseRemoverConfirm;
