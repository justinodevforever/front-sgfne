import { useEffect, useState } from "react";
import "./declaracoes.css";
import { Link } from "react-router-dom";
import { api } from "../../../../auth/auth";
import { BiX, BiSolidMessage } from "react-icons/bi";

const Declaracoes = () => {
  const [nomes, setNomes] = useState([]);
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState({});
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    getNomes();
    getUser();
  }, []);

  const salvar = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/declaracoes", {
      nome,
      desc: "Declaração Disponível!",
    });
    setNomes([...nomes, data]);
    setNome("");
  };

  const removerName = async (e, id) => {
    e.preventDefault();
    setNomes(nomes.filter((no) => no.id !== id));
    await api.delete(`/declaracoes/${id}`);
  };

  const getNomes = async () => {
    await api
      .get("/declaracoes")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setNomes(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getUser = async () => {
    await api
      .get(`/user/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setUser(data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="declaracoes">
      {user.email === "ispm@gmail.com" ? (
        <div className="textarea">
          <form onSubmit={(e) => salvar(e)}>
            <textarea
              required
              placeholder="Digite o Nome do Estudante!"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <button>Adicionar</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th colSpan={"2"}>Descrição</th>
            </tr>
          </thead>
          {nomes?.map((no) => (
            <tbody key={no.id}>
              <tr>
                <td>{no.nome}</td>
                <td>
                  <p> {no.desc}</p>
                </td>
                {user.email === "ispm@gmail.com" ? (
                  <td>
                    <div>
                      <BiX
                        color="red"
                        size={"20px"}
                        cursor={"pointer"}
                        onClick={(e) => removerName(e, no.id)}
                        className="x"
                      />
                    </div>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="contactar">
        <Link>
          <BiSolidMessage color="blue" size={"30"} cursor={"pointer"} />
        </Link>
      </div>
    </div>
  );
};

export default Declaracoes;
