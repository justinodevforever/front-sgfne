import { useEffect, useState } from "react";
import "./perfil.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../auth/auth";
import { CiEdit } from "react-icons/ci";
import { Skeleton } from "antd";

let clicou = false;
let id1;

export const deletePublicacaoPerfil = async (id) => {
  const navigate = useNavigate();
  clicou = true;
  id1 = id;
  await api
    .delete(`/publicacao/${id}`)
    .then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
    })
    .catch((err) => console.log(err));
};

function Perfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(true);
  const [image, setImage] = useState([]);
  const [user, setUser] = useState([]);
  const [publicacoes, setPublicacoes] = useState([]);
  const [email, setEmail] = useState("");
  const [paginacao, setPaginacao] = useState({});
  const params = useParams();
  const { id } = params;
  const url = import.meta.env.VITE_API_URL_SOCKET;

  async function hendleGetUser() {
    await api
      .get(`/user/perfil/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setUser(data.data);
        setEmail(data.data?.email);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  async function hendleGetImage() {
    await api
      .post("/images/user", {
        fk_user: id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setImage(data.data[0]);
        setLoadingImage(false);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    setPublicacoes(publicacoes?.filter((pub) => pub?.id !== id1));
    clicou = false;
  }, [clicou]);

  useEffect(() => {
    hendleGetUser();
    hendleGetImage();
  }, []);
  return (
    <div className='container-perfil'>
      <div className=' conteudo-perfil'>
        <h1>Perfil</h1>

        {image == undefined || null || image.length == 0 ? (
          <img src={"../../../image/emptyImage.jpg"} alt={""} className='img' />
        ) : (
          <img src={image?.nome} alt={""} className='img' />
        )}

        {user?.id == sessionStorage.getItem("id") && (
          <Link to={"/fotoperfil"} className='linkes'>
            Trocar foto do perfil
          </Link>
        )}
        <Link to={`/fotos/${id}`} className='linkes'>
          Fotos
        </Link>
        {user?.id == sessionStorage.getItem("id") && (
          <Link to={"/editar_perfil"} className='linkes'>
            Editar Perfil
          </Link>
        )}

        <Skeleton loading={loading}>
          <div className='dados-perfil'>
            <span>Nome: {user?.nome}</span>
            <br />
            <span>contacto : {user?.contacto}</span>
            <br />
            <span>email: {user?.email}</span>
            <br />
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default Perfil;
