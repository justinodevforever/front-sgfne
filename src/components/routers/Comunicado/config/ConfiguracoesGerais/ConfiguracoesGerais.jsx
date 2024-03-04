import PegarRoles from "../../../../../configs/roles/Roles";
import "./ConfiguracoesGerais.scss";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../../../../auth/auth";
import {
  FaBook,
  FaDollarSign,
  FaLock,
  FaUserEdit,
  FaUserLock,
  FaUserMinus,
} from "react-icons/fa";
import PermissoesUSuario from "./permissoes/PermissoesUsuario";
import { PiStudent } from "react-icons/pi";
import AtualizarPropina from "./atualizarPropina/AtualizarPropina";
import AtualizarEstudante from "./atualizarEstudante/AtualizarEstudante";
import AtualizarCadeira from "./atualizarCadeira/AtualizarCadeira";
import PegarPermissoes from "../../../../../configs/permissoes/PegarPermissoes";
// import pegarPermissoes from "../../../../../configs/permissoes/pegarPermissoes";

const ConfiguracoesGerais = () => {
  const [clic, setClic] = useState(true);
  const [clicEstudante, setClicEstudante] = useState(false);
  const [clicPropina, setClicPropina] = useState(false);
  const [clicCadeira, setClicCadeira] = useState(false);

  function toggleClic(e) {
    e.preventDefault();
    setClic(true);
    setClicCadeira(false);
    setClicEstudante(false);
    setClicPropina(false);
  }
  function toggleClicCadeira(e) {
    e.preventDefault();
    setClicCadeira(true);
    setClicPropina(false);
    setClicEstudante(false);
    setClic(false);
  }
  function toggleClicPropina(e) {
    e.preventDefault();
    setClic(false);
    setClicPropina(true);
    setClicEstudante(false);
    setClicCadeira(false);
  }
  function toggleClicEstudante(e) {
    e.preventDefault();
    setClic(false);
    setClicCadeira(false);
    setClicEstudante(true);
    setClicPropina(false);
  }
  return (
    <div className="configuracoes">
      <div className="menu">
        <PegarPermissoes permissoes={["admin"]}>
          <div className={clic ? "ativo" : "inativo"}>
            <FaLock />
            <Link onClick={(e) => toggleClic(e)}>Permissões</Link>
          </div>
        </PegarPermissoes>
        <PegarPermissoes permissoes={["edição", "admin"]}>
          <div className={clicEstudante ? "ativo" : "inativo"}>
            <PiStudent size={20} />
            <Link onClick={(e) => toggleClicEstudante(e)}>
              Atualizar Estudante
            </Link>
          </div>
          <div className={clicPropina ? "ativo" : "inativo"}>
            <FaDollarSign size={20} />
            <Link onClick={(e) => toggleClicPropina(e)}>Atualizar Propina</Link>
          </div>
          <div className={clicCadeira ? "ativo" : "inativo"}>
            <FaBook />
            <Link onClick={(e) => toggleClicCadeira(e)}>Atualizar Cadeira</Link>
          </div>
        </PegarPermissoes>
      </div>
      <PegarPermissoes permissoes={["admin"]}>
        {clic && <PermissoesUSuario />}
      </PegarPermissoes>
      {clicPropina && <AtualizarPropina />}
      {clicEstudante && <AtualizarEstudante />}
      {clicCadeira && <AtualizarCadeira />}
    </div>
  );
};

export default ConfiguracoesGerais;
