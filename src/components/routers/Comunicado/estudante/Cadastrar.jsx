import { useNavigate } from "react-router-dom";
import { api } from "../../../../../auth/auth";
import "./cadastrar.scss";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Alert from "../../hook/alert/Alert";
import UseErro from "../../hook/massege/Error/UseErro";
import UseSucess from "../../hook/massege/sucess/UseSucess";
import UseWarning from "../../hook/massege/warning/UseWarning";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../store/ui-slice";

const Cadastrar = () => {
  const [bi, setBi] = useState("");
  const [userBi, setUserBi] = useState("");
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [type, setType] = useState("");
  const [ativar, setAtivar] = useState(false);
  const [message, setMessage] = useState("");
  const [curso, setCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [fk_user, setFk_user] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);
  const { isVisibleConfirmar } = useSelector(
    (state) => state.ui.ModalConfirmar
  );
  const { isVisibleError } = useSelector((state) => state.ui.ModalError);
  const { isVisibleWarning } = useSelector((state) => state.ui.ModalWarning);
  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  const navigete = useNavigate();

  useEffect(() => {
    getCursos();
  }, []);

  const getBi = async (e) => {
    e.preventDefault();
    await api
      .post("/user/bi", { bi })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }
        setUserBi(data.data.bi);
        setFk_user(data.data.id);
      })
      .catch((err) => console.log(err));
  };
  const getCursos = async () => {
    await api
      .get("/curso")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }

        setCursos(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const pegarCurso = async () => {
      await api
        .post("/curso/especifico", { curso })
        .then((data) => {
          if (data.data === "Token Invalid") {
            navigete("/login");
            return;
          }

          setFk_curso(data.data?.id);
        })
        .catch((err) => console.log(err));
    };
    pegarCurso();
  }, [curso]);

  const hendleEstudante = async (e) => {
    e.preventDefault();
    if (!fk_curso || !nome || !bi || !contato || !fk_user) {
      setMessage("Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .post("/estudante", {
        fk_curso,
        nome,
        bi: userBi,
        contato,
        fk_user,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }
        if (data.data.message === "exist") {
          setMessage("Este Estudante já Existe");
          dispatchWarning(toggleModalWarning(true));

          return;
        }
        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));

          return;
        }
        dispatchConfirmar(toggleModalConfirmar(true));
        setBi("");
        setNome("");
        setContato("");
        setUserBi("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <UseErro />
      <UseSucess />
      <UseWarning message={message} />

      <div className="container-cadastrar">
        <div className="pesquisa">
          <form onSubmit={(e) => getBi(e)} className="form">
            <input
              type="search"
              placeholder="Nº de BI do Estudante"
              required
              value={bi}
              onChange={(e) => setBi(e.target.value)}
              autoFocus
              maxLength={14}
            />
            Curso:
            <select onChange={(e) => setCurso(e.target.value)}>
              {cursos.map((curso) => (
                <option value={curso.curso}>{curso.curso}</option>
              ))}
            </select>
            <BiSearch
              color="#fff"
              cursor={"pointer"}
              size={27}
              onSubmit={(e) => getBi(e)}
            />
          </form>
        </div>
        <form>
          <h2>Cadastro do Estudante</h2>
          <input
            type="text"
            id="nome"
            placeholder="Nome do Estudante"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="text"
            id="bi"
            placeholder="Nº de BI do Estudante"
            required
            disabled
            value={userBi}
            onChange={(e) => setUserBi(e.target.value)}
          />
          <input
            type="text"
            id="contacto"
            placeholder="Contacto do Estudante"
            required
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />

          {nome && bi && contato && fk_curso && fk_user && (
            <button onClick={(e) => hendleEstudante(e)}>Cadastrar</button>
          )}
        </form>
      </div>
    </>
  );
};

export default Cadastrar;
