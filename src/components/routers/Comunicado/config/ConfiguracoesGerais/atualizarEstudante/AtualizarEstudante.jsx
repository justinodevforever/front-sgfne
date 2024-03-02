import { useEffect, useState } from "react";
import "./atualizarEstudante.scss";
import { api } from "../../../../../../../auth/auth";
import { BiEdit, BiSearch, BiX } from "react-icons/bi";
import UseRemoverConfirm from "./remover/UseRemoverConfirm";

import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit } from "../../../../../../store/ui-slice";
import EditarEstudante from "./editar/EditarEstudante";

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

  const buscaEstudante = async (e) => {
    e.preventDefault();

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
          setEstudante(data.data);
          setId(data.data.id);
        }
        if (!data.data) {
          alert(`O Estudante com Nº de B.I ${bi} Não Existe!`);
        }
      })
      .catch((err) => console.log(err));
  };

  function deletePropina(e) {
    e.preventDefault();
    setIsClick(true);
  }
  function editarPropina(e) {
    e.preventDefault();
    dispatch(toggleModalEdit(!isVisible));
  }
  return (
    <>
      {isClick && <UseRemoverConfirm id={id} setIsClick={setIsClick} />}
      <EditarEstudante estudante={estudante} />
      <div className="atualizarPropina">
        <div className="opcoes">
          <form className="form" onSubmit={(e) => buscaEstudante(e)}>
            <div className="pagamento-propina">
              <input
                type="search"
                placeholder="Número de BI do Estudante"
                onChange={(e) => setBi(e.target.value)}
                className="search"
                value={bi}
                autoFocus
                maxLength={14}
              />
              <BiSearch
                size={30}
                color="a31543"
                cursor={"pointer"}
                onClick={(e) => buscaPropina(e)}
              />
            </div>
            <hr />

            {estudante?.nome && (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>B.I</th>
                    <th>E-mail</th>
                    <th>Conacto</th>
                    <th>Curso</th>

                    <th colSpan={2}>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{estudante?.nome}</td>
                    <td>{estudante?.bi}</td>
                    <td>{estudante?.Usuario.email}</td>
                    <td>{estudante?.contato}</td>
                    <td>{estudante?.Curso?.curso}</td>
                    <td>
                      <BiEdit
                        title="Editar Este Mês"
                        cursor={"pointer"}
                        color="blue"
                        onClick={(e) => editarPropina(e)}
                      />
                    </td>
                    <td>
                      <BiX
                        title="Eliminar Este Mês"
                        color="red"
                        cursor={"pointer"}
                        size={20}
                        onClick={(e) => deletePropina(e)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AtualizarEstudante;
