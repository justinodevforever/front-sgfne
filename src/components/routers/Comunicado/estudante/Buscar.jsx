import { BiSearch } from "react-icons/bi";
import "./buscar.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../../auth/auth";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiX } from "react-icons/bi";
import { PiPrinter } from "react-icons/pi";

const Buscar = () => {
  const [bi, setBi] = useState("");
  const [userBi, setUserBi] = useState("");
  const [nome, setNome] = useState("");
  const [contacto, setContacto] = useState("");
  const [fk_user, setFk_user] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const navigete = useNavigate();

  const getBi = async (e) => {
    e.preventDefault();
    await api
      .post("/search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setCurso(data.data.Curso.curso);
        setContacto(data.data.contato);
        setNome(data.data.nome);
        setUserBi(data.data.bi);
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
    <div className="container-buscar">
      <div className="pesquisa">
        <form onSubmit={(e) => getBi(e)} className="form">
          <input
            type="search"
            placeholder="Nº de BI do Estudante"
            required
            onChange={(e) => setBi(e.target.value)}
            value={bi}
            autoFocus
            maxLength={14}
          />
          <BiSearch
            color="#fff"
            cursor={"pointer"}
            size={27}
            onClick={(e) => getBi(e)}
          />
        </form>
      </div>
      <div className="conteudo" id="tabela">
        <br />
        {nome && bi && contacto && <h3>Dados do Estudante</h3>}
        <br />
        {nome && bi && contacto && (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Curso</th>
                <th>Contacto</th>
                <th>BI</th>
                <th colSpan={2}>Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{nome}</td>
                <td>{curso}</td>
                <td>{contacto}</td>
                <td>{userBi}</td>
                <td>
                  <BiX color="red" size={20} cursor={"pointer"} />
                </td>
                <td>
                  <BiEdit color="blue" cursor={"pointer"} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Buscar;
