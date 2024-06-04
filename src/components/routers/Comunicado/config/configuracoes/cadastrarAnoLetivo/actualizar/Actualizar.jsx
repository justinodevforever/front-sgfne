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

const ANO = /^([0-9]{4,4})(\/)([0-9]{4}$)/;

const Actualizar = () => {
  const [anos, setAnos] = useState([]);
  const [ano, setAno] = useState("");
  const [ValidAno, setValidAno] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (ano) {
      setValidAno(ANO.test(ano));
    }
  }, [ano]);
  useEffect(() => {
    getAno();
  }, []);
  const upDateAno = async () => {
    await api
      .put(`/letivo/${id}`, {
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        if (data.data.message === "sucess") {
          getAno();
          dispatch(toggleModalConfirmar(true));

          return;
        }

        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((err) => console.log(err));
  };
  const getAno = async () => {
    await api
      .get("/letivo")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAnos(data.data);
      })
      .catch((err) => console.log(err));
  };
  const removeAno = async (e, id) => {
    e.preventDefault();
    await api
      .delete(`/letivo/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAnos(anos.filter((f) => f.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const toggleVisible = async (e, id) => {
    e.preventDefault();
    await api.get(`/letivo/${id}`).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setAno(data.data.ano);
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
                position: "relative",
                flexDirection: "column",
              }}>
              Ano Lectivo
              <Input
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                style={
                  !ano || (ano && !ValidAno)
                    ? { border: "1px solid red", height: "60px" }
                    : { border: "1px solid green", height: "60px" }
                }
              />
              {!ValidAno && (
                <span
                  style={{
                    color: "red",
                    position: "absolute",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    top: "85px",
                  }}>
                  Exemplo: 2023/2024
                </span>
              )}
            </label>
          </div>
          <Button
            type='primary'
            loading={isLoading}
            disabled={!ValidAno}
            onClick={() => upDateAno()}
            style={{
              marginTop: "60px",
            }}>
            <BiSave />
            Actualizar
          </Button>
        </form>
        {anos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Ano Lectivo</th>

                <th colSpan={2}>Opçõs</th>
              </tr>
            </thead>
            <tbody>
              {anos?.map((d) => (
                <tr key={d.id}>
                  <td>{d?.ano}</td>

                  <td>
                    <BiX
                      color='red'
                      cursor={"pointer"}
                      onClick={(e) => removeAno(e, d.id)}
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
