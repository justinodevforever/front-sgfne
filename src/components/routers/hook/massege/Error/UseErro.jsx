import { useDispatch, useSelector } from "react-redux";
import "./erro.scss";
import { FaCheck } from "react-icons/fa";
import { BiSolidErrorCircle } from "react-icons/bi";
import { useEffect } from "react";
import { toggleModalError } from "../../../../../store/ui-slice";

const UseErro = () => {
  const { isVisibleError } = useSelector((state) => state.ui.ModalError);
  const dispatch = useDispatch();
  useEffect(() => {
    let time;

    time = setTimeout(() => {
      dispatch(toggleModalError(false));
    }, 5000);

    return () => {
      clearTimeout(time);
    };
  }, [isVisibleError]);
  return (
    <>
      {isVisibleError && (
        <div className="erro">
          <BiSolidErrorCircle size={80} color="red" className="check" />
          <h2>Erro!</h2>
        </div>
      )}
      {isVisibleError && <div className="ovefloyError"></div>}
    </>
  );
};

export default UseErro;
