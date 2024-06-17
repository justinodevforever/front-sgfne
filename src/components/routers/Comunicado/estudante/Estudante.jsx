import { useState } from "react";
import Buscar from "./Buscar";
import Cadastrar from "./Cadastrar";
import "./estudante.scss";
import { Link } from "react-router-dom";
import PegarPermissoes from "../../../../configs/permissoes/PegarPermissoes";
import AtualizarEstudante from "../config/ConfiguracoesGerais/atualizarEstudante/AtualizarEstudante";

const Estudante = () => {
  const [isM, setIsM] = useState(true);
  const [isBuscar, setIsBuscar] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  function toggleMatricular(e) {
    e.preventDefault();
    setIsM(true);
    setIsRemove(false);
    setIsBuscar(false);
  }
  function toggleBusca(e) {
    e.preventDefault();
    setIsRemove(false);
    setIsM(false);
    setIsBuscar(true);
  }

  function toggleRemove(e) {
    e.preventDefault();
    setIsM(false);
    setIsBuscar(false);
    setIsRemove(true);
  }
  return (
    <div className='container-estudante'>
      <ul>
        <PegarPermissoes permissoes={["admin", "listar"]}>
          <li>
            <Link
              onClick={(e) => toggleMatricular(e)}
              className={isM ? "focus" : "semfoCus"}>
              Matricular
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

      <PegarPermissoes permissoes={["admin", "listar"]}>
        {isBuscar && <Buscar />}
      </PegarPermissoes>
      <PegarPermissoes permissoes={["admin", "remover", "atualizar"]}>
        {isRemove && <AtualizarEstudante />}
      </PegarPermissoes>
      <PegarPermissoes permissoes={["admin", "salvar"]}>
        {isM && <Cadastrar />}
      </PegarPermissoes>
    </div>
  );
};

export default Estudante;
