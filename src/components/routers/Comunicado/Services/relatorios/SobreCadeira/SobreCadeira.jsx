import "./sobreCadeira.scss";
import { BiPrinter, BiSearch, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { formatDate } from "../../../../hook/timeout";
import { api } from "../../../../../../../auth/auth";
import { useEffect, useState } from "react";

function RelatorioSobreCadeira({ propinas, setVisivel, visivel, tipo, id }) {
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [meses, setMeses] = useState([]);
  const [cadeira, setCadeira] = useState({});
  const [propinasMensal, setPropinasMensal] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [mes, setMes] = useState("");
  const [bi, setBi] = useState("");
  const [abrir, setAbrir] = useState(false);
  const [mensal, setMensal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (tipo === "Cadeira em Atrazo") {
      relatorioCadeiraAtrazo();
    } else if (tipo === "Exame Especial") {
      relatorioExameEspecial();
    } else if (tipo === "Recurso") {
      relatorioRecurso();
    }
  }, [id]);

  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo +=
      "table { border-collapse: collapse; width: 70%;margin:auto; margin-top:10px;}";
    estilo +=
      ".extra div{display: flex; flex-direction: column; align-items: center; margin: auto; width:100%;}";
    estilo +=
      ".extra {display: flex; flex-direction: column; align-items: center; margin: auto;}";
    estilo +=
      "table th,td { padding: 4px;text-align: center;padding-right: 10px; }";
    estilo += "table td ,th {border: 1px solid #000;}";
    estilo += "table th {background-color: #a31543; }";
    estilo +=
      " .assinar { display: flex;margin: auto;width: 100%;justify-content: space-between;margin-top: 20px;}";
    estilo +=
      ".assinar div{ display: flex;flex-direction: column;width: 40%;align-items:center; }";
    estilo +=
      " hr{ border-top: 2px solid #000;width: 90%;margin: auto;margin-top: 40px; }";
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
  function closed(e) {
    e.preventDefault();
    setVisivel(false);
  }

  const relatorioRecurso = async () => {
    await api
      .post("/recurso/especifico", {
        id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data !== null || data.data) {
          setCadeira(data.data);
          console.log(data.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const relatorioExameEspecial = async () => {
    await api
      .post("/exame/especial/especifico", {
        id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data !== null || data.data) {
          setCadeira(data.data);
          console.log(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const relatorioCadeiraAtrazo = async () => {
    await api
      .post("/cadeira/atraso/especifico", {
        id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data !== null || data.data) {
          setCadeira(data.data);
          console.log(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {visivel && (
        <>
          <div className="relatorioCadeira">
            <div className="opcoes">
              <h2>Relatório </h2>

              <BiX
                size={20}
                color="red"
                cursor={"pointer"}
                className="closed"
                onClick={(e) => closed(e)}
              />
            </div>

            <h2 className="h2">{tipo}</h2>

            <>
              <div className="tabelaSobreCadeira" id="tabela">
                <div className="extra">
                  <div>
                    <span>{cadeira?.Curso?.curso}</span>
                    <span>Ano Lectivo: {cadeira?.AnoLetivo?.ano}</span>
                    <span>Recibo Nº: {cadeira?.id}</span>
                  </div>
                  <br />
                  <span className="tipo">Tipo de Serviço: {tipo} </span>
                </div>

                <table>
                  <thead>
                    <tr className="estudante">
                      <th colSpan={6}> Dados de Estudante</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Estudante</td>
                      <td>{cadeira?.Estudante?.nome}</td>
                    </tr>
                    <tr>
                      <td>Bilhete de Identidade</td>
                      <td>{cadeira?.Estudante?.bi}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table>
                  <thead>
                    <tr className="estudante">
                      <th colSpan={6}> Dados da Cadeira</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Cadeira</td>
                      <td>{cadeira?.Disciplina?.nome}</td>
                    </tr>
                    <tr>
                      <td>Total Pago</td>
                      <td>{cadeira?.valor} Kz</td>
                    </tr>
                    <tr>
                      <td>Semestre</td>

                      <td>{cadeira?.Semestre?.nome}</td>
                    </tr>
                    <tr>
                      <td>Ano de Frquência</td>
                      <td>{cadeira?.AnoFrequencia?.ano}</td>
                    </tr>
                    <tr>
                      <td>Solicitado</td>
                      <td>{formatDate(cadeira?.createdAt)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="assinar">
                  <div>
                    <hr />
                    <span>{"(Assinatura do Estudante)"}</span>
                  </div>
                  <div>
                    <hr />
                    <span>{"(Assinatura do Operador)"}</span>
                  </div>
                </div>

                <hr />
                <div className="extra">
                  <div>
                    <span>{cadeira?.Curso?.curso}</span>
                    <span>Ano Lectivo: {cadeira?.AnoLetivo?.ano}</span>
                    <span>Recibo Nº: {cadeira?.id}</span>
                  </div>
                  <br />
                  <span className="tipo">Tipo de Serviço: {tipo} </span>
                </div>
                <table>
                  <thead>
                    <tr className="estudante">
                      <th colSpan={6}> Dados de Estudante</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Estudante</td>
                      <td>{cadeira?.Estudante?.nome}</td>
                    </tr>
                    <tr>
                      <td>Bilhete de Identidade</td>
                      <td>{cadeira?.Estudante?.bi}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table>
                  <thead>
                    <tr className="estudante">
                      <th colSpan={6}> Dados da Cadeira</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Cadeira</td>
                      <td>{cadeira?.Disciplina?.nome}</td>
                    </tr>
                    <tr>
                      <td>Total Pago</td>
                      <td>{cadeira?.valor} Kz</td>
                    </tr>
                    <tr>
                      <td>Semestre</td>

                      <td>{cadeira?.Semestre?.nome}</td>
                    </tr>
                    <tr>
                      <td>Ano de Frquência</td>
                      <td>{cadeira?.AnoFrequencia?.ano}</td>
                    </tr>
                    <tr>
                      <td>Solicitado</td>
                      <td>{formatDate(cadeira?.createdAt)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="assinar">
                  <div>
                    <hr />
                    <span>{"(Assinatura do Estudante)"}</span>
                  </div>
                  <div>
                    <hr />
                    <span>{"(Assinatura do Operador)"}</span>
                  </div>
                </div>
              </div>

              <div className="imprimir">
                <Link onClick={(e) => imprimir(e)}>
                  <BiPrinter size={40} color="#fff" />
                  Imprimir
                </Link>
              </div>
            </>
          </div>
          <div className="overley"></div>
        </>
      )}
    </>
  );
}

export default RelatorioSobreCadeira;
