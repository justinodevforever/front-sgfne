import { useEffect, useState } from "react";
import "./criarPagina.css";
import { api } from "../../../auth/auth";
import { useNavigate } from "react-router-dom";

const CriarPagina = () => {
  const [titulo, setTitulo] = useState("");
  const navigate = useNavigate();

  const hendleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/page", {
      titulo,
      fk_user: sessionStorage.getItem("id"),
    });
    setTitulo("");
    navigate(`/page/${data.response.id}`);

    console.log(data);
  };

  return (
    <div className="container-criaPpagina">
      <h1>Criar Grupo</h1>

      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}>
        <input
          type="text"
          value={titulo}
          placeholder="Digite o Título da Grupo!"
          onChange={(e) => {
            setTitulo(e.target.value);
          }}
          required
        />

        <button type="submit">Criar Grupo</button>
      </form>
    </div>
  );
};

export default CriarPagina;
