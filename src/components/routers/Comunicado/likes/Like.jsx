import { BiSolidHand, BiSolidLike } from "react-icons/bi";
import { FcLike, FcDislike } from "react-icons/fc";
import "./like.css";
import { Link } from "react-router-dom";
import { api } from "../../../../../auth/auth";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const LikeComunicado = ({ comun }) => {
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

  const countLikeComunicado = async () => {
    const { data } = await api.post("/like/comunicado/count", {
      fk_comunicado: comun.id,
      like: clickLike,
    });
    setLike(data);
  };
  const getLikes = async () => {
    const { data } = await api.post("/like/comunicado/specific", {
      fk_user: id,
      fk_comunicado: comun.id,
    });
    console.log("dddd", data);
    if (data[0]) {
      setLikes(data[0]);
    }
  };
  async function updateLike(e) {
    e.preventDefault();
    const sms = {
      userId: id,
      adId: comun.id,
    };
    socketInstance.current.emit("clicLikeComunicado", sms);

    if (Number(likes.fk_user) === Number(id)) {
      const { data } = await api.put(`/like/comunicado/${likes.id}`, {
        like: false,
      });
      setClickLike(true);
      console.log("dddddddd", data);
    }
  }
  async function updateLikeFalse(e) {
    e.preventDefault();
    const sms = {
      userId: id,
      adId: comun.id,
    };
    socketInstance.current.emit("clicLikeComunicado", sms);

    if (Number(likes.fk_user) === Number(id)) {
      await api.put(`/like/comunicado/${likes.id}`, {
        like: true,
      });
      setClickLike(true);
    } else {
      await api.post(`/like/comunicado`, {
        like: true,
        fk_comunicado: comun.id,
        fk_user: id,
      });
      setClickLike(true);
    }
  }
  useEffect(() => {}, []);

  useEffect(() => {
    socketInstance.current.on("receiveClickComunicado", (data) => {
      setReceive(data);
    });
    countLikeComunicado();
    getLikes();
  }, [receive]);

  return (
    <div className="container-like">
      <Link className="like">
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

        {like.count === 0 ? <div></div> : <span>{like.count}</span>}
      </Link>
    </div>
  );
};

export default LikeComunicado;
