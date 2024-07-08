import { Link, useNavigate } from "react-router-dom";
import "./menuPerfil.scss";
import { PiUser } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";

const MenuPerfil = () => {
  const navigate = useNavigate();

  function logaut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className="container1">
      <ul className="menu-perfil">
        <li>
          <Link to={`/perfil/${sessionStorage.getItem("id")}`}>
            <PiUser /> Perfil
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => {
              logaut(e);
            }}>
            <CiLogout />
            Terminar Sessão
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuPerfil;
