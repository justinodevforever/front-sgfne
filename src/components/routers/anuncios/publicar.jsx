import { useEffect, useRef, useState } from "react";
import { chatflech } from "../../../configs/axios/chatfletch";
import { useNavigate } from "react-router-dom";
import { BiSolidImage, BiWinkSmile } from "react-icons/bi";
import "./publicar.css";
import axios from "axios";
import { io } from "socket.io-client";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { api } from "../../../../auth/auth";
import { apiMultForm } from "../../../../auth/auth";

const Publicar = () => {
  const [publicacao, setPublicacao] = useState("");
  const [like, setLike] = useState(0);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [isPick, setIsPick] = useState(false);
  const socketInstance = useRef();
  const url = import.meta.env.VITE_VERCEL_URL_SOCKET;

  useEffect(() => {
    socketInstance.current = io(`${url}`);
  }, []);
  const hendlePublicacao = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const response = await api.post("/publicacao", {
      publicacao,
      like,
      fk_user: sessionStorage.getItem("id"),
    });
    formData.append("file", file);
    formData.append("fk_publicacao", response.data.id);

    if (file !== null || file !== "" || file !== " ") {
      const { data } = await apiMultForm.post(
        "http://localhost:3001/image/publication",
        formData
      );
    }
    socketInstance.current.emit("publication", response);

    setPublicacao("");
    navigate(`/comunicado?page=${1}`);
  };
  return (
    <div className="container-publicar">
      <form onSubmit={(e) => hendlePublicacao(e)}>
        <textarea
          name="publicacao"
          placeholder="O que estas a pensar!"
          id="publicacao"
          value={publicacao}
          onChange={(e) => {
            setPublicacao(e.target.value);
          }}
          required
        />
        <input
          type="file"
          name="file"
          id="input_file"
          className="foto-publicacaos"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          hidden
        />
        <div className="imojiPublicar">
          <label htmlFor="input_file">
            <BiSolidImage className="imagePublicar" color="#fff" />
          </label>
          <div className={"container-emojiPublicar"}>
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
                  setPublicacao(publicacao + e.native);
                  setIsPick(!isPick);
                }}
                className="emoji"
              />
            </div>
          </div>
        </div>

        <button type="submit" id="btnPublicar">
          Publicar
        </button>
      </form>
    </div>
  );
};
export default Publicar;
