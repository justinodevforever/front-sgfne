import { useState } from "react";
import { BiSolidImage, BiWinkSmile } from "react-icons/bi";
import "./publicacaoPagina.css";
import { useNavigate, useParams } from "react-router-dom";
import { api, apiMultForm } from "../../../auth/auth";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import axios from "axios";

const PublicacarPagina = () => {
  const [publicar, setPublicar] = useState("");
  const [file, setFile] = useState(null);
  const [isPick, setIsPick] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const hendleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { data } = await api.post("/publication/page", {
      publicacao: publicar,
      fk_pagina: id,
      fk_user: sessionStorage.getItem("id"),
    });
    formData.append("file", file);
    formData.append("fk_pagina", data.id);
    const response = await axios.post(
      "http://localhost:3001/image/page",
      formData,
      {
        headers: {
          "content-type": "multipart/form/data",
        },
      }
    );
    navigate(`/page/${id}?page=${1}`);
    setPublicar("");
  };

  return (
    <div className="container-publicarPagina">
      <form
        onSubmit={(e) => {
          hendleSubmit(e);
        }}>
        <textarea
          value={publicar}
          name="publicacao"
          placeholder="Faz publicação na Página"
          onChange={(e) => {
            setPublicar(e.target.value);
          }}
        />

        <div className="div-imojiImg">
          <div className={"container-emoji"}>
            <BiWinkSmile
              cursor={"pointer"}
              size={"30px"}
              color="#fff"
              onClick={() => {
                setIsPick(!isPick);
              }}
            />
            <div className={isPick ? "abrirEmoji" : "feicharEmoji"}>
              <Picker
                width="40px"
                size="20px"
                data={data}
                previewPosition="fixed"
                onEmojiSelect={(e) => {
                  setPublicar(publicar + e.native);
                }}
                className="emoji"
              />
            </div>
          </div>
        </div>
        <label htmlFor="input-file">
          <BiSolidImage size={"50px"} color="#00f" cursor={"pointer"} />
        </label>

        <input
          type="file"
          name="input-file"
          id="input-file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          hidden
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default PublicacarPagina;
