import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./relatorioRegime.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../../../../auth/auth";
import { Button } from "antd";
import { Filter, Search } from "@mui/icons-material";
import { PiPrinter } from "react-icons/pi";

const RelatorioRegime = () => {
  const [anos, setAnos] = useState([]);
  const [listas, setListas] = useState({});
  const [ano, setAno] = useState("");
  const [regime, setRegime] = useState("");

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
        console.log(data.data);
        setListas(data.data);
      });
  };
  const imprimir = async () => {
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo +=
      "table { border-collapse: collapse; width: 100%; margin-bottom: 10px;}";
    estilo +=
      ".extra div{display: flex; flex-direction: column; align-items: center; margin: auto; width:100%;}";
    estilo +=
      ".extra {display: flex; flex-direction: column; align-items: center; margin: auto; margin-bottom: 20px;}";
    estilo +=
      "table th,td { padding: 8px;text-align: center; padding-right: 20px; border-bottom: 1px solid #ddd;border-right: none;border-left: none;border-top: none;}";
    estilo +=
      "table th,td { padding: 8px;text-align: center; border: 1px solid #000;}";
    estilo +=
      " .assinar { display: flex;margin: auto;width: 100%;justify-content: space-between;margin-top: 20px;}";
    estilo +=
      ".assinar div{ display: flex;flex-direction: column;width: 40%;align-items:center; }";
    estilo += ".opc{ display: none; }";
    estilo +=
      " hr{ border-top: 2px solid #000;width: 90%;margin: auto;margin-top: 40px;margin-bottom: 20px; }";
    estilo += "td,th{font-size: 10pt;}";
    estilo +=
      ".dividas{display: flex; gap: 20px; margin-top: 20px; font-size: 10pt;}";
    estilo += " img{width: 50px;height: 50px;marginBottom: 10px;}";
    estilo += "</style>";

    const win = window.open();
    win.document.write("<html><head>");
    win.document.write("<title>ISP_MOXICO Relatório</title>");
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
    <div className='relatorioRegime'>
      <div className='' id='tabela'>
        <h1>RELATÓRIO FINANCEIRO {regime.toUpperCase()} ANUAL</h1>
        {/* {listas && ( */}
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
      </div>
      {/* )} */}
      <br />
      <div>
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
        <Search /> Buscar
      </Button>
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
          marginRight: "10px",
        }}
        onClick={() => imprimir()}>
        <PiPrinter /> Imprimir
      </Button>
    </div>
  );
};
export default RelatorioRegime;
