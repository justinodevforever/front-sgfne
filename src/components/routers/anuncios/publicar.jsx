import { useEffect, useRef, useState } from "react";
import { chatflech } from "../../../configs/axios/chatfletch";
import { useNavigate } from "react-router-dom";
import { BiSolidImage, BiSolidImageAdd, BiWinkSmile } from "react-icons/bi";
import "./publicar.css";
import axios from "axios";
import { io } from "socket.io-client";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { api } from "../../../../auth/auth";
import { apiMultForm } from "../../../../auth/auth";
import { Spin } from "antd";

const Publicar = () => {
  const [publicacao, setPublicacao] = useState("");
  const [like, setLike] = useState(0);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [isPick, setIsPick] = useState(false);
  const [clicou, setClicou] = useState(false);
  const socketInstance = useRef();
  const url = import.meta.env.VITE_API_URL_SOCKET;
  const urlB = import.meta.env.VITE_API_URL;

  useEffect(() => {
    socketInstance.current = io(`${url}`);
  }, []);
  const hendlePublicacao = async (e) => {
    e.preventDefault();
    setClicou(true);
    const formData = new FormData();

    await api
      .post("/publicacao", {
        publicacao,
        fk_user: sessionStorage.getItem("id"),
      })
      .then(async (data) => {
        console.log("publi", response);
        if (file || file !== null) {
          formData.append("file", file);
          formData.append("fk_publicacao", data.data?.id);

          if (file !== null || file !== "" || file !== " ") {
            await apiMultForm.post(`${urlB}/image/publication`, formData);
            console.log("imag", data);
          }
        }
        setClicou(false);
        socketInstance?.current.emit("publication", data.data);

        setPublicacao("");
        navigate(`/dashboard/comunicado?page=${1}`);
      });
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
            <BiSolidImage className="imagePublicar" color="#000" />
          </label>
          <div className={"container-emojiPublicar"}>
            <BiWinkSmile
              cursor={"pointer"}
              size={"30px"}
              color="#000"
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
                }}
                className="emoji"
              />
            </div>
          </div>
        </div>

        {publicacao && (
          <>
            {!clicou && (
              <button type="submit" id="btnPublicar">
                Publicar
              </button>
            )}
            <Spin spinning={clicou} />
          </>
        )}
      </form>
    </div>
  );
};
export default Publicar;
