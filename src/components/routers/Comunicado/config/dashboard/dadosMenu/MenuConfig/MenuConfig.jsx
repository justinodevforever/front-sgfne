import { Link, useSearchParams } from "react-router-dom";
import "./menuConfig.scss";
import {
  ArrowCircleRight,
  CurrencyExchange,
  ListOutlined,
  Update,
} from "@mui/icons-material";
import {
  DollarOutlined,
  DollarTwoTone,
  PlusOutlined,
  PrinterFilled,
  ToolFilled,
  ArrowRightOutlined,
  RightCircleFilled,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { BiDollar } from "react-icons/bi";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { FaUserClock, FaUserLock } from "react-icons/fa";

const MenuConfig = ({ config }) => {
  const [reco, setReco] = useState(false);
  const [toogleAjuste, setToogleAjuste] = useState(false);
  const [active] = useSearchParams();

  return (
    <div className='menuConfig'>
      <ul>
        {config && (
          <>
            <Link to={`permissoes/${6}?active=${"per"}`}>
              <li className={active.get("active") === "per" ? "isPr" : "li"}>
                <FaUserLock />
                Permissões
              </li>
            </Link>
            {/* <Link> */}
            <li className={"li"} onClick={() => setToogleAjuste(!toogleAjuste)}>
              <ToolFilled />
              Ajuste{" "}
              {toogleAjuste ? (
                <DownOutlined style={{ marginLeft: "30%" }} />
              ) : (
                <RightOutlined style={{ marginLeft: "30%" }} />
              )}
            </li>
            {/* </Link> */}
            {toogleAjuste && (
              <div
                style={{
                  display: "flex",
                  width: "90%",
                  flexDirection: "column",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  background: "#efefef",
                }}>
                <Link to={`atualizar_disciplina/${6}?active=${"dp"}`}>
                  <li className={active.get("active") === "dp" ? "isDp" : "li"}>
                    Ajustar Disciplina
                  </li>
                </Link>
                <Link to={`atualizar_mes/${6}?active=${"mes"}`}>
                  <li
                    className={active.get("active") === "mes" ? "isMes" : "li"}>
                    Ajustar Mês
                  </li>
                </Link>
                <Link to={`atualizar_semestre/${6}?active=${"sm"}`}>
                  <li className={active.get("active") === "sm" ? "isSm" : "li"}>
                    Ajustar Semestre
                  </li>
                </Link>
                <Link to={`atualizar_frequencia/${6}?active=${"fr"}`}>
                  <li className={active.get("active") === "fr" ? "isFr" : "li"}>
                    Ajustar Frequência
                  </li>
                </Link>
                <Link to={`atualizar_ano/${6}?active=${"ano"}`}>
                  <li
                    className={active.get("active") === "ano" ? "isAno" : "li"}>
                    Ajustar Ano
                  </li>
                </Link>
                <Link to={`atualizar_curso/${6}?active=${"curso"}`}>
                  <li
                    className={
                      active.get("active") === "curso" ? "isCurso" : "li"
                    }>
                    Ajustar Curso
                  </li>
                </Link>
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuConfig;
