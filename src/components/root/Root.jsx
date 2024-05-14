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
                <span className='title'>Pagamento de Recurso</span>
                <span>
                  Podes fazer o seu pagamento de Recurso A partir daqui, faça já
                  o seu Pagamento
                </span>
                <Link onClick={(e) => clicRecurso(e)}>Ir</Link>
              </li>
            </ul>
          </div>
        </Content>
        <Footer>
          <div className='divlink'>
            <Link to={"/login"}>Entrar</Link>
            <Link to={"/cadastro"}>Criar Conta</Link>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};
export default Root;
