import { BiSolidHand, BiSolidLike } from "react-icons/bi";
import { FcLike, FcDislike } from "react-icons/fc";
import "./like.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../../../../auth/auth";

const LikePublicacao = ({ publ }) => {
  const [clickLike, setClickLike] = useState(false);
  const [like, setLike] = useState(0);
  const [likes, setLikes] = useState({});
  const id = sessionStorage.getItem("id");
  const socketInstance = useRef();
  const [receive, setReceive] = useState({});

  useEffect(() => {
    socketInstance.current = io("http://localhost:3001");
  }, []);

  const countLikePublicacao = async () => {
    const { data } = await api.post("/like/pagina/count", {
      fk_pagina: publ.id,
      like: clickLike,
    });
    setLike(data);
  };
  const getLikes = async () => {
    const { data } = await api.post("/like/pagina/specific", {
      fk_user: id,
      fk_pagina: publ.id,
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
      adId: publ.id,
    };
    socketInstance.current.emit("clicLikePage", sms);

    if (Number(likes.fk_user) === Number(id)) {
      const { data } = await api.put(`/like/pagina/${likes.id}`, {
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
      adId: publ.id,
    };
    socketInstance.current.emit("clicLikePage", sms);

    if (Number(likes.fk_user) === Number(id)) {
      await api.put(`/like/pagina/${likes.id}`, {
        like: true,
      });
      setClickLike(true);
    } else {
      await api.post(`/like/pagina`, {
        like: true,
        fk_pagina: publ.id,
        fk_user: id,
      });
      setClickLike(true);
    }
  }
  useEffect(() => {}, []);

  const lik = () => {
    return <BiSolidLike size={"80px"} color="#fff" />;
  };

  useEffect(() => {
    socketInstance.current.on("receiveClickPage", (data) => {
      setReceive(data);
    });
    countLikePublicacao();
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

export default LikePublicacao;
