import "./propina.scss";
import { BiPrinter, BiSearch, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../../../hook/timeout";
import { api } from "../../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import { Input, Modal, Space, Alert } from "antd";

function RelatorioPropina({ propinas, setVisivel, visivel, tipo }) {
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [meses, setMeses] = useState([]);
  const [propinasAnual, setPropinasAnual] = useState([]);
  const [propinasMensal, setPropinasMensal] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [mes, setMes] = useState("");
  const [bi, setBi] = useState("");
  const [anual, setAnual] = useState(false);
  const [mensal, setMensal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dados, setDados] = useState({});
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [dividas, setDividas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAnoLetivo();
    getMes();
  }, []);

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
    estilo += " img{width: 50px;height: 50px;position: absolute; right: 0;}";
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

  const getMes = async () => {
    await api
      .get("/mes")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setMes(data.data[0].mes);
        setMeses(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAnoLetivo = async () => {
    await api
      .get("/letivo")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAnos(data.data);
        setAno(data.data[0].ano);
      })
      .catch((err) => console.log(err));
  };

  const buscaPropinaMensal = async () => {
    setIsLoading(true);
    const { data } = await api.post("/divida", { bi });
    setDividas(data.dividas);

    await api
      .post("/propina/mensal", {
        mes,
        bi,
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setIsLoading(false);
        if (data.data) {
          setUserName(data.data?.usuario?.nome);
          setDados(data.data);
          setPropinasMensal([...propinasMensal, data.data]);
        }
      })
      .catch((err) => console.log(err));
  };

  const buscaPropina = async (e) => {
    const { data } = await api.post("/divida", { bi });
    if (data) setDividas(data.dividas);
    await api
      .post("/propina/anual", {
        ano,
        semestre,
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        if (data.data) {
          setUserName(data.data?.usuario?.nome);
          setDados(data.data[0]);
          setPropinasAnual(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleMensal(e) {
    e.preventDefault();
    setMensal(true);
    setAnual(false);
  }
  function toggleAnual(e) {
    e.preventDefault();
    setAnual(true);
    setMensal(false);
  }
  function hendleRemove(e, id) {
    e.preventDefault();
    setPropinasMensal(propinasMensal.filter((pro) => pro.id !== id));
  }

  return (
    <>
      {visivel && (
        <>
          <Modal
            open={visivel}
            closable={false}
            onCancel={() => {
              setVisivel(!visivel);
            }}
            okText='Imprimir'
            cancelText='Sair'
            onOk={() => {
              if (propinasAnual.length > 0 || propinasMensal.length > 0)
                imprimir();
            }}
            width={"90%"}>
            <div className='opcoes'>
              <h2>Relatório</h2>
              <span
                onClick={(e) => toggleMensal(e)}
                className={mensal ? "clic" : "link"}>
                Mensal
              </span>
              <span
                onClick={(e) => toggleAnual(e)}
                className={anual ? "clic" : "link"}>
                Anual
              </span>
            </div>
            {anual && (
              <>
                <h3>Propina Anual</h3>
                <form className='formBi'>
                  <label htmlFor='anoLetivo' style={{ marginTop: "10px" }}>
                    Ano Lectivo
                    <select onChange={(e) => setAno(e.target.value)}>
                      {anos.map((ano) => (
                        <option value={ano.ano} key={ano.id}>
                          {ano.ano}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className='input'>
                    <Input.Search
                      type='search'
                      placeholder='Número de BI  Estudante'
                      value={bi}
                      onChange={(e) => setBi(e.target.value)}
                      className='search'
                      maxLength={14}
                      onSearch={() => buscaPropina()}
                      loading={isLoading}
                    />
                  </div>
                </form>

                <div className='tabelaPropina' id='tabela'>
                  <img src='./image/ISP_Moxico/Logo.png' alt='ISPM' />
                  {propinasAnual.length >= 1 && (
                    <>
                      <div className='extra'>
                        <div>
                          <div>
                            <span>Curso: {dados?.estudante?.curso?.curso}</span>
                            <span>Ano Lectivo: {dados?.anoLectivo?.ano}</span>
                          </div>
                          <br />
                          <span className='tipo'>
                            Tipo de Serviço: Propina{" "}
                          </span>
                        </div>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Contribuinte</th>
                            <th>Nº RUPE</th>
                            <th>Mês</th>
                            <th>Valor</th>
                            <th>Solicitado</th>
                            <th>Operador</th>
                          </tr>
                        </thead>

                        <tbody>
                          {propinasAnual.map((prop) => (
                            <tr key={prop.id}>
                              <td>{prop?.estudante?.nome}</td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>
                              <td>{formatDate(prop?.createdAt)}</td>
                              <td>{prop?.usuario.nome} </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className='assinar'>
                        <div>
                          <span className='operador'>{"O Operador"}</span>
                          <hr />
                        </div>
                      </div>
                      <hr className='divisao' />
                      <div className='extra'>
                        <div>
                          <span>Curso: {dados?.estudante?.curso?.curso}</span>
                          <span>Ano Lectivo: {dados?.anoLectivo?.ano}</span>
                        </div>
                        <br />
                        <span className='tipo'>Tipo de Serviço: {tipo} </span>
                      </div>
                      <table>
                        {propinasAnual.length >= 1 && (
                          <thead>
                            <tr>
                              <th>Contribuinte</th>
                              <th>Nº RUPE</th>
                              <th>Mês</th>
                              <th>Valor</th>
                              <th>Solicitado</th>
                              <th>Operador</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {propinasAnual.map((prop) => (
                            <tr key={prop.id}>
                              <td>{prop?.estudante?.nome}</td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>
                              <td>{formatDate(prop?.createdAt)}</td>
                              <td>{prop?.usuario?.nome}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className='dividas'>
                        <strong>Nº B.I:</strong>
                        <span>{bi}</span>
                      </div>
                      <div className='dividas'>
                        <strong>Dívidas:</strong>
                        {dividas?.length > 0 ? (
                          dividas?.map((d, index) => (
                            <span key={index}>{d},</span>
                          ))
                        ) : (
                          <span>Sem Dívidas!</span>
                        )}
                      </div>
                      <div className='assinar'>
                        <div>
                          <span className='operador'>{"O Operador"}</span>
                          <hr />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {mensal && (
              <>
                <h3>Propina Mensal</h3>
                <form className='formBi'>
                  <Space wrap style={{ width: "100%" }}>
                    <label htmlFor='mes'>
                      Mês:
                      <select onChange={(e) => setMes(e.target.value)}>
                        {meses.map((m) => (
                          <option value={m.mes} key={m.id}>
                            {m.mes}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor='anoLetivo'>
                      Ano Lectivo
                      <select onChange={(e) => setAno(e.target.value)}>
                        {anos.map((ano) => (
                          <option value={ano.ano} key={ano.id}>
                            {ano.ano}
                          </option>
                        ))}
                      </select>
                    </label>
                  </Space>
                  <div className='input'>
                    <Input.Search
                      placeholder='Número de BI do Estudante'
                      value={bi}
                      onChange={(e) => setBi(e.target.value)}
                      className='search'
                      maxLength={14}
                      onSearch={() => buscaPropinaMensal()}
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </form>
                <div className='tabelaPropina' id='tabela'>
                  {propinasMensal.length >= 1 && (
                    <>
                      <img src='./Logo.png' alt='ISPM' />
                      <div className='extra'>
                        <div>
                          <span>Curso: {dados?.estudante?.curso?.curso}</span>
                          <span>Ano Lectivo: {dados?.anoLectivo?.ano}</span>
                        </div>
                        <br />
                        <span className='tipo'>Tipo de Serviço: Propina </span>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Contribuinte</th>
                            <th>Nº RUPE</th>
                            <th>Mês Pago</th>
                            <th>Valor</th>
                            <th>Solicitado</th>
                            <th>OPerador</th>

                            <th className='opc'>Opções</th>
                          </tr>
                        </thead>

                        <tbody>
                          {propinasMensal.map((prop, index) => (
                            <tr key={index}>
                              <td>{prop?.estudante?.nome}</td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>
                              <td>{formatDate(prop?.createdAt)}</td>
                              <td>{prop?.usuario?.nome}</td>

                              <td className='opc'>
                                <BiX
                                  size={20}
                                  color='red'
                                  cursor={"pointer"}
                                  onClick={(e) => hendleRemove(e, prop.id)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className='assinar'>
                        <div>
                          <span className='operador'>{"O Operador"}</span>
                          <hr />
                        </div>
                      </div>
                      <hr className='divisao' />
                      <div className='extra'>
                        <div>
                          <span>Curso: {dados?.estudante?.curso?.curso}</span>
                          <span>Ano Lectivo: {dados?.anoLectivo?.ano}</span>
                        </div>
                        <br />
                        <span className='tipo'>Tipo de Serviço: Propina </span>
                      </div>
                      <table>
                        {propinasMensal.length >= 1 && (
                          <thead>
                            <tr>
                              <th>Contribuinte</th>
                              <th>Nº RUPE</th>
                              <th>Mês Pago</th>
                              <th>Valor</th>
                              <th>Solicitado</th>
                              <th>Operador</th>
                              <th className='opc'>Opções</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {propinasMensal.map((prop, index) => (
                            <tr key={index}>
                              <td>{prop?.estudante?.nome}</td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>
                              <td>{formatDate(prop?.createdAt)}</td>
                              <td>{prop?.usuario?.nome}</td>

                              <td className='opc'>
                                <BiX
                                  size={20}
                                  color='red'
                                  cursor={"pointer"}
                                  onClick={(e) => hendleRemove(e, prop.id)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className='dividas'>
                        <strong>Nº B.I:</strong>

                        <span>{bi}</span>
                      </div>
                      <div className='dividas'>
                        <strong>Dívidas:</strong>
                        {dividas?.length > 0 ? (
                          dividas?.map((d, index) => (
                            <span key={index}>{d},</span>
                          ))
                        ) : (
                          <span>Sem Dívidas!</span>
                        )}
                      </div>
                      <div className='assinar'>
                        <div>
                          <span className='operador'>{"O Operador"}</span>
                          <hr />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </Modal>
        </>
      )}
    </>
  );
}

export default RelatorioPropina;
