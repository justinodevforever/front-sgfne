import { useEffect, useState } from "react";
import "./relatorioMatricula.scss";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button } from "antd";
import { formatDate } from "../../../../../hook/timeout";
import { Print } from "@mui/icons-material";
import logo from "./Logo.png";
import Loader from "../../../../../hook/load/Loader";
import OvelayLoader from "../../../../../hook/OverlayLoad/OverlayLoader";

const RelatorioMatricula = () => {
  const [dados, setDados] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCurso();
  }, []);

  const dadosRelatorio = async () => {
    try {
      setIsLoading(true);
      await api
        .post("/relatorio/matricula", {
          dataFinal,
          dataInicio,
        })
        .then((data) => {
          if (data.data === "Token Invalid") {
            return navigate("/login");
          }

          setDados(data.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getCurso = async () => {
    try {
      await api.get("/curso").then((data) => {
        if (data.data === "Token Invalid") {
          return navigate("/login");
        }
        setCursos(data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const imprimir = async () => {
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo += ".tabela { display: flex; width: 100%;}";
    estilo +=
      "table { border-collapse: collapse; width: 100%; margin-bottom: 10px;}";
    estilo +=
      "table th,td {padding: 4px; font-size: 11pt; text-align: center; border: 1px solid #000;font-weight: 500;}";
    estilo += " img{width: 50px;height: 50px; right: 0;}";
    estilo +=
      "dados {display: flex; justify-content: center; align-items: center;}";
    estilo += ".title th{border: none}";
    estilo += "</style>";

    const win = window.open();
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
      {isLoading && <OvelayLoader />}
      <div className='relatorioMatricula'>
        {dados?.length > 0 && (
          <Button
            type='primary'
            onClick={() => imprimir()}
            style={{
              display: "flex",
              width: "150px",
              background: "#a31543",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              fontSize: "14pt",
              marginLeft: "800px",
              marginTop: "20px",
            }}>
            <Print /> Imprimir
          </Button>
        )}
        {dados?.length > 0 && (
          <div className='tabela' id='tabela'>
            <div className='dados'>
              <img
                src={logo}
                alt='logo'
                style={{
                  display: "flex",
                  float: "right",
                  // marginRight: "20px",
                }}
              />

              <table className='title'>
                <thead>
                  <tr>
                    <th style={{ border: "none" }}>
                      <h1>Relatório de Matrícula</h1>
                    </th>
                  </tr>
                </thead>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Data Início {formatDate(dataInicio)}</th>
                    <th>Data Final {formatDate(dataFinal)}</th>
                  </tr>
                </thead>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>F</th>
                    <th>M</th>
                    <th>M + F</th>
                    <th>Regular</th>
                    <th>Pós-Laboral</th>
                    <th>Total Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((d, i) => (
                    <tr key={i}>
                      <td>{d.curso}</td>
                      <td>{d?.totalF}</td>
                      <td>{d?.totalM}</td>
                      <td>{d?.totalGenero}</td>
                      <td>{d?.totalRegular}</td>
                      <td>{d?.totalPosLaboral}</td>
                      <td>{d?.totalValor + ".00"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className='divInput'>
          Data Início
          <input
            type='date'
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          Data Final
          <input
            type='date'
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
          <Button
            type='primary'
            style={{
              background: "#a31543",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={() => dadosRelatorio()}>
            Buscar Histórico
          </Button>
        </div>
      </div>
    </>
  );
};

export default RelatorioMatricula;
