import { useEffect, useState } from "react";
import "./editarPublicacaoPagina.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "../../../auth/auth";
const EdiatrPublicacaoPagina = () => {
  const [publicar, setPublicar] = useState("");
  const [publicacao, setPublicacao] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [idPage] = useSearchParams();

  const EditarPublicacao = async (e) => {
    e.preventDefault();
    await api.put(`/publication/page/${id}`, {
      publicacao: publicar,
    });
    navigate(`/page/${idPage.get("id")}?page=${1}`);
  };

  useEffect(() => {
    const getPublication = async () => {
      const { data } = await api.get(`/publication/page/${id}`);
      setPublicacao(data);
    };
    getPublication();
  }, []);

  return (
    <div className="editarPublicacaoPagina">
      <form onSubmit={(e) => EditarPublicacao(e)}>
        <textarea
          required
          defaultValue={publicacao.publicacao}
          onChange={(e) => {
            setPublicar(e.target.value);
          }}
        />
        <button>Confirmar Edição</button>
      </form>
    </div>
  );
};

export default EdiatrPublicacaoPagina;
