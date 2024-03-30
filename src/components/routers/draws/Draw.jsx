import { Link } from "react-router-dom";
import "./draw.scss";
import { CiAlignLeft } from "react-icons/ci";
import { PiTagChevronLight } from "react-icons/pi";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useState } from "react";

const Draw = () => {
  const [isClic, setIsClic] = useState(false);

  const clicService = (e) => {
    e.preventDefault();
    setIsClic(!isClic);
  };
  return (
    <div className="container-draw">
      <div>
        <Link onClick={(e) => clicService(e)}>
          Serviços{" "}
          {isClic ? <BiChevronDown size={24} /> : <BiChevronRight size={24} />}
        </Link>
        {isClic && (
          <div className="servicos1">
            <Link className="link">Reconfirmação</Link>
            <Link className="link">Propina</Link>
            <Link className="link">Reengresso</Link>
            <Link className="link">Recurso</Link>
            <Link className="link">P. Folha</Link>
            <Link className="link">Cadeira Em Atraso</Link>
            <Link className="link">Exame Especial</Link>
            <Link className="link">D. Sem Nota</Link>
            <Link className="link">D. Com Nota</Link>
            <Link className="link">D. de Licenciatura</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Draw;
