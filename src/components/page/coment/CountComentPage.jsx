import { useEffect, useState } from "react";
import "./estilo.css";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { api } from "../../../../auth/auth";

const CountComentPage = ({ pu }) => {
  const [count, setCount] = useState(0);
  const countComentPage = async () => {
    const { data } = await api.post("/count/coment/page", {
      fk_publicacao: pu.id,
    });
    setCount(data);
    console.log(data);
  };

  useEffect(() => {
    countComentPage();
  }, []);

  return (
    <div className="border">
      <Link to={`/coment/publication/page/${pu.id}?page=${1}`}>
        {" "}
        <AiOutlineComment size={"30px"} color="#fff" cursor={"pointer"} />
        {count !== 0 ? <span className="count">{count}</span> : <div></div>}
      </Link>
    </div>
  );
};

export default CountComentPage;
