import { BiTrash } from "react-icons/bi";
import UseRemoverConfirm from "./UseRemoverConfirm";
import { useEffect, useState } from "react";

const UseBtnRemove = ({ aC, id1, allComent, setClicou, setAllComent }) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="container-btnRemove">
      <BiTrash
        size={"20px"}
        color="#f74044"
        cursor={"pointer"}
        onClick={() => {
          setIsClick(true);
        }}
      />
      {isClick && (
        <UseRemoverConfirm
          aC={aC}
          setIsClick={setIsClick}
          id1={id1}
          setAllComent={setAllComent}
          allComent={allComent}
        />
      )}
    </div>
  );
};

export default UseBtnRemove;
