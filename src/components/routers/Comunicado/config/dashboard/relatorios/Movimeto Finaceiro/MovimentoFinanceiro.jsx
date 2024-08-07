import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { api } from "../../../../../../../../auth/auth";
import "./movimentoFinanceiro.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import OvelayLoader from "../../../../../hook/OverlayLoad/OverlayLoader";
import { Search } from "@mui/icons-material";
import logo from "./Logo.png";
import { BiPrinter } from "react-icons/bi";

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
  const movimentoReconfirmacao = async () => {
    setLoading(true);
    await api
      .post("/reconfirmacao/movimento_financeiro", {
        ano,
        dataFinal,
        dataInicial,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setDadosGerais(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const movimentoRecurso = async () => {
    setLoading(true);
    await api
      .post("/recurso/movimento_financeiro", {
        ano,
        dataFinal,
        dataInicial,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setDadosGerais(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const movimentoCadeiraAtraso = async () => {
    setLoading(true);
    await api
      .post("/cadeira/atraso/movimento_financeiro", {
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
  const movimentoExameEspecial = async () => {
    setLoading(true);
    await api
      .post("/exame/especial/movimento_financeiro", {
        ano,
        dataFinal,
        dataInicial,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setDadosGerais(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const movimentoPagamentoFolha = async () => {
    setLoading(true);
    await api
      .post("/folha/movimento_financeiro", {
        ano,
        dataFinal,
        dataInicial,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setDadosGerais(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const movimentoDeclaracao = async () => {
    setLoading(true);
    await api
      .post("/declaracoes/movimento_financeiro", {
        tipoDeclaracao: emunumento,
        dataFinal,
        dataInicial,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setDadosGerais(data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo +=
      "table { border-collapse: collapse; width: 100%;margin:auto; margin-top:20px;}";
    estilo +=
      ".tabela {display: flex; flex-direction: column; align-items: center; justify-content: center;width:100%;}";
    estilo +=
      "table th,td { padding: 8px;text-align: center;padding-right: 20px; }";
    estilo += "table td ,th {border: 1px solid #000; font-size: 10pt;}";
    estilo += "table th {background-color: #a31543; }";
    estilo += " img{width: 50px;height: 50px;position: absolute; right: 0;}";
    estilo += "</style>";

    const win = window.open();
    win.document.write("<html><head>");
    win.document.write("<title>ISPMOXICO</title>");
    win.document.write(estilo);
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write(con);
    win.document.write("</body>");
    win.document.write("</html>");
    win.print();
    win.close();
  };

  return (
    <>
      {loading && <OvelayLoader />}
      <div className='movimentoFinanceiro'>
        {(dadosGerais?.totalIntervalo || dadosGerais?.totalExiste) && (
          <div className='imprimirFinanca'>
            <Link onClick={(e) => imprimir(e)}>
              {" "}
              <BiPrinter /> Imprimir{" "}
            </Link>
          </div>
        )}
        <div
          id='tabela'
          className='tabela'
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}>
          <img
            src={logo}
            alt='logo'
            style={{
              display: "flex",
              float: "left",
              marginBottom: "10px",
            }}
          />
          <h2
            style={{
              border: "1px solid #000",
              padding: "7px",
              width: "70%",
              marginTop: "20px",
              color: "#000",
            }}>
            Movimento do Caixa de {dataInicial || "____"} à{" "}
            {dataFinal || "____"}
          </h2>
          {(dadosGerais?.totalIntervalo || dadosGerais?.totalExiste) && (
            <table>
              <thead>
                <tr>
                  <th>N/O</th>
                  <th>Tipo de emunumento</th>
                  <th>Qtda</th>
                  <th>Actual</th>
                  <th>Qtda</th>
                  <th>Existente</th>
                  <th>Qt.Geral</th>
                  <th>Val.Total</th>
                </tr>
              </thead>
              <tbody>
                {emunumento === "Propina" && (
                  <tr>
                    <td>1</td>
                    <td style={{ textAlign: "left" }}>Propina - Pós-laboral</td>
                    <td>
                      {dadosGerais?.totalIntervalo?.laboral?.totalEstudante ||
                        0}
                    </td>
                    <td>
                      {dadosGerais?.totalIntervalo?.laboral?.totalPropina +
                        ",00" || "0,00"}
                    </td>
                    <td>
                      {dadosGerais?.totalExiste?.laboral?.totalEstudante || 0}
                    </td>
                    <td>
                      {dadosGerais?.totalExiste?.laboral?.totalPropina +
                        ",00" || "0,00"}
                    </td>
                    <td>
                      {Number(
                        dadosGerais?.totalExiste?.laboral?.totalEstudante
                      ) +
                        Number(
                          dadosGerais?.totalIntervalo?.laboral?.totalEstudante
                        ) || 0}
                    </td>
                    <td>
                      {Number(dadosGerais?.totalExiste?.laboral?.totalPropina) +
                        Number(
                          dadosGerais?.totalIntervalo?.laboral?.totalPropina
                        ) +
                        ",00" || "0,00"}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>{emunumento !== "Propina" ? 1 : 2}</td>
                  <td style={{ textAlign: "left" }}>
                    {emunumento !== "Propina"
                      ? emunumento
                      : emunumento + "- Regular"}
                  </td>
                  <td>
                    {dadosGerais?.totalIntervalo?.regular?.totalEstudante || 0}
                  </td>
                  <td>
                    {dadosGerais?.totalIntervalo?.regular?.totalPropina +
                      ",00" || "0,00"}
                  </td>
                  <td>
                    {dadosGerais?.totalExiste?.regular?.totalEstudante || 0}
                  </td>
                  <td>
                    {dadosGerais?.totalExiste?.regular?.totalPropina + ",00" ||
                      "0,00"}
                  </td>
                  <td>
                    {Number(dadosGerais?.totalExiste?.regular?.totalEstudante) +
                      Number(
                        dadosGerais?.totalIntervalo?.regular?.totalEstudante
                      ) || 0}
                  </td>
                  <td>
                    {Number(dadosGerais?.totalExiste?.regular?.totalPropina) +
                      Number(
                        dadosGerais?.totalIntervalo?.regular?.totalPropina
                      ) +
                      ",00" || "0,00"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "left" }}>
                    Total Geral
                  </td>
                  <td>
                    {dadosGerais?.totalIntervalo?.totalGeral?.totalEstudante ||
                      0}
                  </td>
                  <td>
                    {dadosGerais?.totalIntervalo?.totalGeral?.totalPropina +
                      ",00" || "0,00"}
                  </td>
                  <td>
                    {dadosGerais?.totalExiste?.totalGeral?.totalEstudante || 0}
                  </td>
                  <td>
                    {dadosGerais?.totalExiste?.totalGeral?.totalPropina +
                      ",00" || "0,00"}
                  </td>
                  <td>
                    {Number(dadosGerais?.totalExiste?.regular?.totalEstudante) +
                      Number(
                        dadosGerais?.totalIntervalo?.regular?.totalEstudante
                      ) +
                      Number(
                        dadosGerais?.totalExiste?.laboral?.totalEstudante
                      ) +
                      Number(
                        dadosGerais?.totalIntervalo?.laboral?.totalEstudante
                      ) || 0}
                  </td>
                  <td>
                    {Number(dadosGerais?.totalExiste?.regular?.totalPropina) +
                      Number(
                        dadosGerais?.totalIntervalo?.regular?.totalPropina
                      ) +
                      Number(dadosGerais?.totalExiste?.laboral?.totalPropina) +
                      Number(
                        dadosGerais?.totalIntervalo?.laboral?.totalPropina
                      ) +
                      ",00" || "0,00"}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
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
            marginTop: "30px",
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
              <MenuItem value={"Declaração de Linceciatura"}>
                D. Licenciatura
              </MenuItem>
              <MenuItem value={"Declaração Com Nota"}>D. Com Nota</MenuItem>
              <MenuItem value={"Declaração Sem Nota"}>D. Sem Nota</MenuItem>
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
            gap: "10px",
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
        {dataFinal && dataInicial && ano && emunumento === "Propina" && (
          <Button
            type='primary'
            onClick={() => movimentoPropina()}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#a31543",
              margin: "auto",
            }}>
            <Search /> Ver Diário
          </Button>
        )}
        {dataFinal && dataInicial && ano && emunumento === "Reconfirmação" && (
          <Button
            type='primary'
            onClick={() => movimentoReconfirmacao()}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#a31543",
              margin: "auto",
            }}>
            <Search /> Ver Diário
          </Button>
        )}
        {dataFinal && dataInicial && ano && emunumento === "Recurso" && (
          <Button
            type='primary'
            onClick={() => movimentoRecurso()}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#a31543",
              margin: "auto",
            }}>
            <Search /> Ver Diário
          </Button>
        )}
        {dataFinal &&
          dataInicial &&
          ano &&
          emunumento === "Cadeira Em Atraso" && (
            <Button
              type='primary'
              onClick={() => movimentoCadeiraAtraso()}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#a31543",
                margin: "auto",
              }}>
              <Search /> Ver Diário
            </Button>
          )}
        {dataFinal && dataInicial && ano && emunumento === "Exame Especial" && (
          <Button
            type='primary'
            onClick={() => movimentoExameEspecial()}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#a31543",
              margin: "auto",
            }}>
            <Search /> Ver Diário
          </Button>
        )}
        {dataFinal &&
          dataInicial &&
          ano &&
          (emunumento === "Declaração de Linceciatura" ||
            emunumento === "Declaração Com Nota" ||
            emunumento === "Declaração Sem Nota") && (
            <Button
              type='primary'
              onClick={() => movimentoDeclaracao()}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#a31543",
                margin: "auto",
              }}>
              <Search /> Ver Diário
            </Button>
          )}
        {dataFinal && dataInicial && ano && emunumento === "P. de Folha" && (
          <Button
            type='primary'
            onClick={() => movimentoPagamentoFolha()}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#a31543",
              margin: "auto",
            }}>
            <Search /> Ver Diário
          </Button>
        )}
      </div>
    </>
  );
};

export default MovimentoFinanceiro;
