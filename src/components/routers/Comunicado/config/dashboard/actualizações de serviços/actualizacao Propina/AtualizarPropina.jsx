import { useEffect, useState } from "react";
import "./atualizarPropina.scss";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";
import EditarPropina from "./editar/Editar";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../../../../../../auth/auth";
import PegarPermissoes from "../../../../../../../configs/permissoes/PegarPermissoes";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
  const buscaPropina = async () => {
    if (!mes || !ano || !bi) {
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
        console.log(data.data);
        if (data.data) {
          setPropinas(data.data);
          setId(data.data.id);
          return;
        }
        if (!data.data) {
          alert(`O Mês de ${mes} do Ano Lectivo ${ano} Ainda Não Foi Pago!`);
          setPropinas({});
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
      <div className='atualizarPropina'>
        <div className='opcoes'>
          <Form className='formBi' onSubmitCapture={() => buscaPropina()}>
            <Input.Search
              placeholder='Número de BI do Estudante'
              onChange={(e) => setBi(e.target.value)}
              value={bi}
              autoFocus
              maxLength={14}
              onSearch={() => buscaPropina()}
              style={{
                width: "90%",
              }}
            />
            <BiSearch size={30} color='a31543' cursor={"pointer"} />
          </Form>
          <form className='form' onSubmit={(e) => buscaPropina(e)}>
            <div className='cc'>
              <label htmlFor='mes'>
                Mês{" "}
                <select onChange={(e) => setMes(e.target.value)}>
                  {/* <option defaultValue={"Escolha"}>Escolha o Mês...</option> */}
                  {meses.map((m) => (
                    <option value={m.mes} key={m.id}>
                      {m.mes}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor='ano'>
                Ano{" "}
                <select onChange={(e) => setAno(e.target.value)}>
                  {/* <option defaultValue={"Escolha"}>Escolha o Ano...</option> */}
                  {anos.map((ano) => (
                    <option value={ano.ano} key={ano.id}>
                      {ano.ano}
                    </option>
                  ))}
                </select>
              </label>
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
                    <PegarPermissoes
                      permissoes={["admin", "remover", "edição"]}>
                      <th colSpan={2}>Opções</th>
                    </PegarPermissoes>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{propinas?.estudante?.nome}</td>
                    <td>{propinas?.estudante?.bi}</td>
                    <td>{propinas?.rupe}</td>
                    <td>{propinas?.valor} Kz</td>
                    <td>{propinas?.mes?.mes}</td>
                    <td>{propinas?.anoLetivo?.ano}</td>
                    <PegarPermissoes permissoes={["admin", "edição"]}>
                      <td>
                        <BiEdit
                          title='Editar Este Mês'
                          cursor={"pointer"}
                          color='blue'
                          onClick={(e) => editarPropina(e)}
                        />
                      </td>
                    </PegarPermissoes>
                    <PegarPermissoes permissoes={["admin", "remover"]}>
                      <td>
                        <BiX
                          title='Eliminar Este Mês'
                          color='red'
                          cursor={"pointer"}
                          size={20}
                          onClick={(e) => deletePropina(e)}
                        />
                      </td>
                    </PegarPermissoes>
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
