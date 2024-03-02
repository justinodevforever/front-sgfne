import { useEffect, useRef, useState } from "react";
import "./menuPagamento.css";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../../../navbar/navbar";
import Propina from "../propinas/Propinas";
import Declaracao from "../declarações/Declaracao";
import SobreCadeiras from "../sobre cadeiras/SobreCadeiras";
import Reconfirmacao from "../reconfirmação/Reconfirmacao";

const MenuPagamento = ({ valor }) => {
  const navigate = useNavigate();
  const { tipo } = useParams();

  return (
    <>
      <NavBar />

      <Propina tipo={tipo} />
      <Declaracao tipo={tipo} />
      <SobreCadeiras tipo={tipo} />
      <Reconfirmacao tipo={tipo} />
    </>
  );
};

export default MenuPagamento;
