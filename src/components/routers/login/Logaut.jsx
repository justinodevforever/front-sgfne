import { Link, useNavigate } from "react-router-dom";
import "./logaut.css";
import { CgLogOff } from "react-icons/cg";
import "../respossividade.css";

export default function Logaut() {
  const navigate = useNavigate();
  function logaut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <>
      <Link
        onClick={(e) => {
          logaut(e);
        }}
        className="logaut">
        Terminar Sessão
      </Link>
    </>
  );
}
