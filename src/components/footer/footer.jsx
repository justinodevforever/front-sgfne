import { useEffect, useState } from "react";
import "./footer.css";
import { api } from "../../../auth/auth";

function Footer() {
  const [anuncios, setAnuncios] = useState([]);
  const elem = document.getElementById("q");

  function animar() {
    let pos = 0;

    pos++;
    elem.style.marginRight = pos + "px";
    console.log(pos);
  }

  async function getAd() {
    const response = await api.get("/getad");
    setAnuncios(response.data);
  }

  useEffect(() => {
    getAd();
    setInterval(animar, 5);
  }, []);
  return (
    <>
      <div className="container-footer">
        {anuncios.map((anu) => (
          <div className="anuncios" key={anu.id} id="q">
            <p id="texto">{anu.anuncio}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Footer;
