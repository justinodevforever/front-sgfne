import { useEffect, useState } from "react";
import "./reciboInscrincao.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../../../../../../auth/auth";
import image from "./Logo.png";
import { formatDate } from "../../../../../../hook/timeout";
import { BiPrinter } from "react-icons/bi";

const ReciboInscrincao = () => {
  const [dados, setDados] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getInfomation();
  }, []);
  const getInfomation = async () => {
    try {
      await api.get(`/inscrincao/matricula/${id}`).then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        setDados(data.data);
      });
    } catch (error) {}
  };
  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo +=
      "table { border-collapse: collapse; width: 100%;margin:auto; margin-top:20px;}";
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
    estilo += " img{width: 50px;height: 50px;float:right;}";
    estilo += ".tabelaInscrincao{display: flex; flex-direction: row;gap:20px;}";
    estilo += ".tabelaInscrincao div{width: 90%;}";
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
  return (
    <div className='reciboInscrincao'>
      <div className='imprimirInscrincao'>
        <Link onClick={(e) => imprimir(e)} className='linkImprimir'>
          {" "}
          <BiPrinter /> Imprimir{" "}
        </Link>
        <Link
          style={{
            padding: "10px",
          }}
          to={`/dashboard/inscrincao/${2}?active=insc`}
          className='LinkFechar'>
          fechar{" "}
        </Link>
      </div>
      <div id='tabela' className='div'>
        <div className='tabelaInscrincao'>
          <div>
            <img src={image} alt='ISPM' />
            <div className='extra'>
              <h4>Tipo de Serviço: Inscrição</h4>

              <span>
                Curso: <strong>{dados?.curso?.curso}</strong>
              </span>

              <br />
            </div>

            <table>
              <thead>
                <tr className='estudante'>
                  <th colSpan={6}> Dados de Candidato</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Candidato</td>
                  <td>{dados?.nome}</td>
                </tr>
                <tr>
                  <td>Bilhete de Identidade</td>
                  <td>{dados?.bi}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr className='estudante'>
                  <th colSpan={6}> Dados da Inscrição</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Total Pago</td>
                  <td>{dados?.valor} Kz</td>
                </tr>

                <tr>
                  <td>Forma de Pagamento</td>
                  <td>Por Rupe {dados?.rupe}</td>
                </tr>
                <tr>
                  <td>Solicitado</td>
                  <td>{formatDate(dados?.dataSolicitacao)}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "100%",
                      }}>
                      <strong
                        style={{
                          fontStyle: "italic",
                        }}>
                        Respossável:
                      </strong>{" "}
                      {dados?.usuario?.nome}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <img src={image} alt='ISPM' />
            <div className='extra'>
              <h4>Tipo de Serviço: Inscrição</h4>

              <span>
                Curso: <strong>{dados?.curso?.curso}</strong>
              </span>

              <br />
            </div>

            <table>
              <thead>
                <tr className='estudante'>
                  <th colSpan={6}> Dados de Candidato</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Candidato</td>
                  <td>{dados?.nome}</td>
                </tr>
                <tr>
                  <td>Bilhete de Identidade</td>
                  <td>{dados?.bi}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr className='estudante'>
                  <th colSpan={6}> Dados da Inscrição</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Total Pago</td>
                  <td>{dados?.valor} Kz</td>
                </tr>

                <tr>
                  <td>Forma de Pagamento</td>
                  <td>Por Rupe {dados?.rupe}</td>
                </tr>
                <tr>
                  <td>Solicitado</td>
                  <td>{formatDate(dados?.dataSolicitacao)}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "100%",
                      }}>
                      <strong
                        style={{
                          fontStyle: "italic",
                        }}>
                        Respossável:
                      </strong>{" "}
                      {dados?.usuario?.nome}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReciboInscrincao;
