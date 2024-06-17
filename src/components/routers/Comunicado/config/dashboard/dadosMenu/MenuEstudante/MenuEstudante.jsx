import { Link, useSearchParams } from "react-router-dom";
import "./menuEstudante.scss";
import { CurrencyExchange, ListOutlined, Update } from "@mui/icons-material";
import {
  DollarOutlined,
  DollarTwoTone,
  PlusOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import { BiDollar } from "react-icons/bi";
import { useState } from "react";

const MenuEstudante = ({ studente }) => {
  const [reco, setReco] = useState(false);
  const [active] = useSearchParams();

  return (
    <div className='menuEstudante'>
      <ul>
        {studente && (
          <>
            <Link to={`matricular_estudante/${5}?active=${"mt"}`}>
              <li className={active.get("active") === "mt" ? "isMt" : "li"}>
                <PlusOutlined />
                Matricalar Estudante
              </li>
            </Link>
            <Link to={`listar_estudante/${5}?active=${"le"}`}>
              <li className={active.get("active") === "le" ? "isLe" : "li"}>
                <ListOutlined />
                Listar Estudante
              </li>
            </Link>
            <Link to={`atualizar_estudante/${5}?active=${"ae"}`}>
              <li className={active.get("active") === "ae" ? "isAe" : "li"}>
                <Update />
                Actualizar Estudante
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuEstudante;
