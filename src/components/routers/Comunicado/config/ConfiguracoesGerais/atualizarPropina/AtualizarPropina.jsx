import { useEffect, useState } from "react";
import "./atualizarPropina.scss";
import { api } from "../../../../../../../auth/auth";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";
import EditarPropina from "./editar/Editar";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from "../../../../../../store/ui-slice";
import PegarPermissoes from "../../../../../../configs/permissoes/PegarPermissoes";
import { Form, Input } from "antd";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../hook/massege/Error/UseErro";

const AtualizarPropina = () => {
  const [isClick, setIsClick] = useState(false);
  const [isClickEdit, setIsClickEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const buscaPropina = async () => {
    if (!mes || !ano || !bi || mes === "Escolha" || ano === "Escolha") {
      alert("Existe um Campo Vazio!");
      return;
    }
    // setLoading(true);
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

        setLoading(false);
        if (data.data) {
          setPropinas(data.data);
          setId(data.data.id);
        }
        if (!data.data) {
          alert(`O Mês de ${mes} do Ano Lectivo ${ano} Ainda Não Foi Pago!`);
          setPropinas([]);
        }
      })
      .catch((err) => {
        console.log("err");
        setLoading(false);
      });
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
      <div className='atualizarPropinas'>
        <div className='opcoes'>
          <div className='formBiPropina'>
            <FormControl>
              <InputLabel>Mês</InputLabel>
              <Select
                label='Mês'
                onChange={(e) => setMes(e.target.value)}
                style={{
                  width: "200px",
                }}>
                {meses.map((m) => (
                  <MenuItem value={m.mes} key={m.id}>
                    {m.mes}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Ano Lectivo</InputLabel>
              <Select
                label='Ano Lectivo'
                onChange={(e) => setAno(e.target.value)}
                style={{
                  width: "200px",
                }}>
                {anos.map((ano) => (
                  <MenuItem value={ano.ano} key={ano.id}>
                    {ano.ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Form className='form' onSubmitCapture={() => buscaPropina()}>
            <div style={{ marginTop: "10px" }}>
              <Input.Search
                placeholder='Número de BI do Estudante'
                onChange={(e) => setBi(e.target.value)}
                value={bi}
                autoFocus
                maxLength={14}
                onSearch={() => buscaPropina()}
                loading={loading}
                style={{ width: "70%" }}
              />
            </div>
          </Form>
          <hr
            style={{
              marginTop: "30px",
            }}
          />

          {propinas?.estudante?.nome && (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>B.I</th>
                  <th>RUPE</th>
                  <th>Valor</th>
                  <th>Mês</th>
                  <th>Ano Letivo</th>
                  <PegarPermissoes permissoes={["admin", "remover", "edição"]}>
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
                  <td>{propinas?.anoLectivo?.ano}</td>
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
        </div>
      </div>
    </>
  );
};

export default AtualizarPropina;
