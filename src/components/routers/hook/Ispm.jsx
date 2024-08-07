import { useEffect } from "react";
import "./ispm.css";

const Ispm = ({ isClic }) => {
  useEffect(() => {
    function animacao() {
      let pos = 0;
      const i = document.getElementById("i");
      const s = document.getElementById("s");
      const p = document.getElementById("p");
      const m = document.getElementById("m");

      let anim = 0;
      if (isClic) {
        let leng = 0;
        anim = setInterval(() => {
          pos++;
          leng++;

          if (pos === 1) {
            i.style.color = "#a31543";
          } else if (pos === 2) {
            s.style.color = "#d18aa1";
          } else if (pos === 3) {
            p.style.color = "#fff";
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
        return;
      }

      clearTimeout(anim);
    }
    animacao();
  }, [isClic]);
  return (
    <>
      <div className='container-ispm'>
        <div className='conteudo-ispm'>
          <div className='letras i'>
            <h1 id='i'>I</h1>
          </div>
          <div className='letras s'>
            <h1 id='s'>S</h1>
          </div>
          <div className='letras p'>
            <h1 id='p'>P</h1>
          </div>
          <div className='letras m'>
            <h1 id='m'>M</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ispm;
