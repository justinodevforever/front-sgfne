import { useEffect } from "react";
import "./ispm.css";

const Ispm = () => {
  useEffect(() => {
    function animacao() {
      let an = null;
      let pos = 0;
      const i = document.getElementById("i");
      const s = document.getElementById("s");
      const p = document.getElementById("p");
      const m = document.getElementById("m");
      const cr = document.getElementById("cr");
      const cr1 = document.getElementById("cr1");
      const cr2 = document.getElementById("cr2");
      const cr3 = document.getElementById("cr3");

      let leng = 0;
      setInterval(() => {
        pos++;
        leng++;

        if (pos === 1) {
          i.style.color = "#a31543";
        } else if (pos === 2) {
          s.style.color = "#d18aa1";
        } else if (pos === 3) {
          p.style.color = "#521e4d";
        } else if (pos === 4) {
          m.style.color = "#a88ea6";
        } else {
          pos = 0;
          m.style.color = "transparent";
          i.style.color = "transparent";
          p.style.color = "transparent";
          s.style.color = "transparent";
        }
      }, 500);
    }
    animacao();
  }, []);
  return (
    <div className="container-ispm">
      <div className="carregar" id="cr"></div>
      <div className="carregar" id="cr1"></div>
      <div className="carregar" id="cr2"></div>
      <div className="carregar" id="cr3"></div>

      <div className="conteudo-ispm">
        <div className="letras i">
          <h1 id="i">I</h1>
        </div>
        <div className="letras s">
          <h1 id="s">S</h1>
        </div>
        <div className="letras p">
          <h1 id="p">P</h1>
        </div>
        <div className="letras m">
          <h1 id="m">M</h1>
        </div>
      </div>
    </div>
  );
};

export default Ispm;
