import { useEffect, useState } from "react";
import "./cadeira.scss";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../../../../../auth/auth";
import { BiSave } from "react-icons/bi";
import UseWarning from "../../../../hook/massege/warning/UseWarning";
import UseErro from "../../../../hook/massege/Error/UseErro";
import UseSucess from "../../../../hook/massege/sucess/UseSucess";
import { useDispatch } from "react-redux";
import {
  toggleModalConfirmar,
  toggleModalError,
  toggleModalWarning,
} from "../../../../../../store/ui-slice";
import { Input, Space } from "antd";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Cadeira = () => {
  const [clicCadatrar, setClicCadatrar] = useState(true);
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState("");
  const [curso, setCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [semestre, setSemestre] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [message, setMessage] = useState("");
  const [clicActualizar, setClicActualizar] = useState(false);
  const dispatchSucess = useDispatch();
  const dispatchError = useDispatch();
  const dispatchWarneng = useDispatch();
  const navigate = useNavigate();

  const toggleCadastrar = (e) => {
    e.preventDefault();
    setClicCadatrar(true);
    setClicActualizar(false);
  };
  const toggleActualizar = (e) => {
    e.preventDefault();

    setClicActualizar(true);
    setClicCadatrar(false);
  };
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

  const hendleSave = async (e) => {
    e.preventDefault();
    if (!semestre || !curso || !frequencia || !disciplina) {
      setMessage("Existe um Campo Vazio");
      dispatchWarneng(toggleModalWarning(true));
      return;
    }

    await api
      .post("/disciplina", {
        nome: disciplina,
        fk_ano: frequencia,
        fk_curso: curso,
        fk_semestre: semestre,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        if (data.data.message === "sucess")
          return dispatchSucess(toggleModalConfirmar(true));
        if (data.data.message === "error")
          return dispatchError(toggleModalError(true));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <UseWarning message={message} />
      <UseErro />
      <UseSucess />

      <div className='disciplina'>
        <div className='opcoes'>
          <form onSubmit={(e) => hendleSave(e)}>
            <Space
              wrap
              style={{
                marginBottom: "20px",
              }}>
              <TextField
                label='Disciplina'
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>
                  Curso
                </InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  labelId='demo-simple-select-label'
                  onChange={(e) => setCurso(e.target.value)}
                  label='Curso'
                  id='demo-simple-select'
                  value={curso}>
                  {cursos.map((s) => (
                    <MenuItem value={s.id} key={s.id}>
                      {s.curso}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>
                  Frequência
                </InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  labelId='demo-simple-select-label'
                  onChange={(e) => setFrequencia(e.target.value)}
                  label='Frequência'
                  id='demo-simple-select'
                  value={frequencia}>
                  {frequencias.map((s) => (
                    <MenuItem value={s.id} key={s.id}>
                      {s.ano}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor='demo-simple-select-label'>
                  Semestre
                </InputLabel>
                <Select
                  style={{
                    width: "200px",
                  }}
                  labelId='demo-simple-select-label'
                  onChange={(e) => setSemestre(e.target.value)}
                  label='Frequência'
                  id='demo-simple-select'
                  value={semestre}>
                  {semestres.map((s) => (
                    <MenuItem value={s.id} key={s.id}>
                      {s.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Space>
            {semestre && frequencia && curso && disciplina && (
              <button type='submit'>
                <BiSave />
                Cadastrar
              </button>
            )}
            <br />
          </form>
        </div>
      </div>
    </>
  );
};
export default Cadeira;
