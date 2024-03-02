import { useEffect, useRef, useState } from "react";
import "./servicos.scss";
import { api } from "../../../../../auth/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Propina from "./propinas/Propinas";
import { PiMessengerLogo, PiPrinter } from "react-icons/pi";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidMessage } from "react-icons/bi";
import SobreCadeiras from "./sobre cadeiras/SobreCadeiras";
import Reconfirmacao from "./reconfirmação/Reconfirmacao";
import Declaracao from "./declarações/Declaracao";

const Servicos = () => {
  const [tipos, setTipos] = useState([]);
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState(0);
  const [active, setActive] = useState(true);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);
  const [active5, setActive5] = useState(false);
  const [active6, setActive6] = useState(false);
  const [active7, setActive7] = useState(false);
  const [active8, setActive8] = useState(false);
  const [active9, setActive9] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getTiposServicos();
  }, []);
  useEffect(() => {
    getTiposServicosEspecifico();
  }, [tipo]);

  const getTiposServicos = async () => {
    await api
      .get("/tipo/servico")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setTipos(data.data);
        setTipo(data.data[0].tipo);
      })
      .catch((err) => console.log(err));
  };
  const getTiposServicosEspecifico = async () => {
    await api
      .post("/tipo/servico/especifico", {
        tipo,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setValor(data.data.valor);
      })
      .catch((err) => console.log(err));
  };
  function toggle(e) {
    e.preventDefault();

    setActive(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle1(e) {
    e.preventDefault();

    setActive1(true);
    setActive(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle2(e) {
    e.preventDefault();

    setActive2(true);
    setActive(false);
    setActive1(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle3(e) {
    e.preventDefault();

    setActive3(true);
    setActive1(false);
    setActive2(false);
    setActive(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle4(e) {
    e.preventDefault();

    setActive4(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle5(e) {
    e.preventDefault();
    setActive5(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle6(e) {
    e.preventDefault();

    setActive6(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive(false);
    setActive7(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle7(e) {
    e.preventDefault();

    setActive7(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive(false);
    setActive8(false);
    setActive9(false);
  }
  function toggle8(e) {
    e.preventDefault();

    setActive8(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive(false);
    setActive9(false);
  }
  function toggle9(e) {
    e.preventDefault();
    setActive9(true);
    setActive1(false);
    setActive2(false);
    setActive3(false);
    setActive4(false);
    setActive5(false);
    setActive6(false);
    setActive7(false);
    setActive8(false);
    setActive(false);
  }

  return (
    <div className="container-servico">
      <h1>Nossos Serviços Disponivel</h1>
      <div className="servicos">
        <ul>
          <li>
            <Link
              onClick={(e) => toggle(e)}
              className={active ? "active" : "no"}>
              Cadeira em Atrazo
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle1(e)}
              className={active1 ? "active" : "no"}>
              D. com Notas
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle2(e)}
              className={active2 ? "active" : "no"}>
              D. de Licenciatura
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle3(e)}
              className={active3 ? "active" : "no"}>
              D. sem Notas
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle4(e)}
              className={active4 ? "active" : "no"}>
              Exame Especial
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle5(e)}
              className={active5 ? "active" : "no"}>
              P. de Folha
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle6(e)}
              className={active6 ? "active" : "no"}
              to={"/"}>
              Propina
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle7(e)}
              className={active7 ? "active" : "no"}>
              Reconfirmação
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle8(e)}
              className={active8 ? "active" : "no"}>
              Recurso
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => toggle9(e)}
              className={active9 ? "active" : "no"}>
              Reenggresso
            </Link>
          </li>
          {/* <Link to={`/pagamentos/menu`}>Solicitar</Link> */}
        </ul>
        <div className="tipoServico">
          {active && <SobreCadeiras tipo={"Cadeira em Atrazo"} />}
          {active1 && <Declaracao tipo={"Declaração com Notas"} />}
          {active3 && <Declaracao tipo={"Declaração sem Notas"} />}
          {active4 && <SobreCadeiras tipo={"Exame Especial"} />}
          {active6 && <Propina tipo={"Propina"} />}
          {active7 && <Reconfirmacao tipo={"Reconfirmação"} />}
          {active8 && <SobreCadeiras tipo={"Recurso"} />}
        </div>
      </div>
      <div className="imprimir" onClick={() => alert("Imprimir")}>
        <AiFillMessage color="#a31543" size={50} cursor={"pointer"} />
      </div>
    </div>
  );
};

export default Servicos;
