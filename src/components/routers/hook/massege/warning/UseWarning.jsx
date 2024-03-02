import "./warning.scss";

import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { CiCircleCheck, CiWarning } from "react-icons/ci";
import { useEffect } from "react";
import { toggleModalWarning } from "../../../../../store/ui-slice";

const UseWarning = ({ message }) => {
  const { isVisibleWarning } = useSelector((state) => state.ui.ModalWarning);
  const dispatch = useDispatch();
  useEffect(() => {
    let time;

    time = setTimeout(() => {
      dispatch(toggleModalWarning(false));
    }, 5000);

    return () => {
      clearTimeout(time);
    };
  }, [isVisibleWarning]);
  return (
    <>
      {isVisibleWarning && (
        <>
          <div className="warning">
            <CiWarning size={80} color="orange" className="check" />
            <h2>{message}</h2>
          </div>
          <div className="ovefloyWarning"></div>
        </>
      )}
    </>
  );
};

export default UseWarning;
