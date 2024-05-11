import { Link } from "react-router-dom";
import "./solicitacao.scss";
import { BiX } from "react-icons/bi";
import { OKIcon } from "react-share";
import { FcOk } from "react-icons/fc";
import { Card } from "antd";

const Solicitacao = () => {
  return (
    <div className='solicitacao'>
      <h1>Solitações Feita</h1>
      <div className='conteudo'>
        <div className='divNome'>
          <h3>Justino Chitombi</h3>
          <span>
            <strong>Serviço: Propina</strong>
          </span>
        </div>
        <div className='divOpcoes'>
          <Link>Verificar</Link>
          <Link>
            <BiX size={23} color='red' />
          </Link>
          <Link>Negar</Link>
          <Link>Pendente</Link>
        </div>
      </div>
      <div className='conteudo'>
        <div className='divNome'>
          <h3>Justino Chitombi</h3>
          <span>
            <strong>Serviço: Propina</strong>
          </span>
        </div>
        <div className='divOpcoes'>
          <Link>Verificar</Link>
          <Link>
            <BiX size={23} color='red' />
          </Link>
          <Link>Negar</Link>
          <Link>Pendente</Link>
        </div>
      </div>
    </div>
  );
};

export default Solicitacao;
