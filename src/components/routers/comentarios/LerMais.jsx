import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./lerMais.css";

const LerMais = ({ publ, id, toggleLerMais }) => {
  const [noId, setNoId] = useState(0);
  const clikRef = useRef();

  useEffect(() => {
    setNoId(id);
  }, []);

  useEffect(() => {
    function clic(e) {
      try {
        if (!clikRef.current.contains(e.target)) return;
        setNoId(id);
      } catch (error) {}
    }
    document.addEventListener("mousedown", clic);
    return () => {
      document.addEventListener("mousedown", clic);
    };
  }, []);

  return (
    <>
      <div className="lerMais">
        <div>
          <Link onClick={(e) => toggleLerMais()}>Ler mais</Link>
        </div>
      </div>
    </>
  );
};

export default LerMais;
