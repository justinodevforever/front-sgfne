import { useEffect, useRef, useState } from "react";
import "./reconfirmacao.css";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { PiPrinter } from "react-icons/pi";
import RelatorioReconfirmacao from "../relatorios/reconfirmação/Reconfirmacao";
import Alert from "../../../hook/alert/Alert";
import UseWarning from "../../../hook/massege/warning/UseWarning";
import UseSucess from "../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../hook/massege/Error/UseErro";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../store/ui-slice";

const Reconfirmacao = ({ tipo }) => {
  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [fk_curso, setFk_curso] = useState(0);
  const [fk_ano, setFk_ano] = useState(0);
  const [fk_semestre, setFk_semestre] = useState(0);
  const [valor, setValor] = useState(0);
  const [fk_frequencia, setFk_frequencia] = useState(0);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [frequencias, setFrequencias] = useState([]);
  const [ano, setAno] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [semestre, setSemestre] = useState("");
  const navigate = useNavigate();
  const [visivel, setVisivel] = useState(false);
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

  const [tipoS] = tipo.split(" ");

  useEffect(() => {
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    getAno();
    getValor();
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
    buscaAnoLeivo();
  }, [ano]);

  // useEffect(() => {
  //   buscaAnoLeivo();
  //   buscaFrequencia();
  // }, [fk_curso && frequencia]);

  useEffect(() => {
    buscaFrequencia();
  }, [frequencia]);

  const buscarEstudante = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/ver/divida", { bi });

    if (data.message === "está com dívida") {
      setCurso("");
      setMessage(`Está com Dívida de ${data.dividas.length} Meses!`);
      dispatchWarning(toggleModalWarning(true));

      return;
    }
    await api
      .post("/search/estudante/bi", {
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

  const getAno = async () => {
    await api
      .get("/ano")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFrequencias(data.data);
        setFrequencia(data.data[0].ano);
      })
      .catch((err) => console.log(err));
  };

  const buscaFrequencia = async () => {
    await api
      .post("/search/frequencia", {
        frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFk_frequencia(data.data?.id);
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
  const getValor = async () => {
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

  const hendlePagamento = async (e) => {
    e.preventDefault();

    if (
      ano === "Escolha" ||
      semestre === "Escolha" ||
      frequencia === "Escolha" ||
      ano === "" ||
      semestre == "" ||
      frequencia == ""
    ) {
      setMessage("Existe Campo vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .post("/reconfirmacao", {
        fk_curso,
        fk_estudante,
        fk_semestre,
        fk_user,
        fk_ano,
        valor,
        fk_frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        dispatchConfirmar(toggleModalConfirmar(true));
        setId(data.data.response.id);

        let time;

        time = setTimeout(() => {
          setVisivel(true);
        }, 5000);

        return () => {
          clearTimeout(time);
        };
      });
  };

  return (
    <>
      <RelatorioReconfirmacao
        setVisivel={setVisivel}
        visivel={visivel}
        id={id}
      />
      <UseWarning message={message} />
      <UseSucess />
      <UseErro />
      <div className="container-reconfirmacao">
        <div className="conteudo">
          <form onSubmit={(e) => buscarEstudante(e)} className="formBi">
            <input
              type="search"
              placeholder="Número de BI do Estudante"
              value={bi}
              onChange={(e) => setBi(e.target.value)}
              className="search"
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

          <div className="opcoes">
            <label htmlFor="frequencia">
              Frequência:
              <select onChange={(e) => setFrequencia(e.target.value)}>
                <option value={"Escolhe"}>Escolha...</option>

                {frequencias.map((f) => (
                  <option value={f.ano} key={f.id}>
                    {f.ano}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="semestre">
              Semestre:
              <select onChange={(e) => setSemestre(e.target.value)}>
                <option value={"Escolhe"}>Escolha...</option>

                {semestres.map((s) => (
                  <option value={s.nome} key={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="cadeira">
              Ano Lectivo:
              <select onChange={(e) => setAno(e.target.value)}>
                <option value={"Escolhe"}>Escolha...</option>

                {anos.map((s) => (
                  <option value={s.ano} key={s.id}>
                    {s.ano}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <hr />

          {curso && bi && <h3>Dados do Estudante</h3>}
          <br />
          {curso && bi && (
            <label htmlFor="nome">
              Nome:
              <input
                type="text"
                value={nome}
                disabled
                className="input"
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
          )}

          {curso && (
            <label htmlFor="curso">
              Curso:
              <input
                type="text"
                value={curso}
                disabled
                className="input"
                onChange={(e) => setCurso(e.target.value)}
              />
            </label>
          )}
          {nome && curso && (
            <button onClick={(e) => hendlePagamento(e)} className="btn">
              Fazer Pagamento
            </button>
          )}
          <input
            type="text"
            value={fk_frequencia}
            onChange={(e) => setFk_frequencia(e.target.value)}
            hidden
          />
          <input
            type="text"
            value={fk_ano}
            onChange={(e) => setFk_ano(e.target.value)}
            hidden
          />
          <input
            type="text"
            value={fk_semestre}
            onChange={(e) => setFk_semestre(e.target.value)}
            hidden
          />
          {/* <div className="imprimir" onClick={() => setVisivel(true)}>
            <PiPrinter color="#fff" size={20} cursor={"pointer"} />
            <span>Relatório</span>
          </div> */}
        </div>
      </div>

      <RelatorioReconfirmacao
        setVisivel={setVisivel}
        visivel={visivel}
        tipo={tipo}
        id={id}
      />
    </>
  );
};

export default Reconfirmacao;
