import { FcProcess } from "react-icons/fc";
import "./Processing.scss";
import { Link } from "react-router-dom";

const Processing = ({ message }) => {
  return (
    <>
      <div className='processing'></div>
      <div className='process'>
        <FcProcess size={80} className='iconProgrecess' />
        {message ? (
          <span
            style={{
              color: "#9304bf",
              fontSize: "14pt",
              fontFamily: "sans-serif",
              marginBottom: "-70px",
            }}>
            {message}
          </span>
        ) : (
          <span
            style={{
              color: "#9304bf",
              fontSize: "14pt",
              fontFamily: "sans-serif",
              marginBottom: "-70px",
            }}>
            Carregando...
          </span>
        )}
      </div>
    </>
  );
};
export default Processing;
