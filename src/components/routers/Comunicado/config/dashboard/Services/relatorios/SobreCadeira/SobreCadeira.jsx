import "./sobreCadeira.scss";
import { BiPrinter, BiSearch, BiX } from "react-icons/bi";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Dayjs } from "dayjs";
import { formatDate } from "../../../../../../hook/timeout";
import { api } from "../../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import image from "./Logo.png";

function RelatorioSobreCadeira() {
  const [cadeira, setCadeira] = useState({});
  const { id } = useParams();
  const [tipo] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (tipo.get("tipo") === "Cadeira em Atraso") {
      relatorioCadeiraAtrazo();
    } else if (tipo.get("tipo") === "Exame Especial") {
      relatorioExameEspecial();
    } else if (tipo.get("tipo") === "Recurso") {
      relatorioRecurso();
    }
  }, [id]);

  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo +=
      "table { border-collapse: collapse; width: 100%;margin:auto; margin-top:10px;}";
    estilo +=
      ".extra div{display: flex; flex-direction: column; align-items: center; margin: auto; width:100%;}";
    estilo +=
      ".extra {display: flex; flex-direction: column; align-items: center; margin: auto;}";
    estilo +=
      "table th,td { padding: 4px;text-align: center;padding-right: 10px; font-size: 13pt;}";
    estilo += "table td ,th {border: 1px solid #000;}";
    estilo += "table th {background-color: #a31543; }";
    estilo +=
      " .assinar { display: flex;margin: auto;width: 100%;justify-content: space-between;margin-top: 20px;}";
    estilo +=
      ".assinar div{ display: flex;flex-direction: column;width: 40%;align-items:center; }";
    estilo +=
      " hr{ border-top: 2px solid #000;width: 90%;margin: auto;margin-top: 40px; }";
    estilo += " img{width: 50px;height: 50px;position: absolute; right: 0;}";
    estilo +=
      " .content{display: flex;width: 100%; justify-content: center; align-items: center; gap: 20px;}";
    estilo += " .parte1{width: 48%; position: relative;}";
    estilo += " .parte2{width: 48%;  position: relative;}";
    estilo += " h4{display: flex; margin: auto;}";
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

        if (data.data.message === "sucess") {
          setCadeira(data.data.response);
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

        if (data.data.message === "sucess") {
          setCadeira(data.data.response);
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
        if (data.data.message === "sucess") {
          setCadeira(data.data.response);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className='relatorioCadeira'>
        <div className='opcoesCadeira'>
          <h2>Relatório </h2>

          <Link onClick={(e) => imprimir(e)} className='LinkImprim'>
            {" "}
            <BiPrinter /> Imprimir{" "}
          </Link>
        </div>

        <>
          <div className='tabelaSobreCadeira' id='tabela'>
            <div className='content'>
              <div className='parte2'>
                <div className='extra'>
                  <img src={image} alt='ISPM' />
                  <div>
                    <h4>
                      <strong>Tipo de Serviço: </strong>
                      {tipo.get("tipo")}
                    </h4>
                    <span>Curso: {cadeira?.Curso?.curso}</span>
                    <span>Ano Lectivo: {cadeira?.anoLectivo?.ano}</span>
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
                      <td>{cadeira?.estudante?.nome}</td>
                    </tr>
                    <tr>
                      <td>Bilhete de Identidade</td>
                      <td>{cadeira?.estudante?.bi}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table>
                  <thead>
                    <tr className='estudante'>
                      <th colSpan={6}> Dados da Cadeira</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Cadeira</td>
                      <td>{cadeira?.disciplina?.nome}</td>
                    </tr>
                    <tr>
                      <td>Total Pago</td>
                      <td>{cadeira?.valor} Kz</td>
                    </tr>
                    <tr>
                      <td>Semestre</td>

                      <td>{cadeira?.semestre?.nome} Semestre</td>
                    </tr>
                    <tr>
                      <td>Ano de Frquência</td>
                      <td>{cadeira?.AnoFrequencia?.ano} Ano</td>
                    </tr>
                    <tr>
                      <td>Forma de Pagamento</td>
                      <td>Por RUPE {cadeira?.rupe}</td>
                    </tr>
                    <tr>
                      <td>Solicitado</td>
                      <td>{formatDate(cadeira?.createdAt)}</td>
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
                          {cadeira?.usuario?.nome}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='parte1'>
                <div className='extra'>
                  <img src={image} alt='ISPM' />
                  <div>
                    <h4>
                      <strong>Tipo de Serviço: </strong>
                      {tipo.get("tipo")}
                    </h4>
                    <span>Curso: {cadeira?.Curso?.curso}</span>
                    <span>Ano Lectivo: {cadeira?.anoLectivo?.ano}</span>
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
                      <td>{cadeira?.estudante?.nome}</td>
                    </tr>
                    <tr>
                      <td>Bilhete de Identidade</td>
                      <td>{cadeira?.estudante?.bi}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table>
                  <thead>
                    <tr className='estudante'>
                      <th colSpan={6}> Dados da Cadeira</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Cadeira</td>
                      <td>{cadeira?.disciplina?.nome}</td>
                    </tr>
                    <tr>
                      <td>Total Pago</td>
                      <td>{cadeira?.valor} Kz</td>
                    </tr>
                    <tr>
                      <td>Semestre</td>

                      <td>{cadeira?.semestre?.nome} Semestre</td>
                    </tr>
                    <tr>
                      <td>Ano de Frquência</td>
                      <td>{cadeira?.AnoFrequencia?.ano} Ano</td>
                    </tr>
                    <tr>
                      <td>Forma de Pagamento</td>
                      <td>Por RUPE {cadeira?.rupe}</td>
                    </tr>
                    <tr>
                      <td>Solicitado</td>
                      <td>{formatDate(cadeira?.createdAt)}</td>
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
                          {cadeira?.usuario?.nome}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className='overley'></div>
    </>
  );
}

export default RelatorioSobreCadeira;
