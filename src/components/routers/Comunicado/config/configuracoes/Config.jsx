import { useState } from "react";
import "./config.scss";
import { Link, Outlet } from "react-router-dom";
import Cadeira from "./cadastrarCadeiras/Cadeira";
import Frequencia from "./cadastrarFrequencia/Frequencia";
import Semestre from "./cadastrarSemestre/Semestre";
import Ano from "./cadastrarAnoLetivo/Ano";
import Mes from "./cadastrarMes/Mes";
import Curso from "./CadastrarCurso/Curso";

const Config = () => {
  const [clicServico, setClicServico] = useState(false);
  const [clicCadeira, setClicCadeira] = useState(true);
  const [clicFrequencia, setClicFrequencia] = useState(false);
  const [clicAno, setClicAno] = useState(false);
  const [clicSemestre, setClicSemestre] = useState(false);
  const [clicCurso, setClicCurso] = useState(false);

  const toggleServico = (e) => {
    e.preventDefault();
    setClicServico(true);
    setClicCadeira(false);
    setClicSemestre(false);
    setClicAno(false);
    setClicFrequencia(false);
    setClicCurso(false);
  };
  const toggleAno = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(false);
    setClicSemestre(false);
    setClicAno(true);
    setClicFrequencia(false);
    setClicCurso(false);
  };
  const toggleCurso = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(false);
    setClicSemestre(false);
    setClicAno(false);
    setClicFrequencia(false);
    setClicCurso(true);
  };
  const toggleCadeira = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(true);
    setClicSemestre(false);
    setClicAno(false);
    setClicFrequencia(false);
    setClicCurso(false);
  };
  const toggleSemestre = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(false);
    setClicSemestre(true);
    setClicAno(false);
    setClicFrequencia(false);
    setClicCurso(false);
  };
  const toggleFrequencia = (e) => {
    e.preventDefault();
    setClicServico(false);
    setClicCadeira(false);
    setClicSemestre(false);
    setClicAno(false);
    setClicFrequencia(true);
    setClicCurso(false);
  };
  return (
    <div className='config'>
      <ul className='menu'>
        <li>
          <Link
            onClick={(e) => toggleCadeira(e)}
            className={clicCadeira ? "ativo" : "link"}>
            Ajustar Disciplina
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleServico(e)}
            className={clicServico ? "ativo" : "link"}>
            Ajustar Mês
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
        <li>
          <Link
            onClick={(e) => toggleCurso(e)}
            className={clicCurso ? "ativo" : "link"}>
            Ajustar Curso
          </Link>
        </li>
      </ul>
      <div className='painel'>
        {clicFrequencia && <Frequencia />}
        {clicCadeira && <Cadeira />}
        {clicServico && <Mes />}
        {clicSemestre && <Semestre />}
        {clicAno && <Ano />}
        {clicCurso && <Curso />}
      </div>
    </div>
  );
};

export default Config;
