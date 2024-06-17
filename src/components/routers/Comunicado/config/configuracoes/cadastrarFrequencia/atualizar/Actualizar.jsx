import { useEffect, useState } from "react";
import "./actualizar.scss";
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
import { TextField } from "@mui/material";

const FREQUENCIA = /^([0-9])+º/;

const ActualizarFrequencia = () => {
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState("");
  const [ValidFrequencia, setValidFrequencia] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (frequencia) {
      setValidFrequencia(FREQUENCIA.test(frequencia));
    }
  }, [frequencia]);

  useEffect(() => {
    getFrequencia();
  }, []);

  const upDateFrequencia = async () => {
    await api
      .put(`/ano/${id}`, {
        ano: frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        if (data.data.message === "sucess") {
          getFrequencia();
          dispatch(toggleModalConfirmar(true));

          return;
        }

        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((err) => console.log(err));
  };
  const getFrequencia = async () => {
    await api
      .get("/ano")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFrequencias(data.data);
      })
      .catch((err) => console.log(err));
  };
  const removeFrequencia = async (e, id) => {
    e.preventDefault();
    await api
      .delete(`/ano/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setFrequencias(frequencias.filter((f) => f.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const toggleVisible = async (e, id) => {
    e.preventDefault();
    await api.get(`/ano/${id}`).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setFrequencia(data.data.ano);
      setId(data.data.id);
      setDisabled(true);
    });
  };
  return (
    <>
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />
      <div className='atualizarFrequencia'>
        <form>
          <div>
            <label
              htmlFor='curso'
              style={{
                flexDirection: "column",
              }}>
              <TextField
                label='Frequência'
                required
                value={frequencia}
                disabled={disabled ? false : true}
                onChange={(e) => setFrequencia(e.target.value)}
              />
              {!ValidFrequencia && !frequencia && (
                <span
                  style={{
                    color: "red",
                    position: "absolute",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    marginTop: "120px",
                    marginBottom: "20px",
                  }}>
                  é aceite número seguido <br /> de Símbolo " º "
                </span>
              )}
            </label>
          </div>

          <Button
            type='primary'
            loading={isLoading}
            disabled={!ValidFrequencia}
            onClick={() => upDateFrequencia()}>
            <BiSave />
            Actualizar
          </Button>
        </form>
        {frequencias.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Frequência</th>

                <th colSpan={2}>Opçõs</th>
              </tr>
            </thead>
            <tbody>
              {frequencias?.map((d) => (
                <tr key={d.id}>
                  <td>{d?.ano} Ano</td>

                  <td>
                    <BiX
                      color='red'
                      cursor={"pointer"}
                      onClick={(e) => removeFrequencia(e, d.id)}
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
export default ActualizarFrequencia;
