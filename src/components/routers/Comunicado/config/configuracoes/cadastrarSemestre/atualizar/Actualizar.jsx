import { useEffect, useState } from "react";
import "./actualizar.scss";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiSave, BiSearch, BiSolidSearch, BiX } from "react-icons/bi";
import { Button, Input } from "antd";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";
import { useDispatch } from "react-redux";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";

const SEMESTRE = /^([0-9])+º/;

const Actualizar = () => {
  const [semestres, setSemestres] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ValidSemestre, setValidSemestre] = useState(false);
  const navigate = useNavigate();
  const [numero, setNumero] = useState(0);
  const [nome, setNome] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (nome) {
      setValidSemestre(SEMESTRE.test(nome));
    }
  }, [nome]);
  useEffect(() => {
    getSemestre();
  }, []);

  const upDateSemestre = async () => {
    setIsLoading(true);

    await api
      .put(`/semestre/${id}`, {
        nome,
        numero,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        if (data.data.message === "sucess") {
          getSemestre();
          dispatch(toggleModalConfirmar(true));

          return;
        }

        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((err) => console.log(err));
  };
  const removeSemestre = async (e, id) => {
    e.preventDefault();
    await api
      .delete(`/semestre/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setSemestres(semestres.filter((s) => s.id !== id));
      })
      .catch((err) => console.log(err));
  };
  const getSemestre = async () => {
    await api
      .get("/semestre")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setSemestres(data.data);
      })
      .catch((err) => console.log(err));
  };

  const toggleVisible = async (e, id) => {
    e.preventDefault();
    await api.get(`/semestre/${id}`).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setNome(data.data.nome);
      setNumero(data.data.numero);
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
              Nome
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={
                  !nome || (nome && !ValidSemestre)
                    ? { border: "1px solid red", height: "60px" }
                    : { border: "1px solid green", height: "60px" }
                }
              />
              {!ValidSemestre && nome && (
                <span
                  style={{
                    color: "red",
                    position: "absolute",
                    fontSize: "11pt",
                    fontStyle: "italic",
                    top: "86px",
                  }}>
                  é aceite número seguido <br /> de Símbolo " º "
                </span>
              )}
            </label>
            <label
              htmlFor='fre'
              style={{
                flexDirection: "column",
              }}>
              Número
              <Input
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                style={{
                  height: "60px",
                }}
              />
            </label>
          </div>
          <Button
            type='primary'
            loading={isLoading}
            disabled={!ValidSemestre || !numero}
            onClick={() => upDateSemestre()}
            style={{
              marginTop: "70px",
              marginBottom: "30px",
            }}>
            <BiSave />
            Actualizar
          </Button>
        </form>
        {semestres.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>nome</th>
                <th>número</th>

                <th colSpan={2}>Opçõs</th>
              </tr>
            </thead>
            <tbody>
              {semestres?.map((d) => (
                <tr key={d.id}>
                  <td>{d?.nome}</td>
                  <td>{d?.numero}</td>

                  <td>
                    <BiX
                      color='red'
                      cursor={"pointer"}
                      onClick={(e) => removeSemestre(e, d.id)}
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
