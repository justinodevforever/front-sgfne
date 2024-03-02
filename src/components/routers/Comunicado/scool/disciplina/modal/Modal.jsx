import { ReactDOM, useEffect, useState } from "react";
import "./modalDisc.css";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalDisciplina } from "../../../../../../store/ui-slice";
import { BiDownload } from "react-icons/bi";

const Modal = ({ disciplina, prof }) => {
  const [check, setCheck] = useState(false);
  const { isVisible } = useSelector((state) => state.ui.ModalDisciplina);
  const dispatch = useDispatch();

  function ToggleModal(e) {
    e.preventDefault();
    dispatch(toggleModalDisciplina(!isVisible));
  }

  useEffect(() => {
    console.log(disciplina);
  }, []);
  return (
    <>
      {isVisible && (
        <>
          <div className="modalDisciplina">
            <div className="barra">
              <div></div>
              <BiX
                color="red"
                size={"20px"}
                cursor={"pointer"}
                className="close"
                onClick={(e) => ToggleModal(e)}
              />
            </div>
            <h3>{disciplina}</h3>
            <table className="tabela">
              <thead>
                <tr>
                  <th>Nome do Estudante</th>
                  <th>1ª Parcela</th>
                  <th>2ª Parcela</th>
                  <th> Exame</th>
                  <th>Média Final</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Justino Chitombi</td>
                  <td>14</td>
                  <td>12</td>
                  <td>12</td>
                  <td>13</td>
                  <td>Aprovado</td>
                </tr>
                <tr>
                  <td>Justino Chitombi</td>
                  <td>14</td>
                  <td>12</td>
                  <td>12</td>
                  <td>13</td>
                  <td>Aprovado</td>
                </tr>
                <tr>
                  <td>Justino Chitombi</td>
                  <td>14</td>
                  <td>12</td>
                  <td>12</td>
                  <td>13</td>
                  <td>Aprovado</td>
                </tr>
                <tr>
                  <td>Justino Chitombi</td>
                  <td>14</td>
                  <td>12</td>
                  <td>12</td>
                  <td>13</td>
                  <td>Aprovado</td>
                </tr>
              </tbody>
            </table>
            <BiDownload size={"27"} cursor={"pointer"} />
            <span>Docente: {prof}</span>
          </div>
          <div className="overlayProf"></div>
        </>
      )}
    </>
  );
};

export default Modal;
