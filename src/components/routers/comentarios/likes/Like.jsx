import { BiSolidHand, BiSolidLike } from "react-icons/bi";
import { FcLike, FcDislike } from "react-icons/fc";
import "./like.css";
import { Link } from "react-router-dom";
import { api } from "../../../../../auth/auth";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const LikeComentarioPublicacao = ({ coment }) => {
  const [clickLike, setClickLike] = useState(false);
  const [like, setLike] = useState(0);
  const [likes, setLikes] = useState({});
  const id = sessionStorage.getItem("id");
  const socketInstance = useRef();
  const [receive, setReceive] = useState({});
  const url = import.meta.env.VITE_VERCEL_URL_SOCKET;

  useEffect(() => {
    socketInstance.current = io(`${url}`);
  }, []);

  const countLikePublicacao = async () => {
    const { data } = await api.post("/like/coment/publicacao/count", {
      fk_comentario: coment.id,
      like: clickLike,
    });
    setLike(data);
  };
  const getLikes = async () => {
    const { data } = await api.post("/like/coment/publicacao/specific", {
      fk_user: id,
      fk_comentario: coment.id,
    });
    if (data[0]) {
      setLikes(data[0]);
    }
  };
  async function updateLike(e) {
    e.preventDefault();
    const sms = {
      userId: id,
      adId: coment.id,
    };
    socketInstance.current.emit("clicLikeComentarioPublicacao", sms);

    if (Number(likes.fk_user) === Number(id)) {
      const { data } = await api.put(`/like/coment/publicacao/${likes.id}`, {
        like: false,
      });
      setClickLike(true);
    }
  }
  async function updateLikeFalse(e) {
    e.preventDefault();
    const sms = {
      userId: id,
      adId: coment.id,
    };
    socketInstance.current.emit("clicLikeComentarioPublicacao", sms);

    if (Number(likes.fk_user) === Number(id)) {
      await api.put(`/like/coment/publicacao/${likes.id}`, {
        like: true,
      });
      setClickLike(true);
    } else {
      await api.post(`/like/coment/publicacao`, {
        like: true,
        fk_comentario: coment.id,
        fk_user: id,
      });
      setClickLike(true);
    }
  }
  useEffect(() => {}, []);

  useEffect(() => {
    const receiverCom = (data) => {
      setReceive(data);
    };

    socketInstance.current.on("receiveClickComentarioPublicacao", receiverCom);
    countLikePublicacao();
    getLikes();
    return () => {
      socketInstance.current.off(
        "receiveClickComentarioPublicacao",
        receiverCom
      );
    };
  }, [receive]);

  return (
    <div className="container-likeComent">
      <Link className="likeComent">
        {likes.like === true ? (
          <FcLike
            onClick={(e) => {
              updateLike(e);
            }}
            size={"20px"}
          />
        ) : (
          <FcDislike
            onClick={(e) => {
              updateLikeFalse(e);
            }}
            size={"20px"}
          />
        )}

        {like.count === 0 ? <span></span> : <span>{like.count}</span>}
      </Link>
    </div>
  );
};

export default LikeComentarioPublicacao;
