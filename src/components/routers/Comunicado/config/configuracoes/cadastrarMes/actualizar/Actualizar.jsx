import { useEffect, useState } from "react";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiSave, BiSearch, BiSolidSearch, BiX } from "react-icons/bi";
import { Button, Input } from "antd";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";
import {
  toggleModalConfirmar,
  toggleModalError,
} from "../../../../../../../store/ui-slice";
import { useDispatch } from "react-redux";

const MES =
  /^(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Augosto|Setembro|Outubro|Novembro|Dezembro)/;
const ALGARISMO = /^(1|2|3|4|5|6|7|8|9|10|11|12){1,1}$/;

const Actualizar = () => {
  const [meses, setMeses] = useState([]);
  const [mes, setMes] = useState("");
  const [validMes, setValidMes] = useState(false);
  const [message, setMessage] = useState("");
  const [algarismo, setAlgarismo] = useState("");
  const [validAlgarismo, setValidAlgarismo] = useState(false);
  const [id, setId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (algarismo) {
      setValidAlgarismo(ALGARISMO.test(algarismo));
    }
  }, [algarismo]);

  useEffect(() => {
    if (mes) {
      setValidMes(MES.test(mes));
    }
  }, [mes]);
  useEffect(() => {
    getMes();
  }, []);
  const upDateMes = async () => {
    await api
      .put(`/mes/${id}`, {
        mes,
        algarismo,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        if (data.data.message === "sucess") {
          getMes();
          dispatch(toggleModalConfirmar(true));

          return;
        }

        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((err) => console.log(err));
  };
  const getMes = async () => {
    await api
      .get("/mes")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setMeses(data.data);
      })
      .catch((err) => console.log(err));
  };
  const removeMes = async (e, id) => {
    e.preventDefault();
    await api
      .delete(`/mes/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setMeses(meses.filter((f) => f.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const toggleVisible = async (e, id) => {
    e.preventDefault();
    await api.get(`/mes/${id}`).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setMes(data.data.mes);
      setAlgarismo(data.data.algarismo);
      setId(data.data.id);
    });
  };
  return (
    <>
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />
      <div className='atualizar'>
        <form>
          <div>
            <label
              htmlFor='curso'
              style={{
                display: "fles",
                position: "relative",
                flexDirection: "column",
              }}>
              Mês
              <Input
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                style={
                  !mes || (mes && !validMes)
                    ? { border: "1px solid red", height: "60px" }
                    : { border: "1px solid green", height: "60px" }
                }
              />
              {!validMes && mes && (
                <span
                  style={{
                    color: "red",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    marginTop: "10px",
                    position: "absolute",
                    top: "50px",
                    textAlign: "justify",
                    border: "1px solid red",
                    padding: "2px",
                  }}>
                  Primeira letra Maiúscula <br />
                  Exemplo: Janeiro, <br />
                  Fevereiro ... Dezembro
                </span>
              )}
            </label>
            <label
              htmlFor='semestre'
              style={{ position: "relative", flexDirection: "column" }}>
              Nº Correspondente
              <Input
                type='number'
                placeholder='Designação do semestre Ex. 1º ou 2º'
                value={algarismo}
                onChange={(e) => setAlgarismo(e.target.value)}
                name='semestre'
                style={
                  algarismo && validAlgarismo
                    ? {
                        border: "1px solid green",
                        height: "60px",
                      }
                    : {
                        border: "1px solid red",
                        height: "60px",
                      }
                }
              />
              {algarismo && !validAlgarismo && (
                <span
                  style={{
                    color: "red",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    marginTop: "10px",
                    position: "absolute",
                    top: "50px",
                    textAlign: "justify",
                    marginLeft: "20px",
                    border: "1px solid red",
                    padding: "2px",
                  }}>
                  Número que Corresponde o Mês Exemplo: 1, 2...12
                </span>
              )}
            </label>
          </div>
          <Button
            type='primary'
            loading={isLoading}
            disabled={!validMes || !validAlgarismo}
            onClick={() => upDateMes()}
            style={
              (algarismo || mes) && (!validAlgarismo || !validMes)
                ? { marginTop: "80px", marginBottom: "30px" }
                : { marginTop: "80px", marginBottom: "30px" }
            }>
            <BiSave />
            Actualizar
          </Button>
        </form>
        {meses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Número Correspondente</th>

                <th colSpan={2}>Opçõs</th>
              </tr>
            </thead>
            <tbody>
              {meses?.map((d) => (
                <tr key={d.id}>
                  <td>{d?.mes}</td>
                  <td>{d?.algarismo}</td>

                  <td>
                    <BiX
                      color='red'
                      cursor={"pointer"}
                      onClick={(e) => removeMes(e, d.id)}
                    />
                  </td>
                  <td>
                    <BiEdit
                      color='blue'
                      cursor={"pointer"}
                      onClick={(e) => toggleVisible(e, d.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Actualizar;
