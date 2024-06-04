import { Link, useNavigate } from "react-router-dom";
import "./solicitacao.scss";
import { BiX } from "react-icons/bi";
import { OKIcon } from "react-share";
import { FcOk } from "react-icons/fc";
import { Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../../../../../auth/auth";

const Solicitacao = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getSolicitacoes();
  }, []);
  const getSolicitacoes = async () => {
    await api.get("/solicitacao").then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setLoading(false);
      setSolicitacoes(data.data);
    });
  };
  return (
    <div className='solicitacao'>
      <Skeleton
        active
        loading={loading}
        style={{ width: "90%", marginTop: "30px", overflowY: "auto" }}
        avatar={false}
        paragraph={{
          rows: 2,
          width: "90%",
        }}>
        {solicitacoes?.length > 0 && (
          <>
            <h1>Solitações Feita</h1>
            {solicitacoes.map((s) => (
              <div className='conteudo' key={s?.id}>
                <div className='divNome'>
                  <h3>{s?.estudante?.nome}</h3>
                  <span>
                    <strong>Serviço: {s?.tipoServico}</strong>
                  </span>
                </div>
                <div className='divOpcoes'>
                  <Link>Verificar</Link>
                  <Link>
                    <BiX size={23} color='red' />
                  </Link>
                  <Link
                    style={{
                      background: "#00f",
                      padding: "4px",
                      color: "#fff",
                      borderRadius: "5px",
                    }}>
                    {s?.status}
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
        {solicitacoes?.length === 0 && (
          <h3 style={{ display: "flex", marginTop: "40%" }}>
            Nenhuma Solicitação Feita
          </h3>
        )}
      </Skeleton>
    </div>
  );
};

export default Solicitacao;
