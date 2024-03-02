import React, { useEffect, useState } from "react";
import "./comentario.css";

import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { api } from "../../../../auth/auth";

function Comentario({ publ }) {
  const [count, setCount] = useState({});

  async function hendleCount() {
    await api
      .post("/count/publicacao", {
        fk_publicacao: publ.id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setCount(data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    hendleCount();
  }, []);

  return (
    <>
      <div className="container-comentario">
        <form>
          <Link
            to={`/coment/publication/${publ.id}?page=${1}`}
            className="border2">
            <AiOutlineComment size={"20px"} color="#fff" />
            {count.count === 0 ? (
              <div></div>
            ) : (
              <div>
                {count.count >= 1000 ? (
                  <span>+100</span>
                ) : (
                  <span>{count.count}</span>
                )}
              </div>
            )}
          </Link>
        </form>
      </div>
    </>
  );
}

export default Comentario;
