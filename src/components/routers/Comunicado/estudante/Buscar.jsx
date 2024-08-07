import { BiSearch } from "react-icons/bi";
import "./buscar.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { Input, Form } from "antd";
// import { BiEdit, BiX } from "react-icons/bi";
// import { PiPrinter } from "react-icons/pi";
import PegarPermissoes from "../../../../configs/permissoes/PegarPermissoes";

const Buscar = () => {
  const [bi, setBi] = useState("");
  const [estudante, setEstudante] = useState({});

  const navigete = useNavigate();

  const getBi = async () => {
    await api
      .post("/search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }
        console.log(data.data);
        setEstudante(data.data);
      })

      .catch((err) => console.log(err));
  };
  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo += "table { border-collapse: collapse; width: 100%}";
    estilo +=
      "table th,td { padding: 8px;text-align: center; padding-right: 20px; border-bottom: 1px solid #ddd;border-right: none;border-left: none;border-top: none;}";
    estilo += "</style>";

    const win = window.open();
    win.document.write("<html><head>");
    win.document.write("<title>ISPMOXICO</title>");
    win.document.write(estilo);
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write(con);
    win.document.write("</body>");
    win.document.write("</html>");
    win.print();
    win.close();
  };

  return (
    <div className='container-buscarEstudante'>
      <div className='pesquisaEstudante'>
        <Form className='form' onSubmitCapture={() => getBi()}>
          <Input.Search
            type='search'
            placeholder='Nº de BI do Estudante'
            required
            onChange={(e) => setBi(e.target.value)}
            value={bi}
            autoFocus
            maxLength={14}
            showCount
            allowClear
            onSearch={() => getBi()}
            style={{
              width: "50%",
            }}
          />
        </Form>
      </div>
      <div className='conteudo' id='tabela'>
        {estudante?.nome && (
          <>
            <br />
            <h3>Dados do Estudante</h3>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Curso</th>
                  <th>Contacto</th>
                  <th>BI</th>
                  <th>Regime</th>
                  <th>Turma</th>
                  <th>Frequência</th>
                  <th>Sexo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{estudante?.nome}</td>
                  <td>{estudante?.curso?.curso}</td>
                  <td>{estudante?.contacto}</td>
                  <td>{estudante?.bi}</td>
                  <td>{estudante?.regime}</td>
                  <td>{estudante?.turma}</td>
                  <td>{estudante?.frequencia?.ano}</td>
                  <td>{estudante?.sexo}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Buscar;
