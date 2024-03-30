import { useState } from "react";
import "./config.scss";
import { Link, Outlet } from "react-router-dom";
import Cadeira from "./cadastrarCadeiras/Cadeira";
import Servicos from "../../Services/Servicos";
import Frequencia from "./cadastrarFrequencia/Frequencia";
import Semestre from "./cadastrarSemestre/Semestre";
import Ano from "./cadastrarAnoLetivo/Ano";
import TipoServico from "./cadastrarServicos/TipoServico";

const Config = () => {
  const [clicServico, setClicServico] = useState(false);
  const [clicCadeira, setClicCadeira] = useState(true);
  const [clicFrequencia, setClicFrequencia] = useState(false);
  const [clicAno, setClicAno] = useState(false);
  const [clicSemestre, setClicSemestre] = useState(false);

  const toggleServico = (e) => {
    e.preventDefault();
    setClicServico(true);
    setClicCadeira(false);
    setClicSemestre(false);
    setClicAno(false);
    setClicFrequencia(false);
  };
  const toggleAno = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(false);
    setClicSemestre(false);
    setClicAno(true);
    setClicFrequencia(false);
  };
  const toggleCadeira = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(true);
    setClicSemestre(false);
    setClicAno(false);
    setClicFrequencia(false);
  };
  const toggleSemestre = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(false);
    setClicSemestre(true);
    setClicAno(false);
    setClicFrequencia(false);
  };
  const toggleFrequencia = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(false);
    setClicSemestre(false);
    setClicAno(false);
    setClicFrequencia(true);
  };
  return (
    <div className="config">
      <ul className="menu">
        <li>
          <Link
            onClick={(e) => toggleCadeira(e)}
            className={clicCadeira ? "ativo" : "link"}>
            Ajustar Cadeira
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleServico(e)}
            className={clicServico ? "ativo" : "link"}>
            Ajustar Serviços
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleSemestre(e)}
            className={clicSemestre ? "ativo" : "link"}>
            Ajustar Semestre
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleFrequencia(e)}
            className={clicFrequencia ? "ativo" : "link"}>
            Ajustar Frequência
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleAno(e)}
            className={clicAno ? "ativo" : "link"}>
            Ajustar Ano
          </Link>
        </li>
      </ul>
      <div className="painel">
        {clicCadeira && <Cadeira />}
        {clicServico && <TipoServico />}
        {clicFrequencia && <Frequencia />}
        {clicSemestre && <Semestre />}
        {clicAno && <Ano />}
      </div>
    </div>
  );
};

export default Config;
