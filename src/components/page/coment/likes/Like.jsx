import { FcLike, FcDislike } from "react-icons/fc";
import "./like.css";
import { Link } from "react-router-dom";
import { api } from "../../../../../auth/auth";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const LikeComentarioPagina = ({ coment }) => {
  const [clickLike, setClickLike] = useState(false);
  const [like, setLike] = useState(0);
  const [likes, setLikes] = useState({});
  const id = sessionStorage.getItem("id");
  const socketInstance = useRef();
  const [receive, setReceive] = useState({});

  useEffect(() => {
    socketInstance.current = io("http://localhost:3001");
  }, []);

  const countLikePage = async () => {
    const { data } = await api.post("/like/coment/page/count", {
      fk_comentario: coment.id,
      like: clickLike,
    });
    setLike(data);
  };
  const getLikes = async () => {
    const { data } = await api.post("/like/coment/page/specific", {
      fk_user: id,
      fk_comentario: coment.id,
    });
    // console.log("dddd", data);
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

    if (Number(likes.fk_user) === Number(id)) {
      socketInstance.current.emit("clicLikecomentarioPagina", sms);
      setClickLike(true);
      const { data } = await api.put(`/like/coment/page/${likes.id}`, {
        like: false,
      });
    }
  }
  async function updateLikeFalse(e) {
    e.preventDefault();
    const sms = {
      userId: id,
      adId: coment.id,
    };

    socketInstance.current.emit("clicLikecomentarioPagina", sms);
    if (Number(likes.fk_user) === Number(id)) {
      await api.put(`/like/coment/page/${likes.id}`, {
        like: true,
      });
      setClickLike(true);
    } else {
      await api.post(`/like/coment/page`, {
        like: true,
        fk_comentario: coment.id,
        fk_user: id,
      });
      setClickLike(true);
    }
  }
  useEffect(() => {
    socketInstance.current.on("receiveClickComentarioPagina", (data) => {
      setReceive(data);
      console.log(data);
    });
  }, [receive]);

  useEffect(() => {
    countLikePage();
    getLikes();
  }, [receive]);

  return (
    <div className="container-like">
      <Link className="like">
        {!likes.like && (
          <FcDislike
            onClick={(e) => {
              updateLikeFalse(e);
            }}
            size={"20px"}
          />
        )}
        {likes.like && (
          <FcLike
            onClick={(e) => {
              updateLike(e);
            }}
            size={"20px"}
          />
        )}

        {like.count === 0 ? <div></div> : <span>{like.count}</span>}
      </Link>
    </div>
  );
};

export default LikeComentarioPagina;
