import { useSelector } from "react-redux";
import userAuthicate, { api } from "../../../auth/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoRole from "./NoRole";

const PegarRoles = ({ children, roles }) => {
  const [permissao, setPermissao] = useState([]);
  const autorization = userAuthicate();

  const navigate = useNavigate();

  useEffect(() => {
    const pegarUsuario = async () => {
      await api
        .get(`/usuario/especifico`)
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigate("/login");
            return;
          }

          if (roles !== undefined) {
            const findRole = data.data.find((r) => r.Role.role === roles);
            setPermissao(findRole?.Role?.role);
          }
        })
        .catch((error) => console.log(error));
    };
    pegarUsuario();
  }, []);
  if (!roles && autorization) {
    return children;
  }

  if (permissao) {
    return children;
  }

  return null;
};

export default PegarRoles;
