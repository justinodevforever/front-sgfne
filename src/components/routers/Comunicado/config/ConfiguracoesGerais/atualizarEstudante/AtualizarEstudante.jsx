import { useEffect, useState } from "react";
import "./atualizarEstudante.scss";
import { api } from "../../../../../../../auth/auth";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";

import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from "../../../../../../store/ui-slice";
import EditarEstudante from "./editar/EditarEstudante";
import PegarPermissoes from "../../../../../../configs/permissoes/PegarPermissoes";
import { Input } from "antd";

const AtualizarEstudante = () => {
  const [isClick, setIsClick] = useState(false);

  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [id, setId] = useState("");
  const [bi, setBi] = useState("");
  const [sms, setSms] = useState("");
  const { isVisible } = useSelector((state) => state.ui.ModalEdit);
  const dispatch = useDispatch();
  const [estudante, setEstudante] = useState({});

  const buscaEstudante = async () => {
    if (!bi) {
      alert("Existe um Campo Vazio!");
      return;
    }
    await api
      .post("/search/estudante/bi", {
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        if (data.data) {
          console.log(data.data);
          setEstudante(data.data);
          setId(data.data.id);
        }
        if (!data.data) {
          alert(`O Estudante com Nº de B.I ${bi} Não Existe!`);
        }
      })
      .catch((err) => console.log(err));
  };

  function deleteEstudante(e) {
    e.preventDefault();
    setIsClick(true);
  }
  function editarEstudante(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  return (
    <>
      {isClick && <UseRemoverConfirm id={id} setIsClick={setIsClick} />}
      <EditarEstudante estudante={estudante} />
      <div className='container-buscar'>
        <div className='pesquisa'>
          <form className='form'>
            <Input.Search
              type='search'
              placeholder='Número de BI do Estudante'
              onChange={(e) => setBi(e.target.value)}
              className='search'
              value={bi}
              autoFocus
              maxLength={14}
              onSearch={() => buscaEstudante()}
            />
          </form>
        </div>
        {estudante?.nome && (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>B.I</th>
                <th>E-mail</th>
                <th>Conacto</th>
                <th>Curso</th>
                <th>Período</th>
                <PegarPermissoes permissoes={["admin", "remover", "edição"]}>
                  <th colSpan={2}>Opções</th>
                </PegarPermissoes>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{estudante?.nome}</td>
                <td>{estudante?.bi}</td>
                <td>{estudante?.user?.email}</td>
                <td>{estudante?.user?.contacto}</td>
                <td>{estudante?.curso?.curso}</td>
                <td>{estudante?.periodo}</td>
                <PegarPermissoes permissoes={["admin", "remover", "edição"]}>
                  <td>
                    <BiEdit
                      title='Editar Este Mês'
                      cursor={"pointer"}
                      color='blue'
                      onClick={(e) => editarEstudante(e)}
                    />
                  </td>
                </PegarPermissoes>
                <PegarPermissoes permissoes={["admin", "remover", "edição"]}>
                  <td>
                    <BiX
                      title='Eliminar Este Mês'
                      color='red'
                      cursor={"pointer"}
                      size={20}
                      onClick={(e) => deleteEstudante(e)}
                    />
                  </td>
                </PegarPermissoes>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AtualizarEstudante;
