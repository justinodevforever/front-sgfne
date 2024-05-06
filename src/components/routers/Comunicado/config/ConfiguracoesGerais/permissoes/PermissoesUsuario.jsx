import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import "./permissoesUsuario.scss";
import { FaUserClock, FaUserLock } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { api } from "../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import { CgSmileSad } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
import { useDispatch } from "react-redux";
import { toggleModalWarning } from "../../../../../../store/ui-slice";
import { Input, Form } from "antd";

const PermissoesUSuario = () => {
  const [nome, setNome] = useState("");
  const [bi, setBi] = useState("");
  const [remover, setRemover] = useState(false);
  const [salvar, setSalvar] = useState(false);
  const [listar, setListar] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [secretario, setSecretario] = useState(false);
  const [message, setMessage] = useState(false);
  const [fk_user, setFk_user] = useState(0);
  const [todos, setTodos] = useState(false);
  const [permissoes, setPermissoes] = useState([]);
  const [permissoesSalvar, setPermissoesSalvar] = useState([]);
  const [permissoesListar, setPermissoesListar] = useState([]);
  const [permissoesRemover, setPermissoesRemover] = useState([]);
  const [permissoesMessage, setPermissoesMessage] = useState([]);
  const [permissoesTodos, setPermissoesTodos] = useState([]);
  const [edicaoId, setEdicaoId] = useState(0);
  const [removerId, setRemoverId] = useState(0);
  const [salverId, setSalverId] = useState(0);
  const [secretarioId, setSecretarioId] = useState(0);
  const [todosId, setTodosId] = useState(0);
  const [listarId, setListarId] = useState(0);
  const navigate = useNavigate();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    pegarPermissoes();
  }, []);
  useEffect(() => {
    pegarPermissoesUsuario();
  }, [bi]);
  useEffect(() => {
    pegarPermissoesUsuarioListar();
  }, [bi]);
  useEffect(() => {
    pegarPermissoesUsuarioRemover();
  }, [bi]);
  useEffect(() => {
    pegarPermissoesUsuarioTodos();
  }, [bi]);
  useEffect(() => {
    pegarPermissoesUsuarioSalvar();
  }, [bi]);
  useEffect(() => {
    pegarPermissoesUsuarioSecretario();
  }, [bi]);

  const pegarPermissoes = async (e) => {
    await api
      .get("permissao")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setPermissoes(data.data);
      })
      .catch((error) => console.log(error));
  };
  const pegarPermissoesUsuario = async () => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        const permissao = data.data.filter(
          (p) => p?.permission?.permissao === "edição" && p.user?.bi === bi
        );
        if (bi !== permissao[0]?.user?.bi) {
          setActualizar(false);
          return;
        }
        if (
          permissao[0]?.permission?.permissao === "edição" &&
          bi === permissao[0]?.user?.bi
        ) {
          setActualizar(true);
          setEdicaoId(permissao[0].id);
        }
      })
      .catch((error) => console.log(error));
  };
  const pegarPermissoesUsuarioSalvar = async (e) => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        const permissao = data.data.filter(
          (p) => p?.permission?.permissao === "salvar" && p?.user?.bi === bi
        );

        if (bi === permissao[0]?.user?.bi) {
          if (permissao[0]?.permission?.permissao === "salvar") {
            setSalvar(true);
            setSalverId(permissao[0].id);
          }
        } else {
          setSalvar(false);
        }
      })
      .catch((error) => console.log(error));
  };
  const pegarPermissoesUsuarioListar = async (e) => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        const permissao = data.data.filter(
          (p) => p?.permission?.permissao === "listar" && p?.user?.bi === bi
        );

        if (bi === permissao[0]?.user.bi) {
          if (permissao[0]?.permission?.permissao === "listar") {
            setListar(true);
            setListarId(permissao[0].id);
          }
        } else {
          setListar(false);
        }
      })
      .catch((error) => console.log(error));
  };
  const pegarPermissoesUsuarioRemover = async (e) => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        const permissao = data.data.filter(
          (p) => p?.permission?.permissao === "remover" && p?.user?.bi === bi
        );

        if (bi === permissao[0]?.user.bi) {
          if (permissao[0]?.permission?.permissao === "remover") {
            setRemover(true);
            setRemoverId(permissao[0].id);
          }
        } else {
          setRemover(false);
        }
      })
      .catch((error) => console.log(error));
  };
  const pegarPermissoesUsuarioSecretario = async (e) => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        const permissao = data.data.filter(
          (p) => p?.permission?.permissao === "secretário" && p?.user?.bi === bi
        );

        if (bi === permissao[0]?.user.bi) {
          if (permissao[0]?.permission?.permissao === "secretário") {
            setSecretario(true);
            setSecretarioId(permissao[0].id);
          }
        } else {
          setSecretario(false);
        }
      })
      .catch((error) => console.log(error));
  };
  const pegarPermissoesUsuarioTodos = async (e) => {
    await api
      .get("/permissaousuario")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        const permissao = data.data.filter(
          (p) => p?.permission?.permissao === "admin" && p?.user?.bi === bi
        );

        if (bi === permissao[0]?.user?.bi) {
          if (permissao[0]?.permission?.permissao === "admin") {
            setTodos(true);
            setTodosId(permissao[0]?.id);
          }
        } else {
          setTodos(false);
        }
      })
      .catch((error) => console.log(error));
  };
  const toggleupDate = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d?.permissao === "edição");
    if (edicaoId !== 0 && permissao[0]?.permissao && fk_user !== 0) {
      await api.delete(`/permissaousuario/${edicaoId}`);

      setActualizar(false);
    }
  };
  const toggleupDateTrue = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d?.permissao === "edição");

    if (fk_user === 0 && !permissao[0]?.id) {
      setMessage("Sem Usuário Selecionado");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    setActualizar(true);
    setFk_user(0);
    await api
      .post("/permissaousuario", {
        fk_user,
        fk_permission: permissao[0].id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })

      .catch((err) => console.log(err));
  };
  const toggleSaveTrue = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d.permissao === "salvar");

    if (fk_user === 0 || !permissao[0].id) {
      setMessage("Sem Usuário Selecionado");
      dispatchWarning(toggleModalWarning(true));
      return;
    }

    setSalvar(true);
    await api
      .post("/permissaousuario", {
        fk_user,
        fk_permission: permissao[0].id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })

      .catch((err) => console.log(err));
  };
  const toggleSave = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d?.permissao === "salvar");
    if (salverId !== 0 && permissao[0]?.permissao && fk_user !== 0) {
      await api.delete(`/permissaousuario/${salverId}`);

      setSalvar(false);
    }
  };
  const toggleTodosTrue = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d.permissao === "admin");

    if (fk_user === 0 || !permissao[0].id) {
      setMessage("Sem Usuário Selecionado");
      dispatchWarning(toggleModalWarning(true));
      return;
    }

    setTodos(true);

    await api
      .post("/permissaousuario", {
        fk_user,
        fk_permission: permissao[0].id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })

      .catch((err) => console.log(err));
  };
  const toggleTodos = async (e) => {
    const permissao = permissoes.filter((d) => d?.permissao === "admin");
    if (todosId !== 0 && permissao[0]?.permissao && fk_user !== 0) {
      await api.delete(`/permissaousuario/${todosId}`);

      setTodos(false);
    }
  };

  const toggleListTrue = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d.permissao === "listar");

    if (fk_user === 0 || !permissao[0]?.id) {
      setMessage("Sem Usuário Selecionado");
      dispatchWarning(toggleModalWarning(true));
      return;
    }

    setListar(true);
    await api
      .post("/permissaousuario", {
        fk_user,
        fk_permission: permissao[0].id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })

      .catch((err) => console.log(err));
  };
  const toggleList = async (e) => {
    e.preventDefault();
    const permissao = permissoes?.filter((d) => d?.permissao === "listar");
    if (listarId !== 0 && permissao[0].permissao && fk_user !== 0) {
      await api.delete(`/permissaousuario/${listarId}`);

      setListar(false);
    }
  };
  const toggleSecretarioTrue = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d.permissao === "secretário");

    if (fk_user === 0 || !permissao[0].id) {
      setMessage("Sem Usuário Selecionado");
      dispatchWarning(toggleModalWarning(true));
      return;
    }

    setSecretario(true);

    await api
      .post("/permissaousuario", {
        fk_user,
        fk_permission: permissao[0].id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      })

      .catch((err) => console.log(err));
  };
  const toggleSecretario = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d.permissao === "secretário");
    if (secretarioId !== 0 && permissao[0]?.permissao && fk_user !== 0) {
      await api.delete(`/permissaousuario/${secretarioId}`);

      setSecretario(false);
    }
  };
  const toggleRemoveTrue = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d.permissao === "remover");

    if (fk_user === 0 || !permissao[0].id) {
      setMessage("Sem Usuário Selecionado");
      dispatchWarning(toggleModalWarning(true));
      return;
    }

    await api
      .post("/permissaousuario", {
        fk_user,
        fk_permission: permissao[0].id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setRemover(true);
      })

      .catch((err) => console.log(err));
  };

  const toggleRemove = async (e) => {
    e.preventDefault();
    const permissao = permissoes.filter((d) => d.permissao === "remover");
    if (removerId !== 0 && permissao[0].permissao && fk_user !== 0) {
      await api.delete(`/permissaousuario/${removerId}`);

      setRemover(false);
    }
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
        console.log(data.data, "dnjd");
        setNome(data.data.nome);
        setFk_user(data.data.id);
      })

      .catch((err) => console.log(err));
  };

  const hendlePermissions = async () => {};
  return (
    <>
      <UseWarning message={message} />
      <div className='permissoesUsuario'>
        <Form className='form' onClick={(e) => pegarUSuario(e)}>
          <Input.Search
            type='search'
            placeholder='Digite o Número do B.I'
            value={bi}
            onChange={(e) => setBi(e.target.value)}
            autoFocus
            maxLength={14}
            style={{
              width: "90%",
            }}
          />
        </Form>
        <div className='nome'>{nome && <h2>Nome do Usuário: {nome}</h2>}</div>
        <div className='div-permissao'>
          <div>
            <FaUserLock />

            <p>
              Permitir <strong>Todos acessos</strong> para usuário básico
            </p>
          </div>

          {!todos && (
            <BiSolidToggleLeft
              size={50}
              color='#cfcfcf'
              cursor={"pointer"}
              onClick={(e) => toggleTodosTrue(e)}
            />
          )}

          {todos && (
            <BiSolidToggleRight
              size={50}
              color='#a31543'
              onClick={(e) => toggleTodos(e)}
              cursor={"pointer"}
            />
          )}
        </div>
        <div className='div-permissao'>
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
              color='#cfcfcf'
              cursor={"pointer"}
              onClick={(e) => toggleRemoveTrue(e)}
            />
          )}

          {remover && (
            <BiSolidToggleRight
              size={50}
              color='red'
              onClick={(e) => toggleRemove(e)}
              cursor={"pointer"}
            />
          )}
        </div>
        <div className='div-permissao'>
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
              color='#cfcfcf'
              cursor={"pointer"}
              onClick={(e) => toggleListTrue(e)}
            />
          )}

          {listar && (
            <BiSolidToggleRight
              size={50}
              color='blue'
              onClick={(e) => toggleList(e)}
              cursor={"pointer"}
            />
          )}
        </div>
        <div className='div-permissao'>
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
              color='#cfcfcf'
              cursor={"pointer"}
              onClick={(e) => toggleSaveTrue(e)}
            />
          )}

          {salvar && (
            <BiSolidToggleRight
              size={50}
              color='green'
              onClick={(e) => toggleSave(e)}
              cursor={"pointer"}
            />
          )}
        </div>
        <div className='div-permissao'>
          <div>
            <FaUserLock />
            <p>
              Permitir o Usuário <strong>Exercer</strong> Função{" "}
              <strong>de Secretário</strong>
            </p>
          </div>

          {!secretario && (
            <BiSolidToggleLeft
              size={50}
              color='#cfcfcf'
              cursor={"pointer"}
              onClick={(e) => toggleSecretarioTrue(e)}
            />
          )}

          {secretario && (
            <BiSolidToggleRight
              size={50}
              color='#a31543'
              onClick={(e) => toggleSecretario(e)}
              cursor={"pointer"}
            />
          )}
        </div>
        <div className='div-permissao'>
          <div>
            <FaUserLock />
            <p>
              Permitir o <strong>acesso</strong> de <strong>Actualizar</strong>{" "}
              o estudante para usuário básico
            </p>
          </div>
          {!actualizar && (
            <BiSolidToggleLeft
              size={50}
              color='#cfcfcf'
              cursor={"pointer"}
              onClick={(e) => toggleupDateTrue(e)}
            />
          )}

          {actualizar && (
            <BiSolidToggleRight
              size={50}
              color='orange'
              onClick={(e) => toggleupDate(e)}
              cursor={"pointer"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PermissoesUSuario;
