import { ReactDOM, useState } from "react";
import "./modal.css";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../store/ui-slice";

const Modal = () => {
  const [check, setCheck] = useState(false);
  const [isVisible] = useState(false);
  const dispatch = useDispatch();

  function ToggleModal(e) {
    e.preventDefault();
    dispatch(toggleModal(!isVisible));
  }
  return (
    <>
      {isVisible && (
        <>
          <div className="modal">
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
              <h3>Cria sua Conta!</h3>
              <div className="input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="ex: exemplo@gmail.com"
                  title="permitido Email Válido"
                />
                <label htmlFor="nome">Nome</label>
                <input type="text" placeholder="Digite o seu nome" />
                <label htmlFor="password">Senha</label>
                <input
                  type={check ? "text" : "password"}
                  placeholder="Digite a Senha"
                  title="senha"
                />
              </div>
              <label className="verSenhaj">
                <input
                  type="checkbox"
                  className="check"
                  value={check}
                  onClick={() => setCheck(!check)}
                />
                <p>Mostrar Senha</p>
              </label>
              <button type="submit">Criar</button>
            </form>
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
};

export default Modal;
