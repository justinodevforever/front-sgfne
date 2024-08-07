import "./reconfirmacao.scss";
import { BiPrinter, BiX } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../../../../hook/timeout";
import { api } from "../../../../../../../../../auth/auth";
import image from "./Logo.png";
import { useEffect, useState } from "react";

function RelatorioReconfirmacao() {
  const [reconfirmacao, setReconfirmacao] = useState({});
  const { id } = useParams();

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
      "table { border-collapse: collapse; width: 90%;margin:auto; margin-top:20px;}";
    estilo +=
      ".extra div{display: flex; flex-direction: column; align-items: center; margin: auto; width:100%;}";
    estilo +=
      ".extra {display: flex; flex-direction: column; align-items: center; text-align: left; margin: auto;}";
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
    estilo += " img{width: 50px;height: 50px;position: absolute; right: 0;}";
    estilo += ".tabelaReconfirmacao{display: flex; flex-direction: row;}";
    estilo += ".tabelaReconfirmacao div{width: 70%;}";
    estilo += "table td { text-align: left;}";
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
      <div className='relatorioReconformacao'>
        <div className='opcoes'>
          <h2>Relatório </h2>

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

        {abrir && (
          <div id='tabela'>
            <div className='tabelaReconfirmacao'>
              <div>
                <img src={image} alt='ISPM' />
                <div className='extra'>
                  <h4>Tipo de Serviço: Reconfirmação</h4>
                  <div>
                    <span>
                      Curso: <strong>{reconfirmacao?.curso?.curso}</strong>
                    </span>
                    <span>
                      Ano Lectivo:{" "}
                      <strong>{reconfirmacao?.anoLectivo?.ano}</strong>
                    </span>
                  </div>
                  <br />
                </div>

                <table>
                  <thead>
                    <tr className='estudante'>
                      <th colSpan={6}> Dados de Estudante</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Estudante</td>
                      <td>{reconfirmacao?.estudante?.nome}</td>
                    </tr>
                    <tr>
                      <td>Bilhete de Identidade</td>
                      <td>{reconfirmacao?.estudante?.bi}</td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <thead>
                    <tr className='estudante'>
                      <th colSpan={6}> Dados de Reconfirmação</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Semestre</td>

                      <td>{reconfirmacao?.semestre?.nome} Semestre</td>
                    </tr>
                    <tr>
                      <td>Total Pago</td>
                      <td>{reconfirmacao?.valor} Kz</td>
                    </tr>
                    <tr>
                      <td>Ano de Frquência</td>
                      <td>{reconfirmacao?.frequencia?.ano} Ano</td>
                    </tr>
                    <tr>
                      <td>Forma de Pagamento</td>
                      <td>Por Rupe {reconfirmacao?.rupe}</td>
                    </tr>
                    <tr>
                      <td>Solicitado</td>
                      <td>{formatDate(reconfirmacao?.createdAt)}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                          <strong
                            style={{
                              fontStyle: "italic",
                            }}>
                            Respossável:
                          </strong>{" "}
                          {reconfirmacao?.usuario?.nome}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <img src={image} alt='ISPM' />
                <div className='extra'>
                  <h4>Tipo de Serviço: Reconfirmação</h4>
                  <div>
                    <span>
                      Curso: <strong>{reconfirmacao?.curso?.curso}</strong>
                    </span>
                    <span>
                      Ano Lectivo:{" "}
                      <strong>{reconfirmacao?.anoLectivo?.ano}</strong>
                    </span>
                  </div>
                  <br />
                </div>

                <table>
                  <thead>
                    <tr className='estudante'>
                      <th colSpan={6}> Dados de Estudante</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Estudante</td>
                      <td>{reconfirmacao?.estudante?.nome}</td>
                    </tr>
                    <tr>
                      <td>Bilhete de Identidade</td>
                      <td>{reconfirmacao?.estudante?.bi}</td>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <thead>
                    <tr className='estudante'>
                      <th colSpan={6}> Dados de Reconfirmação</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Semestre</td>

                      <td>{reconfirmacao?.semestre?.nome} Semestre</td>
                    </tr>
                    <tr>
                      <td>Total Pago</td>
                      <td>{reconfirmacao?.valor} Kz</td>
                    </tr>
                    <tr>
                      <td>Ano de Frquência</td>
                      <td>{reconfirmacao?.frequencia?.ano} Ano</td>
                    </tr>
                    <tr>
                      <td>Forma de Pagamento</td>
                      <td>Por Rupe {reconfirmacao?.rupe}</td>
                    </tr>
                    <tr>
                      <td>Solicitado</td>
                      <td>{formatDate(reconfirmacao?.createdAt)}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                          <strong
                            style={{
                              fontStyle: "italic",
                            }}>
                            Respossável:
                          </strong>{" "}
                          {reconfirmacao?.usuario?.nome}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RelatorioReconfirmacao;
