import { Link, useNavigate } from "react-router-dom";
import "./logout.scss";

const Logout = ({ setIsLogout }) => {
  const navigate = useNavigate();
  const onNao = (e) => {
    e.preventDefault();
    setIsLogout(false);
  };
  const onSim = (e) => {
    e.preventDefault();
    setIsLogout(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <div className='logout'>
        <h4>Pretendes Terminar a Sessão?</h4>
        <div className='btn'>
          <Link className='sim' onClick={(e) => onSim(e)}>
            Sim
          </Link>
          <Link className='nao' onClick={(e) => onNao(e)}>
            Não
          </Link>
        </div>
      </div>

      <div className='overlay'></div>
    </>
  );
};

export default Logout;
