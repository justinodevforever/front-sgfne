import { useEffect, useRef, useState } from "react";
import "./relatorioListaRecurso.scss";
import { api } from "../../../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Button } from "antd";
import { Print, Search } from "@mui/icons-material";
import OvelayLoader from "../../../../../hook/OverlayLoad/OverlayLoader";
import { useReactToPrint } from "react-to-print";
import logo from "../Logo.png";

const RelatorioListaRecurso = () => {
  const [lista, setLista] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState("");
  const [frequencias, setFrequencias] = useState([]);
  const [frequencia, setFrequencia] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplina, setDisciplina] = useState("");
  const [turma, setTurma] = useState("");
  const [regime, setRegime] = useState("");
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState({});
  const navigate = useNavigate();
  const documentPrint = useRef();

  useEffect(() => {
    getDisciplina();
    getCurso();
    getFrequencia();
  }, []);
  useEffect(() => {
    getDisciplina();
  }, [frequencia, curso]);

  const getCurso = async () => {
    await api.get("/curso").then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setCursos(data.data);
    });
  };
  const getDisciplina = async () => {
    await api
      .post("/disciplina/curso", {
        ano: frequencia,
        curso,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setDisciplinas(data.data);
      });
  };
  const getFrequencia = async () => {
    await api.get("/ano").then((data) => {
      if (data.data === "Token Invalid") {
        navigate("/login");
        return;
      }
      setFrequencias(data.data);
    });
  };
  const listaRecurso = async () => {
    setLoading(true);
    await api
      .post("/listarecurso/especifica", {
        frequencia,
        turma,
        curso,
        disciplina,
        regime,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setLoading(false);
        setDados(data.data[0]);
        setLista(data.data);
      });
  };
  const imprimir = useReactToPrint({
    content: () => documentPrint.current,
  });
  return (
    <>
      {loading && <OvelayLoader />}

      <div className='RelatorioListaRecurso'>
        {lista?.length > 0 && (
          <Button
            type='primary'
            onClick={() => imprimir()}
            style={{
              display: "flex",
              width: "150px",
              background: "#a31543",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              fontSize: "14pt",
              marginLeft: "800px",
              marginBottom: "20px",
            }}>
            <Print /> Imprimir
          </Button>
        )}
        <div
          ref={documentPrint}
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "10px",
            margin: "0px 10px",
          }}>
          {lista?.length > 0 && (
            <img
              src={logo}
              alt='logo'
              style={{
                display: "flex",
                float: "left",
                marginBottom: "10px",
              }}
            />
          )}
          {lista.length > 0 && (
            <>
              <h3
                style={{
                  color: "#000",
                }}>
                LISTA DE PRESENÇA DE RECURSO -{" "}
                {dados?.recurso?.estudante?.regime?.toUpperCase()} -{" "}
                {dados?.recurso?.estudante?.turma?.toUpperCase()}/
                {dados?.recurso?.AnoFrequencia?.ano} ANO{" "}
                {dados?.recurso?.Curso?.curso?.toUpperCase()}
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>N/O</th>
                    <th>Nome Completo</th>
                    <th>Sexo</th>
                    <th>Condição</th>
                    <th>Observações</th>
                  </tr>
                </thead>
                {lista.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td>{l?.recurso?.estudante?.nome}</td>
                    <td>{l?.recurso?.estudante?.sexo}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </table>
              <br />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "start",
                  alignItems: "start",
                  marginTop: "20px",
                  color: "#000",
                }}>
                <h2
                  style={{
                    color: "#000",
                  }}>
                  ANO LECTIVO {dados?.recurso?.anoLectivo?.ano}
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                <span>Rua da Missão, Bairro Zorró</span>
                <span>Cxa. Postal: Tel: +244 949577832</span>
              </div>
            </>
          )}
        </div>
        <div className='divLista'>
          <div>
            <FormControl>
              <InputLabel htmlFor='demo-simple-select-label'>
                Especialidade
              </InputLabel>
              <Select
                style={{
                  width: "200px",
                }}
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                labelId='demo-simple-select-label'
                label='Especialidade'>
                {cursos.map((c) => (
                  <MenuItem key={c.id} value={c.curso}>
                    {c.curso}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='demo-simple-select-label'>
                Frequência
              </InputLabel>
              <Select
                style={{
                  width: "200px",
                }}
                labelId='demo-simple-select-label'
                label='Frequência'
                onChange={(e) => setFrequencia(e.target.value)}
                id='demo-simple-select'>
                {frequencias.map((s) => (
                  <MenuItem value={s.ano} key={s.id}>
                    {s.ano}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='curso'>Disciplina</InputLabel>
              <Select
                style={{
                  width: "200px",
                }}
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                labelId='curso'
                label='Disciplina'>
                {disciplinas.map((c) => (
                  <MenuItem key={c.id} value={c.nome}>
                    {c.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <InputLabel htmlFor='demo-simple-select-label'>Regime</InputLabel>
              <Select
                style={{
                  width: "200px",
                }}
                onChange={(e) => setRegime(e.target.value)}
                labelId='demo-simple-select-label'
                label='Regime'>
                <MenuItem value={"Pós-Laboral"}>Pós-Laboral</MenuItem>
                <MenuItem value={"Regular"}>Regular</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Turma'
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
            />
          </div>
          <Button type='primary' onClick={() => listaRecurso()}>
            <Search /> Lista de Presença
          </Button>
        </div>
      </div>
    </>
  );
};

export default RelatorioListaRecurso;
