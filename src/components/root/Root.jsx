import "./root.scss";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div className="root">
      <div className="benvindo">
        <h1>SEJA BEM-VINDO AO ISPM</h1>
        <div className="sms">
          <p>Este é o Sistema de Gerenciamento Financeiro do ISPM.</p>
          <p>
            Aqui você pode fazer o Pagamento de todos Serviços que Existe na
            Instituição.
          </p>
          <h4>Obrigado Pela Preferência!</h4>
        </div>
      </div>
      <div className="divlink">
        <Link to={"/login"}>Entrar</Link>
        <Link to={"/cadastrar"}>Criar Conta</Link>
      </div>
    </div>
  );
};
export default Root;
