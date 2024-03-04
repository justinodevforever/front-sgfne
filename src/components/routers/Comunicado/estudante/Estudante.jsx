import { useState } from "react";
import Buscar from "./Buscar";
import Cadastrar from "./Cadastrar";
import "./estudante.scss";
import { Link } from "react-router-dom";
import PegarPermissoes from "../../../../configs/permissoes/PegarPermissoes";

const Estudante = () => {
  const [isBuscar, setIsBuscar] = useState(false);

  function toggleBusca(e) {
    e.preventDefault();
    setIsBuscar(true);
  }
  function toggleCadastrar(e) {
    e.preventDefault();
    setIsBuscar(false);
  }
  return (
    <div className="container-estudante">
      <ul>
        <PegarPermissoes permissoes={["admin", "salvar"]}>
          <li>
            <Link
              onClick={(e) => toggleCadastrar(e)}
              className={isBuscar === false ? "focus" : "semfocus"}>
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
      </ul>

      {isBuscar && <Buscar />}
      {isBuscar === false && <Cadastrar />}
    </div>
  );
};

export default Estudante;
