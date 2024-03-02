import { useState } from "react";
import Buscar from "./Buscar";
import Cadastrar from "./Cadastrar";
import "./estudante.scss";
import { Link } from "react-router-dom";

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
        <li>
          <Link
            onClick={(e) => toggleCadastrar(e)}
            className={isBuscar === false ? "focus" : "semfocus"}>
            Cadastrar
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => toggleBusca(e)}
            className={isBuscar ? "focus" : "semfoCus"}>
            Detalhes
          </Link>
        </li>
      </ul>

      {isBuscar && <Buscar />}
      {isBuscar === false && <Cadastrar />}
    </div>
  );
};

export default Estudante;
