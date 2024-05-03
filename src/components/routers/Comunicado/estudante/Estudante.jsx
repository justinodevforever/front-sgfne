import { useState } from "react";
import Buscar from "./Buscar";
import Cadastrar from "./Cadastrar";
import "./estudante.scss";
import { Link } from "react-router-dom";
import PegarPermissoes from "../../../../configs/permissoes/PegarPermissoes";
import AtualizarEstudante from "../config/ConfiguracoesGerais/atualizarEstudante/AtualizarEstudante";

const Estudante = () => {
  const [isBuscar, setIsBuscar] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [isRemove, setIsRemove] = useState(false);

  function toggleBusca(e) {
    e.preventDefault();
    setIsBuscar(true);
    setIsRegister(false);
    setIsRemove(false);
  }
  function toggleCadastrar(e) {
    e.preventDefault();
    setIsRegister(true);
    setIsBuscar(false);
    setIsRemove(false);
  }
  function toggleRemove(e) {
    e.preventDefault();
    setIsBuscar(false);
    setIsRegister(false);
    setIsRemove(true);
  }
  return (
    <div className='container-estudante'>
      <ul>
        <PegarPermissoes permissoes={["admin", "salvar"]}>
          <li>
            <Link
              onClick={(e) => toggleCadastrar(e)}
              className={isRegister ? "focus" : "semfocus"}>
              Cadastrar
            </Link>
          </li>
        </PegarPermissoes>
        <PegarPermissoes permissoes={["admin", "listar"]}>
          <li>
            <Link
              onClick={(e) => toggleBusca(e)}
              className={isBuscar ? "focus" : "semfoCus"}>
              Detalhes
            </Link>
          </li>
        </PegarPermissoes>
        <PegarPermissoes permissoes={["admin", "listar"]}>
          <li>
            <Link
              onClick={(e) => toggleRemove(e)}
              className={isRemove ? "focus" : "semfoCus"}>
              Remover
            </Link>
          </li>
        </PegarPermissoes>
      </ul>

      {isBuscar && <Buscar />}
      {isRegister && <Cadastrar />}
      {isRemove && <AtualizarEstudante />}
    </div>
  );
};

export default Estudante;
