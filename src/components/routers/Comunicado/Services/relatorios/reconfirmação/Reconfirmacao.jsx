import "./reconfirmacao.scss";
import { BiPrinter, BiSearch, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../hook/timeout";
import { api } from "../../../../../../../auth/auth";
import { useEffect, useState } from "react";

function RelatorioReconfirmacao({ setVisivel, visivel, tipo, id }) {
  const [reconfirmacao, setReconfirmacao] = useState({});

  const [abrir, setAbrir] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    relatorioReconfirmacao();
  }, [id]);

  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo +=
      "table { border-collapse: collapse; width: 70%;margin:auto; margin-top:20px;}";
    estilo +=
      ".extra div{display: flex; flex-direction: column; align-items: center; margin: auto; width:100%;}";
    estilo +=
      ".extra {display: flex; flex-direction: column; align-items: center; margin: auto;}";
    estilo +=
      "table th,td { padding: 8px;text-align: center;padding-right: 20px; }";
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

  const relatorioReconfirmacao = async () => {
    await api
      .post("/reconfirmacao/especifico", {
        id,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data !== null || data.data) {
          setAbrir(true);
          setReconfirmacao(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {visivel && (
        <>
          <div className="relatorioReconformacao">
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

            {abrir && (
              <>
                <div className="tabelaReconfirmacao" id="tabela">
                  <div className="extra">
                    <div>
                      <span>{reconfirmacao?.Curso?.curso}</span>
                      <span>Ano Lectivo: {reconfirmacao?.AnoLetivo?.ano}</span>
                      <span>Recibo Nº: {reconfirmacao?.id}</span>
                    </div>
                    <br />
                    <span className="tipo">{tipo} </span>
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
                        <td>{reconfirmacao?.Estudante?.nome}</td>
                      </tr>
                      <tr>
                        <td>Bilhete de Identidade</td>
                        <td>{reconfirmacao?.Estudante?.bi}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr className="estudante">
                        <th colSpan={6}> Dados de Reconfirmação</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Semestre</td>

                        <td>{reconfirmacao?.Semestre?.nome}</td>
                      </tr>
                      <tr>
                        <td>Total Pago</td>
                        <td>{reconfirmacao?.valor} Kz</td>
                      </tr>
                      <tr>
                        <td>Ano de Frquência</td>
                        <td>{reconfirmacao?.AnoFrequencia?.ano}</td>
                      </tr>
                      <tr>
                        <td>Solicitado</td>
                        <td>{formatDate(reconfirmacao?.createdAt)}</td>
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
                    {" "}
                    <BiPrinter /> Imprimir{" "}
                  </Link>
                </div>
              </>
            )}
          </div>
          <div className="overley"></div>
        </>
      )}
    </>
  );
}

export default RelatorioReconfirmacao;
