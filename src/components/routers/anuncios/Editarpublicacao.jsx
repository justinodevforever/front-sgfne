import { react, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import "./edicacaopublicacao.css";
import { api } from "../../../../auth/auth";
import { BiWinkSmile } from "react-icons/bi";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import MenuBack from "../../page/coment/Menu-Back/MenuBack";
import { setIsClic } from "../../../store/ui-slice";
import { Button } from "antd";
import { SaveTwoTone } from "@ant-design/icons";

export function EditarPublicacao() {
  const [publicacao, setPublicacao] = useState("");
  const [like, setLike] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [isPick, setIsPick] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getPublicacao() {
    const response = await api.get(`publicacao/${id}`);
    setPublicacao(response?.data?.publicacao);
    setLike(response?.data?.like);
    setFk_user(response?.data?.fk_user);
  }
  async function hendleSbmit(e) {
    e.preventDefault();
    setIsClic(true);
    await api
      .put(`/publicacao/${id}`, {
        publicacao,
        like,
        fk_user,
      })
      .then((data) => {
        if (data === "Token Invalid") {
          setIsClic(false);
          navigate(`/login`);
          return;
        }
        navigate(`/?page=${1}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getPublicacao();
  }, []);

  return (
    <>
      <MenuBack />
      <div className='container-EditarPublicacao'>
        <div className='conteudo'>
          <form onSubmit={(e) => hendleSbmit(e)}>
            <textarea
              defaultValue={publicacao}
              onChange={(e) => {
                setPublicacao(e.target.value);
              }}
            />

            <Button type='submit' icon={SaveTwoTone} />
          </form>
        </div>
      </div>
    </>
  );
}
