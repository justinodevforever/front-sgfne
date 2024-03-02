import { useEffect, useState } from "react";
import { api } from "../../../auth/auth";
import "./todasPaginas.css";
import { Link } from "react-router-dom";
import NavBar from "../navbar/navbar";

const TodasPaginas = () => {
  const [allPage, setAllPage] = useState([]);

  const hendleGetPage = async () => {
    const { data } = await api.get("/page");
    setAllPage(data);
  };

  useEffect(() => {
    hendleGetPage();
  }, []);
  return (
    <div className="container-allPage">
      <NavBar />
      <div className="conteudo-allPage">
        {allPage.map((pages) => (
          <div key={pages.id} className="conteudos">
            {pages.titulo === "" ? (
              <div></div>
            ) : (
              <ul className="lista">
                <li>
                  <Link to={`/page/${pages.id}?page=${1}`}>{pages.titulo}</Link>
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodasPaginas;
