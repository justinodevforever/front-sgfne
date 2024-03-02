import { BiEdit, BiX } from "react-icons/bi";
import "./editar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalEdit,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";
import { api } from "../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";

const EditarPropina = ({ propinas }) => {
  const [meses, setMeses] = useState([]);
  const [anos, setAnos] = useState([]);
  const [mes, setMes] = useState("");

  const [fk_mes, setFk_mes] = useState("");
  const [fk_ano, setFk_ano] = useState("");
  const [ano, setAno] = useState("");
  const [rupe, setRupe] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);
  const { isVisibleConfirmar } = useSelector(
    (state) => state.ui.ModalConfirmar
  );
  const { isVisibleError } = useSelector((state) => state.ui.ModalError);
  const { isVisibleWarning } = useSelector((state) => state.ui.ModalWarning);
  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    getMes();
    getAnoLetivo();
  }, []);
  useEffect(() => {
    setMes(propinas?.Me?.mes + " " + propinas?.fk_mes);
    setAno(propinas?.AnoLetivo?.ano + " " + propinas?.fk_ano);
    setRupe(propinas?.rupe);
  }, [propinas]);

  function close(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  function confirmar(e) {
    e.preventDefault();
    // dispatchConfirmar(toggleModalConfirmar(!isVisibleConfirmar));
    dispatchError(toggleModalError(!isVisibleError));
  }

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
  const atualizarPropina = async (e) => {
    e.preventDefault();
    const [a, newAno] = ano.split(" ");
    const [b, newMes] = mes.split(" ");

    if (!newAno || !newMes || !rupe) {
      setMessage("Existe Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .put(`/propina/${propinas.id}`, { rupe, fk_mes: newMes, fk_ano: newAno })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data.message === "Error") {
          dispatchError(toggleModalError(true));
          return;
        }
        if (data.data.message === "Sucess") {
          dispatchConfirmar(toggleModalConfirmar(true));
        }
      })

      .catch((err) => console.log(err));
  };
  return (
    <>
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />
      {isVisible && (
        <>
          <div className="editarPropina">
            <div className="opcoesEditar">
              <div>
                <h2>Editar Propina</h2>
              </div>

              <BiX
                color="red"
                size={20}
                onClick={(e) => close(e)}
                className="closed"
              />
            </div>
            <form className="formBi">
              <div className="cc">
                <div>
                  Mês{" "}
                  <select onChange={(e) => setMes(e.target.value)}>
                    <option value={propinas.Me.mes + " " + propinas.fk_mes}>
                      {propinas.Me.mes}
                    </option>
                    {meses.map((m) => (
                      <>
                        <option value={m.mes + " " + m.id} key={m.id}>
                          {m.mes}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div>
                  Ano{" "}
                  <select onChange={(e) => setAno(e.target.value)}>
                    <option
                      value={propinas.AnoLetivo.ano + " " + propinas.fk_ano}>
                      {propinas.AnoLetivo.ano}
                    </option>
                    {anos.map((ano) => (
                      <option value={ano.ano + " " + ano.id} key={ano.id}>
                        {ano.ano}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  RUPE: {""}
                  <input
                    type="number"
                    placeholder="Digite o Nº de RUPE"
                    value={rupe}
                    onChange={(e) => setRupe(e.target.value)}
                  />
                </div>
              </div>
            </form>
            {propinas?.Estudante?.nome && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>B.I</th>
                      <th>RUPE</th>
                      <th>Valor</th>
                      <th>Mês</th>
                      <th>Ano Letivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{propinas?.Estudante?.nome}</td>
                      <td>{propinas?.Estudante?.bi}</td>
                      <td>{propinas?.rupe}</td>
                      <td>{propinas?.valor} Kz</td>
                      <td>{propinas?.Me?.mes}</td>
                      <td>{propinas?.AnoLetivo?.ano}</td>
                    </tr>
                  </tbody>
                </table>

                <button onClick={(e) => atualizarPropina(e)}>
                  <FaSave size={20} color="fff" /> Salvar
                </button>
              </>
            )}
          </div>

          <div className="ovefloy"></div>
        </>
      )}
    </>
  );
};

export default EditarPropina;
