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

const Actualizar = () => {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState("");
  const [ValidFrequencia, setValidFrequencia] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getCursos();
  }, []);
  const upDateCurso = async () => {
    if (!curso) return dispatch(toggleModalError(true));
    await api
      .put(`/curso/${id}`, {
        curso,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setIsLoading(false);
        if (data.data.message === "sucess") {
          getCursos();
          dispatch(toggleModalConfirmar(true));

          return;
        }

        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((err) => console.log(err));
  };
  const getCursos = async () => {
    await api
      .get("/curso")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setCursos(data.data);
      })
      .catch((err) => console.log(err));
  };
  const removeCurso = async (e, id) => {
    e.preventDefault();
    await api
      .delete(`/curso/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setCursos(cursos.filter((c) => c.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const toggleVisible = async (e, id) => {
    e.preventDefault();
    await api.get(`/curso/${id}`).then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setCurso(data.data?.curso);
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
                flexDirection: "column",
              }}>
              Nome do Curso
              <Input
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                style={{
                  width: "300px",
                  height: "60px",
                }}
              />
            </label>
          </div>
          <Button
            type='primary'
            loading={isLoading}
            disabled={!curso}
            onClick={() => upDateCurso()}>
            <BiSave />
            Actualizar
          </Button>
        </form>
        {cursos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Frequência</th>

                <th colSpan={2}>Opçõs</th>
              </tr>
            </thead>
            <tbody>
              {cursos?.map((d) => (
                <tr key={d.id}>
                  <td>{d?.curso}</td>

                  <td>
                    <BiX
                      color='red'
                      cursor={"pointer"}
                      onClick={(e) => removeCurso(e, d.id)}
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
