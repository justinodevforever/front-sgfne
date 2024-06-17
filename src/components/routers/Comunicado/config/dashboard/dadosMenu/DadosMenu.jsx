import { Link, useSearchParams } from "react-router-dom";
import "./dadosMenu.scss";
import { CurrencyExchange } from "@mui/icons-material";
import { DollarOutlined, DollarTwoTone } from "@ant-design/icons";
import { BiDollar } from "react-icons/bi";
import { useState } from "react";

const DadosMenu = ({ pay, config, register, printer }) => {
  const [reco, setReco] = useState(false);
  const [active] = useSearchParams();

  return (
    <div className='dadosMenu'>
      <ul>
        {pay && (
          <>
            <Link to={`propina/${2}?active=${"prop"}`}>
              <li className={active.get("active") === "prop" ? "isProp" : "li"}>
                <BiDollar />
                Propina
              </li>
            </Link>
            <Link to={`reconfirmacao/${2}?active=${"reco"}`}>
              <li className={active.get("active") === "reco" ? "isReco" : "li"}>
                <BiDollar />
                Reconfirmação
              </li>
            </Link>
            <Link to={`recurso/${2}?active=${"rec"}`}>
              <li
                className={active.get("active") === "rec" ? "isRecurso" : "li"}>
                <BiDollar />
                Recurso
              </li>
            </Link>
            <Link to={`exame especial/${2}?active=${"ex"}`}>
              <li className={active.get("active") === "ex" ? "isExame" : "li"}>
                <BiDollar />
                Exame Especial
              </li>
            </Link>
            <Link to={`cadeira de atraso/${2}?active=${"cad"}`}>
              <li
                className={active.get("active") === "cad" ? "isCadeira" : "li"}>
                <BiDollar />
                Cadeira em Atraso
              </li>
            </Link>
            <Link to={`declaracao/${2}?tipos=${"Linceciatura"}&active=${"dl"}`}>
              <li className={active.get("active") === "dl" ? "isLince" : "li"}>
                <BiDollar />
                D. de Licenciatura
              </li>
            </Link>
            <Link to={`declaracao/${2}?tipos=${"Com Nota"}&active=${"dn"}`}>
              <li className={active.get("active") === "dn" ? "isNota" : "li"}>
                <BiDollar />
                D. Com Nota
              </li>
            </Link>
            <Link to={`declaracao/${2}?tipos=${"Sem Nota"}&active=${"dn"}`}>
              <li className={active.get("active") === "ds" ? "isSem" : "li"}>
                <BiDollar />
                D. Sem Nota
              </li>
            </Link>
            <Link to={`folha/${2}?active=${"fl"}`}>
              <li className={active.get("active") === "fl" ? "isPag" : "li"}>
                <BiDollar />
                Pagamento de Folha
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default DadosMenu;
