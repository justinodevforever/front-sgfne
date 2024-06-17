import React, { useState } from "react";
import NavBar from "../navbar/navbar";
import "./home.css";
import Ispm from "./hook/Ispm";
import Principal from "./Comunicado/Principal";
import "dotenv";
import Draw from "./draws/Draw";
import { Outlet } from "react-router-dom";

function Home() {
  const [mostrar, setMostrar] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {
    const c = document.getElementById("c");
    c?.classList.add("opacity");
  }

  return (
    <>
      <div className='homeC'>
        <NavBar
          setMostrar={setMostrar}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          mostrar={mostrar}
        />
        <div className='container-home'>
          <div className='container-hom' id='c'>
            <Principal setMostrar={setMostrar} mostrar={mostrar} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
