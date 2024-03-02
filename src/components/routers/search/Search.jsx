import { Link, Outlet } from "react-router-dom";
import "./search.css";
import MenuBack from "../../page/coment/Menu-Back/MenuBack";
import { BsArrowLeft } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import SearchPage from "./SearchPage";

export const Search = () => {
  const hendleBack = (e) => {
    e.preventDefault();
    // 936709660
    // pedro Augusto

    window.history.back();
  };
  return (
    <div className="search">
      <nav>
        <ul>
          <Link
            onClick={(e) => {
              hendleBack(e);
            }}>
            {" "}
            <BsArrowLeft size={"25px"} color="#fff" />
          </Link>

          <li>
            <Link to={"/search/user"}>Amigo</Link>
          </li>
          <li>
            <Link to={"/search/page"}>Grupo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
