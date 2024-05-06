import { Image } from "antd";
import Ispm from "../routers/hook/Ispm";
import "./root.scss";
import { Link } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";

const Root = () => {
  return (
    <div className='root'>
      <div className='benvindo'>
        <BsCurrencyDollar color='red' />
      </div>
      <div className='divlink'>
        <Link to={"/login"}>Entrar</Link>
        <Link to={"/cadastro"}>Criar Conta</Link>
      </div>
    </div>
  );
};
export default Root;
