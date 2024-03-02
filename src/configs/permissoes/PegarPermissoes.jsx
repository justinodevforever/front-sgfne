import { useSelector } from "react-redux";
import { api } from "../../../auth/auth";
import { useEffect, useState } from "react";
let user = [];
const usePegarPermissoes = () => {
  const id = sessionStorage.getItem("id");
  const [permissao, setPermissao] = useState([]);

  useEffect(() => {
    pegarUsuario();
  }, []);

  const pegarUsuario = async () => {
    await api
      .get(`/user/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        for (let index = 0; index < data.data.length; index++) {
          user.push(data.data[index].permissao.permissao);
        }
      })
      .catch((error) => console.log(error));
  };

  return user;
};

const PegarPermissoes = ({ children, permissoes }) => {
  const usePermissoes = usePegarPermissoes();
  console.log(usePermissoes);

  if (
    permissoes.some((permissoes) => {
      return usePermissoes.includes(permissoes);
    })
  ) {
    return children;
  }

  return null;
};

export default PegarPermissoes;
