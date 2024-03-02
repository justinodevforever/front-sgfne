import { useDispatch, useSelector } from "react-redux";
import "./confirmar.scss";
import { FaCheck } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { useEffect } from "react";
import { toggleModalConfirmar } from "../../../../../store/ui-slice";

const UseSucess = () => {
  const { isVisibleConfirmar } = useSelector(
    (state) => state.ui.ModalConfirmar
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let time;

    time = setTimeout(() => {
      dispatch(toggleModalConfirmar(false));
    }, 5000);

    return () => {
      clearTimeout(time);
    };
  }, [isVisibleConfirmar]);
  return (
    <>
      {isVisibleConfirmar && (
        <div className="confirmar">
          <CiCircleCheck size={80} color="green" className="check" />
          <h2>Sucesso!</h2>
        </div>
      )}
      {isVisibleConfirmar && <div className="ovefloyConfirmar"></div>}
    </>
  );
};

export default UseSucess;
