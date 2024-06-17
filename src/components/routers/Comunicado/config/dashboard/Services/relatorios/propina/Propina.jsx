import "./propina.scss";
import { BiPrinter, BiSearch, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../../../hook/timeout";
import { api } from "../../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import { Input, Modal, Space, Alert, Button, Form } from "antd";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PrinterOutlined } from "@ant-design/icons";

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
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getAnoLetivo();
    getMes();
  }, []);

  const imprimir = async () => {
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo += ".tabelaPropina {display:flex;gap: 20px;width:100%;}";
    estilo +=
      "table { border-collapse: collapse; width: 100%; margin-bottom: 10px;}";
    estilo +=
      ".extra div{display: flex; flex-direction: column; align-items: center; margin: auto; width:100%;}";
    estilo +=
      ".extra {display: flex; flex-direction: column; align-items: center; margin: auto; margin-bottom: 20px;}";
    estilo +=
      "table th,td { padding: 8px;text-align: center; padding-right: 20px; border-bottom: 1px solid #ddd;border-right: none;border-left: none;border-top: none;}";
    estilo +=
      "table th,td { padding: 8px;font-size:8pt;text-align: center; border: 1px solid #000;}";
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
    estilo += " img{width: 50px;height: 50px; right: 0;}";
    estilo += " .divRecibo {display: flex; flex-direction: column;}";
    estilo +=
      " .recibo {border: 1px solid #000; padding: 4px;border-radius: 4px;margin-top:7px;}";
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
        setTotal(propinasMensal.length * data.data.valor);
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
      <>
        <div className='relatorioPropina'>
          <div className='opcoes'>
            <h2>Recibo</h2>
            <span
              onClick={(e) => toggleMensal(e)}
              className={mensal ? "clicBn" : "link"}
              style={{
                fontSize: "14pt",
              }}>
              Mensal
            </span>
            <span
              onClick={(e) => toggleAnual(e)}
              className={anual ? "clicBn" : "link"}
              style={{
                fontSize: "14pt",
              }}>
              Anual
            </span>
          </div>
          {anual && (
            <>
              <Form
                className='formBiPropina'
                onSubmitCapture={(e) => setBi(e.target.value)}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='demo-simple-select-label'>
                    Ano Lectivo
                  </InputLabel>
                  <Select
                    style={{
                      width: "200px",
                    }}
                    labelId='demo-simple-select-label'
                    onChange={(e) => setAno(e.target.value)}
                    label='Ano Lectivo'
                    id='demo-simple-select'>
                    {anos.map((s) => (
                      <MenuItem value={s.ano} key={s.id}>
                        {s.ano}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
              </Form>

              <div className='tabelaPropina' id='tabela'>
                {propinasAnual.length >= 1 && (
                  <div className='tabelaPropina'>
                    <div
                      style={{
                        width: "50%",
                      }}>
                      <div
                        className='extra'
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0px 10px",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "70px",
                            alignItems: "start",
                            justifyContent: "start",
                          }}>
                          <span>
                            <strong>Nome: </strong>{" "}
                            {propinasAnual[0]?.estudante?.nome}
                          </span>
                          <span>
                            <strong>NIF: </strong>{" "}
                            {propinasAnual[0]?.estudante?.bi}
                          </span>
                          <span>
                            <strong>Curso: </strong>{" "}
                            {propinasAnual[0]?.estudante?.curso?.curso}/
                            {propinasAnual[0]?.estudante?.regime}
                          </span>
                        </div>

                        <div className='divRecibo'>
                          <img src='./Logo.png' alt='ISPM' />
                          <span className='recibo'>
                            <strong>Recibo Nº.</strong> FR ISPM20
                          </span>
                          <span>{formatDate(propinasAnual[0]?.createdAt)}</span>
                        </div>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Descrição</th>
                            <th>Nº RUPE</th>
                            <th>Mês Pago</th>
                            <th>Sob-total</th>
                          </tr>
                        </thead>

                        <tbody>
                          {propinasAnual.map((prop, index) => (
                            <tr key={index}>
                              <td>
                                Propina-{prop?.estudante?.regime}/
                                {dados?.anoLectivo?.ano}
                              </td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <table>
                        <thead>
                          <tr>
                            <th>FORMA DE PAGAMENTO RUPE</th>
                            <th colSpan={2}>RESUMO DE PAGAMENTO</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td rowSpan={4}>
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                RUPE Nº{" "}
                                <strong>{propinasAnual[0]?.rupe}</strong>
                              </span>{" "}
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                Valor{" "}
                                <strong>{propinasAnual[0]?.valor} Akz</strong>
                              </span>
                            </td>
                            <td>Quantia Entregue</td>
                            <td>
                              {propinasAnual.length * propinasAnual[0].valor}.00
                            </td>
                          </tr>
                          <tr>
                            <td>Crédito</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Desconto</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Multa</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}>TOTAL A PAGAR</td>
                            <td>
                              {propinasAnual.length * propinasAnual[0].valor}.00
                            </td>
                          </tr>
                          <td colSpan={3} style={{ fontStyle: "italic" }}>
                            <strong>Responsável:</strong>{" "}
                            {propinasAnual[0]?.usuario?.nome}
                          </td>
                          <tr></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* <hr className='divisao' /> */}
                    <div
                      style={{
                        width: "50%",
                      }}>
                      <div
                        className='extra'
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0px 10px",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "70px",
                            alignItems: "start",
                            justifyContent: "start",
                          }}>
                          <span>
                            <strong>Nome: </strong>{" "}
                            {propinasAnual[0]?.estudante?.nome}
                          </span>
                          <span>
                            <strong>NIF: </strong>{" "}
                            {propinasAnual[0]?.estudante?.bi}
                          </span>
                          <span>
                            <strong>Curso: </strong>{" "}
                            {propinasAnual[0]?.estudante?.curso?.curso}/
                            {propinasAnual[0]?.estudante?.regime}
                          </span>
                        </div>

                        <div className='divRecibo'>
                          <img src='./Logo.png' alt='ISPM' />
                          <span className='recibo'>
                            <strong>Recibo Nº.</strong> FR ISPM20
                          </span>
                          <span>{formatDate(propinasAnual[0]?.createdAt)}</span>
                        </div>
                      </div>
                      <table>
                        {propinasAnual.length >= 1 && (
                          <thead>
                            <tr>
                              <th>Descrição</th>
                              <th>Nº RUPE</th>
                              <th>Mês Pago</th>
                              <th>Sob-total</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {propinasAnual.map((prop, index) => (
                            <tr key={index}>
                              <td>
                                Propina-{prop?.estudante?.regime}/
                                {dados?.anoLectivo?.ano}
                              </td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <table>
                        <thead>
                          <tr>
                            <th>FORMA DE PAGAMENTO RUPE</th>
                            <th colSpan={2}>RESUMO DE PAGAMENTO</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td rowSpan={4}>
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                RUPE Nº{" "}
                                <strong>{propinasAnual[0]?.rupe}</strong>
                              </span>{" "}
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                Valor{" "}
                                <strong>{propinasAnual[0]?.valor} Akz</strong>
                              </span>
                            </td>
                            <td>Quantia Entregue</td>
                            <td>
                              {propinasAnual.length * propinasAnual[0].valor}
                              .00
                            </td>
                          </tr>
                          <tr>
                            <td>Crédito</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Desconto</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Multa</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}>TOTAL A PAGAR</td>
                            <td>
                              {propinasAnual.length * propinasAnual[0].valor}
                              .00
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} style={{ fontStyle: "italic" }}>
                              <strong>Responsável:</strong>{" "}
                              {propinasAnual[0]?.usuario?.nome}
                            </td>
                          </tr>
                          <tr></tr>
                        </tbody>
                      </table>

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
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {mensal && (
            <>
              <form className='formBiPropinaMensal'>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='demo-simple-select-label'>
                      Mês
                    </InputLabel>
                    <Select
                      style={{
                        width: "200px",
                      }}
                      labelId='demo-simple-select-label'
                      onChange={(e) => setMes(e.target.value)}
                      label='Frequência'
                      id='demo-simple-select'>
                      {meses.map((s) => (
                        <MenuItem value={s.mes} key={s.id}>
                          {s.mes}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='demo-simple-select-label'>
                      Ano Lectivo
                    </InputLabel>
                    <Select
                      style={{
                        width: "200px",
                      }}
                      labelId='demo-simple-select-label'
                      label='Ano Lectivo'
                      id='demo-simple-select'
                      onChange={(e) => setAno(e.target.value)}>
                      {anos.map((s) => (
                        <MenuItem value={s.ano} key={s.id}>
                          {s.ano}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
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
                  <div className='tabelaPropina'>
                    <div
                      style={{
                        width: "50%",
                      }}>
                      <div
                        className='extra'
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0px 10px",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "70px",
                            alignItems: "start",
                            justifyContent: "start",
                          }}>
                          <span>
                            <strong>Nome: </strong> {dados?.estudante?.nome}
                          </span>
                          <span>
                            <strong>NIF: </strong> {dados?.estudante?.bi}
                          </span>
                          <span>
                            <strong>Curso: </strong>{" "}
                            {dados?.estudante?.curso?.curso}/
                            {dados?.estudante?.regime}
                          </span>
                        </div>

                        <div className='divRecibo'>
                          <img src='./Logo.png' alt='ISPM' />
                          <span className='recibo'>
                            <strong>Recibo Nº.</strong> FR ISPM20
                          </span>
                          <span>{formatDate(dados?.createdAt)}</span>
                        </div>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Descrição</th>
                            <th>Nº RUPE</th>
                            <th>Mês Pago</th>
                            <th>Sob-total</th>
                            <th className='opc'>Opções</th>
                          </tr>
                        </thead>

                        <tbody>
                          {propinasMensal.map((prop, index) => (
                            <tr key={index}>
                              <td>
                                Propina-{prop?.estudante?.regime}/
                                {dados?.anoLectivo?.ano}
                              </td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>

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
                      <table>
                        <thead>
                          <tr>
                            <th>FORMA DE PAGAMENTO RUPE</th>
                            <th colSpan={2}>RESUMO DE PAGAMENTO</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td rowSpan={4}>
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                RUPE Nº <strong>{dados?.rupe}</strong>
                              </span>{" "}
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                Valor <strong>{dados?.valor} Akz</strong>
                              </span>
                            </td>
                            <td>Quantia Entregue</td>
                            <td>{propinasMensal.length * dados.valor}.00</td>
                          </tr>
                          <tr>
                            <td>Crédito</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Desconto</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Multa</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}>TOTAL A PAGAR</td>
                            <td>{propinasMensal.length * dados.valor}.00</td>
                          </tr>
                          <td colSpan={3} style={{ fontStyle: "italic" }}>
                            <strong>Responsável:</strong> {dados?.usuario?.nome}
                          </td>
                          <tr></tr>
                        </tbody>
                      </table>
                    </div>

                    {/* <hr className='divisao' /> */}
                    <div
                      style={{
                        width: "50%",
                      }}>
                      <div
                        className='extra'
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0px 10px",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "70px",
                            alignItems: "start",
                            justifyContent: "start",
                          }}>
                          <span>
                            <strong>Nome: </strong> {dados?.estudante?.nome}
                          </span>
                          <span>
                            <strong>NIF: </strong> {dados?.estudante?.bi}
                          </span>
                          <span>
                            <strong>Curso: </strong>{" "}
                            {dados?.estudante?.curso?.curso}/
                            {dados?.estudante?.regime}
                          </span>
                        </div>

                        <div className='divRecibo'>
                          <img src='./Logo.png' alt='ISPM' />
                          <span className='recibo'>
                            <strong>Recibo Nº.</strong> FR ISPM20
                          </span>
                          <span>{formatDate(dados?.createdAt)}</span>
                        </div>
                      </div>
                      <table>
                        {propinasMensal.length >= 1 && (
                          <thead>
                            <tr>
                              <th>Descrição</th>
                              <th>Nº RUPE</th>
                              <th>Mês Pago</th>
                              <th>Sob-total</th>
                              <th className='opc'>Opções</th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {propinasMensal.map((prop, index) => (
                            <tr key={index}>
                              <td>
                                Propina-{prop?.estudante?.regime}/
                                {dados?.anoLectivo?.ano}
                              </td>
                              <td>{prop?.rupe}</td>
                              <td>{prop?.mes?.mes}</td>
                              <td>{prop?.valor} Kz</td>

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
                      <table>
                        <thead>
                          <tr>
                            <th>FORMA DE PAGAMENTO RUPE</th>
                            <th colSpan={2}>RESUMO DE PAGAMENTO</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td rowSpan={4}>
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                RUPE Nº <strong>{dados?.rupe}</strong>
                              </span>{" "}
                              <span
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                Valor <strong>{dados?.valor} Akz</strong>
                              </span>
                            </td>
                            <td>Quantia Entregue</td>
                            <td>{propinasMensal.length * dados.valor}.00</td>
                          </tr>
                          <tr>
                            <td>Crédito</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Desconto</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td>Total/Multa</td>
                            <td>0.00</td>
                          </tr>
                          <tr>
                            <td colSpan={2}>TOTAL A PAGAR</td>
                            <td>{propinasMensal.length * dados.valor}.00</td>
                          </tr>
                          <tr>
                            <td colSpan={3} style={{ fontStyle: "italic" }}>
                              <strong>Responsável:</strong>{" "}
                              {dados?.usuario?.nome}
                            </td>
                          </tr>
                          <tr></tr>
                        </tbody>
                      </table>

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
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <div
            style={{
              display: "flex",
              margin: "auto",
              marginTop: "30px",
              gap: "30px",
            }}>
            {/* <Button
              onClick={() => {}}
              style={{
                background: "red",
                color: "#fff",
              }}>
              Voltar
            </Button> */}
            <Button
              onClick={() => {
                if (propinasAnual.length > 0 || propinasMensal.length > 0)
                  imprimir();
              }}
              type='primary'>
              <PrinterOutlined /> Imprimir
            </Button>
          </div>
        </div>
      </>
    </>
  );
}

export default RelatorioPropina;
