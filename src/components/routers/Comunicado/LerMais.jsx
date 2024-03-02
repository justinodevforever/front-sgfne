import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./lerMais.css";
const LerMais = ({ toggleLerMais, comunicados, id }) => {
  return (
    <div className="lerMais">
      {<Link onClick={toggleLerMais}>Ler mais</Link>}
    </div>
  );
};

export default LerMais;
