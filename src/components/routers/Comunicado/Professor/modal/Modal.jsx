import { ReactDOM, useState } from "react";
import "./modalProf.css";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenModla } from "../../../../../store/ui-slice";

const Modal = ({ disciplina, idProf }) => {
  const [check, setCheck] = useState(false);
  const { isVisible } = useSelector((state) => state.ui.openModal);
  const dispatch = useDispatch();

  function ToggleModal(e) {
    e.preventDefault();
    dispatch(toggleOpenModla(!isVisible));
  }
  return (
    <>
      {isVisible && (
        <>
          <div className="modalProf">
            <form>
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
              <h3>Lançamento de Notas!</h3>
              <div></div>

              <div className="input">
                <input type="number" hidden />
                <label htmlFor="email">Nome</label>
                <input
                  type="text"
                  placeholder="Digite o nome do Estudante"
                  title="Nome do Estudante"
                  className="inpitName"
                  required
                />
                <div className="notas">
                  <label htmlFor="primeiraParcelar">
                    1ª Parcelar
                    <input
                      type="number"
                      placeholder="Digite a Nota"
                      title="Nota da Primeira parcelar"
                      className="inpitNota"
                      required
                    />
                  </label>
                  <label htmlFor="segundaParcelar">
                    2ª Parcelar
                    <input
                      type="number"
                      placeholder="Digite a Nota"
                      title="Nota da Segunda parcelar"
                      className="inpitNota"
                      required
                    />
                  </label>
                  <label htmlFor="exame">
                    Nata final
                    <input
                      type="number"
                      placeholder="Digite a Nota Final"
                      title="Nota de Exame"
                      className="inpitNota"
                      required
                    />
                  </label>
                </div>
              </div>

              <button type="submit">Adicionar</button>
            </form>
          </div>
          <div className="overlayProf"></div>
        </>
      )}
    </>
  );
};

export default Modal;
