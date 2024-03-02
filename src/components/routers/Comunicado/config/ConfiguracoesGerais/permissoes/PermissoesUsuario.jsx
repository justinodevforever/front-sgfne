import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import "./permissoesUsuario.scss";
import { FaUserClock, FaUserLock } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { api } from "../../../../../../../auth/auth";
import { useState } from "react";
import { CgSmileSad } from "react-icons/cg";

const PermissoesUSuario = () => {
  const [nome, setNome] = useState("");
  const [bi, setBi] = useState("");
  const [remover, setRemover] = useState(false);
  const [salvar, setSalvar] = useState(false);
  const [listar, setListar] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [sms, setSms] = useState(false);
  const [todos, setTodos] = useState(false);

  const toggleRemove = (e) => {
    e.preventDefault();
    setRemover(!remover);
  };
  const toggleupDate = (e) => {
    e.preventDefault();
    setActualizar(!actualizar);
  };
  const toggleSave = (e) => {
    e.preventDefault();
    setSalvar(!salvar);
  };
  const toggleTodos = async (e) => {
    e.preventDefault();
    await api
      .post("/user/permissao", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        setNome(data.data.nome);
        setBi("");
      })

      .catch((err) => console.log(err));
    setTodos(!todos);
  };
  const toggleList = (e) => {
    e.preventDefault();
    setListar(!listar);
  };
  const toggleSms = (e) => {
    e.preventDefault();
    setSms(!sms);
  };
  const pegarUSuario = async (e) => {
    e.preventDefault();
    await api
      .post("/user/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setNome(data.data.nome);
        setBi("");
      })

      .catch((err) => console.log(err));
  };

  const hendlePermissions = async () => {};
  return (
    <div className="permissoesUsuario">
      <form className="form" onSubmit={(e) => pegarUSuario(e)}>
        <label htmlFor="bi">
          Nº B.I
          <input
            type="search"
            placeholder="Digite o Número do B.I"
            value={bi}
            onChange={(e) => setBi(e.target.value)}
            autoFocus
            maxLength={14}
          />
          <button type="submit">
            <CiSearch size={30} color="fff" cursor={"pointer"} />
          </button>
        </label>
      </form>
      <div className="nome">{nome && <h2>Nome do Usuário: {nome}</h2>}</div>
      <div className="div-permissao">
        <div>
          <FaUserLock />

          <p>
            Permitir <strong>Todos acessos</strong> para usuário básico
          </p>
        </div>

        {!todos && (
          <BiSolidToggleLeft
            size={50}
            color="#cfcfcf"
            cursor={"pointer"}
            onClick={(e) => toggleTodos(e)}
          />
        )}

        {todos && (
          <BiSolidToggleRight
            size={50}
            color="#a31543"
            onClick={(e) => toggleTodos(e)}
            cursor={"pointer"}
          />
        )}
      </div>
      <div className="div-permissao">
        <div>
          <FaUserClock />
          <p>
            Permitir o <strong>acesso</strong> de <strong>Eliminar</strong> o
            estudante para usuário básico
          </p>
        </div>
        {!remover && (
          <BiSolidToggleLeft
            size={50}
            color="#cfcfcf"
            cursor={"pointer"}
            onClick={(e) => toggleRemove(e)}
          />
        )}

        {remover && (
          <BiSolidToggleRight
            size={50}
            color="red"
            onClick={(e) => toggleRemove(e)}
            cursor={"pointer"}
          />
        )}
      </div>
      <div className="div-permissao">
        <div>
          <FaUserLock />
          <p>
            Permitir o <strong>acesso</strong> de <strong>Listar</strong> o
            estudante para usuário básico
          </p>
        </div>
        {!listar && (
          <BiSolidToggleLeft
            size={50}
            color="#cfcfcf"
            cursor={"pointer"}
            onClick={(e) => toggleList(e)}
          />
        )}

        {listar && (
          <BiSolidToggleRight
            size={50}
            color="blue"
            onClick={(e) => toggleList(e)}
            cursor={"pointer"}
          />
        )}
      </div>
      <div className="div-permissao">
        <div>
          <FaUserLock />
          <p>
            Permitir o <strong>acesso</strong> de <strong>Salvar</strong> o
            estudante para usuário básico
          </p>
        </div>
        {!salvar && (
          <BiSolidToggleLeft
            size={50}
            color="#cfcfcf"
            cursor={"pointer"}
            onClick={(e) => toggleSave(e)}
          />
        )}

        {salvar && (
          <BiSolidToggleRight
            size={50}
            color="green"
            onClick={(e) => toggleSave(e)}
            cursor={"pointer"}
          />
        )}
      </div>
      <div className="div-permissao">
        <div>
          <FaUserLock />
          <p>
            Permitir a <strong>acesso</strong> de{" "}
            <strong>Troca de Mensagem</strong> entre{" "}
            <strong>Administrador</strong> e usuário básico
          </p>
        </div>
        {!sms && (
          <BiSolidToggleLeft
            size={50}
            color="#cfcfcf"
            cursor={"pointer"}
            onClick={(e) => toggleSms(e)}
          />
        )}

        {sms && (
          <BiSolidToggleRight
            size={50}
            color="#a31543"
            onClick={(e) => toggleSms(e)}
            cursor={"pointer"}
          />
        )}
      </div>
      <div className="div-permissao">
        <div>
          <FaUserLock />
          <p>
            Permitir o <strong>acesso</strong> de <strong>Actualizar</strong> o
            estudante para usuário básico
          </p>
        </div>
        {!actualizar && (
          <BiSolidToggleLeft
            size={50}
            color="#cfcfcf"
            cursor={"pointer"}
            onClick={(e) => toggleupDate(e)}
          />
        )}

        {actualizar && (
          <BiSolidToggleRight
            size={50}
            color="orange"
            onClick={(e) => toggleupDate(e)}
            cursor={"pointer"}
          />
        )}
      </div>
    </div>
  );
};

export default PermissoesUSuario;
