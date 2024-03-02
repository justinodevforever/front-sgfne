import { useEffect, useRef, useState } from "react";
import "./propinas.scss";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import { PiPrinter } from "react-icons/pi";
import RelatorioPropina from "../relatorios/propina/Propina";
import { BiSearch } from "react-icons/bi";
import Alert from "../../../hook/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setIsClic, toggleModalWarning } from "../../../../../store/ui-slice";
import { toggleModalError } from "../../../../../store/ui-slice";
import { toggleModalConfirmar } from "../../../../../store/ui-slice";
import UseWarning from "../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../hook/massege/Error/UseErro";

const Propina = ({ tipo }) => {
  const [tipos, setTipos] = useState([]);

  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_mes, setFk_mes] = useState(0);
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [fk_curso, setFk_curso] = useState(0);
  const [fk_ano, setFk_ano] = useState(0);
  const [valor, setValor] = useState(0);
  const [rupe, setRupe] = useState(0);
  const [fk_semestre, setFk_semestre] = useState(0);
  const [mes, setMes] = useState("");
  const [meses, setMeses] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [visivel, setVisivel] = useState(false);
  const navigate = useNavigate();
  const tipoS = useParams();
  const [ativar, setAtivar] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const { isClic } = useSelector((state) => state.ui.pagou);
  const { isVisibleConfirmar } = useSelector(
    (state) => state.ui.ModalConfirmar
  );
  const { isVisibleError } = useSelector((state) => state.ui.ModalError);
  const { isVisibleWarning } = useSelector((state) => state.ui.ModalWarning);
  const dispatch = useDispatch();
  const dispatchError = useDispatch();
  const dispatchConfirmar = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    getMes();
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    tiposServicos();
  }, []);
  useEffect(() => {
    buscaSemestre();
  }, [semestre]);
  useEffect(() => {
    if (bi === "") {
      setNome("");
      setCurso("");
    }
  }, [bi]);
  useEffect(() => {
    buscaMes();
  }, [mes]);
  useEffect(() => {
    buscaAnoLeivo();
  }, [ano]);

  const tiposServicos = async () => {
    await api
      .post("/tipo/servico/especifico", {
        tipo,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setValor(data.data.valor);
      })
      .catch((err) => console.log(err));
  };
  const buscarEstudante = async (e) => {
    e.preventDefault();
    await api
      .post("search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setCurso(data.data.Curso.curso);
        setFk_curso(data.data.Curso.id);
        setNome(data.data.nome);
        setFk_estudante(data.data.id);
      })
      .catch((err) => console.log(err));
  };
  const getSemestre = async () => {
    await api
      .get("/semestre")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setSemestre(data.data[0].nome);
        setSemestres(data.data);
      })
      .catch((err) => console.log(err));
  };
  const getMes = async () => {
    await api
      .get("/mes")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setMes(data.data[0].mes);
        setMeses(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAnoLetivo = async () => {
    await api
      .get("/letivo")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAnos(data.data);
        setAno(data.data[0].ano);
      })
      .catch((err) => console.log(err));
  };

  const buscaMes = async () => {
    await api
      .post("/search/mes", {
        mes,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFk_mes(data.data?.id);
      })
      .catch((err) => console.log(err));
  };
  const buscaSemestre = async () => {
    await api
      .post("/search/semestre", {
        nome: semestre,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setFk_semestre(data.data.id);
      })
      .catch((err) => console.log(err));
  };

  const buscaAnoLeivo = async () => {
    await api
      .post("/search/letivo", {
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setFk_ano(data.data.id);
      })
      .catch((err) => console.log(err));
  };

  const hendlePagamento = async (e) => {
    e.preventDefault();
    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      mes === "Escolha" ||
      rupe === 0 ||
      !rupe
    ) {
      dispatchError(toggleModalError(true));
      return;
    }

    await api
      .post("/propina", {
        fk_curso,
        fk_estudante,
        fk_mes,
        fk_semestre,
        fk_user,
        fk_ano,
        valor,
        rupe,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "exist") {
          setMessage("O Mês Já Foi Pago! ");
          dispatchWarning(toggleModalWarning(true));

          return;
        }
        if (data.data.message === "sucess") {
          dispatch(setIsClic(true));
          setId(data.data?.response?.id);
          dispatchConfirmar(toggleModalConfirmar(true));
          return;
        }
      });
  };

  return (
    <>
      <UseWarning message={message} />
      <UseSucess />
      <UseErro />

      <div className="propina">
        <div className="conteudoProp">
          <form onSubmit={(e) => buscarEstudante(e)} className="formBi">
            <input
              type="search"
              placeholder="Número de BI do Estudante"
              onChange={(e) => setBi(e.target.value)}
              className="search"
              value={bi}
              autoFocus
              maxLength={14}
            />
            <BiSearch
              size={30}
              color="fff"
              cursor={"pointer"}
              onClick={(e) => buscarEstudante(e)}
            />
          </form>
          <form className="form" onSubmit={(e) => hendlePagamento(e)}>
            <div className="pagamento-propina">
              <div className="cc">
                <label htmlFor="mes">
                  Mês:
                  <select onChange={(e) => setMes(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>
                    {meses.map((m) => (
                      <option value={m.mes} key={m.id}>
                        {m.mes}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="rupe">
                  Nº RUPE:
                  <input
                    type="number"
                    placeholder="Digite o Nº de RUPE"
                    value={rupe}
                    onChange={(e) => setRupe(e.target.value)}
                    maxLength={20}
                  />
                </label>
                <label htmlFor="semestre">
                  Semestre:
                  <select onChange={(e) => setSemestre(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>
                    {semestres.map((s) => (
                      <option value={s.nome} key={s.id}>
                        {s.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="anoLetivo">
                  Ano Lectivo
                  <select onChange={(e) => setAno(e.target.value)}>
                    <option value={"Escolha"}>Escolha...</option>
                    {anos.map((ano) => (
                      <option value={ano.ano} key={ano.id}>
                        {ano.ano}
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  type="text"
                  value={fk_mes}
                  onChange={(e) => setFk_mes(e.target.value)}
                  hidden
                />
                <input
                  type="text"
                  value={fk_semestre}
                  onChange={(e) => setFk_semestre(e.target.value)}
                  hidden
                />
                <input
                  type="text"
                  value={fk_ano}
                  onChange={(e) => setFk_ano(e.target.value)}
                  hidden
                />
              </div>
            </div>
            <hr />
            {bi !== "" && nome !== "" && curso !== "" ? (
              <>
                <div className="dados-estudante">
                  <h2>Dados do Estudante</h2>
                  <br />
                  <label htmlFor="nome">
                    {" "}
                    Nome:
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      disabled
                    />
                  </label>
                  <label htmlFor="curso">
                    Curso:
                    <input
                      type="text"
                      value={curso}
                      onChange={(e) => setCurso(e.target.value)}
                      disabled
                      name="curso"
                    />
                  </label>
                </div>
                <button className="btn">Fazer Pagamento</button>
              </>
            ) : (
              <></>
            )}
          </form>
          <div className="imprimirPropina" onClick={() => setVisivel(true)}>
            <PiPrinter color="#fff" size={20} cursor={"pointer"} />
            <span>Relatório</span>
          </div>
        </div>
      </div>

      <RelatorioPropina
        setVisivel={setVisivel}
        visivel={visivel}
        tipo={tipo}
        id={id}
      />
    </>
  );
};

export default Propina;
