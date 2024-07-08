import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { api } from "../../../../../../../../auth/auth";
import "./movimentoFinanceiro.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import OvelayLoader from "../../../../../hook/OverlayLoad/OverlayLoader";

const MovimentoFinanceiro = () => {
  const [anos, setAnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [reconfirmacao, setReconfirmacao] = useState([]);
  const [recurso, setRecurso] = useState([]);
  const [exameEspecial, setExameEspecial] = useState([]);
  const [cadeiraAtraso, setCadeiraAtraso] = useState([]);
  const [semNota, setSemNota] = useState([]);
  const [comNota, setComNota] = useState([]);
  const [linceciatura, setLinceciatura] = useState([]);
  const [folha, setFolha] = useState([]);
  const [regime, setRegime] = useState("");
  const [curso, setCurso] = useState("");
  const [ano, setAno] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [emunumento, setEmunumento] = useState("");
  const [dadosGerais, setDadosGerais] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCurso();
    getAnoLetivo();
  }, []);
  const getAnoLetivo = async () => {
    await api.get("/letivo").then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setAnos(data.data);
    });
  };
  const getCurso = async () => {
    await api.get("/curso").then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setCursos(data.data);
    });
  };
  const movimentoPropina = async () => {
    setLoading(true);
    await api
      .post("/movimento/propina", {
        ano,
        dataFinal,
        dataInicial,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        setDadosGerais(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className='movimentoFinanceiro'>
      {loading && <OvelayLoader />}
      <h2>
        Movimento Financeiro {emunumento}/{ano}
      </h2>
      <table>
        <thead>
          <tr>
            <th>N/O</th>
            <th>Tipo de emunumento</th>
            <th>Qtda</th>
            <th>Regular</th>
            <th>Qtda</th>
            <th>Pós-laboral</th>
            <th>Qt.Geral</th>
            <th>Val.Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Propina - Pós-laboral</td>
            <td>{dadosGerais?.totalIntervalo?.laboral?.totalEstudante || 0}</td>
            <td>
              {dadosGerais?.totalIntervalo?.laboral?.totalPropina || "0,00"}
            </td>
            <td>{dadosGerais?.totalExiste?.laboral?.totalEstudante || 0}</td>
            <td>{dadosGerais?.totalExiste?.laboral?.totalPropina || "0,00"}</td>
            <td>
              {Number(dadosGerais?.totalExiste?.laboral?.totalEstudante) +
                Number(dadosGerais?.totalIntervalo?.laboral?.totalEstudante) ||
                0}
            </td>
            <td>
              {Number(dadosGerais?.totalExiste?.laboral?.totalPropina) +
                Number(dadosGerais?.totalIntervalo?.laboral?.totalPropina) ||
                "0,00"}
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Propina - Regular</td>
            <td>{dadosGerais?.totalIntervalo?.regular?.totalEstudante || 0}</td>
            <td>
              {dadosGerais?.totalIntervalo?.regular?.totalPropina || "0,00"}
            </td>
            <td>{dadosGerais?.totalExiste?.regular?.totalEstudante || 0}</td>
            <td>{dadosGerais?.totalExiste?.regular?.totalPropina || "0,00"}</td>
            <td>
              {Number(dadosGerais?.totalExiste?.regular?.totalEstudante) +
                Number(dadosGerais?.totalIntervalo?.regular?.totalEstudante)}
            </td>
            <td>
              {Number(dadosGerais?.totalExiste?.regular?.totalPropina) +
                Number(dadosGerais?.totalIntervalo?.regular?.totalPropina) ||
                "0,00"}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>Total Geral</td>
            <td>
              {dadosGerais?.totalIntervalo?.totalGeral?.totalEstudante || 0}
            </td>
            <td>
              {dadosGerais?.totalIntervalo?.totalGeral?.totalPropina || "0.00"}
            </td>
            <td>{dadosGerais?.totalExiste?.totalGeral?.totalEstudante || 0}</td>
            <td>
              {dadosGerais?.totalExiste?.totalGeral?.totalPropina || "0.00"}
            </td>
            <td>
              {Number(dadosGerais?.totalExiste?.regular?.totalEstudante) +
                Number(dadosGerais?.totalIntervalo?.regular?.totalEstudante) +
                Number(dadosGerais?.totalExiste?.laboral?.totalEstudante) +
                Number(dadosGerais?.totalIntervalo?.laboral?.totalEstudante) ||
                0}
            </td>
            <td>
              {Number(dadosGerais?.totalExiste?.regular?.totalPropina) +
                Number(dadosGerais?.totalIntervalo?.regular?.totalPropina) +
                Number(dadosGerais?.totalExiste?.laboral?.totalPropina) +
                Number(dadosGerais?.totalIntervalo?.laboral?.totalPropina) ||
                "0,00"}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          width: "50%",
          margin: "auto",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "10px",
        }}>
        <FormControl>
          <InputLabel>Tipo de Emunumento</InputLabel>
          <Select
            label='Tipo de Emunumento'
            onChange={(e) => setEmunumento(e.target.value)}
            style={{
              width: "200px",
            }}>
            <MenuItem value={"Propina"}>Propina</MenuItem>
            <MenuItem value={"Reconfirmação"}>Reconfirmação</MenuItem>
            <MenuItem value={"Cadeira Em Atraso"}>Cadeira Em Atraso</MenuItem>
            <MenuItem value={"Recurso"}>Recurso</MenuItem>
            <MenuItem value={"Exame Especial"}>Exame Especial</MenuItem>
            <MenuItem value={"D. de Linceciatura"}>Reconfirmação</MenuItem>
            <MenuItem value={"D. com Nota"}>D. com Nota</MenuItem>
            <MenuItem value={"D. Sem Nota"}>D. Sem Nota</MenuItem>
            <MenuItem value={"P. de Folha"}>P. de Folha</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Ano Lectivo</InputLabel>
          <Select
            label='Ano Lectivo'
            onChange={(e) => setAno(e.target.value)}
            style={{
              width: "200px",
            }}>
            {anos.map((a) => (
              <MenuItem value={a.ano} key={a.id}>
                {a.ano}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div
        style={{
          display: "flex",
          width: "50%",
          margin: "auto",
          justifyContent: "center",
          alignContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "10px",
        }}>
        Data Inicial
        <input
          type='date'
          style={{
            width: "100%",
            height: "40px",
          }}
          onChange={(e) => setDataInicial(e.target.value)}
        />
        Data Final
        <input
          type='date'
          style={{
            width: "100%",
            height: "40px",
          }}
          onChange={(e) => setDataFinal(e.target.value)}
        />
      </div>
      {dataFinal && dataInicial && ano && emunumento && (
        <Button type='primary' onClick={() => movimentoPropina()}>
          Burcar
        </Button>
      )}
    </div>
  );
};

export default MovimentoFinanceiro;
