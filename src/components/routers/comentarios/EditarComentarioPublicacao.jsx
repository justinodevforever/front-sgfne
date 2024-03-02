import React, { useEffect, useState } from "react";
import "./EditarComentarioPublicacao.css";
import MenuBack from "../../page/coment/Menu-Back/MenuBack";
import { api } from "../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";

const EditarComentarioPublicacao = () => {
  const [comentario, setComentario] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getComentPublicacao = async () => {
    await api
      .get(`/comentario/publicacao/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setComentario(data.data);
      })
      .catch((err) => console.log(err));
  };
  const upDateComentPublicacao = async (e) => {
    e.preventDefault();
    await api
      .put(`/comentario/publicacao/${id}`, {
        comentario,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        window.history.back();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getComentPublicacao();
  }, []);
  return (
    <>
      <MenuBack />
      <div className="container-editarComentarioPublicacao">
        <form
          onSubmit={(e) => {
            upDateComentPublicacao(e);
          }}>
          <textarea
            defaultValue={comentario.comentario}
            onChange={(e) => {
              setComentario(e.target.value);
            }}
          />
          <button type="submit">Confirmar Edição</button>
        </form>
      </div>
    </>
  );
};

export default EditarComentarioPublicacao;
