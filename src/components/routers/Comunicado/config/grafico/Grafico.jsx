import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./grafico.scss";
import { api } from "../../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";

const Grafico = () => {
  const navigate = useNavigate();
  const [prop, setProp] = useState([]);
  const [diurno, setDiurno] = useState(0);
  const [posLaboral, setPosLaboral] = useState(0);

  useEffect(() => {
    propinas();
    getPosLaboral();
    getDiurno();
  }, []);

  const dados = [
    { nome: "Diúrno", Diúrno: diurno * 1900 },
    { nome: "Pós-Laboral", PósLaboral: posLaboral * 15000 },
  ];
  const propinas = async () => {
    await api
      .get("/propina")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setProp(data.data);
      })
      .catch((error) => console.log(error));
  };
  const getDiurno = async () => {
    await api
      .get("/diurno")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setDiurno(data.data);
      })
      .catch((error) => console.log(error));
  };
  const getPosLaboral = async () => {
    await api
      .get("/poslaboral")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setPosLaboral(data.data);
        console.log(data.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h1>Grafico</h1>
      <ResponsiveContainer width={"70%"} aspect={2}>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}>
          <Card
            style={{
              display: "flex",
              width: "200px",
              flexDirection: "column",
              marginLeft: "20px",
              padding: "10px",
              background: "#00f",
            }}>
            <h2>Valor do Diúrno</h2>
            <span
              style={{
                color: "#fff",
                fontSize: "20pt",
              }}>
              Receitas {diurno * 1900} Kz
            </span>
          </Card>
          <Card
            style={{
              display: "flex",
              width: "200px",
              flexDirection: "column",
              marginLeft: "20px",
              padding: "10px",
              background: "#a31543",
            }}>
            <h2
              style={{
                color: "#fff",
                fontSize: "20pt",
              }}>
              Valor do Pós-Laboral
            </h2>
            <span
              style={{
                color: "#fff",
                fontSize: "20pt",
              }}>
              Receitas {posLaboral * 15000} Kz
            </span>
          </Card>
        </div>
        <BarChart
          width={60}
          height={80}
          data={dados}
          margin={{
            left: 10,
            top: 30,
            right: 10,
            bottom: 20,
          }}>
          <CartesianGrid strokeDasharray='4 1 2' />
          <XAxis dataKey='nome' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Diúrno' fill='#00f' />
          <Bar dataKey='PósLaboral' fill='#a31543' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Grafico;
