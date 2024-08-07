import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./relatorioPropinaCurso.scss";
import { Print, Search } from "@mui/icons-material";
import { Button, DatePicker } from "antd";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import OvelayLoader from "../../../../../hook/OverlayLoad/OverlayLoader";
import { formaHouser, formatDate } from "../../../../../hook/timeout";
import { useReactToPrint } from "react-to-print";
import logo from "../Logo.png";

const RelatorioPropinaCurso = () => {
  const [anos, setAnos] = useState([]);
  const [listas, setListas] = useState([]);
  const [anoFrequencia, setAnoFrequencia] = useState({});
  const [estudanteMatriculado, setEstudanteMatriculado] = useState({});
  const [ano, setAno] = useState("");
  const [regime, setRegime] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDisciplina();
  }, []);
  const getDisciplina = async () => {
    await api.get("/letivo").then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setAnos(data.data);
    });
  };
  const relatorio = async () => {
    if (!regime || !ano || !dataFinal || !dataInicial)
      return alert("Existe Campos Vazios");
    setLoading(true);

    await api
      .post("/relatorioCurso", {
        regime,
        dataFinal: dataFinal,
        dataInicial: dataInicial,
        ano: ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        setListas(data.data.dados);
        setAnoFrequencia(data.data.anos);
        setEstudanteMatriculado(data.data.estudanteMatriculado);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const imprimir = async () => {
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo += ".tabela { display: flex; width: 100%;}";
    estilo +=
      "table { border-collapse: collapse; width: 90%; margin-bottom: 10px;}";
    estilo +=
      "table th,td {padding: 4px; font-size: 11pt; text-align: center; border: 1px solid #000;font-weight: 500;}";
    estilo += " img{width: 50px;height: 50px; right: 0;}";
    estilo += "h3 {display: flex; margin: auto;}";
    estilo += "</style>";

    const win = window.open("http://localhost:2000");
    win.document.write("<html><head>");
    win.document.write("<title>ISP_MOXICO</title>");
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
      <div className='relatorioPropinaCurso'>
        {listas?.length > 0 && (
          <Button
            type='primary'
            onClick={() => imprimir()}
            style={{
              display: "flex",
              width: "150px",
              background: "#a31543",
              marginTop: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              fontSize: "14pt",
              marginLeft: "800px",
            }}>
            <Print /> Imprimir
          </Button>
        )}
        <div id='tabela' className='tabela'>
          <img
            src={logo}
            alt='logo'
            style={{
              display: "flex",
              float: "right",
              marginRight: "20px",
            }}
          />
          <h3
            style={{
              marginBottom: "0px",
              marginTop: "20px",
              color: "#000",
            }}>
            RELATÓRIO GERAL DA PROPINA DO {regime.toUpperCase()} ANO LECTIVO{" "}
            {ano}
          </h3>
          {listas?.length > 0 && (
            <>
              <table
                style={{
                  width: "97%",
                }}>
                <thead>
                  <tr>
                    <th>Data Início: {dataInicial}</th>
                    <th>Data Final: {dataFinal}</th>
                    <th>
                      Data da Impressão: {formatDate(Date.now())}{" "}
                      {formaHouser(Date.now())}
                    </th>
                  </tr>
                </thead>
              </table>
              <table className='table2C'>
                <thead>
                  <tr>
                    <th
                      rowSpan={2}
                      style={{
                        textAlign: "start",
                      }}>
                      Curso
                    </th>
                    <th
                      rowSpan={2}
                      style={{
                        textAlign: "start",
                      }}>
                      Frequência
                    </th>
                    <th colSpan={3}>Total Matriculado</th>
                    <th colSpan={2}>Janeiro</th>
                    <th colSpan={2}>Fevereiro</th>
                    <th colSpan={2}>Março</th>
                    <th colSpan={2}>Abril</th>
                    <th colSpan={2}>Maio</th>
                    <th colSpan={2}>Junho</th>
                    <th colSpan={2}>Julho</th>
                    <th colSpan={2}>Outubro</th>
                    <th colSpan={2}>Novembro</th>
                    <th colSpan={2}>Dezembro</th>
                    <th colSpan={2}>TOTAL GERAL</th>
                  </tr>
                  <tr>
                    <th>M</th>
                    <th>F</th>
                    <th>M + F</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Valor</th>
                    <th>Qtda.</th>
                    <th>Pagamentos</th>
                  </tr>
                </thead>

                {listas.map(
                  (c, i) =>
                    c?.dados?.totaGeralCurso > 0 && (
                      <>
                        <tbody key={i}>
                          <tr>
                            <td
                              rowSpan={5}
                              style={{
                                textAlign: "start",
                              }}>
                              {c?.curso}
                            </td>
                            {c?.frequencia?.Ano1º?.totalMesAno > 0 && (
                              <>
                                <td
                                  style={{
                                    textAlign: "start",
                                  }}>
                                  {c?.frequencia?.Ano1º?.ano} Ano
                                </td>
                                <td>{c?.frequencia?.Ano1º?.totalSexoM}</td>
                                <td>{c?.frequencia?.Ano1º?.totalSexoF}</td>
                                <td>{c?.frequencia?.Ano1º?.totalMF}</td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Janeiro
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Janeiro
                                      ?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Janeiro
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Janeiro
                                      ?.totalPago + ",00"}
                                </td>

                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes
                                    ?.Fevereiro?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes
                                      ?.Fevereiro?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes
                                    ?.Fevereiro?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes
                                      ?.Fevereiro?.totalPago + ",00"}
                                </td>

                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Março
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Março
                                      ?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Março
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Março
                                      ?.totalPago + ",00"}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Abril
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Abril
                                      ?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Abril
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Abril
                                      ?.totalPago + ",00"}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Maio
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Maio
                                      ?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Maio
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Maio
                                      ?.totalPago + ",00"}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Junho
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Junho
                                      ?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Junho
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Junho
                                      ?.totalPago + ",00"}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Julho
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Julho
                                      ?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Julho
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Julho
                                      ?.totalPago + ",00"}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Outubro
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Outubro
                                      ?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Outubro
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes?.Outubro
                                      ?.totalPago + ",00"}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Novembro
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes
                                      ?.Novembro?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Novembro
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes
                                      ?.Novembro?.totalPago + ",00"}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Dezembro
                                    ?.totalEstudante &&
                                    c?.frequencia?.Ano1º?.pagamentosMes
                                      ?.Dezembro?.totalEstudante}
                                </td>
                                <td>
                                  {c?.frequencia?.Ano1º?.pagamentosMes?.Dezembro
                                    ?.totalPago &&
                                    c?.frequencia?.Ano1º?.pagamentosMes
                                      ?.Dezembro?.totalPago + ",00"}
                                </td>

                                <td>{c?.frequencia?.Ano1º?.qtdAno}</td>
                                <td>
                                  {c?.frequencia?.Ano1º?.totalMesAno &&
                                    c?.frequencia?.Ano1º?.totalMesAno + ",00"}
                                </td>
                              </>
                            )}
                          </tr>
                          {c?.frequencia?.Ano2º?.totalMesAno > 0 && (
                            <tr>
                              <td
                                style={{
                                  textAlign: "start",
                                }}>
                                {c?.frequencia?.Ano2º?.ano} Ano
                              </td>
                              <td>{c?.frequencia?.Ano2º?.totalSexoM}</td>
                              <td>{c?.frequencia?.Ano2º?.totalSexoF}</td>
                              <td>{c?.frequencia?.Ano1º?.totalMF}</td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Janeiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Janeiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Janeiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Janeiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Fevereiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Fevereiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Fevereiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Fevereiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Março
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Março
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Março
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Março
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Abril
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Abril
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Abril
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Abril
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Maio
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Maio
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Maio
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Maio
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Junho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Junho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Junho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Junho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Julho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Julho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Julho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Julho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Outubro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Outubro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Outubro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Outubro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Novembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Novembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Novembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Novembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Dezembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Dezembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano2º?.pagamentosMes?.Dezembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano2º?.pagamentosMes?.Dezembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>{c?.frequencia?.Ano2º?.qtdAno}</td>
                              <td>
                                {c?.frequencia?.Ano2º?.totalMesAno &&
                                  c?.frequencia?.Ano2º?.totalMesAno + ",00"}
                              </td>
                            </tr>
                          )}
                          {c?.frequencia?.Ano3º?.totalMesAno > 0 && (
                            <tr>
                              <td
                                style={{
                                  textAlign: "start",
                                }}>
                                {c?.frequencia?.Ano3º?.ano} Ano
                              </td>
                              <td>{c?.frequencia?.Ano3º?.totalSexoM}</td>
                              <td>{c?.frequencia?.Ano3º?.totalSexoF}</td>
                              <td>{c?.frequencia?.Ano1º?.totalMF}</td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Janeiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Janeiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Janeiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Janeiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Fevereiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Fevereiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Fevereiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Fevereiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Março
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Março
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Março
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Março
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Abril
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Abril
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Abril
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Abril
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Maio
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Maio
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Maio
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Maio
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Junho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Junho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Junho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Junho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Julho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Julho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Julho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Julho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Outubro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Outubro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Outubro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Outubro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Novembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Novembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Novembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Novembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Dezembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Dezembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano3º?.pagamentosMes?.Dezembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano3º?.pagamentosMes?.Dezembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>{c?.frequencia?.Ano3º?.qtdAno}</td>
                              <td>
                                {c?.frequencia?.Ano3º?.totalMesAno &&
                                  c?.frequencia?.Ano3º?.totalMesAno + ",00"}
                              </td>
                            </tr>
                          )}
                          {c?.frequencia?.Ano4º?.totalMesAno > 0 && (
                            <tr>
                              <td
                                style={{
                                  textAlign: "start",
                                }}>
                                {c?.frequencia?.Ano4º?.ano} Ano
                              </td>
                              <td>{c?.frequencia?.Ano4º?.totalSexoM}</td>
                              <td>{c?.frequencia?.Ano4º?.totalSexoF}</td>
                              <td>{c?.frequencia?.Ano4º?.totalMF}</td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Janeiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Janeiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Janeiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Janeiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Fevereiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Fevereiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Fevereiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Fevereiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Março
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Março
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Março
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Março
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Abril
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Abril
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Abril
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Abril
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Maio
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Maio
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Maio
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Maio
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Junho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Junho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Junho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Junho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Julho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Julho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Julho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Julho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Outubro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Outubro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Outubro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Outubro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Novembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Novembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Novembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Novembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Dezembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Dezembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano4º?.pagamentosMes?.Dezembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano4º?.pagamentosMes?.Dezembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>{c?.frequencia?.Ano4º?.qtdAno}</td>
                              <td>
                                {c?.frequencia?.Ano4º?.totalMesAno &&
                                  c?.frequencia?.Ano4º?.totalMesAno + ",00"}
                              </td>
                            </tr>
                          )}
                          {c?.frequencia?.Ano5º?.totalMesAno > 0 && (
                            <tr>
                              <td
                                style={{
                                  textAlign: "start",
                                }}>
                                {c?.frequencia?.Ano5º?.ano} Ano
                              </td>
                              <td>{c?.frequencia?.Ano5º?.totalSexoM}</td>
                              <td>{c?.frequencia?.Ano5º?.totalSexoF}</td>
                              <td>{c?.frequencia?.Ano5º?.totalMF}</td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Janeiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Janeiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Janeiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Janeiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Fevereiro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Fevereiro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Fevereiro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Fevereiro
                                    ?.totalPago + ",00"}
                              </td>

                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Março
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Março
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Março
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Março
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Abril
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Abril
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Abril
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Abril
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Maio
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Maio
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Maio
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Maio
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Junho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Junho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Junho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Junho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Julho
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Julho
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Julho
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Julho
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Outubro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Outubro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Outubro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Outubro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Novembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Novembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Novembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Novembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Dezembro
                                  ?.totalEstudante &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Dezembro
                                    ?.totalEstudante}
                              </td>
                              <td>
                                {c?.frequencia?.Ano5º?.pagamentosMes?.Dezembro
                                  ?.totalPago &&
                                  c?.frequencia?.Ano5º?.pagamentosMes?.Dezembro
                                    ?.totalPago + ",00"}
                              </td>
                              <td>{c?.frequencia?.Ano5º?.qtdAno}</td>
                              <td>
                                {c?.frequencia?.Ano5º?.totalMesAno &&
                                  c?.frequencia?.Ano5º?.totalMesAno + ",00"}
                              </td>
                            </tr>
                          )}
                        </tbody>
                        <tbody>
                          <tr>
                            <td
                              colSpan={2}
                              style={{
                                textAlign: "start",
                              }}>
                              <strong>TOTAL GERAL CURSO</strong>
                            </td>
                            <td>{c?.dados?.totalGeralM}</td>
                            <td>{c?.dados?.totalGeralF}</td>
                            <td>{c?.dados?.totalGeralMF}</td>
                            <td>{c?.dados?.totalPorMes?.Janeiro?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Janeiro?.valor &&
                                c?.dados?.totalPorMes?.Janeiro?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Fevereiro?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Fevereiro?.valor &&
                                c?.dados?.totalPorMes?.Fevereiro?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Março?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Março?.valor &&
                                c?.dados?.totalPorMes?.Março?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Abril?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Abril?.valor &&
                                c?.dados?.totalPorMes?.Abril?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Maio?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Maio?.valor &&
                                c?.dados?.totalPorMes?.Maio?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Junho?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Junho?.valor &&
                                c?.dados?.totalPorMes?.Junho?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Julho?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Julho?.valor &&
                                c?.dados?.totalPorMes?.Julho?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Outubro?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Outubro?.valor &&
                                c?.dados?.totalPorMes?.Outubro?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Novembro?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Novembro?.valor &&
                                c?.dados?.totalPorMes?.Novembro?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.totalPorMes?.Dezembro?.qtd}</td>
                            <td>
                              {c?.dados?.totalPorMes?.Dezembro?.valor &&
                                c?.dados?.totalPorMes?.Dezembro?.valor + ",00"}
                            </td>
                            <td>{c?.dados?.qtdGeral}</td>
                            <td>
                              {c?.dados?.totaGeralCurso &&
                                c?.dados?.totaGeralCurso + ",00"}
                            </td>
                          </tr>
                        </tbody>
                      </>
                    )
                )}
              </table>
              <div
                style={{
                  display: "flex",
                  width: "96%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #000",
                  padding: "10px",
                  marginTop: "10px",
                  gap: "400px",
                }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <span>Rua da Missão, Bairro Zorró</span>
                  <span>Cxa. Postal: Tel: +244 949577832</span>
                </div>
                <table className='dados'>
                  <thead>
                    <tr>
                      <th>FREQUÊNCIA</th>
                      <th>MATRICULADOS</th>
                      <th>QUANTIDADE</th>
                      <th>VALORES TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1º Ano</td>
                      <td>{estudanteMatriculado?.ano1º}</td>
                      <td>{anoFrequencia?.ano1º?.totalEstudanteAno || 0}</td>
                      <td>
                        {anoFrequencia?.ano1º?.totalPagamentoAno
                          ? anoFrequencia?.ano1º?.totalPagamentoAno + ",00"
                          : "0,00"}
                      </td>
                    </tr>
                    <tr>
                      <td>2º Ano</td>
                      <td>{estudanteMatriculado?.ano2º}</td>
                      <td>{anoFrequencia?.ano2º?.totalEstudanteAno || 0}</td>
                      <td>
                        {anoFrequencia?.ano2º?.totalPagamentoAno
                          ? anoFrequencia?.ano2º?.totalPagamentoAno + ",00"
                          : "0,00"}
                      </td>
                    </tr>
                    <tr>
                      <td>3º Ano</td>
                      <td>{estudanteMatriculado?.ano3º}</td>
                      <td>{anoFrequencia?.ano3º?.totalEstudanteAno || 0}</td>
                      <td>
                        {anoFrequencia?.ano3º?.totalPagamentoAno
                          ? anoFrequencia?.ano3º?.totalPagamentoAno + ",00"
                          : "0,00"}
                      </td>
                    </tr>
                    <tr>
                      <td>4º Ano</td>
                      <td>{estudanteMatriculado?.ano4º}</td>
                      <td>{anoFrequencia?.ano4º?.totalEstudanteAno || 0}</td>
                      <td>
                        {anoFrequencia?.ano4º?.totalPagamentoAno
                          ? anoFrequencia?.ano4º?.totalPagamentoAno + ",00"
                          : "0,00"}
                      </td>
                    </tr>
                    <tr>
                      <td>5º Ano</td>
                      <td>{estudanteMatriculado?.ano5º}</td>
                      <td>{anoFrequencia?.ano5º?.totalEstudanteAno || 0}</td>
                      <td>
                        {anoFrequencia?.ano5º?.totalPagamentoAno
                          ? anoFrequencia?.ano5º?.totalPagamentoAno + ",00"
                          : "0,00"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}>
          <FormControl>
            <InputLabel>Ano Letivo</InputLabel>
            <Select
              required
              label='Ano Letivo'
              onChange={(e) => setAno(e.target.value)}
              style={{
                width: "200px",
              }}>
              {anos.map((a) => (
                <MenuItem key={a.id} value={a.ano}>
                  {a.ano}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Regime</InputLabel>
            <Select
              required
              label='Ano Letivo'
              onChange={(e) => setRegime(e.target.value)}
              style={{
                width: "200px",
              }}>
              <MenuItem value={"Pós-Laboral"}>Pós-Laboral</MenuItem>
              <MenuItem value={"Regular"}>Regular</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            gap: "10px",
          }}>
          Data Inicial
          <input
            required
            type='date'
            style={{
              width: "100%",
              height: "40px",
            }}
            onChange={(e) => setDataInicial(e.target.value)}
          />
          Data Final
          <input
            required
            type='date'
            style={{
              width: "100%",
              height: "40px",
            }}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>
        <Button onClick={() => relatorio()} type='primary'>
          <Search /> Buscar Histórico
        </Button>
      </div>
    </>
  );
};

export default RelatorioPropinaCurso;
