import { BsArrowLeft } from "react-icons/bs";
import "./menuBack.css";
const MenuBack = () => {
  const hendleBack = () => {
    window.history.back();
  };
  return (
    <div className="barra-comentPage">
      <BsArrowLeft
        size={"30px"}
        color="#fff"
        cursor={"pointer"}
        onClick={hendleBack}
      />
    </div>
  );
};

export default MenuBack;
