import { useEffect, useState } from "react";
import MenuBack from "./Menu-Back/MenuBack";
import "./editComentPage.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "../../../../auth/auth";

const EditComentPage = () => {
  const [coment, setComent] = useState("");
  const [idComent] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const hendleEditComent = async (e) => {
    e.preventDefault();
    await api.put(`/coment/publication/${id}`, {
      comentario: coment,
    });
    navigate(`/coment/publication/page/${idComent.get("id")}`);
  };
  const hendleGetComent = async () => {
    const { data } = await api.get(`/coment/publication/${id}`);
    setComent(data.comentario);
  };
  useEffect(() => {
    hendleGetComent();
  }, []);
  return (
    <>
      <MenuBack className="d" />
      <div className="container-EditComentPage">
        <form
          onSubmit={(e) => {
            hendleEditComent(e);
          }}>
          <textarea
            defaultValue={coment}
            onChange={(e) => {
              setComent(e.target.value);
            }}
          />

          <button type="submit">Confirmar</button>
        </form>
      </div>
    </>
  );
};
export default EditComentPage;
