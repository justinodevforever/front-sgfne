import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "./relatorioDeclaracao.scss";
import logo from "./Logo.png";
import { BiPrinter } from "react-icons/bi";
import { api } from "../../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../../../hook/timeout";

const RelatorioDeclaracao = () => {
  const [tipo] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState({});

  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo +=
      "table { border-collapse: collapse; width: 90%;margin:auto; margin-top:20px;}";
    estilo +=
      ".dados {display: flex; flex-direction: column; align-items: center; text-align: left; margin: auto;}";
    estilo +=
      "table th,td {padding: 8px;text-align: center; padding-right: 20px; font-size: 12px;}";
    estilo += "table td ,th {border: 1px solid #000; font-size: 10pt;}";
    estilo += "table th {background-color: #a31543; }";
    estilo +=
      " .assinar { display: flex;margin: auto;width: 100%;justify-content: space-between;margin-top: 20px;}";
    estilo +=
      ".assinar div{ display: flex;flex-direction: column;width: 40%;align-items:center; }";
    estilo +=
      " hr{ border-top: 2px solid #000;width: 90%;margin: auto;margin-top: 40px; }";
    estilo += ".tabelaReconfirmacao{display: flex; flex-direction: row;}";
    estilo += "img{width: 70px; height: 70px}";
    estilo += "table td { text-align: left; font-size: 14pt;}";
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
  const buscarDados = async () => {
    await api
      .get(`/declaracoes/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") return navigate("/login");
        setDados(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <div className='relatorioDeclaracao'>
      <h1>Relatório Declaração</h1>
      <div className='conteudo' id='tabela'>
        <div
          className='dados'
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}>
          <img src={logo} alt='logo' />
          <span>
            <strong>Tipo de Declaração:</strong> {tipo.get("tipo")}
          </span>
          <table>
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{dados?.estudante?.nome}</td>
              </tr>
              <tr>
                <td>Nº B.I</td>
                <td>{dados?.estudante?.bi}</td>
              </tr>
              <tr>
                <td>Frequência</td>
                <td>{dados?.frequencia?.ano} Ano</td>
              </tr>
              <tr>
                <td>Valor a Pagar</td>
                <td>{dados?.valor + ",00"} kz</td>
              </tr>
              <tr>
                <td>Data Solicitação</td>
                <td> {formatDate(dados?.dataSolicitacao)}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}>
                    <strong>Responsável</strong>
                    <span
                      style={{
                        fontStyle: "italic",
                      }}>
                      {dados?.usuario?.nome}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='imprimirReconfirmacao'>
        <Link onClick={(e) => imprimir(e)} className='linkImprimir'>
          {" "}
          <BiPrinter /> Imprimir{" "}
        </Link>
        <Link
          style={{
            padding: "10px",
          }}
          to={`/dashboard/reconfirmacao/${2}?active=reco`}
          className='LinkFechar'>
          fechar{" "}
        </Link>
      </div>
    </div>
  );
};

export default RelatorioDeclaracao;
