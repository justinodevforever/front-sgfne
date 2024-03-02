import { BiSolidHand, BiSolidLike } from "react-icons/bi";
import { FcLike, FcDislike } from "react-icons/fc";
import "./like.css";
import { Link } from "react-router-dom";
import { api } from "../../../../../auth/auth";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const LikePublicacao = ({ publ }) => {
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
    await api
      .post("/like/publicacao/count", {
        fk_publicacao: publ.id,
        like: clickLike,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setLike(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getLikes = async () => {
    await api
      .post("/like/publicacao/specific", {
        fk_user: id,
        fk_publicacao: publ.id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data[0]) {
          setLikes(data.data[0]);
        }
      })
      .catch((err) => console.log(err));
  };
  async function updateLike(e) {
    e.preventDefault();
    const sms = {
      userId: id,
      adId: publ.id,
    };
    socketInstance.current.emit("clicLikePublicacao", sms);

    if (Number(likes.fk_user) === Number(id)) {
      await api
        .put(`/like/publicacao/${likes.id}`, {
          like: false,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setClickLike(false);
        })
        .catch((err) => console.log(err));
    }
  }
  async function updateLikeFalse(e) {
    e.preventDefault();
    const sms = {
      userId: id,
      adId: publ.id,
    };
    socketInstance.current.emit("clicLikePublicacao", sms);

    if (Number(likes.fk_user) === Number(id)) {
      await api
        .put(`/like/publicacao/${likes.id}`, {
          like: true,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setClickLike(true);
        })
        .catch((err) => console.log(err));
    } else {
      await api
        .post(`/like/publicacao`, {
          like: true,
          fk_publicacao: publ.id,
          fk_user: id,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          setClickLike(true);
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {}, []);

  useEffect(() => {
    const LikeP = (data) => {
      setReceive(data);
    };
    socketInstance.current.on("receiveClickPublicacao", LikeP);
    countLikePublicacao();
    getLikes();
    return () => {
      socketInstance.current.off("receiveClickPublicacao", LikeP);
    };
  }, [receive]);

  return (
    <div className="container-likePublicacao">
      <Link className="likePublicacao">
        {likes.like && (
          <FcLike
            onClick={(e) => {
              updateLike(e);
            }}
            size={"20px"}
          />
        )}
        {!likes.like && (
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

export default LikePublicacao;
