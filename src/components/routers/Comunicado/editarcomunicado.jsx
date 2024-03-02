import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editarComunicado.css";
import { api } from "../../../../auth/auth";

const EditarComunicado = () => {
  const [comunicado, setComunicado] = useState("");
  const [comunicar, setComunicar] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getComunicado();
  }, []);
  const getComunicado = async () => {
    const { data } = await api.get(`/comunicado/${id}`);
    setComunicado(data.comunicado);
  };

  const hendleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/comunicados?page=${1}`);
    await api.put(`/comunicado/${id}`, {
      comunicado: comunicar,
    });
  };

  return (
    <div className="editarComunicado">
      <form onSubmit={(e) => hendleSubmit(e)}>
        <textarea
          defaultValue={comunicado}
          onChange={(e) => setComunicar(e.target.value)}
        />
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default EditarComunicado;
