import "./menu.css";
import { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useRefMenu from "../../hook/useRefMenu";
import { deletePublicacao } from "../publicacao";
import { BsThreeDots } from "react-icons/bs";

const Menu = forwardRef(({ id }, ref) => {
  const [setMostrar, mostrar, toggleMenu] = useRefMenu();
  function hendleDelete() {
    deletePublicacao(id);
  }
  useEffect(() => {
    const clic = (e) => {
      if (!ref.current.contains(e.target)) toggleMenu();
    };
    document.addEventListener("mousedown", clic);

    return () => {
      document.removeEventListener("mousedown", clic);
    };
  }, []);
  return (
    <div className="div" ref={ref}>
      <Link>
        <BsThreeDots
          color="#fff"
          size={"20px"}
          onClick={(e) => {
            toggleMenu(e);
          }}
        />
      </Link>
      {mostrar && (
        <div className="div-menu">
          <ul>
            <li>
              <Link to={`/edit/publication/${id}`}>Editar</Link>
            </li>

            <li>
              {" "}
              <Link onClick={hendleDelete}>Eliminar</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
});

Menu.displayName = "Menu";

export default Menu;
