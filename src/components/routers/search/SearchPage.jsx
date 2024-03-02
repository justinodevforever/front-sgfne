import { useEffect, useState } from "react";
import "./searchPage.css";
import { api } from "../../../../auth/auth";
import { Link, Outlet } from "react-router-dom";
const SearchPage = () => {
  const [paginas, setPaginas] = useState([]);
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    const getPages = async () => {
      const { data } = await api.post("/search/page", {
        titulo: pageName,
      });
      setPaginas(data);
    };

    getPages();
    console.log(pageName);
  }, [pageName]);

  return (
    <div className="container-SearchPagw">
      <form>
        <input
          value={pageName}
          type="search"
          placeholder="Digite o Nome Da Página!"
          onChange={(e) => {
            setPageName(e.target.value);
          }}
        />
      </form>

      {paginas.length <= 0 ? (
        <span>Nenhuma Grupo Encontrado</span>
      ) : (
        <div className="content-page">
          {paginas.map((pg) => (
            <div className="page" key={pg.id}>
              <Link to={`/page/${pg.id}?page=${1}`}>{pg.titulo}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
