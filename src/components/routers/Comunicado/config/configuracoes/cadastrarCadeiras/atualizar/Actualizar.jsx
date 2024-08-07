import { useEffect, useState } from "react";
import "./actualizar.scss";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiSearch, BiSolidSearch, BiX } from "react-icons/bi";
import Editar from "../editar/Editar";
import { Button, Modal, Skeleton } from "antd";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ActualizarDisciplina = () => {
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState("");
  const [curso, setCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [semestre, setSemestre] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const [isLoadingS, setIsLoadingS] = useState(true);
  const [IsLoandigYear, setIsLoadingYear] = useState(true);
  const navigate = useNavigate();

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
        setIsLoadingCourse(false);
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
        setIsLoadingYear(false);
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
        setIsLoadingS(false);
      })
      .catch((err) => console.log(err));
  };
  const hendleBuscar = async () => {
    setIsLoading(true);
    await api
      .post("/disciplina/restringido", {
        ano: frequencia,
        curso,
        semestre,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        console.log(data.data);
        setDisciplinas(data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const toggleVisible = (e, id) => {
    e.preventDefault();
    setIsVisible(true);
    setId(id);
  };

  const removerDisciplina = async (id) => {
    await api
      .delete(`/disciplina/${id}`)
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
        }
        setDisciplinas(disciplinas.filter((disc) => disc.id !== id));
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Editar isVisible={isVisible} setIsVisible={setIsVisible} id={id} />

      <div className='atualizarDisciplina'>
        <form>
          <div>
            <Skeleton
              loading={isLoadingCourse && isLoadingS && IsLoandigYear}
              active>
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
                    <MenuItem value={s.curso} key={s.id}>
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
                    <MenuItem value={s.ano} key={s.id}>
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
                    <MenuItem value={s.nome} key={s.id}>
                      {s.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Skeleton>
          </div>
          <Button
            type='primary'
            icon={<BiSearch />}
            loading={isLoading}
            onClick={() => hendleBuscar()}>
            Pesquizar
          </Button>
        </form>
        {disciplinas.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Ano de Frquência</th>
                <th>Curso</th>
                <th>Semestre</th>
                <th colSpan={2}>Opçõs</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas?.map((d) => (
                <tr key={d.id}>
                  <td>{d?.nome}</td>
                  <td>{d?.frequencia?.ano}</td>
                  <td>{d?.curso?.curso}</td>
                  <td>{d?.semestre?.nome}</td>
                  <td>
                    <BiX
                      color='red'
                      cursor={"pointer"}
                      onClick={() => removerDisciplina(d.id)}
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
export default ActualizarDisciplina;
