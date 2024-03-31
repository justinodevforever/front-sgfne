import { useEffect } from "react";
import "./animationComponentLogin.css";

const AnimationComponentLogin = ({ click }) => {
  useEffect(() => {
    function animacao() {
      const primeiro = document.getElementById("primeiro");
      const segundo = document.getElementById("segundo");
      const terceiro = document.getElementById("terceiro");
      let ani = null;
      let pos = 0;
      ani = setInterval(() => {
        pos++;
        if (click) {
          if (pos === Number(1)) {
            primeiro.style.background = "#a31543";
          } else if (pos === Number(2)) {
            primeiro.style.background = "#fff";
            segundo.style.background = "#a31543";
          } else if (pos === Number(3)) {
            segundo.style.background = "#fff";
            terceiro.style.background = "#a31543";
          } else {
            terceiro.style.background = "#fff";
            pos = 0;
          }
        } else {
          clearInterval(ani);
        }
      }, 500);

      // let time = null;
      // time = setTimeout(() => {
      //   clearInterval(ani);
      //   clearTimeout(time);
      // }, 6000);
    }
    animacao();
  }, [click]);

  return (
    <div className="container-animator">
      <img src="./image/ISP_Moxico/Logo.png" alt="Logo do ISPM" />
      <div className="anima">
        <div className="animator primeiro" id="primeiro"></div>
        <div className="animator segundo" id="segundo"></div>
        <div className="animator terceiro" id="terceiro"></div>
      </div>
    </div>
  );
};

export default AnimationComponentLogin;
