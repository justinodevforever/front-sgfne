import { Link, useSearchParams } from "react-router-dom";
import "./menuCadastro.scss";
import { Add } from "@mui/icons-material";

const MenuCadastro = ({ register }) => {
  const [cd] = useSearchParams();
  return (
    <>
      {register && (
        <div className='menuCadastro'>
          <ul>
            <Link to={`cadastrar_disciplina/${3}?cd=${"adp"}`}>
              <li className={cd.get("cd") === "adp" ? "isAdp" : "li"}>
                <Add />
                Adiciona Disciplina
              </li>
            </Link>
            <Link to={`cadastrar_frequencia/${3}?cd=${"afr"}`}>
              <li className={cd.get("cd") === "afr" ? "isAfr" : "li"}>
                <Add />
                Adicionar Frequência
              </li>
            </Link>
            <Link to={`cadastrar_anolectivo/${3}?cd=${"aal"}`}>
              <li className={cd.get("cd") === "aal" ? "isAal" : "li"}>
                <Add />
                Adicionar Ano Lectivo
              </li>
            </Link>
            <Link to={`cadastrar_curso/${3}?cd=${"acr"}`}>
              <li className={cd.get("cd") === "acr" ? "isAcr" : "li"}>
                <Add />
                Adicionar Curso
              </li>
            </Link>
            <Link to={`cadastrar_semestre/${3}?cd=${"asm"}`}>
              <li className={cd.get("cd") === "asm" ? "isAsm" : "li"}>
                <Add />
                Adicionar Semestre
              </li>
            </Link>
            <Link to={`cadastrar_mes/${3}?cd=${"ams"}`}>
              <li className={cd.get("cd") === "ams" ? "isAms" : "li"}>
                <Add />
                Adicionar Mês
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default MenuCadastro;
