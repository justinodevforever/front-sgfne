import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import "./relatorioRegime.scss";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../../../../../../auth/auth";
import { Button } from "antd";
import logo from "../Logo.png";
import { Filter, Search } from "@mui/icons-material";
import { PiPrinter } from "react-icons/pi";
import OvelayLoader from "../../../../../hook/OverlayLoad/OverlayLoader";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useReactToPrint } from "react-to-print";

const RelatorioRegime = () => {
  const [anos, setAnos] = useState([]);
  const [listas, setListas] = useState({});
  const [ano, setAno] = useState("");
  const [regime, setRegime] = useState("");
  const [loading, setLoading] = useState(false);
  const documentPrint = useRef();

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
    setLoading(true);
    await api
      .post("/relatorioregime", {
        regime,
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setListas(data.data);
        setLoading(false);
      });
  };
  const imprimir = useReactToPrint({
    content: () => documentPrint.current,
    documentTitle: "ISPM",
    copyStyles: true,
  });

  return (
    <>
      {loading && <OvelayLoader />}
      <div className='relatorioRegime'>
        {listas?.totalGeral > 0 && (
          <Button
            type='primary'
            style={{
              display: "flex",
              background: "#a31543",
              marginTop: "10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              fontSize: "14pt",
              marginLeft: "900px",
            }}
            onClick={() => imprimir()}>
            <PiPrinter /> Imprimir
          </Button>
        )}
        <div className='tabela' id='tabela' ref={documentPrint}>
          {listas?.totalGeral > 0 && (
            <img
              src={logo}
              alt='logo'
              style={{
                display: "flex",
                float: "right",
              }}
            />
          )}
          <h3>
            RELATÓRIO FINANCEIRO {regime.toUpperCase()} | {ano}
          </h3>
          {listas?.totalGeral > 0 && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Tipo de Emunumento</th>
                    <th>Janeiro</th>
                    <th>Fevereiro</th>
                    <th>Março</th>
                    <th>Abril</th>
                    <th>Maio</th>
                    <th>Junho</th>
                    <th>Julho</th>
                    <th>Outubro</th>
                    <th>Novembro</th>
                    <th>Dezembro</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Propinas - {regime}</td>
                    <td>{listas?.totalMes?.Janeiro + ".00"}</td>
                    <td>
                      {listas?.totalMes?.Fevereiro !== 0
                        ? listas?.totalMes?.Fevereiro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Março !== 0
                        ? listas?.totalMes?.Março + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Abril !== 0
                        ? listas?.totalMes?.Abril + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Maio !== 0
                        ? listas?.totalMes?.Maio + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Junho !== 0
                        ? listas?.totalMes?.Junho + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Julho !== 0
                        ? listas?.totalMes?.Julho + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Outubro !== 0
                        ? listas?.totalMes?.Outubro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Novembro !== 0
                        ? listas?.totalMes?.Novembro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Dezembro !== 0
                        ? listas?.totalMes?.Dezembro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalGeral ? listas?.totalGeral + ".00" : "0.00"}
                    </td>
                  </tr>
                  <tr>
                    <td>TOTAL GERAL</td>
                    <td>{listas?.totalMes?.Janeiro + ".00"}</td>
                    <td>
                      {listas?.totalMes?.Fevereiro !== 0
                        ? listas?.totalMes?.Fevereiro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Março !== 0
                        ? listas?.totalMes?.Março + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Abril !== 0
                        ? listas?.totalMes?.Abril + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Maio !== 0
                        ? listas?.totalMes?.Maio + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Junho !== 0
                        ? listas?.totalMes?.Junho + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Julho !== 0
                        ? listas?.totalMes?.Julho + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Outubro !== 0
                        ? listas?.totalMes?.Outubro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Novembro !== 0
                        ? listas?.totalMes?.Novembro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalMes?.Dezembro !== 0
                        ? listas?.totalMes?.Dezembro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {listas?.totalGeral ? listas?.totalGeral + ".00" : "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <span>Rua da Missão, Bairro Zorró</span>
              <span>Cxa. Postal: Tel: +244 949577832</span>
            </>
          )}
        </div>
        <br />
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}>
          <FormControl>
            <InputLabel>Ano Letivo</InputLabel>
            <Select
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
        <Button onClick={() => relatorio()} type='primary'>
          <Search /> Filtrar a Propina
        </Button>
      </div>
    </>
  );
};
export default RelatorioRegime;
