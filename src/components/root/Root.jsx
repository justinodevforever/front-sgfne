import { Image, Layout } from "antd";
import Ispm from "../routers/hook/Ispm";
import "./root.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { useEffect } from "react";
import { CardText } from "react-bootstrap";
import { Content, Footer } from "antd/es/layout/layout";

const Root = () => {
  const navigate = useNavigate();
  const clicPropina = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate("/main/propina");
  };
  const clicReconfirmacao = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate("/main/reconfirmacao");
  };
  const clicRecurso = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate("/main/recurso");
  };
  const clicExameEspecial = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate(`/main/exame especial`);
  };
  const clicCadeira = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate(`/main/cadeira?tipos=${"Cadeira em Atrazo"}`);
  };
  const clicDeclaracaoComNota = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate(`/main/declaracao?tipos=${"Com Nota"}`);
  };
  const clicDeclaracaoSemNota = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate(`/main/declaracao?tipos=${"Sem Nota"}`);
  };
  const clicDeclaracaoLice = (e) => {
    e.preventDefault();
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
    navigate(`/main/declaracao?tipos=${"Linceciatura"}`);
  };
  return (
    <div className='root'>
      <Layout className='root'>
        <Content
          style={{
            display: "flex",
            overflowY: "auto",
            padding: "0px 20px",
          }}>
          <div className='benvindo'>
            <h1>Nossos Serviços</h1>
            <ul>
              <li>
                <span className='title'>Pagamento de Propina</span>
                <span>
                  Podes fazer o seu pagamento de Propina A partir daqui, faça já
                  o seu Pagamento
                </span>
                <Link onClick={(e) => clicPropina(e)}>Ir</Link>
              </li>
              <li className='reconfirmacao'>
                <span className='title'>Pagamento de Reconfirmação</span>
                <span>
                  Podes fazer o seu pagamento de Reconfirmação A partir daqui,
                  faça já o seu Pagamento
                </span>
                <Link onClick={(e) => clicReconfirmacao(e)}>Ir</Link>
              </li>
              <li className='recurso'>
                <span className='title'>Pagamento de Exame Especial</span>
                <span>
                  Podes fazer o seu pagamento de Exame Especial A partir daqui,
                  faça já o seu Pagamento
                </span>
                <Link onClick={(e) => clicExameEspecial(e)}>Ir</Link>
              </li>
              <li className='recurso'>
                <span className='title'>Pagamento de Cadeira em Atraso</span>
                <span>
                  Podes fazer o seu pagamento de Cadeira em Atraso A partir
                  daqui, faça já o seu Pagamento
                </span>
                <Link onClick={(e) => clicCadeira(e)}>Ir</Link>
              </li>
              <li className='recurso'>
                <span className='title'>Declaração com Nota</span>
                <span>
                  Podes fazer o seu pagamento de Declaração com Nota A partir
                  daqui, faça já o seu Pagamento
                </span>
                <Link onClick={(e) => clicDeclaracaoComNota(e)}>Ir</Link>
              </li>
              <li className='recurso'>
                <span className='title'>Declaração de Licenciatura</span>
                <span>
                  Podes fazer o seu pagamento de Declaração de Licenciatura A
                  partir daqui, faça já o seu Pagamento
                </span>
                <Link onClick={(e) => clicRecurso(e)}>Ir</Link>
              </li>
              <li className='recurso'>
                <span className='title'>Declaração de Licenciatura</span>
                <span>
                  Podes fazer o seu pagamento de Declaração sem Nota A partir
                  daqui, faça já o seu Pagamento
                </span>
                <Link onClick={(e) => clicDeclaracaoSemNota(e)}>Ir</Link>
              </li>

              <li className='recurso'>
                <span className='title'>Pagamento de Folha</span>
                <span>
                  Podes fazer o seu pagamento de Folha A partir daqui, faça já o
                  seu Pagamento
                </span>
                <Link onClick={(e) => clicRecurso(e)}>Ir</Link>
              </li>
            </ul>
            <div className='divlink'>
              <Link to={"/login"}>Entrar</Link>
              <Link to={"/cadastro"}>Criar Conta</Link>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
};
export default Root;
