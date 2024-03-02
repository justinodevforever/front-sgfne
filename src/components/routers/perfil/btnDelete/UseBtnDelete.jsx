import { BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import UseRemoverConfirmPublicacaoPage from "./UseRemoverConfirmPublicacaoPage";

const UseBtnRemovePerfil = ({ pu, id1, publicacoes, setPublicacoes }) => {
  const [isClick, setIsClick] = useState(false);

  return (
    <div className="container-btnRemove">
      <BiTrash
        size={"20px"}
        color="#fff"
        cursor={"pointer"}
        onClick={() => {
          setIsClick(true);
        }}
      />
      {isClick && (
        <UseRemoverConfirmPublicacaoPage
          pu={pu}
          setIsClick={setIsClick}
          id1={id1}
          setPublicacoes={setPublicacoes}
          publicacoes={publicacoes}
        />
      )}
    </div>
  );
};

export default UseBtnRemovePerfil;
