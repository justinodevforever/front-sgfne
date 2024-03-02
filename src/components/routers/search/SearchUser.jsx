import { useEffect, useState } from "react";
import "./searchUser.css";
import { Link } from "react-router-dom";
import { api } from "../../../../auth/auth";
import Profile from "./Profile";
// import ContactoUsuario from "../contactoUsuario/ContactoUsuario";

function SearchUser() {
  const [user, setUser] = useState([]);
  const [nome, setNome] = useState("");
  const [validar, setValidadar] = useState(false);
  const [resultou, setResultou] = useState(false);

  async function hendleSearch() {
    const response = await api.post("/search/user", {
      nome,
    });
    setUser(response.data);
    setValidadar(true);

    if (response.data[0] !== undefined) {
      setResultou(true);
    } else {
      setResultou(false);
    }
  }
  useEffect(() => {
    hendleSearch();
  }, [nome]);

  return (
    <div className="container-search">
      <form>
        <input
          type="search"
          name="search"
          placeholder="Digite o seu nome"
          onChange={(e) => {
            setNome(e.target.value);
          }}
          required
        />
      </form>

      {user.map((user) => (
        <div key={user.id}>
          {validar === true ? (
            <div>
              {resultou === false ? (
                <span>Nenhum Resultado Encontrado!</span>
              ) : (
                <div className="userSearch">
                  <Profile id={user.id} />
                  <Link className="linkUser" to={`/perfil/${user.id}`}>
                    <span>{user.nome}</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
}
export default SearchUser;
