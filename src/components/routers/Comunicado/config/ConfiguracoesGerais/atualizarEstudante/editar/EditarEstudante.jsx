import { BiEdit, BiX } from "react-icons/bi";
import "./editarEstudante.scss";
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

const EditarEstudante = ({ estudante }) => {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState("");
  const [nome, setNome] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [contato, setcontato] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);

  const dispatchConfirmar = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarning = useDispatch();

  useEffect(() => {
    getCurso();
  }, []);
  useEffect(() => {
    setCurso(estudante?.fk_curso + " " + estudante?.curso?.curso);
    setcontato(estudante?.contacto);
    setNome(estudante?.nome);
    setPeriodo(estudante.periodo);
  }, [estudante]);

  function close(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }

  const getCurso = async () => {
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
  const atualizarEstudante = async (e) => {
    e.preventDefault();
    const [newCurso, a] = curso.split(" ");

    if (!newCurso || !contato || !nome) {
      setMessage("Existe Um Campo Vazio!");
      dispatchWarning(toggleModalWarning(true));
      return;
    }
    await api
      .put(`/estudante/${estudante.id}`, {
        nome,
        fk_curso: newCurso,
        contato,
        periodo,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

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
                <h2>Editar Estudante</h2>
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
                <div style={{ color: "#000" }}>
                  Nome:{""}
                  <input
                    type='text'
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                  />
                </div>
                <div style={{ color: "#000" }}>
                  Período:{""}
                  <select onChange={(e) => setPeriodo(e.target.value)}>
                    <option value={periodo}>{periodo}</option>
                    <option value={"Pós-Laboral"}>Pós-Laboral</option>
                    <option value={"Diúrno"}>Diúrno</option>
                  </select>
                </div>
                <div style={{ color: "#000" }}>
                  Curso:{" "}
                  <select onChange={(e) => setCurso(e.target.value)}>
                    <option
                      value={estudante.fk_curso + " " + estudante.curso.curso}>
                      {estudante.curso.curso}
                    </option>
                    {cursos.map((curso) => (
                      <option
                        value={curso.id + " " + curso.curso}
                        key={curso.id}>
                        {curso.curso}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ color: "#000" }}>
                  Contacto: {""}
                  <input
                    type='text'
                    value={contato}
                    onChange={(e) => setcontato(e.target.value)}
                  />
                </div>
              </div>
            </form>
            {estudante?.nome && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>B.I</th>
                      <th>email</th>
                      <th>Contacto</th>
                      <th>curso</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{estudante?.nome}</td>
                      <td>{estudante?.bi}</td>
                      <td>{estudante?.user?.email}</td>
                      <td>{estudante?.user?.contacto}</td>
                      <td>{estudante?.curso?.curso}</td>
                    </tr>
                  </tbody>
                </table>

                <button onClick={(e) => atualizarEstudante(e)}>
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

export default EditarEstudante;
