import { useState } from "react";
import "./definicoes.scss";
import { Link } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";
import ConfiguracoesGerais from "./ConfiguracoesGerais/ConfiguracoesGerais";
import PegarPermissoes from "../../../../configs/permissoes/PegarPermissoes";
import Config from "./configuracoes/Config";

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
          <ul className="ul">
            <li>
              <PegarPermissoes permissoes={["admin", "edição"]}>
                <Link
                  onClick={(e) => togglePermissoes(e)}
                  className={permissao ? "ative" : "noative"}>
                  <RiUserSettingsFill /> Configurações Gerais
                </Link>
              </PegarPermissoes>
            </li>
            <PegarPermissoes permissoes={["admin"]}>
              <li>
                <Link
                  onClick={(e) => toggleConfig(e)}
                  className={config ? "ative" : "noative"}>
                  Configurações
                </Link>
              </li>
            </PegarPermissoes>
          </ul>
        </div>

        {permissao && (
          <div className="conteudo">
            <ConfiguracoesGerais />
          </div>
        )}
        {config && (
          <div className="conteudo">
            <Config />
          </div>
        )}
      </div>
    </div>
  );
};

export default Definicoes;
