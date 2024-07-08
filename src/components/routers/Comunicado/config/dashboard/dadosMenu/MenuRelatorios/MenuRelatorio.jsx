import { Link, useSearchParams } from "react-router-dom";
import "./menuRelatorio.scss";
import { CurrencyExchange } from "@mui/icons-material";
import {
  DollarOutlined,
  DollarTwoTone,
  PrinterFilled,
} from "@ant-design/icons";
import { BiDollar } from "react-icons/bi";
import { useState } from "react";

const MenuRelatorio = ({ printer }) => {
  const [reco, setReco] = useState(false);
  const [active] = useSearchParams();

  return (
    <div className='menuRelatorio'>
      <ul>
        {printer && (
          <>
            <Link to={`/relatorios/${4}?active=${"eme"}`}>
              <li className={active.get("active") === "eme" ? "isEme" : "li"}>
                <PrinterFilled />
                R. E. Por Estudante
              </li>
            </Link>
            <Link to={`/relatorio_curso/${4}?`}>
              <li className={"li"}>
                <PrinterFilled />
                R. dos Emulumentos Por Curso
              </li>
            </Link>
            <Link to={`/relatorio_listarecurso/${4}?ative=${"rlr"}`}>
              <li className={active.get("active") === "rlr" ? "isRlr" : "li"}>
                <PrinterFilled />
                Lista de Recurso
              </li>
            </Link>
            <Link to={`/relatorio_regime/${4}?ative=${"rrm"}`}>
              <li className={active.get("active") === "rrm" ? "isRrm" : "li"}>
                <PrinterFilled />
                R. Financeiro Por Regime
              </li>
            </Link>
            <Link to={`/movimento_financeiro/${4}?ative=${"mv"}`}>
              <li className={"li"}>
                <PrinterFilled />
                Movimento Do Caixa
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuRelatorio;
