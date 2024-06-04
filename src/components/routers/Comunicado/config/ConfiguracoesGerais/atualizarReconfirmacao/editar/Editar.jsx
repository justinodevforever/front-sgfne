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
  const [frequencias, setFrequencias] = useState([]);
  const [anos, setAnos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [fk_semestre, setFk_semestre] = useState("");
  const [fk_ano, setFk_ano] = useState("");
  const [fk_frequencia, setFk_frequencia] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);

  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    getFrequencia();
    getSemestre();
    getAnoLetivo();
  }, []);
  useEffect(() => {
    setFk_frequencia(propinas?.fk_frequencia);
    setFk_ano(propinas?.fk_ano);
    setFk_semestre(propinas?.fk_semestre);
  }, [propinas]);

  function close(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
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

  const getAnoLetivo = async () => {
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
  const atualizarPropina = async (e) => {
    e.preventDefault();

    if (!fk_ano || !fk_semestre || !fk_frequencia) {
      setMessage("Existe Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .put(`/reconfirmacao/${propinas.id}`, {
        fk_frequencia,
        fk_ano,
        fk_semestre,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        if (data.data.message === "error") {
          dispatchError(toggleModalError(true));
          return;
        }
        if (data.data.message === "sucess") {
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
          <div className='editarPropina'>
            <div className='opcoesEditar'>
              <div>
                <h2>Editar Propina</h2>
              </div>

              <BiX
                color='red'
                size={20}
                onClick={(e) => close(e)}
                className='closed'
              />
            </div>
            <form className='formBi'>
              <div className='cc'>
                <div>
                  Frequência{" "}
                  <select onChange={(e) => setFk_frequencia(e.target.value)}>
                    <option value={propinas.fk_frequencia}>
                      {propinas?.frequencia?.ano}
                    </option>
                    {frequencias.map((m) => (
                      <>
                        <option value={m.id} key={m.id}>
                          {m.ano}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div>
                  Ano{" "}
                  <select onChange={(e) => setFk_ano(e.target.value)}>
                    <option value={propinas.fk_ano}>
                      {propinas?.anoLectivo?.ano}
                    </option>
                    {anos.map((ano) => (
                      <option value={ano?.id} key={ano?.id}>
                        {ano?.ano}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  Semestre{" "}
                  <select onChange={(e) => setFk_semestre(e.target.value)}>
                    <option value={propinas.fk_semestre}>
                      {propinas?.semestre?.nome}
                    </option>
                    {semestres.map((s) => (
                      <option value={s?.id} key={s?.id}>
                        {s?.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            {propinas?.estudante?.nome && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>B.I</th>
                      <th>Semestre</th>
                      <th>Frequência</th>
                      <th>Ano Letivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{propinas?.estudante?.nome}</td>
                      <td>{propinas?.estudante?.bi}</td>
                      <td>{propinas?.semestre.nome}</td>
                      <td>{propinas?.frequencia.ano} ano</td>
                      <td>{propinas?.anoLectivo?.ano}</td>
                    </tr>
                  </tbody>
                </table>

                <button onClick={(e) => atualizarPropina(e)}>
                  <FaSave size={20} color='fff' /> Salvar
                </button>
              </>
            )}
          </div>

          <div className='ovefloy'></div>
        </>
      )}
    </>
  );
};

export default EditarPropina;
