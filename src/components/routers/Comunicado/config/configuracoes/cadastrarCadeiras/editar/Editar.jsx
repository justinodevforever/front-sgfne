import { BiSave, BiX } from "react-icons/bi";
import "./editar.scss";
import { api } from "../../../../../../../../auth/auth";
import { useEffect, useState } from "react";
import UseSucess from "../../../../../hook/massege/sucess/UseSucess";
import UseErro from "../../../../../hook/massege/Error/UseErro";
import UseWarning from "../../../../../hook/massege/warning/UseWarning";
import { useDispatch } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../../store/ui-slice";
import { Modal, Space } from "antd";
import { TextField } from "@mui/material";

const Editar = ({ isVisible, setIsVisible, id }) => {
  const [nome, setNome] = useState("");
  const [disciplina, setDisciplina] = useState({});
  const [frequencias, setFrequencias] = useState([]);
  const [Fk_frequencia, setFk_frequencia] = useState("");
  const [fk_curso, setFk_curso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [fk_semestre, setFk_semestre] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    hendleBuscar();
  }, [id]);
  useEffect(() => {
    getCurso();
    getAno();
    getSemestre();
  }, []);
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
  const getAno = async () => {
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

  const hendleBuscar = async () => {
    await api
      .get(`/disciplina/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setDisciplina(data.data);
        setNome(data.data.nome);
        setFk_curso(data.data.curso?.id);
        setFk_frequencia(data.data?.frequencia?.id);
        setFk_semestre(data.data?.semestre?.id);
      })
      .catch((err) => console.log(err));
  };
  const hendleUpdate = async () => {
    if (!nome || !fk_curso || !fk_semestre || !Fk_frequencia) {
      setMessage("Existe um Campo Vazio!");
      return dispatch(toggleModalWarning(true));
    }
    await api
      .put(`/disciplina/${id}`, {
        nome,
        fk_curso,
        fk_semestre,
        fk_ano: Fk_frequencia,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data.message === "sucess")
          return dispatch(toggleModalConfirmar(true));

        if (data.data.message === "error")
          return dispatch(toggleModalError(true));
      })
      .catch((err) => console.log(err));
  };
  const toggleVisible = (e) => {
    e.preventDefault();
    setIsVisible(false);
  };
  return (
    <Modal
      open={isVisible}
      onCancel={() => setIsVisible(!isVisible)}
      closable={() => setIsVisible(!isVisible)}
      onOk={() => hendleUpdate()}>
      <UseSucess />
      <UseErro />
      <UseWarning message={message} />

      <Space
        className='space'
        wrap
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <div>
          <TextField
            type='text'
            label='Disciplina'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label
            htmlFor='curso'
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            Curso
            <select
              onChange={(e) => setFk_curso(e.target.value)}
              name='curso'
              style={{
                width: "225px",
                borderRadius: "5px",
                height: "60px",
                fontWeight: "200",
                fontSize: "20px",
                border: "1px solid #ddd",
              }}>
              <option value={disciplina?.curso?.id}>
                {disciplina?.curso?.curso}
              </option>
              {cursos.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.curso}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor='fre'
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            Frequência
            <select
              onChange={(e) => setFk_frequencia(e.target.value)}
              name='fre'
              style={{
                width: "225px",
                borderRadius: "5px",
                height: "60px",
                fontWeight: "200",
                fontSize: "20px",
                border: "1px solid #ddd",
              }}>
              <option value={disciplina?.AnoFrequencia?.id}>
                {disciplina?.AnoFrequencia?.ano}
              </option>
              {frequencias.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.ano}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor='seme'
            style={{
              display: "flex",
              flexDirection: "column",
            }}>
            Semestre
            <select
              onChange={(e) => setFk_semestre(e.target.value)}
              name='seme'
              style={{
                width: "225px",
                borderRadius: "5px",
                height: "60px",
                fontWeight: "200",
                fontSize: "20px",
                border: "1px solid #ddd",
              }}>
              <option value={disciplina?.semestre?.nome}>
                {" "}
                {disciplina?.semestre?.nome}
              </option>
              {semestres.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Space>
    </Modal>
  );
};

export default Editar;
