import { useEffect } from "react";
import "./animationComponentLogin.css";

const AnimationComponentLogin = ({ setClick, click }) => {
  useEffect(() => {
    function animacao() {
      const primeiro = document.getElementById("primeiro");
      const segundo = document.getElementById("segundo");
      const terceiro = document.getElementById("terceiro");
      let ani = null;
      clearInterval(ani);
      let pos = 0;
      ani = setInterval(() => {
        pos++;
        if (click) {
          // segundo.style.border = "1px solid #a31543";
          // primeiro.style.border = "1px solid #a31543";
          // terceiro.style.border = "1px solid #a31543";
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
        }

        console.log(click);
      }, 500);

      let time = null;
      time = setTimeout(() => {
        clearInterval(ani);
        clearTimeout(time);
      }, 6000);
    }
    animacao();
  }, []);

  return (
    <div className="container-animator">
      <img src="./public/image/ISP_MOXICO/Logo.png" alt="log" />
      <div className="anima">
        <div className="animator primeiro" id="primeiro"></div>
        <div className="animator segundo" id="segundo"></div>
        <div className="animator terceiro" id="terceiro"></div>
      </div>
    </div>
  );
};

export default AnimationComponentLogin;
