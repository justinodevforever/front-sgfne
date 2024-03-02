import "./tiposServicos.css";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../../../auth/auth";
import { useNavigate } from "react-router-dom";

const TiposServicos = () => {
  const [tipos, setTipos] = useState([]);
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState(0);

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

  return (
    <div className="tiposServicos">
      <label htmlFor="tipos" className="lbltipos">
        <span>Tipos de Serviços</span>
        <select
          name=""
          id=""
          className="tipos"
          onChange={(e) => setTipo(e.target.value)}>
          {tipos.map((dados) => (
            <option value={dados.tipo} key={dados.id}>
              {dados.tipo}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="tipos" className="lblvalor">
        <span>Valor</span>
        <input type="text" disabled value={valor} />
      </label>
    </div>
  );
};

export default TiposServicos;
