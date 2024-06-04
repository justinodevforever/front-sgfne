import { Link, useNavigate } from "react-router-dom";
import "./solicitacao.scss";
import { BiX } from "react-icons/bi";

import { useEffect, useState } from "react";
import { api } from "../../../../../../auth/auth";

const MinhaSolicitacao = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [tex, setTex] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getSolicitacoes();
  }, []);
  const getSolicitacoes = async () => {
    const { data } = await api.post("/estudante/user", {
      fk_user: sessionStorage?.getItem("id"),
    });

    if (data === null || !data?.id) {
      return;
    }
    await api
      .post("/solicitacao/specific", {
        fk_estudante: data?.id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data?.message === "error") return;
        setSolicitacoes(data.data);
      });
  };
  const data = [
    {
      value: "homem",
      label: "home",
    },
  ];
  console.log(tex);
  return (
    <div className='solicitacao'>
      {solicitacoes?.length > 0 && (
        <>
          <h1>Minhas Solicitações</h1>

          {solicitacoes?.map((s) => (
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
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}>
          Nenhuma Solicitação Feita
        </h3>
      )}
    </div>
  );
};

export default MinhaSolicitacao;
