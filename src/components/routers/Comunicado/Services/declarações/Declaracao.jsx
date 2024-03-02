import { useEffect, useRef, useState } from "react";
import "./declaracao.css";
import { api } from "../../../../../../auth/auth";
import { useNavigate, useParams } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const Declaracao = ({ tipo }) => {
  const [tipos, setTipos] = useState([]);

  const [bi, setBi] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [fk_mes, setFk_mes] = useState(0);
  const [fk_estudante, setFk_estudante] = useState(0);
  const [fk_user, setFk_user] = useState(0);
  const [fk_curso, setFk_curso] = useState(0);
  const [fk_ano, setFk_ano] = useState(0);
  const [fk_semestre, setFk_semestre] = useState(0);
  const [mes, setMes] = useState("");
  const [meses, setMeses] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState([]);
  const [disciplina, setDisciplina] = useState([]);
  const [semestre, setSemestre] = useState("");
  const navigate = useNavigate();
  const [tipoS] = tipo.split(" ");

  useEffect(() => {
    getMes();
    getSemestre();
    getAnoLetivo();
    setFk_user(sessionStorage.getItem("id"));
    getAno();
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
  useEffect(() => {
    buscaAnoLeivo();
    getDisplina();
  }, [fk_curso && frequencia]);

  const buscarEstudante = async (e) => {
    e.preventDefault();
    await api
      .post("/search/estudante/bi", {
        bi,
        frequencia,
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
        console.log(data.data[0].mes);
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

  const getAno = async () => {
    await api
      .get("/ano")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFrequencias(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getDisplina = async () => {
    await api
      .get("/ano/espeficico/", {
        fk_curso,
        ano: frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        setDisciplina(data.data);
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
    await api
      .post("/propina", {
        fk_curso,
        fk_estudante,
        fk_mes,
        fk_semestre,
        fk_user,
        fk_ano,
        valor,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
      });
  };

  return (
    <>
      <div className="container-declaracao">
        <div className="conteudo">
          <form onSubmit={(e) => buscarEstudante(e)} className="formBi">
            <input
              type="search"
              placeholder="Número de BI do Estudante"
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

          <label htmlFor="frequencia">
            Frequência:
            <select
              nome="frequencia"
              id="frequencia"
              onChange={(e) => setFrequencia(e.target.value)}>
              <option value={"Escolhe"}>Escolha...</option>

              {frequencias.map((f) => (
                <option value={f.ano}>{f.ano}</option>
              ))}
            </select>
          </label>
          <hr />
          {curso && <h3>Dados do Estudante</h3>}
          {curso && (
            <label htmlFor="nome">
              Nome:
              <input type="text" value={nome} disabled className="input" />
            </label>
          )}
          {curso && (
            <label htmlFor="curso">
              Curso:
              <input type="text" value={curso} disabled className="input" />
            </label>
          )}
          {nome && curso && <button className="btn">Fazer Pagamento</button>}
        </div>
      </div>
    </>
  );
};

export default Declaracao;
