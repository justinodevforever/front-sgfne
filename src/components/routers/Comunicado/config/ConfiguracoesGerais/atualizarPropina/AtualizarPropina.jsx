import { useEffect, useState } from "react";
import "./atualizarPropina.scss";
import { api } from "../../../../../../../auth/auth";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";
import EditarPropina from "./editar/Editar";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from "../../../../../../store/ui-slice";

const AtualizarPropina = () => {
  const [isClick, setIsClick] = useState(false);
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [meses, setMeses] = useState([]);
  const [anos, setAnos] = useState([]);
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [id, setId] = useState("");
  const [bi, setBi] = useState("");
  const [sms, setSms] = useState("");
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);
  const dispatch = useDispatch();
  const [propinas, setPropinas] = useState({});

  useEffect(() => {
    getMes();
    getAnoLetivo();
  }, []);

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
  const buscaPropina = async (e) => {
    e.preventDefault();

    if (!mes || !ano || !bi || mes === "Escolha" || ano === "Escolha") {
      alert("Existe um Campo Vazio!");
      return;
    }
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

        if (data.data) {
          setPropinas(data.data);
          setId(data.data.id);
        }
        if (!data.data) {
          alert(`O Mês de ${mes} do Ano Lectivo ${ano} Ainda Não Foi Pago!`);
        }
      })
      .catch((err) => console.log(err));
  };

  function deletePropina(e) {
    e.preventDefault();
    setIsClick(true);
  }
  function editarPropina(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  return (
    <>
      {isClick && <UseRemoverConfirm id={id} setIsClick={setIsClick} />}
      <EditarPropina propinas={propinas} />
      <div className="atualizarPropina">
        <div className="opcoes">
          <form className="formBi">
            <div className="cc">
              Mês{" "}
              <select onChange={(e) => setMes(e.target.value)}>
                {/* <option defaultValue={"Escolha"}>Escolha o Mês...</option> */}
                {meses.map((m) => (
                  <option value={m.mes} key={m.id}>
                    {m.mes}
                  </option>
                ))}
              </select>
              Ano{" "}
              <select onChange={(e) => setAno(e.target.value)}>
                {/* <option defaultValue={"Escolha"}>Escolha o Ano...</option> */}
                {anos.map((ano) => (
                  <option value={ano.ano} key={ano.id}>
                    {ano.ano}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <form className="form" onSubmit={(e) => buscaPropina(e)}>
            <div className="pagamento-propina">
              <input
                type="search"
                placeholder="Número de BI do Estudante"
                onChange={(e) => setBi(e.target.value)}
                className="search"
                value={bi}
                autoFocus
                maxLength={14}
              />
              <BiSearch
                size={30}
                color="a31543"
                cursor={"pointer"}
                onClick={(e) => buscaPropina(e)}
              />
            </div>
            <hr />

            {propinas?.Estudante?.nome && (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>B.I</th>
                    <th>RUPE</th>
                    <th>Valor</th>
                    <th>Mês</th>
                    <th>Ano Letivo</th>
                    <th colSpan={2}>Opções</th>
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
                    <td>
                      <BiEdit
                        title="Editar Este Mês"
                        cursor={"pointer"}
                        color="blue"
                        onClick={(e) => editarPropina(e)}
                      />
                    </td>
                    <td>
                      <BiX
                        title="Eliminar Este Mês"
                        color="red"
                        cursor={"pointer"}
                        size={20}
                        onClick={(e) => deletePropina(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AtualizarPropina;
