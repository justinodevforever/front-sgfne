import { Link, useSearchParams } from "react-router-dom";
import "./menuConfig.scss";

import { ToolFilled, RightOutlined, DownOutlined } from "@ant-design/icons";
import { BiDollar } from "react-icons/bi";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { FaUserClock, FaUserLock } from "react-icons/fa";

const MenuConfig = ({ config }) => {
  const [reco, setReco] = useState(false);
  const [toogleAjuste, setToogleAjuste] = useState(false);
  const [toogleAjusteService, setToogleAjusteService] = useState(false);
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
            <li
              className={"li"}
              onClick={() => setToogleAjuste(!toogleAjuste)}
              style={{ cursor: "pointer" }}>
              <ToolFilled />
              Ajuste{" "}
              {toogleAjuste ? (
                <DownOutlined
                  style={{ marginLeft: "30%", cursor: "pointer" }}
                />
              ) : (
                <RightOutlined
                  style={{ marginLeft: "30%", cursor: "pointer" }}
                />
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
            <li
              className={"li"}
              onClick={() => setToogleAjusteService(!toogleAjusteService)}
              style={{ cursor: "pointer" }}>
              <ToolFilled />
              Ajuste de Serviço{" "}
              {toogleAjusteService ? (
                <DownOutlined
                  style={{ marginLeft: "25%", cursor: "pointer" }}
                />
              ) : (
                <RightOutlined
                  style={{ marginLeft: "25%", cursor: "pointer" }}
                />
              )}
            </li>
            {toogleAjusteService && (
              <div
                style={{
                  display: "flex",
                  width: "90%",
                  flexDirection: "column",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  background: "#efefef",
                }}>
                <Link to={`atualizar_cadeira_atraso/${6}?active=${"aca"}`}>
                  <li
                    className={active.get("active") === "aca" ? "isCda" : "li"}>
                    Ajustar Cadeira em Atraso
                  </li>
                </Link>
                <Link to={`atualizar_propina/${6}?active=${"apr"}`}>
                  <li
                    className={active.get("active") === "apr" ? "isApr" : "li"}>
                    Ajustar Propina
                  </li>
                </Link>
                <Link to={`atualizar_reconfirmacao/${6}?active=${"arc"}`}>
                  <li
                    className={active.get("active") === "arc" ? "isRC" : "li"}>
                    Ajustar Reconfirmação
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
