import { useState } from "react";
import "./definicoes.scss";
import { Link } from "react-router-dom";
import PegarPermissoes from "../../../../configs/permissoes/PegarPermissoes";
import Config from "./configuracoes/Config";
import { ToolOutlined } from "@ant-design/icons";
import { FaUserLock } from "react-icons/fa";
import PermissoesUSuario from "./ConfiguracoesGerais/permissoes/PermissoesUsuario";

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
    <div className='container-definicoes'>
      <div className='definicoes'>
        <div className='opcoes'>
          <ul className='ul'>
            <li>
              <PegarPermissoes permissoes={["admin", "edição"]}>
                <Link
                  onClick={(e) => togglePermissoes(e)}
                  className={permissao ? "ative" : "noative"}>
                  <FaUserLock /> Permissões
                </Link>
              </PegarPermissoes>
            </li>
            <PegarPermissoes permissoes={["admin"]}>
              <li>
                <Link
                  onClick={(e) => toggleConfig(e)}
                  className={config ? "ative" : "noative"}>
                  <ToolOutlined />
                  Ajustes
                </Link>
              </li>
            </PegarPermissoes>
          </ul>
        </div>

        {permissao && (
          <div className='conteudo'>
            <PermissoesUSuario />
          </div>
        )}
        {config && (
          <div className='conteudo'>
            <Config />
          </div>
        )}
      </div>
    </div>
  );
};

export default Definicoes;
