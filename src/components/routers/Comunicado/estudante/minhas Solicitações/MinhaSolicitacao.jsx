import { Link } from "react-router-dom";
import "./solicitacao.scss";
import { BiX } from "react-icons/bi";
import { OKIcon } from "react-share";
import { FcOk } from "react-icons/fc";
import { Card } from "antd";

const MinhaSolicitacao = () => {
  return (
    <div className='solicitacao'>
      <h1>Minhas Solitações</h1>
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
          <Link
            style={{
              background: "#00f",
              padding: "4px",
              color: "#fff",
              borderRadius: "5px",
            }}>
            Pendente
          </Link>
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
          <Link
            style={{
              background: "#0f0",
              padding: "4px",
              color: "#fff",
              borderRadius: "5px",
            }}>
            Aceite
          </Link>
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
          <div>
            <Link>Detalhes</Link>
            <Link
              style={{
                background: "#f00",
                padding: "4px",
                color: "#fff",
                borderRadius: "5px",
              }}>
              Negado
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhaSolicitacao;
