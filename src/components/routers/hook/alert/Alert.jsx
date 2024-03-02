import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidError, BiSolidSave } from "react-icons/bi";
import "./alert.scss";
import { CiWarning } from "react-icons/ci";

const Alert = ({ ativar, setAtivar, type, message }) => {
  useEffect(() => {
    let time;
    time = setTimeout(() => {
      setAtivar(false);
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [ativar]);

  return (
    <>
      {ativar && (
        <div className={type}>
          {type === "sucess" && (
            <div className="co">
              <span>Dados Adicionados com sucesso</span>
            </div>
          )}
          {type === "error" && (
            <div className="co">
              <BiSolidError size={20} />
              <span> Erro ao Adicionr os dados</span>
            </div>
          )}
          {type === "exist" && (
            <div className="co">
              <CiWarning size={20} />
              <span>{message}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Alert;
