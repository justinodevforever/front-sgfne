import { useState } from "react";
import "./definicoes.scss";
import { Link } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";
import ConfiguracoesGerais from "./ConfiguracoesGerais/ConfiguracoesGerais";

const Definicoes = () => {
  const [permissao, setPermissao] = useState(true);
  const [config, setConfig] = useState(false);

  function togglePermissoes(e) {
    e.preventDefault(e);
    setPermissao(true);
    setConfig(false);
  }
  function toggleConfig(e) {
    e.preventDefault(e);
    setPermissao(false);
    setConfig(true);
  }
  return (
    <div className="container-definicoes">
      <div className="definicoes">
        <div className="opcoes">
          <ul>
            <li>
              <Link
                onClick={(e) => togglePermissoes(e)}
                className={permissao ? "ative" : "noative"}>
                <RiUserSettingsFill /> Configurações Gerais
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => toggleConfig(e)}
                className={config ? "ative" : "noative"}>
                Configurações
              </Link>
            </li>
          </ul>
        </div>
        <div className="conteudo">{permissao && <ConfiguracoesGerais />}</div>
      </div>
    </div>
  );
};

export default Definicoes;
