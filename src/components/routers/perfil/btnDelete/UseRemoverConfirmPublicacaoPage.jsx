import { useEffect, useState } from "react";
import "./UseremoverConfirmPublicacaoPerfil.css";
import { deletePublicacaoPerfil } from "../Perfil";

const UseRemoverConfirmPublicacaoPage = ({
  pu,
  id1,
  setIsClick,
  setPublicacoes,
  publicacoes,
}) => {
  function deletePublicacao() {
    deletePublicacaoPerfil(pu.id);
    setPublicacoes(publicacoes.filter((pu) => pu.id !== id1));
  }

  return (
    <div className="container-removePerfil">
      <div className="container-RemoverConfirmPerfil">
        <h4>Pretendes colocar no Lixo?</h4>
        <p>Caso meter no Lixo deixará de ser Visualizado!</p>
        <div className="div-removerConfirmPerfil">
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
              deletePublicacao(), setIsClick(false);
            }}>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
export default UseRemoverConfirmPublicacaoPage;
