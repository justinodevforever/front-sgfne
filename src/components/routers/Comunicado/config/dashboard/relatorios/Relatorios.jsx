import { useEffect, useState } from "react";
import "./relatorio.scss";
import { api } from "../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import logo from "./Logo.png";
import { Button, DatePicker } from "antd";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PiPrinter } from "react-icons/pi";
import OvelayLoader from "../../../../hook/OverlayLoad/OverlayLoader";

const Relatorios = () => {
  const [list, setList] = useState([]);
  const [ano, setAno] = useState("");
  const [loding, setLoding] = useState(false);
  const [anos, setAnos] = useState([]);
  const [totalMes, setTotalMes] = useState({});
  const [totalGeral, setTotalGeral] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    buscaAnoLeivo();
  }, []);
  const listaEstudante = async () => {
    setLoding(true);
    await api.post("/lista", { ano }).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setTotalMes(data.data?.totalMes);
      setTotalGeral(data.data?.totalGeral);
      setList(data.data?.response);
      setLoding(false);
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
  const buscaAnoLeivo = async () => {
    await api
      .get("/letivo")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setAnos(data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='relatoriosLista'>
      {loding && <OvelayLoader />}
      <div className='tabela' id='tabela'>
        <img
          src={logo}
          alt='logo'
          style={{
            display: "flex",
            float: "right",
          }}
        />
        <div
          className='tabela1'
          style={{
            display: "flex",
            width: "97%",
            margin: "auto",
            border: "1px solid #000",
            padding: "5px",
            marginBottom: "10px",
            marginTop: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <h3> Lista de Todos Estudantes | {ano}</h3>
        </div>
        {list.length > 0 ? (
          <>
            <table className='table'>
              <thead>
                <tr>
                  <th>N/O</th>
                  <th>Nome Completo</th>
                  <th>Gênero</th>
                  <th>Curso</th>
                  <th>Ano</th>
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
                  <th>Total Pto</th>
                </tr>
              </thead>
              <tbody>
                {list.map((d, i) => (
                  <tr key={d.id}>
                    <td>{i + 1}</td>
                    <td>{d?.estudante?.nome}</td>
                    <td>{d?.estudante?.sexo}</td>
                    <td>{d?.estudante?.curso?.curso}</td>
                    <td>{d?.estudante?.frequencia?.ano} Ano</td>
                    <td>
                      {d?.todosMeses?.Janeiro !== 0
                        ? d?.todosMeses?.Janeiro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Fevereiro !== 0
                        ? d?.todosMeses?.Fevereiro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Março !== 0
                        ? d?.todosMeses?.Março + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Abril !== 0
                        ? d?.todosMeses?.Abril + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Maio !== 0
                        ? d?.todosMeses?.Maio + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Junho !== 0
                        ? d?.todosMeses?.Junho + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Julho !== 0
                        ? d?.todosMeses?.Julho + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Outubro !== 0
                        ? d?.todosMeses?.Outubro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Novembro !== 0
                        ? d?.todosMeses?.Novembro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.Dezembro !== 0
                        ? d?.todosMeses?.Dezembro + ".00"
                        : " 0.00"}
                    </td>
                    <td>
                      {d?.todosMeses?.total !== 0
                        ? d?.todosMeses?.total + ".00"
                        : "0.00"}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5}>SOMA GERAL</td>
                  <td>
                    {totalMes?.Janeiro !== 0
                      ? totalMes?.Janeiro + ".00"
                      : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Fevereiro !== 0
                      ? totalMes?.Fevereiro + ".00"
                      : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Março !== 0 ? totalMes?.Março + ".00" : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Abril !== 0 ? totalMes?.Abril + ".00" : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Maio !== 0 ? totalMes?.Maio + ".00" : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Junho !== 0 ? totalMes?.Junho + ".00" : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Julho !== 0 ? totalMes?.Julho + ".00" : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Outubro !== 0
                      ? totalMes?.Outubro + ".00"
                      : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Novembro !== 0
                      ? totalMes?.Novembro + ".00"
                      : " 0.00"}
                  </td>
                  <td>
                    {totalMes?.Dezembro !== 0
                      ? totalMes?.Dezembro + ".00"
                      : " 0.00"}
                  </td>
                  <td>{totalGeral !== 0 ? totalGeral + ".00" : "0.00"}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <span>Rua da Missão, Bairro Zorró</span>
            <span>Cxa. Postal: Tel: +244 949577832</span>
          </>
        ) : (
          <h3>Nenhum Histórico Encontrado</h3>
        )}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}>
        <FormControl>
          <InputLabel htmlFor='demo-simple-select-label'>
            Ano Lectivo
          </InputLabel>
          <Select
            style={{
              width: "200px",
            }}
            labelId='demo-simple-select-label'
            label='Ano Lectivo'
            onChange={(e) => setAno(e.target.value)}
            id='demo-simple-select'>
            {anos.map((s) => (
              <MenuItem value={s.ano} key={s.id}>
                {s.ano}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type='primary'
          style={{
            background: "#a31543",
            marginTop: "10px",
          }}
          onClick={() => listaEstudante()}>
          Buscar Histórico
        </Button>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
            alignItems: "end",
          }}>
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
      </div>
    </div>
  );
};
export default Relatorios;
