import React, { useEffect, useState } from "react";
import "./EditarComentarioPublicacao.scss";
import MenuBack from "../../page/coment/Menu-Back/MenuBack";
import { api } from "../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { SaveTwoTone } from "@ant-design/icons";

const EditarComentarioPublicacao = () => {
  const [comentario, setComentario] = useState("");
  const [isClic, setIsClic] = useState(false);
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
    setIsClic(true);
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
      <div className='container-editarComentarioPublicacao'>
        <form>
          <textarea
            defaultValue={comentario.comentario}
            onChange={(e) => {
              setComentario(e.target.value);
            }}
          />
          <Button
            type='primary'
            icon={<SaveTwoTone />}
            loading={isClic}
            onClick={(e) => {
              upDateComentPublicacao(e);
            }}>
            Salvar
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditarComentarioPublicacao;
